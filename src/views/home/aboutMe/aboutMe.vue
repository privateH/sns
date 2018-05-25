<template>
  <div class="main-win">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <!-- <el-tab-pane label="与我相关" name="first">
        <div class="content-container">
          <ul>
            <li>
              <span>李狗蛋评论：测试数据测试数据测试数据测试数据测试数据测试数据测试数据测试数据</span>
              <el-button style="float:right;" type="text">查看详情</el-button>
            </li>
            <li v-for="item in aboutList" :key="item.id">
              <span>{{item.remark}}</span>
              <el-button style="float:right;" type="text" @click="getNewsDetail(item)">查看详情</el-button>
            </li>
          </ul>
        </div>
      </el-tab-pane> -->
      <el-tab-pane label="好友请求" name="second">
        <div class="content-container">
          <ul>
            <!-- <li>
              <span>private（徐杨航&nbsp;&nbsp;&nbsp;重庆邮电大学）&nbsp;&nbsp;&nbsp;&nbsp;请求添加您为好友</span>
              <el-button style="float:right;" type="text" @click="getNewsDetail(item)">查看详情</el-button>
            </li> -->
            <li v-for="item in friendQuest" :key="item.id">
              <span>{{item.username}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;请求添加您为好友</span>
              <!-- <el-button style="float:right;" type="primary" round @click="addFriend(item)">同意</el-button>
              <el-button style="float:right;" type="warning" round @click="deleteFriend(item)">拒绝</el-button> -->
              <el-button style="float:right;" type="danger" icon="el-icon-close" circle @click="deleteFriend(item)"></el-button>
              <el-button style="float:right;margin-right:20px;" type="success" icon="el-icon-check" circle @click="addFriend(item)"></el-button>
            </li>
          </ul>
        </div>
      </el-tab-pane>
    </el-tabs>

    <el-dialog title="与我相关的新鲜事详情" :visible.sync="detailVisible">
			
			<div slot="footer" class="dialog-footer">
				<el-button @click="detailVisible = false">关 闭</el-button>
			</div>
		</el-dialog>
  </div>
</template>

<script src="./aboutMe.js"></script>
<style lang='scss' scoped>
ul, li, p, h4, td {
  margin: 0;
  padding: 0;
  list-style-type: none;    
}
.content-container {
  height: 100%;
  overflow-y: auto;
  li {
    line-height: 45px;
    border-bottom: solid 1px #e6e6e6;
  }
}
</style>
