<template>
  <div style="width:100%;height:100%;">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="发新鲜事" name="news">
        <el-form :model="newsForm" label-width="100px">
          <el-form-item label="内容">
            <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="newsForm.title"></el-input>
          </el-form-item>
          <el-form-item label="上传图片">
            <el-upload action="/social/uploadMore.do" accept="image/*" multiple :auto-upload="true" list-type="picture-card" :on-preview="handlePictureCardPreview"
              :on-remove="handleUploadChange" :on-success="handleUploadSuccess">
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addNew">提 交</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="传相册" name="photos">
        <el-form :model="photoForm" label-width="100px">
          <el-form-item label="相册名字">
            <el-input v-model="photoForm.title"></el-input>
          </el-form-item>
          <el-form-item label="上传照片">
            <el-upload action="/social/uploadMore.do" accept="image/*" multiple :auto-upload="true" list-type="picture-card" :on-preview="handlePictureCardPreview"
              :on-remove="handleUploadChange" :on-success="handleUploadSuccess">
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addPhoto">提 交</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script src="./addNews.js"></script>
<style lang='scss' scoped>

</style>
