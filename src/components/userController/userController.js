import moment from 'moment';
export default {
	name: 'userController',
	data() {
		return {
			loginForm: {},
			userInfo: {},
			activeInfo: null,
			noRead: 0,
			friendList: [],
			groupList: [],
			membersVisible: false,
			selectGroup: {},
			membersList: [],
			searchFriendVisible: false,
			searchFriendForm: {},
			userList: [],
			creatVisible: false,
			creatForm: {},
			checkList: [],
			chatType: null,
			chatVisible: false,
			chatForm: {},
			selectFriend: null,
			chatList: [],
			selectChat: null,
			replyVisible: false,
			replyForm: {},
			loading1: false,
			loading2: false,
			loading3: false,
		}
	},
	methods: {
		getUser() {
			let data = {
				id: this.$cookie.get('userid')
			};
			this.$http.get("/social/getUserById.do", { params: data }).then(response => {
				this.userInfo = response.data.data;
			});
		},
		logout() {
			this.$router.push({path:'/login'});
		},
		handleClick(result) {
			this.activeInfo = result;
			if (result === 'friend') {
				this.getFriend();
			} else if (result === 'group') {
				this.getGroup();
			} else if (result === 'chat') {
				this.getChatByCodition();
			}
		},
		//获取好友列表
		getFriend() {
			this.loading1 = true;
			let data = {
				userid: this.$cookie.get('userid'),
				groupid: '',
				type: 1,
				status: 2
			};
			this.$http.get("/social/getContactByCodition.do", { params: data }).then(response => {
				this.friendList = response.data.data;
				this.loading1 = false;
			});
		},
		//获取群组列表
		getGroup() {
			this.loading2 = true;
			let data = {
				userid: this.$cookie.get('userid'),
			};
			let groups = []
			this.$http.get("/social/getGroupByCodition.do", { params: data }).then(response => {
				groups = response.data.data;
				//查根据用户id查群组成员列表，里面有groupid和groupname
				let data = {
					touserid: this.$cookie.get('userid'),
					groupid: '',
					type: 2
				};
				this.$http.get("/social/getContactByCodition.do", { params: data }).then(response => {
					response.data.data.forEach(element => {
						groups.push({
							id: element.groupid,
							name: element.groupname
						});
					});
					this.groupList = groups;
					this.loading2 = false;
				});
			});
		},
		//打开搜索并添加好友
		openSearchFriend() {
			this.searchFriendVisible = true;
			this.searchFriendForm = {};
			this.userList = [];
		},
		//根据条件查询用户
		getUserByCodition() {
			let data = {
				username: '',
				major: this.searchFriendForm.major,
				school: this.searchFriendForm.school
			};
			this.$http.get("/social/getUserByCodition.do", { params: data }).then(response => {
				this.userList = response.data.data;
				this.handleUserlist();
			});
		},
		//用户列表剔除当前用户
		handleUserlist() {
			let userid = this.$cookie.get('userid');
			this.userList.forEach((element, index) => {
				if(element.id === userid) {
					this.userList.splice(index, 1);
				}
			});
		},
		//发起好友请求
		addFriend(item) {
			let data = {
				userid: this.$cookie.get('userid'),
				groupid: '',
				touserid: item.id,
				username: this.$cookie.get('name'),
				groupname: '',
				tousername: item.name,
				userlogo: item.img,
				status: 1,
				type: 1
			};
			this.$http.get("/social/addContact.do", { params: data }).then(response => {
				if (response.data.code == '20000') {
					this.$message({
					  	message: '已发送好友申请！',
					 	type: 'success'
					});
				} else {
					this.$message.error(response.data.message);
				}
			});
		},
		//打开创建群组
		openCreatGroup(result) {
			this.creatVisible = true;
			this.creatForm = {};
			this.selectGroup = result;
		},
		//点击创建群组
		addGroup() {
			let data = {
				name: this.creatForm.name,
				time: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
				userid: this.$cookie.get('userid')
			};
			this.$http.get("/social/addGroup.do", { params: data }).then(response => {
				if (response.data.code == '20000') {
					this.$message({
					  	message: '创建成功！',
					 	type: 'success'
					});
					this.creatVisible = false;
					this.getGroup();
				} else {
					this.$message.error(response.data.message);
				}
			});
		},
		//打开添加成员
		openMembers(result) {
			this.membersVisible = true;
			this.checkList = [];
			this.selectGroup = result;
		},
		//点击添加成员
		groupMembers() {
			// let data = {
			// 	touserid: this.$cookie.get('userid'),
			// 	tousername: this.$cookie.get('name')
			// };
			// this.addMembers(data);
			this.checkList.forEach((element, index) => {
				if (element) {
					this.addMembers(this.friendList[index], index);
				}
			});
		},
		//向群组添加成员
		addMembers(item, index) {
			let data = {
				userid: '',
				groupid: this.selectGroup.id,
				touserid: item.touserid,
				username: this.$cookie.get('username'),
				groupname: this.selectGroup.name,
				tousername: item.tousername,
				userlogo: item.img,
				status: 2,
				type: 2
			};
			this.$http.get("/social/addContact.do", { params: data }).then(response => {
				if (response.data.code == '20000') {
					if (index === this.checkList.length - 1) {
						this.$message({
							message: '添加成功！',
						   type: 'success'
					  });
					  this.membersVisible = false;
					  this.getGroup();
					}
				} else {
					this.$message.error(response.data.message);
				}
			});
		},
		//根据群组获取成员列表
		getMembersOfGroup() {
			let data = {
				userid: '',
				groupid: this.selectGroup.id,
				type: 2,
				status: 2,
			};
			this.$http.get("/social/getContactByCodition.do", { params: data }).then(response => {
				this.membersList = response.data.data;
			});
		},
		//获取消息列表
		getChatByCodition() {
			this.loading3 = true;
			let data = {
				sendid: '',
				receiveid: this.$cookie.get('userid'),
				groupid: ''
			};
			this.$http.get("/social/getChatByCodition.do", { params: data }).then(response => {
				this.chatList = response.data.data;
				this.loading3 = false;
			});
		},
		//打开发送消息
		openChat(result, type) {
			this.chatVisible = true;
			this.chatForm = {};
			this.chatType = type;
			if (type === 'friend') {
				this.selectFriend = result;
			} else {
				this.selectGroup = result;
				this.getMembersOfGroup();
			}
		},
		//发送消息
		addChat() {
			let data = {
				content: this.chatForm.content,
				sendid: this.$cookie.get('userid'),
				receiveid: '',
				groupid: '',
				snedname: this.$cookie.get('name'),
				receivename: '',
				groupname: '',
				time: moment(new Date).format('YYYY-MM-DD hh:mm:ss')
			};
			if (this.chatType === 'friend') {
				data.receiveid = this.selectFriend.touserid;
				data.receivename = this.selectFriend.tousername;
				this.$http.get("/social/addChat.do", { params: data }).then(response => {
					if (response.data.code == '20000') {
						this.$message({
							  message: '发送成功！',
							 type: 'success'
						});
						this.chatVisible = false;
					} else {
						this.$message.error(response.data.message);
					}
				});
			} else {
				data.groupid = this.selectGroup.id;
				data.groupname = this.selectGroup.name;
				//循环给每个成员发送消息
				this.membersList.forEach((element, index) => {
					this.forChat(element, index);
				});
			}
		},
		//循环给每个成员发送消息
		forChat(item, index) {
			let data = {
				content: this.chatForm.content,
				sendid: this.$cookie.get('userid'),
				receiveid: item.touserid,
				groupid: this.selectGroup.id,
				snedname: this.$cookie.get('name'),
				receivename: item.tousername,
				groupname: this.selectGroup.name,
				time: moment(new Date).format('YYYY-MM-DD hh:mm:ss')
			};
			this.$http.get("/social/addChat.do", { params: data }).then(response => {
				if (response.data.code == '20000') {
					if (index === this.membersList.length - 1) {
						this.$message({
							message: '发送成功！',
							type: 'success'
						});
						this.chatVisible = false;
					}
				} else {
					this.$message.error(response.data.message);
				}
			});
		},
		//打开回复消息
		openReply(result) {
			this.replyVisible = true;
			this.replyForm = {};
			this.selectChat = result;
		},
		//回复消息
		replyChat() {
			let data = {
				content: this.replyForm.content,
				sendid: this.$cookie.get('userid'),
				receiveid: this.selectChat.sendid,
				groupid: this.selectChat.groupid,
				snedname: this.$cookie.get('name'),
				receivename: this.selectChat.snedname,
				groupname: this.selectChat.groupname,
				time: moment(new Date).format('YYYY-MM-DD hh:mm:ss')
			};
			this.$http.get("/social/addChat.do", { params: data }).then(response => {
				if (response.data.code == '20000') {
					this.$message({
					  	message: '发送成功！',
					 	type: 'success'
					});
					this.replyVisible = false;
				} else {
					this.$message.error(response.data.message);
				}
			});
		},
	},
	mounted() {
		this.getUser();
		this.$bus.$on('updateUser', this.getUser);
		this.activeInfo = 'friend';
		this.handleClick(this.activeInfo);
	}
}