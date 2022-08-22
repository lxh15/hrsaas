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
          <el-button size="small" type="danger" @click="exportExcel"
            >导出</el-button
          >
          <el-button
            size="small"
            type="primary"
            @click="showAdd"
            v-if="isHas(point.employees.add)"
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
                @click="showErcodeDiaLog(row.staffPhoto)"
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
              <el-button
                type="text"
                size="small"
                @click="$router.push(`/employees/detail/${row.id}`)"
                >查看</el-button
              >
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small" @click="showRole(row)"
                >角色</el-button
              >
              <el-button
                type="text"
                size="small"
                @click="deleteEmployee(row.id)"
                v-if="isHas(point.employees.del)"
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
    <!-- 头像弹框二维码 -->
    <el-dialog :visible.sync="ercodeDiaLog">
      <canvas id="canvas"></canvas>
    </el-dialog>
    <!--  -->
    <AssignRole :employeesId="currentRoleId" :visible.sync="showAssignRole" />
  </div>
</template>

<script>
import { getEmployessInfoApi, delEmployee } from '@/api/employess'
import employess from '@/constant/employees'
const { exportExcelMapPath, hireType } = employess
import AddDemployee from './component/add-employee.vue'
import AssignRole from './component/assign-role.vue'
import QRCode from 'qrcode'
import MixinsPermission from '@/mixins/permission'
export default {
  name: 'Employess',
  mixins: [MixinsPermission],
  data() {
    return {
      employess: [],
      pages: {
        page: 1,
        size: 5
      },
      total: 0,
      showAddEmployee: false,
      ercodeDiaLog: false,
      showAssignRole: false,
      currentRoleId: ''
    }
  },
  components: { AddDemployee, AssignRole },

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
    },
    async exportExcel() {
      const { export_json_to_excel } = await import('@/vendor/Export2Excel')
      const { rows } = await getEmployessInfoApi({
        page: 1,
        size: this.total
      })
      const header = Object.keys(exportExcelMapPath)
      // console.log(header)
      // 双重map 映射 重新排列 返回和原数组相同的length
      const data = rows.map((item) => {
        // 表头的每一项 手机号  属性值 mobile 去找寻 arr里面的 mobile
        return header.map((h) => {
          if (h === '聘用形式') {
            const findItem = hireType.find((hire) => {
              return hireType.id === item[exportExcelMapPath[h]]
            })
            return findItem ? findItem.value : '未知'
          } else {
            return item[exportExcelMapPath[h]]
          }
        })
      })
      // console.log(data)

      export_json_to_excel({
        header, //表头 必填
        data, //具体数据 必填
        filename: '员工列表', //非必填
        autoWidth: true, //非必填
        bookType: 'xlsx' //非必填
      })
    },
    //
    showErcodeDiaLog(staffPhoto) {
      if (!staffPhoto) return this.$message.error('该用户未设置头像')
      this.ercodeDiaLog = true
      this.$nextTick(() => {
        const canvas = document.getElementById('canvas')
        QRCode.toCanvas(canvas, 'sample text')
      })
    },
    showRole(row) {
      this.showAssignRole = true
      this.currentRoleId = row.id
    }
  }
}
</script>

<style scoped lang="less"></style>
