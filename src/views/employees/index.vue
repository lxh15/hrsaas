<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools :isShowLeft="true">
        <span slot="left-tag">共166条记录</span>
        <template slot="right">
          <el-button
            size="small"
            type="warning"
            @click="$router.push('/importsModule')"
            >导入</el-button
          >
          <el-button size="small" type="danger">导出</el-button>
          <el-button size="small" type="primary" @click="showAdd"
            >新增员工</el-button
          >
        </template>
      </page-tools>
      <!-- 放置表格和分页 -->
      <el-card>
        <el-table border :data="employess">
          <el-table-column
            label="序号"
            align="center"
            sortable=""
            type="index"
            width="100"
          />
          <el-table-column
            label="姓名"
            align="center"
            sortable=""
            prop="username"
          />
          <el-table-column label="员工" align="center">
            <template slot-scope="{ row }">
              <img
                slot="reference"
                v-imgError="require('@/assets/common/bigUserHeader.png')"
                :src="row.staffPhoto"
                style="
                  border-radius: 50%;
                  width: 100px;
                  height: 100px;
                  padding: 10px;
                "
                alt=""
              />
            </template>
          </el-table-column>
          <el-table-column
            label="工号"
            align="center"
            sortable=""
            prop="workNumber"
          />
          <el-table-column
            label="聘用形式"
            sortable=""
            :formatter="formatterFormOfEmployment"
            prop="formOfEmployment"
            align="center"
          />
          <el-table-column
            align="center"
            label="部门"
            sortable=""
            prop="departmentName"
          />
          <el-table-column
            align="center"
            label="入职时间"
            sortable=""
            prop="timeOfEntry"
          >
            <template slot-scope="{ row }">
              {{ row.timeOfEntry | formatTime }}
            </template></el-table-column
          >
          <el-table-column
            align="center"
            label="账户状态"
            sortable=""
            prop="enableState"
          >
            <template slot-scope="{ row }">
              <el-switch :value="row.enableState === 1"> </el-switch>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="操作"
            sortable=""
            fixed="right"
            width="280"
          >
            <template slot-scope="{ row }">
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button
                type="text"
                size="small"
                @click="deleteEmployee(row.id)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row
          type="flex"
          justify="center"
          align="middle"
          style="height: 60px"
        >
          <el-pagination
            layout="prev, pager, next"
            :page-size="pages.size"
            :current-page="pages.page"
            :total="total"
            @current-change="currentChange"
          />
        </el-row>
      </el-card>
    </div>
    <!-- 新增组件 -->
    <AddDemployee
      @add-success="getEmployessInfo"
      :visible.sync="showAddEmployee"
    />
  </div>
</template>

<script>
import { getEmployessInfoApi, delEmployee } from '@/api/employess'
import employess from '@/constant/employees'
import AddDemployee from './component/add-employee.vue'
export default {
  name: 'Employess',
  data() {
    return {
      employess: [],
      pages: {
        page: 1,
        size: 5
      },
      total: 0,
      showAddEmployee: false
    }
  },
  components: { AddDemployee },

  created() {
    this.getEmployessInfo()
  },

  methods: {
    // 获取所有角色列表
    async getEmployessInfo() {
      const { rows, total } = await getEmployessInfoApi(this.pages)
      // console.log(rows)
      this.employess = rows
      this.total = total
    },
    currentChange(val) {
      // Page 改变时会触发 val就是新的page 赋值重新调用
      this.pages.page = val
      this.getEmployessInfo()
    },
    // 用来格式化内容
    formatterFormOfEmployment(row, column, cellValue, index) {
      // console.log(column)
      // if (cellValue === 1) return '正式'
      // if (cellValue === 2) return '非正式'
      // return '未知'
      // find 如果找到就返回那一项
      const findItem = employess.hireType.find((item) => item.id == cellValue)
      // console.log(findItem)
      return findItem ? findItem.value : '未知'
    },
    // 删除员工
    async deleteEmployee(id) {
      try {
        await this.$confirm('您确定删除该员工吗')
        await delEmployee(id)
        this.getEmployeeList()
        this.$message.success('删除员工成功')
      } catch (error) {
        console.log(error)
      }
    },
    // 点击新增 显示弹框
    showAdd() {
      this.showAddEmployee = true
    }
  }
}
</script>

<style scoped lang="less"></style>
