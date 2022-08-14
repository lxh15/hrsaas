<template>
  <div class="dashboard-container">
    <div class="app-container">
      <UploadExcel
        :beforeUpload="beforUpload"
        :onSuccess="onSuccess"
      ></UploadExcel>
    </div>
  </div>
</template>

<script>
import employees from '@/constant/employees'
// 导入员工路径映射表
const { importMapKeyPath } = employees
//
import { improtEmployee } from '@/api/employess'

import { formatTime } from '@/filters'
export default {
  name: 'importsModule',
  data() {
    return {}
  },

  created() {},

  methods: {
    // 上传前
    beforUpload(file) {
      console.log(file)
      console.log(file.name)
      // 看看文件的name是不是表格格式 .xlsx
      if (!file.name.endsWith('.xlsx')) {
        this.$message.error('请选择xlsx文件')
        return false
      }
      // 记得return true
      return true
    },
    // 解析成功时解构 header时表头 results每一个人的信息集合
    async onSuccess({ header, results }) {
      // console.log(header)
      // console.log(results)
      const newArr = results.map((item) => {
        const obj = {}
        for (let key in importMapKeyPath) {
          // 把excl的时间转换为js的时间
          if (key === '入职日期' || key === '转正日期') {
            const time = item[key]
            const date = new Date((time - 1) * 24 * 60 * 60 * 1000)
            date.setFullYear(date.getFullYear() - 70)
            obj[importMapKeyPath[key]] = formatTime(date)
          } else {
            obj[importMapKeyPath[key]] = item[key]
          }
        }

        return obj
      })
      console.log(newArr)
      await improtEmployee(newArr)
      this.$message.success('导入成功')
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped></style>
