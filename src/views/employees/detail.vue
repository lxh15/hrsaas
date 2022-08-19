<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs v-model="activeName" @tab-click="handleTableClick">
          <el-tab-pane name="account" label="登录账户设置">
            <!-- 放置表单 -->
            <el-form
              label-width="120px"
              style="margin-left: 120px; margin-top: 30px"
            >
              <el-form-item label="姓名:">
                <el-input v-model="formData.username" style="width: 300px" />
              </el-form-item>
              <el-form-item label="密码:">
                <el-input
                  v-model="formData.password"
                  style="width: 300px"
                  type="password"
                />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="getUserDetailById"
                  >更新</el-button
                >
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane name="user" label="个人详情">
            <UserInfo />
          </el-tab-pane>
          <el-tab-pane name="station" label="岗位信息">
            <jobInfo />
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getUserDetail, getUserDetailById } from '@/api/user'
import UserInfo from './component/user-info.vue'
import jobInfo from './component/job-info.vue'
import Cookies from 'js-cookie'
export default {
  data() {
    return {
      formData: {},
      activeName: Cookies.get('handleTableName') || 'account'
    }
  },
  components: {
    UserInfo,
    jobInfo
  },

  created() {
    this.loadUserDetail()
  },

  methods: {
    async loadUserDetail() {
      const res = await getUserDetail(this.$route.params.id)
      this.formData = res
      console.log(this.formData)
    },
    async getUserDetailById() {
      const res = await getUserDetailById(this.formData)
      this.$message.success('更改完成')
    },
    handleTableClick() {
      Cookies.set('handleTableName', this.activeName)
    }
  }
}
</script>

<style scoped></style>
