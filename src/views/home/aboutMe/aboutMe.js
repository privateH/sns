export default {
	name: "aboutMe",
	data() {
		return {
			activeName: '',
			aboutList: [],
			detailVisible: false,
			friendQuest: []
		};
	},
	methods: {
		//获取与我相关列表
		getAboutMe() {
			this.$http.get("../../index.html").then(response => {
				this.aboutList = response.data.data;
			});
		},
		//获取好友请求列表
		getFriendQuest() {
			let data = {
				touserid: this.$cookie.get('userid'),
				type: 1,
				status: 1
			};
			this.$http.get("/social/getContactByCodition.do", { params: data }).then(response => {
				this.friendQuest = response.data.data;
			});
		},
		//点击tab
		handleClick(tab, event) {
			if (tab.name === 'first') {
				this.getAboutMe();
			} else {
				this.getFriendQuest();
			}
		},
		//获取与我相关的新鲜事详情
		getNewsDetail(item) {
			let data = {
				id: item.id
			};
			this.$http.get('../../index.html').then(response => {
				if (response.data.code === '20000') {
					this.detailVisible = true;
					this.news = response.data.data;
				} else {
					this.$message.error(response.data.message);
				}
			});
		},
		//同意添加好友
		addFriend(item) {
			let data = {
				id: item.id,
				userid: item.userid,
				groupid: '',
				touserid: item.touserid,
				username: item.username,
				groupname: '',
				tousername: item.tousername,
				userlogo: item.userlogo,
				status: 2,
				type: 1
			};
			this.$http.get("/social/updateContact.do", { params: data }).then(response => {
				if (response.data.code == '20000') {
					this.$message({
					  	message: '已添加好友！',
					 	type: 'success'
					});
				} else {
					this.$message.error(response.data.message);
				}
			});
			let data1 = {
				userid: item.touserid,
				groupid: '',
				touserid: item.userid,
				username: item.tousername,
				groupname: '',
				tousername: item.username,
				userlogo: this.$cookie.get('userlogo'),
				status: 2,
				type: 1
			};
			this.$http.get("/social/addContact.do", { params: data1 }).then(response => {
				if (response.data.code == '20000') {
					this.getFriendQuest();
				} else {
					this.$message.error(response.data.message);
				}
			});
		},
		//拒绝添加好友-删除此条数据
		deleteFriend(item) {
			let data = {
				id: item.id
			};
			this.$http.get("/social/deleteContact.do", { params: data }).then(response => {
				if (response.data.code == '20000') {
					this.$message({
					  	message: '已拒绝好友请求！',
					 	type: 'success'
					});
					this.getFriendQuest();
				} else {
					this.$message.error(response.data.message);
				}
			});
		}
	},
	mounted() {
		this.activeName = 'second';
		this.handleClick(this.activeName);
	}
};