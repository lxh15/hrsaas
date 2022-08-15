<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-upload
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        :file-list="fileList"
        :on-change="onChange"
        :on-remove="onRemove"
        :on-preview="onPreview"
        :before-upload="beforeUpload"
        action="#"
        :limit="1"
        list-type="picture-card"
        :http-request="onRequest"
        class="UploadImg"
        :class="fileList.length ? 'hide' : ''"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="imageShow">
        <img :src="imgUrl" alt="" />
      </el-dialog>
    </div>
  </div>
</template>

<script>
// id:  AKIDa0A4i5B0Yx6yZtwiEUUCdngIcfRv84i6
// key: A4h38vRgfNoyrTord8cplQovkJbbKma6

import COS from 'cos-js-sdk-v5'
// SECRETID 和 SECRETKEY请登录 https://console.cloud.tencent.com/cam/capi 进行查看和管理
var cos = new COS({
  SecretId: 'AKIDa0A4i5B0Yx6yZtwiEUUCdngIcfRv84i6',
  SecretKey: 'A4h38vRgfNoyrTord8cplQovkJbbKma6'
})
console.log(cos)
export default {
  name: 'UploadImg',
  data() {
    return {
      fileList: [],
      imageShow: false,
      imgUrl: '',
      loading: false
    }
  },

  created() {},

  methods: {
    onRequest({ file }) {
      this.loading = true
      console.log('自行上传')
      cos.putObject(
        {
          Bucket: 'hmhr-lxh-1313341734' /* 必须 */,
          Region: 'ap-shanghai' /* 存储桶所在地域，必须字段 */,
          Key: file.name /* 必须 */,
          StorageClass: 'STANDARD',
          Body: file, // 上传文件对象
          onProgress: function (progressData) {
            console.log(JSON.stringify(progressData))
          }
        },
        (err, data) => {
          this.loading = false
          //   console.log(err || data)
          if (err || data.statusCode !== 200) {
            return this.$message.error('上传失败，请重试')
          }
          this.$emit('onSuccess', {
            url: 'https://' + data.Location
          })
        }
      )
    },
    // 文件状态改变时的
    onChange(file, fileList) {
      console.log('上传了图片')
      this.fileList = fileList
    },
    onRemove(file, fileList) {
      this.fileList = fileList
    },
    // 点击文件列表中已上传的文件时
    onPreview(file) {
      this.imageShow = true
      this.imgUrl = file.url
    },
    beforeUpload(file) {
      //   限制上传图片格式
      console.log(file)

      const types = ['image/jpeg', 'image/png', 'image/gif']
      if (!types.includes(file.type)) {
        this.$message.error('请选择' + types.join('、') + '格式的图片')
        return false
      }
      //   限制上传图片大小
      const maxSize = 2 * 1024 * 1024
      if (file.size > maxSize) {
        this.$message.error('上传的图片不能大于2MB')
        return false
      }
    }
  }
}
</script>

<style>
.hide .el-upload--picture-card {
  display: none;
}
.UploadImg {
  width: 150px;
  height: 150px;
  overflow: hidden;
}
</style>
