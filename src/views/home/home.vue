<template>
  <div style="width:100%;height:100%;">
    <el-container style="height:100%">
      <el-header height="60px">
        <h1>校园网</h1>
        <user-controller></user-controller>
      </el-header>
      <el-container class="main-Container">
        <el-aside width="200px">
          <el-menu default-active="/home/mainPage" class="el-menu-vertical-demo" :router="true">
            <el-menu-item index="/home/mainPage">首页</el-menu-item>
            <el-menu-item index="/home/aboutMe">与我相关</el-menu-item>
            <el-menu-item index="/home/myHome">我的首页</el-menu-item>
            <el-menu-item index="/home/helpInfo">校园帮助</el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import userController from '../../components/userController/userController.vue';
export default {
  name: 'home',
  components: {
    userController
  }
}
</script>
<style lang='scss' scoped>
.el-header {
  // background-image: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);
  background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);
  h1 {
    color: #fff;
    margin-left: 50px;
  }
}
.main-Container {
  height: calc(100% - 60px);
  width: calc(100% - 350px);
  border-right: solid 1px #e6e6e6;
}
.el-aside {
  border-right: solid 1px #e6e6e6;
  ul {
    border: none;
  }
}
</style>
