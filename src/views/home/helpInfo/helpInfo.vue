<template>
  <div class="main-win">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="失物招领" name="first">
        <div class="content-container">
          <el-button style="margin:10px 0 10px 15px;" type="primary" @click="openLostThing">发 布</el-button>
          <ul>
            <li v-for="item in lostList" :key="item.id">
              <p>{{item.content}}</p>
              <p>联系方式：{{item.title}}&nbsp;&nbsp;&nbsp;&nbsp;地址：{{item.address}}</p>
              <img v-for="img in item.images" :key="img" :src="img" @click="openImage(img)">
            </li>
          </ul>
        </div>
      </el-tab-pane>
      <el-tab-pane label="兼职" name="second">
        <div class="content-container">
          <el-button style="margin:10px 0 10px 15px;" type="primary" @click="openJobs">发 布</el-button>
          <ul>
            <li v-for="item in jobsList" :key="item.id">
              <p>{{item.content}}</p>
              <p>联系方式：{{item.title}}&nbsp;&nbsp;&nbsp;&nbsp;单位：{{item.address}}</p>
            </li>
          </ul>
        </div>
      </el-tab-pane>
    </el-tabs>

    <el-dialog title="发布失物招领" :visible.sync="lostPublishVisible">
			<el-form ref="lostForm" :model="lostForm" :rules="lostRules" label-width="100px">
				<el-form-item label="说明" prop="content">
					<el-input type="textarea" :rows="3" placeholder="请输入说明" v-model="lostForm.content"></el-input>
				</el-form-item>
        <el-form-item label="时间" prop="time">
          <el-date-picker v-model="lostForm.time" type="date" placeholder="请选择时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="联系方式" prop="title">
					<el-input placeholder="请输入联系方式" v-model="lostForm.title"></el-input>
				</el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input placeholder="请输入地址" v-model="lostForm.address"></el-input>
        </el-form-item>
        <el-form-item label="上传图片">
          <el-upload action="/social/uploadMore.do" accept="image/*" multiple :auto-upload="true" list-type="picture-card" :on-preview="handlePictureCardPreview"
            :on-remove="handleUploadChange" :on-success="handleUploadSuccess">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="lostPublishVisible = false">取 消</el-button>
				<el-button type="primary" @click="addLostThing">确 定</el-button>
			</div>
		</el-dialog>

    <el-dialog title="发布兼职" :visible.sync="jobsPublishVisible">
			<el-form :model="jobsForm" label-width="100px">
				<el-form-item label="说明">
					<el-input type="textarea" :rows="3" placeholder="请输入说明" v-model="jobsForm.content"></el-input>
				</el-form-item>
        <el-form-item label="单位">
          <el-input v-model="jobsForm.address"></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="jobsForm.title"></el-input>
        </el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="jobsPublishVisible = false">取 消</el-button>
				<el-button type="primary" @click="addJobs">确 定</el-button>
			</div>
		</el-dialog>

    <el-dialog :visible.sync="previewVisible" size="tiny">
      <img width="100%" :src="previewImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script src="./helpInfo.js"></script>
<style lang='scss' scoped>
ul, li, p, h4, td {
  margin: 0;
  padding: 0;
  list-style-type: none;    
}
.content-container {
  height: 100%;
  overflow-y: auto;
  ul {
    border-top: solid 1px #e6e6e6;
  }
  li {
    line-height: 45px;
    border-bottom: solid 1px #e6e6e6;
  }
  img {
    width: 120px;
    height: 120px;
    margin-right: 20px;
  }
}
</style>
