<template>
  <div style="width:100%;height:100%;">
    <div class="content-win">
      <img :src="userInfo.img">
      <div class="userRight">
        <span>{{userInfo.username}}</span><br>
        <span>{{userInfo.name}}&nbsp;&nbsp;&nbsp;{{userInfo.sex}}</span><br>
        <span>{{userInfo.address}}</span><br>
        <span>{{userInfo.school}}</span><br>
        <span>{{userInfo.major}}</span><br>
        <el-button style="margin-top:7px;" type="primary" plain @click="openEditUser">编辑资料</el-button>
      </div>

      <!-- <img src="/../../../../static/kaka.jpg">
      <div class="userRight">
        <span>privatexyh</span><br>
        <span>徐杨航&nbsp;&nbsp;&nbsp;男</span><br>
        <span>重庆渝北</span><br>
        <span>蓝翔职业技术学校</span><br>
        <span>挖掘机</span><br>
        <el-button type="text" @click="openEditUser">编辑资料</el-button>
      </div> -->
    </div>
    <div class="content-win" style="height:385px;">
      <add-News></add-News>
    </div>
    <div class="news-win" style="height:auto;min-height:200px;">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="我的新鲜事" name="news">
          <ul>
            <li v-for="item in newsList" :key="item.id">
              <img class="newsUserLogo" :src="item.userlogo">
              <div class="newsRight">
                <h4>{{item.username}}</h4>
                <p>{{item.title}}</p>
                <img class="newsImg" v-for="image in item.images" :key="image" :src="image" @click="openImage(image)">
                <br>
                <strong>评论：</strong>
                <ul style="margin-bottom:20px;">
                  <li v-for="an in item.answers" :key="an.id">
                    <span>{{an.username}}：</span>
                    <span>{{an.content}}</span>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </el-tab-pane>
        <el-tab-pane label="我的相册" name="photos">
          <div v-show="photoNameVisible" style="width:100%;height:auto;">
            <div class="photoItem" v-for="ph in photoList" :key="ph.id">
              <img class="firstImg" :src="ph.images[0]" @click="getImage(ph)">
              <span>{{ph.title}}</span>
            </div>
          </div>
          <div v-show="!photoNameVisible" style="width:100%;height:auto;">
            <el-button type="primary" @click="photoNameVisible=true">返回相册列表</el-button>
            <br>
            <br>
            <img class="photoImg" v-for="image in photoImgList" :key="image" :src="image"  @click="openImage(image)">
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <el-dialog title="编辑用户资料" :visible.sync="editUserVisible">
			<el-form ref="userForm" :inline="true" :model="userForm" :rules="rules" label-width="100px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="userForm.password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="passAgain">
          <el-input type="password" v-model="userForm.passAgain"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" prop="name">
          <el-input v-model="userForm.name"></el-input>
        </el-form-item>
        <el-form-item label="地区" prop="address">
          <el-input v-model="userForm.address"></el-input>
        </el-form-item>
        <el-form-item label="专业" prop="major">
          <el-input v-model="userForm.major"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio v-model="userForm.sex" label="男">男</el-radio>
          <el-radio v-model="userForm.sex" label="女">女</el-radio>
        </el-form-item>
        <el-form-item label="头像">
          <el-upload class="avatar-uploader" action="/social/upload.do" accept="image/*" :auto-upload="true" :show-file-list="false" :on-success="handleAvatarSuccess">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="editUserVisible = false">取 消</el-button>
				<el-button type="primary" @click="updateUser">确 定</el-button>
			</div>
		</el-dialog>

    <el-dialog :visible.sync="previewVisible" size="tiny">
      <img width="100%" :src="previewImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script src="./myHome.js"></script>
<style lang='scss' scoped>
ul, li, p, h4, td {
  margin: 0;
  padding: 0;
  list-style-type: none;
  line-height: 30px;
}
.content-win {
  width: 100%;
  height: 170px;
  overflow-y: auto;
  border-bottom: solid 1px #e6e6e6;
  img {
    height: 150px;
    width: 150px;
    float: left;
  }
  .userRight {
    width: calc(100% - 170px);
    margin-left: 20px;
    float: left;
  }
}
.news-win {
  width: 100%;
  height: 170px;
  overflow-y: auto;
  border-bottom: solid 1px #e6e6e6;
  .photoItem {
    width: 120px;
    height: 150px;
    float: left;
    margin-right: 20px;
    cursor: pointer;
    text-align: center;
  }
  .firstImg {
    width: 120px;
    height: 120px;
  }
  .photoImg {
    width: 120px;
    height: 120px;
    float: left;
    margin-right: 20px;
    cursor: pointer;
  }
}
.newsUserLogo {
  width: 80px;
  height: 75px;
  float: left;
}
.newsRight {
  width: calc(100% - 120px);
  margin-left: 20px;
  float: left;
  h4 {
    font-size: 20px;
  }
  .newsImg {
    width: 120px;
    height: 120px;
    cursor: pointer;
    margin-right: 20px;
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
