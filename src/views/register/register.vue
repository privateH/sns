<template>
  <div class="register">
    <div class="register-win">
      <div class="register-title">用&nbsp;户&nbsp;注&nbsp;册</div>
      <el-form class="register-form" :inline="true" ref="registerForm" :model="registerForm" :rules="rules" label-width="100px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="registerForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="registerForm.password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="passAgain">
          <el-input type="password" v-model="registerForm.passAgain"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" prop="name">
          <el-input v-model="registerForm.name"></el-input>
        </el-form-item>
        <el-form-item label="地区" prop="address">
          <el-input v-model="registerForm.address"></el-input>
        </el-form-item>
        <el-form-item label="学校" prop="school">
          <el-input v-model="registerForm.school"></el-input>
        </el-form-item>
        <el-form-item label="专业" prop="major">
          <el-input v-model="registerForm.major"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio v-model="registerForm.sex" label="男">男</el-radio>
          <el-radio v-model="registerForm.sex" label="女">女</el-radio>
        </el-form-item>
        <el-form-item label="头像">
          <el-upload class="avatar-uploader" :action="uploadAction" accept="image/*" :auto-upload="true" :show-file-list="false" :on-success="handleAvatarSuccess">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <el-button style="width:115px;margin-left:225px;" type="primary" @click="register()">注册</el-button>
      <el-button style="margin-left:43px;width:115px" @click="login()">去登录</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'register',
  data () {
    return {
      registerForm: {},
      rules: {
        username: [{ required: true, message: '请输入用户名' }],
        password: [{ required: true, message: '请输入密码' }],
        passAgain: [{ required: true, message: '请再次输入密码' }],
        name: [{ required: true, message: '请输入真实姓名' }],
        address: [{ required: true, message: '请输入地区' }],
        school: [{ required: true, message: '请输入学校' }],
        major: [{ required: true, message: '请输入专业' }],
        sex: [{ required: true, message: '请选择性别' }]
      },
      uploadAction: '/social/upload.do',
      imageUrl: null
    }
  },
  methods: {
    handleAvatarSuccess(response, file, fileList) {
      this.imageUrl = response.data;
    },
    register() {
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          if (this.registerForm.password !== this.registerForm.passAgain) {
            this.$message({
                message: '密码不一致！',
                type: 'warning'
            });
            return;
          }
          let data = {
            username: this.registerForm.username,
            password: this.registerForm.password,
            address: this.registerForm.address,
            school: this.registerForm.school,
            major: this.registerForm.major,
            sex: this.registerForm.sex,
            img: this.imageUrl,
            name: this.registerForm.name,
          };
          this.$http.get('/social/addUser.do', {params:data}).then(response => {
            if (response.data.code == '20000') {
              this.$message({
                message: '注册成功！',
                type: 'success'
              });
            } else {
              this.$message.error(response.data.message);
            }
          });
        }
      });
    },
    login() {
      this.$router.push({path:'/login'});
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.register {
  width: 100%;
  height: 100%;
  background-image: url(../../assets/login/login-bg.jpg);
  background-size: 100% 100%;
  .register-win {
    position: absolute;
    width: 700px;
    height: 520px;
    top: calc(50% - 340px);
    left: calc(50% - 350px);
    background-color: #fff;
    border-radius: 5px;
    box-shadow:0 0 10px #0CC;
    .register-title {
      width: 100%;
      height: 50px;
      background-color: #23D992;
      text-align: center;
      font-size: 25px;
      color: #f7f7f7;
      padding-top: 8px;
      font-weight: bolder;
    }
    .register-form {
      width: 90%;
      height: calc(100% - 130px);
      margin-top: 10px;
    }
  }
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
</style>
