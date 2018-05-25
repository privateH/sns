<template>
  <div class="userController">
    <el-row class="userInfo">
      <el-col :span="12">
        <img class="userLogo" :src="userInfo.img">
        <span class="userName">{{userInfo.name}}</span>&nbsp;&nbsp;
        <span class="logout" @click="logout">注销</span>
      </el-col>
      <el-col :span="4" style="cursor: pointer;padding-top:12px;">
        <i class="fa fa-user-o fa-lg" title="好友" @click="handleClick('friend')"></i>
      </el-col>
      <el-col :span="4" style="cursor: pointer;padding-top:12px;">
        <i class="fa fa-users fa-lg" title="群组" @click="handleClick('group')"></i>
      </el-col>
      <el-col :span="4" style="cursor: pointer;padding-top:12px;">
        <i class="fa fa-commenting-o fa-lg" title="聊天" @click="handleClick('chat')"></i><span style="color:red;" v-if="noRead>0">({{noRead}})</span>
      </el-col>
    </el-row>
    <div class="user-win">
      <div class="user-wapper" v-if="activeInfo=='friend'" v-loading="loading1">
        <h2>我的好友</h2>
        <div class="noData" v-if="!friendList[0]">暂无好友</div>
        <ul>
          <li v-for="item in friendList" :key="item.id">
            <img class="friendUserLogo" :src="item.userlogo">
            <h3>{{item.tousername}}
              <el-button style="float:right;" type="primary" plain @click="openChat(item, 'friend')">发送消息</el-button>
            </h3>
          </li>
        </ul>
      </div>
      <div class="user-wapper" v-if="activeInfo=='group'" v-loading="loading2">
        <h2>我的群组</h2>
        <div class="noData" v-if="!groupList[0]">暂无群组</div>
        <ul>
          <li v-for="item in groupList" :key="item.id">
            <h3>{{item.name}}<br>
              <el-button type="text" @click="openMembers(item)">添加成员</el-button>
              <el-button type="text" @click="openChat(item, 'group')">发送消息</el-button>
            </h3>
          </li>
        </ul>
      </div>
      <div class="user-wapper" v-if="activeInfo=='chat'" v-loading="loading3">
        <h2>我的消息</h2>
        <div class="noData" v-if="!chatList[0]">暂无消息</div>
        <ul>
          <li v-for="item in chatList" :key="item.id">
              <h4 v-if="!item.groupname">{{item.snedname}}：
                <el-button style="float:right;" type="text" @click="openReply(item)">回复消息</el-button>
              </h4>
              <h4 v-if="item.groupname">{{item.snedname}}&nbsp;&nbsp;来自群组&nbsp;&nbsp;{{item.groupname}}：
                <el-button style="float:right;" type="text" @click="openReply(item)">回复消息</el-button>
              </h4>
              <span>{{item.content}}</span>
          </li>
        </ul>
      </div>
      <el-button style="margin-left:50px;" type="primary" @click="openSearchFriend(item)">搜索并添加好友</el-button>&nbsp;&nbsp;&nbsp;&nbsp;
      <el-button type="primary" @click="openCreatGroup(item)">创建群组</el-button>
    </div>

    <el-dialog title="搜索并添加好友" :visible.sync="searchFriendVisible">
			<el-form :inline="true" :model="searchFriendForm" class="demo-form-inline">
        <el-form-item label="学校">
          <el-input v-model="searchFriendForm.school"></el-input>
        </el-form-item>
        <el-form-item label="专业">
          <el-input v-model="searchFriendForm.major"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getUserByCodition">搜索</el-button>
        </el-form-item>
			</el-form>
      <ul>
          <li v-for="item in userList" :key="item.id">
            <img class="friendUserLogo" :src="item.img">
            <div class="friendRight">
              <h4>{{item.name}}&nbsp;&nbsp;&nbsp;{{item.sex}}
                <el-button style="float:right;" type="text" @click="addFriend(item)">添加好友</el-button>
              </h4>
              <span>{{item.school}}&nbsp;&nbsp;&nbsp;{{item.major}}</span><br>
              <span>{{item.address}}</span>
            </div>
          </li>
      </ul>
			<div slot="footer" class="dialog-footer">
				<el-button @click="searchFriendVisible = false">取 消</el-button>
			</div>
		</el-dialog>

    <el-dialog title="创建群组" :visible.sync="creatVisible">
			<el-form :model="creatForm">
        <el-form-item label="群组名称">
          <el-input v-model="creatForm.name"></el-input>
        </el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="creatVisible = false">取 消</el-button>
				<el-button type="primary" @click="addGroup">创 建</el-button>
			</div>
		</el-dialog>

    <el-dialog title="添加群组成员" :visible.sync="membersVisible">
      <el-checkbox-group v-model="checkList">
        <el-checkbox v-for="item in friendList" :key="item" :label="item.tousername"></el-checkbox><br>
      </el-checkbox-group>
			<div slot="footer" class="dialog-footer">
				<el-button @click="membersVisible = false">取 消</el-button>
				<el-button type="primary" @click="groupMembers">添 加</el-button>
			</div>
		</el-dialog>

    <el-dialog title="发送消息" :visible.sync="chatVisible">
      <div v-if="chatType=='friend'">
        <el-form :model="chatForm">
          <el-form-item>
            <el-input type="textarea" :rows="3" placeholder="请输入消息内容" v-model="chatForm.content"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div style="width:100%;height:auto;" v-if="chatType=='group'">
        <div class="chatLeft">
          <ul>
            <li v-for="item in membersList" :key="item.touserid">{{item.tousername}}</li>
          </ul>
        </div>
        <div class="chatRight">
          <el-form :model="chatForm">
            <el-form-item>
              <el-input type="textarea" :rows="3" placeholder="请输入消息内容" v-model="chatForm.content"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
			<div slot="footer" class="dialog-footer">
				<el-button @click="chatVisible = false">关 闭</el-button>
				<el-button type="primary" @click="addChat">发 送</el-button>
			</div>
		</el-dialog>

    <el-dialog title="回复消息" :visible.sync="replyVisible">
			<el-form :model="replyForm">
        <el-form-item>
          <el-input type="textarea" :rows="3" placeholder="请输入消息内容" v-model="replyForm.content"></el-input>
        </el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="replyVisible = false">关 闭</el-button>
				<el-button type="primary" @click="replyChat">发 送</el-button>
			</div>
		</el-dialog>
  </div>
</template>

<script src="./userController.js"></script>
<style lang='scss' scoped>
ul, li, p, h4, td {
  margin: 0;
  padding: 0;
  list-style-type: none;
  line-height: 30px;
}
.userController {
  position: absolute;
  width: 350px;
  height: calc(100% - 20px);
  top: 15px;
  right: 0px;
  .userInfo {
    height: 45px;
    img {
      width: 40px;
      height: 40px;
    }
    .userName {
      position: relative;
      bottom: 7px;
    }
    .logout {
      color: red;
      cursor: pointer;
      position: relative;
      bottom: 7px;
    }
  }
  .user-win {
    width: 100%;
    height: calc(100% - 60px);
    .user-wapper {
      width: 100%;
      height: calc(100% - 50px);
      overflow-y: auto;
      h2 {
        border-bottom: solid 1px #e6e6e6;
      }
      h3 {
        height: 40px;
      }
      button {
        position: relative;
        top: -5px;
      }
    }
    li {
      height: 55px;
      border-bottom: solid 1px #e6e6e6;
    }
  }
  .friendUserLogo {
    width: 55px;
    height: 55px;
    float: left;
  }
  .friendRight {
    width: calc(100% - 65px);
    margin-left: 10px;
    float: left;
    border-bottom: solid 1px #e6e6e6;
  }
  .noData {
    position: relative;
    top: 100px;
    width: 100%;
    height: 30px;
    text-align: center;
  }
  .chatLeft {
    float: left;
    width: 100px;
    min-height: 150px;
  }
  .chatRight {
    float: left;
    width: calc(100% - 100px);
    min-height: 150px;
  }
}
</style>
