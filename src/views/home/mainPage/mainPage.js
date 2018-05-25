import addNews from '../../../components/addNews/addNews.vue';
import moment from 'moment';
export default {
	name: "mainPage",
	components: {
		addNews
	},
	data() {
		return {
			activeNames: ['1', '2', '3'],
			famousList: [],
			reFriendForm: {
				type: '相同学校'
			},
			reFriends: [],
			newsList: [],
			loading3: false,
			previewImageUrl: '',
			previewVisible: false,
			selectNew: {},
			newIndex: null,
			addAnswerVisible: false,
			answerForm: {}
		};
	},
	methods: {
		//获取校园风云人物
		getFamousMan() {
			this.$http.get("../../index.html").then(response => {
				this.famousList = response.data.data;
			});
		},
		//获取推荐好友
		getRecommendFriend() {
			let data = {
				username: '',
				major: '',
				school: '',
				address: ''
			}
			if (this.reFriendForm.type === '相同学校') {
				data.school = this.$cookie.get('school');
			} else if (this.reFriendForm.type === '相同专业') {
				data.major = this.$cookie.get('major');
			} else if (this.reFriendForm.type === '相同地区') {
				data.address = this.$cookie.get('address');
			}
			this.$http.get("/social/getUserByCodition.do", { params: data }).then(response => {
				this.reFriends = response.data.data;
			});
		},
		//获取新鲜事
		getNews() {
			this.loading3 = true;
			let data = {
				userid: null,
				type: 1
			};
			this.$http.get("/social/getAlbumByCodition.do", {params: data}).then(response => {
				let test = response.data.data;
				test.forEach((element, index) => {
					element.images = element.img.split(',');
					this.getAnswers(element, index, test);
				});
			});
		},
		//获取评论
		getAnswers(item, index, test) {
			let data = {
				albumid: item.id
			};
			this.$http.get("/social/getCommentByCodition.do", {params: data}).then(response => {
				test[index].answers = response.data.data;
				if (index === test.length - 1) {
					this.newsList = test;
					this.loading3 = false;
				}
			});
		},
		//发送好友请求
		addFriend(item) {
			let data = {
				userid: this.$cookie.get('userid'),
				groupid: '',
				touserid: item.id,
				username: this.$cookie.get('username'),
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
		//查看大图
		openImage(img) {
			this.previewImageUrl = img;
			this.previewVisible = true;
		},
		//打开添加评论
		openAnswers(item, index) {
			this.selectNew = item;
			this.newIndex = index;
			this.addAnswerVisible = true;
			this.answerForm = {};
		},
		//添加评论
		addAnswer() {
			let data = {
				albumid: this.selectNew.id,
				content: this.answerForm.content,
				userid: this.$cookie.get('userid'),
				username: this.$cookie.get('name'),
				time: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),

			};
			this.$http.get('/social/addComment.do', {params: data}).then(response => {
				if (response.data.code == '20000') {
					this.$message({
					  	message: '添加成功！',
					 	type: 'success'
					});
					this.addAnswerVisible = false;
					this.newsList[this.newIndex].answers.push({
						username: this.$cookie.get('name'),
						content: this.answerForm.content
					});
				} else {
					this.$message.error(response.data.message);
				}
			});
		}
	},
	mounted() {
		this.getFamousMan();
		this.getRecommendFriend();
		this.getNews();
		this.$bus.$on('addNews', this.getNews);
	}
};