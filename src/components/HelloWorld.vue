<template>
  <div class="main-win">
    <el-collapse v-model="activeNames">
      <el-collapse-item title="校园风云人物" name="1">
        <div class="content-win">
          <div v-for="item in famousList" :key="item.userId">
            <img :src="item.userLogo"><br>
            <span>{{item.username}}</span>
            <span>{{item.reason}}</span>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item title="推荐好友" name="2">
        <div class="content-win">
          <div v-for="item in famousList" :key="item.userId">
            <img :src="item.userLogo"><br>
            <span>{{item.username}}</span>
            <span>{{item.reason}}</span>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item title="新鲜事" name="3">
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
	name: "mainPage",
	data() {
		return {
			famousList: [],
			reFriends: []
		};
	},
	methods: {
		//获取校园风云人物
		getFamousMan() {
			this.$http.get("../../index.html").then(response => {
				this.famousList = response.data.data;
			});
		},
		//获取推荐好友
		getRecommendFriend() {
			this.$http.get("../../index.html").then(response => {
				this.reFriends = response.data.data;
			});
		}
	}
}
</script>
<style lang='scss' scoped>
ul, li, p, h4, td {
  margin: 0;
  padding: 0;
  list-style-type: none;    
}

.content-win {
  width: 100%;
  height: 200px;
  overflow-y: auto;
}
</style>
