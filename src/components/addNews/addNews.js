import moment from 'moment';
export default {
	name: 'addNews',
	data() {
		return {
			activeName: '',
			newsForm: {},
			photoForm: {},
			submitImg: [],
			uploadImgList: [],
			previewImageUrl: '',
			previewVisible: false
		}
	},
	methods: {
		handleClick(tab, event) {
			this.submitImg = [];
			this.uploadImgList = [];
			if (tab.name === 'news') {
				this.newsForm = {};
			} else {
				this.photoForm = {};
			}
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
		//发布新鲜事
		addNew() {
			let data = {
				userid: this.$cookie.get('userid'),
				username: this.$cookie.get('name'),
				userlogo: this.$cookie.get('userlogo'),
				content: null,
				title: this.newsForm.title,
				img: this.submitImg.join(','),
				time: moment().format('YYYY-MM-DD hh:mm:ss'),
				type: 1
			};
			this.$http.get('/social/addAlbum.do', {params:data}).then(response => {
				if (response.data.code == '20000') {
					this.$message({
					  	message: '发布成功！',
					 	type: 'success'
					});
					this.newsForm = {};
					this.uploadImgList = [];
					this.submitImg = []
					this.$bus.$emit("addNews", null);
				} else {
					this.$message.error(response.data.message);
				}
			});
		},
		//上传相册
		addPhoto() {
			let data = {
				userid: this.$cookie.get('userid'),
				title: this.photoForm.title,
				img: this.submitImg.join(','),
				time: moment().format('YYYY-MM-DD hh:mm:ss'),
				type: 2
			};
			this.$http.get('/social/addAlbum.do', {params:data}).then(response => {
				if (response.data.code == '20000') {
					this.$message({
					  	message: '发布成功！',
					 	type: 'success'
					});
					this.photoForm = {};
					this.uploadImgList = [];
					this.submitImg = []
				} else {
					this.$message.error(response.data.message);
				}
			});
		}
	},
	mounted() {
		this.activeName = 'news';
	}
}