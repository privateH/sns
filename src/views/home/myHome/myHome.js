import addNews from '../../../components/addNews/addNews.vue';
export default {
	name: "myHome",
	components: {
		addNews
	},
	data() {
		return {
			userInfo: {},
			editUserVisible: false,
			userForm: {},
			imageUrl: null,
			rules: {
				username: [{ required: true, message: '请输入用户名' }],
				password: [{ required: true, message: '请输入密码' }],
				passAgain: [{ required: true, message: '请再次输入密码' }],
				name: [{ required: true, message: '请输入真实姓名' }],
				address: [{ required: true, message: '请输入地区' }],
				school: [{ required: true, message: '请输入学院' }],
				major: [{ required: true, message: '请输入专业' }],
				sex: [{ required: true, message: '请选择性别' }]
			},
			previewVisible: false,
			previewImageUrl: '',
			activeName: null,
			newsList: [],
			photoList: [],
			photoNameVisible: true,
			photoImgList: []
		};
	},
	methods: {
		//获取用户信息
		getUser() {
			let data = {
				id: this.$cookie.get('userid')
			};
			this.$http.get("/social/getUserById.do", { params: data }).then(response => {
				this.userInfo = response.data.data;
			});
		},
		//打开编辑用户
		openEditUser() {
			this.editUserVisible = true;
			this.userForm = {
				username: this.userInfo.username,
				password: this.userInfo.password,
				passAgain: this.userInfo.password,
				name: this.userInfo.name,
				address: this.userInfo.address,
				major: this.userInfo.major,
				sex: this.userInfo.sex,
			};
			this.imageUrl = this.userInfo.img;
		},
		//用户头像上传成功
		handleAvatarSuccess(response, file, fileList) {
			this.imageUrl = response.data.data;
		},
		//更新用户
		updateUser() {
			this.$refs.userForm.validate((valid) => {
				if (valid) {
					let data = {
						username: this.loginForm.username,
						password: this.loginForm.password,
						address: this.loginForm.address,
						school: this.loginForm.school,
						major: this.loginForm.major,
						sex: this.loginForm.sex,
						img: this.imageUrl,
						name: this.loginForm.name,
					};
					this.$http.get('/social/updateUser.do', { params: data }).then(response => {
						if (response.data.code == '20000') {
							this.$message({
								message: '修改成功！',
								type: 'success'
							});
							this.$bus.$emit("updateUser", null);
						} else {
							this.$message.error(response.data.message);
						}
					});
				}
			});
		},
		//查看大图
		openImage(img) {
			this.previewImageUrl = img;
			this.previewVisible = true;
		},
		//获取新鲜事
		getNews() {
			let data = {
				userid: this.$cookie.get('userid'),
				type: 1
			};
			this.$http.get("/social/getAlbumByCodition.do", {params: data}).then(response => {
				this.newsList = response.data.data;
				this.newsList.forEach((element, index) => {
					element.images = element.img.split(',');
					this.getAnswers(element, index);
				});
			});
		},
		//获取评论
		getAnswers(item, index) {
			let data = {
				albumid: item.id
			};
			this.$http.get("/social/getCommentByCodition.do", {params: data}).then(response => {
				this.newsList[index].answers = response.data.data;   
			});
		},
		//获取相册
		getPhotos() {
			let data = {
				userid: this.$cookie.get('userid'),
				type: 2
			};
			this.$http.get("/social/getAlbumByCodition.do", {params: data}).then(response => {
				this.photoList = response.data.data;
				this.photoList.forEach((element, index) => {
					element.images = element.img.split(',');
				});
			});
		},
		handleClick(tab, event) {
			if (tab.name === 'news') {
				this.getNews();
			} else {
				this.getPhotos();
			}
		},
		//点击相册列表，打开相册详情
		getImage(item) {
			this.photoImgList = item.images;
			this.photoNameVisible = false;
		}

	},
	mounted() {
		this.getUser();
		this.getNews();
		this.activeName = 'news';
		this.$bus.$on('addNews', this.getNews);
	}
};