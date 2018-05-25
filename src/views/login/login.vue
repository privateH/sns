<template>
  <div class="login">
    <div class="login-win">
      <div class="login-title">用&nbsp;户&nbsp;登&nbsp;录</div>
      <el-form class="login-form" ref="loginForm" :model="loginForm" :rules="rules" label-width="100px" size="medium">
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="loginForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item style="margin-top:65px;">
          <el-button style="width:115px;margin-left:30px;" @click="register()">注册</el-button>
          <el-button style="margin-left:43px;width:115px" type="primary" @click="login()">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      loginForm: {},
      rules: {
        userName: [{ required: true, message: '请输入用户名' }],
        password: [{ required: true, message: '请输入密码' }]
      }
    }
  },
  methods: {
    login() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          let data = {
            username: this.loginForm.userName,
            password: this.loginForm.password
          };
          this.$http.get('/social/login.do', {params:data}).then(response => {
            // this.$router.push({path:'/home'});
            if (response.data.code === '20000') {
              // this.$cookie.set('username', 'xyh');
              // this.$cookie.set('name', '徐杨航');
              // this.$cookie.set('userid', '123');
              this.$cookie.set('username', response.data.data.username);
              this.$cookie.set('name', response.data.data.name);
              this.$cookie.set('userid', response.data.data.id);
              this.$cookie.set('userlogo', response.data.data.img);
              this.$cookie.set('school', response.data.data.school);
              this.$cookie.set('major', response.data.data.major);
              this.$cookie.set('address', response.data.data.address);
              this.$router.push({path:'/home'});
            } else {
              this.$message.error(response.data.message);
            }
            
          });
        }
      });
    },
    register() {
      this.$router.push({path:'/register'});
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  background-image: url(../../assets/login/login-bg.jpg);
  background-size: 100% 100%;
  .login-win {
    position: absolute;
    width: 530px;
    height: 380px;
    top: calc(50% - 220px);
    left: calc(50% - 265px);
    background-color: #fff;
    border-radius: 5px;
    box-shadow:0 0 10px #0CC;
    .login-title {
      width: 100%;
      height: 50px;
      background-color: #23D992;
      text-align: center;
      font-size: 25px;
      color: #f7f7f7;
      padding-top: 8px;
      font-weight: bolder;
    }
    .login-form {
      width: 90%;
      height: calc(100% - 70px);
      margin-top: 40px;
    }
  }
}
</style>
