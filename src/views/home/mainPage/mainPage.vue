<template>
  <div class="main-win">
    <div class="content-win" style="height:400px;">
      <add-News></add-News>
    </div>
    <el-collapse v-model="activeNames">
      <!-- <el-collapse-item name="1">
        <template slot="title">
          <div class="collapse-title">校园风云人物</div>
        </template>
        <div class="content-win">

          <div class="content-user">
            <img src="/../../../../static/userLogo.JPEG"><br>
            <span>王思聪</span><br>
            <span>有钱的喷子</span><br>
            <el-button type="text" @click="addFriend(item)">添加好友</el-button>
          </div>
          <div class="content-user">
            <img src="/../../../../static/userLogo.JPEG"><br>
            <span>雷军</span><br>
            <span>英语学霸</span><br>
            <el-button type="text" @click="addFriend(item)">添加好友</el-button>
          </div>

          <div class="content-user" v-for="item in famousList" :key="item.userId">
            <img :src="item.userLogo"><br>
            <span>{{item.username}}</span>
            <span>{{item.reason}}</span>
          </div>
        </div>
      </el-collapse-item> -->
      <el-collapse-item name="2">
        <template slot="title">
          <div class="collapse-title">推荐好友</div>
        </template>
        <div class="content-win" style="height:234px;">
          <el-form :model="reFriendForm">
            <el-form-item>
              <el-select v-model="reFriendForm.type" placeholder="请选择" @change="getRecommendFriend">
                <el-option label="相同学校" value="相同学校"></el-option>
                <el-option label="相同专业" value="相同专业"></el-option>
                <el-option label="相同地区" value="相同地区"></el-option>
              </el-select>
              <!-- <el-button type="primary" @click="getRecommendFriend">查询</el-button> -->
            </el-form-item>
          </el-form>
          <div class="content-user" v-for="item in reFriends" :key="item.id">
            <img :src="item.img"><br>
            <span>{{item.name}}</span><br>
            <el-button type="text" @click="addFriend(item)">添加好友</el-button>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item name="3" v-loading="loading3">
        <template slot="title">
          <div class="collapse-title">新鲜事</div>
        </template>
        <ul>
          <!-- <li>
            <img class="newsUserLogo" src="/../../../../static/test.jpg">
            <div class="newsRight">
              <h4>马化腾
                <el-button style="float:right;" type="text" @click="openAnswers(1, 1)">添加评论</el-button>
              </h4>
              <p>再充5万，打不赢你来找我</p>
              <img class="newsImg" src="/../../../../static/kaka.jpg" @click="openImage('/../../../../static/userLogo.JPEG')">
              <br>
              <strong>评论：</strong>
              <ul>
                <li>
                  <span>马云：</span>
                  <span>王者荣耀这样的游戏应该被限制</span>
                </li>
              </ul>
            </div>
          </li> -->

          <li v-for="(item, index) in newsList" :key="item.id">
            <img class="newsUserLogo" :src="item.userlogo">
            <div class="newsRight">
              <h4>{{item.username}}
                <el-button style="float:right;" type="primary" round @click="openAnswers(item, index)">添加评论</el-button>
              </h4>
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
      </el-collapse-item>
    </el-collapse>

    <el-dialog title="添加评论" :visible.sync="addAnswerVisible">
			<el-form :model="answerForm">
        <el-form-item>
          <el-input v-model="answerForm.content"></el-input>
        </el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="addAnswerVisible = false">取 消</el-button>
				<el-button type="primary" @click="addAnswer">确 定</el-button>
			</div>
		</el-dialog>

    <el-dialog :visible.sync="previewVisible" size="tiny">
      <img width="100%" :src="previewImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script src="./mainPage.js"></script>
<style lang='scss' scoped>
ul, li, p, h4, td {
  margin: 0;
  padding: 0;
  list-style-type: none;
  line-height: 30px;
}

.content-win {
  width: 100%;
  height: 200px;
  overflow-y: auto;
  .content-user {
    width: 150px;
    height: auto;
    float: left;
    text-align: center;
    img {
      width: 110px;
      height: 110px;
    }
    button {
      height: 30px;
    }
  }
}

.collapse-title {
    background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
    width: 100%;
    height: 90%;
    color: #fff;
    padding-left: 20px;
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
</style>
