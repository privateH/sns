import moment from 'moment';
export default {
	name: "helpInfo",
	data() {
		return {
			activeName: '',
			lostList: [],
			jobsList: [],
			lostPublishVisible: false,
			lostForm: {},
			lostRules: {
				title: [{ required: true, message: '请输入联系方式' }],
				content: [{ required: true, message: '请输入说明' }],
				time: [{ required: true, message: '请选择时间' }],
				address: [{ required: true, message: '请输入地址' }]
			},
			submitImg: [],
			uploadImgList: [],
			jobsPublishVisible: false,
			jobsForm: {},
			previewImageUrl: '',
			previewVisible: false
		};
	},
	methods: {
		//获取失物招领
		getLostThing() {
			let data = {
				title: null,
				userid: '',
				type: 1
			}
			this.$http.get("/social/getIssueByCodition.do", {params: data}).then(response => {
				this.lostList = response.data.data;
				this.lostList.forEach(element => {
					element.images = element.img.split(',');
				});
			});
		},
		//获取兼职
		getJobs() {
			let data = {
				title: null,
				userid: '',
				type: 2
			}
			this.$http.get("/social/getIssueByCodition.do", {params: data}).then(response => {
				this.jobsList = response.data.data;
			});
		},
		//点击tab
		handleClick(tab, event) {
			if (tab.name === 'first') {
				this.getLostThing();
			} else {
				this.getJobs();
			}
		},
		//失物招领列表查看大图
		openImage(img) {
			this.previewImageUrl = img;
			this.previewVisible = true;
		},
		//打开发布失物招领
		openLostThing() {
			this.lostPublishVisible = true;
			this.lostForm = {};
		},
		//图片处理
		handlePictureCardPreview(file) {
			this.previewImageUrl = file.url;
			this.previewVisible = true;
		},
		handleUploadChange(file, fileList) {
			for (var i = 0; i < this.uploadImgList.length; i++) {
				if (file.response.data === this.submitImg[i]) {
					this.submitImg.slice(i, 1);
				}
			}
		},
		readBlobAsDataURL(blob, callback) {
			var a = new FileReader();
			a.onload = function(e) {
				callback(e.target.result);
			};
			a.readAsDataURL(blob);
		},
		handleUploadSuccess(response, file, fileList) {
			let self = this;
			self.submitImg.push(response.data);
			fileList.forEach(element => {
				self.readBlobAsDataURL(element.raw, function(dataURL) {
					self.uploadImgList.push(dataURL);
				});
			});
		},
		//点击发布失物招领
		addLostThing() {
			let data  = {
				userid: this.$cookie.get('userid'),
				username: this.$cookie.get('name'),
				title: this.lostForm.title,
				content: this.lostForm.content,
				time: moment(this.lostForm.time).format('YYYY-MM-DD hh:mm:ss'),
				img: this.submitImg.join(','),
				address: this.lostForm.address,
				type: 1
			};
			this.$http.get('/social/addIssue.do', {params:data}).then(response => {
				if (response.data.code == '20000') {
					this.$message({
					  	message: '发布成功！',
					 	type: 'success'
					});
					this.lostPublishVisible = false;
					this.getLostThing();
				} else {
					this.$message.error(response.data.message);
				}
			});
		},
		//打开发布兼职
		openJobs() {
			this.jobsPublishVisible = true;
			this.jobsForm = {};
		},
		//点击发布兼职
		addJobs() {
			let data  = {
				userid: this.$cookie.get('userid'),
				username: this.$cookie.get('name'),
				title: this.jobsForm.title,
				content: this.jobsForm.content,
				time: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
				img: '',
				address: this.jobsForm.address,
				type: 2
			};
			this.$http.get('/social/addIssue.do', {params: data}).then(response => {
				if (response.data.code == '20000') {
					this.$message({
					  	message: '发布成功！',
					 	type: 'success'
					});
					this.jobsPublishVisible = false;
					this.getJobs();
				} else {
					this.$message.error(response.data.message);
				}
			});
		}
	},
	mounted() {
		this.activeName = 'first';
		this.getLostThing();
	}
};