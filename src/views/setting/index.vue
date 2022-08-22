<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-tabs v-model="activeName" s>
        <!-- 角色管理 -->
        <el-tab-pane label="角色管理" name="first">
          <el-button
            icon="el-icon-plus"
            size="small"
            type="primary"
            @click="addDialogVisible = true"
            v-if="isHas(point.roles.add)"
            >新增角色</el-button
          >
          <!-- 表格 -->
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column
              type="index"
              align="center"
              label="序号"
              width="100"
            >
            </el-table-column>
            <el-table-column
              align="center"
              prop="name"
              label="角色"
              width="100"
            >
            </el-table-column>
            <el-table-column prop="description" align="center" label="描述">
            </el-table-column>
            <el-table-column align="center" label="操作">
              <template slot-scope="{ row }">
                <el-button
                  size="small"
                  type="success"
                  @click="showRoleDialog(row.id)"
                  >分配权限</el-button
                >
                <el-button
                  size="small"
                  type="primary"
                  v-isHas="point.roles.edit"
                  >编辑</el-button
                >
                <el-button
                  size="small"
                  type="danger"
                  v-if="isHas(point.roles.del)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页组件 -->
          <el-row style="height: 60px">
            <!-- 分页组件 -->
            <el-pagination
              :total="total"
              :page-size="pagesize"
              layout="sizes,prev,pager,next"
              :page-sizes="[3, 5, 10, 20]"
              @size-change="sizeChange"
              @current-change="currentChange"
            />
          </el-row>
        </el-tab-pane>
        <!-- 公司信息 -->
        <el-tab-pane label="公司信息" name="second">
          <el-alert
            title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
            type="info"
            show-icon
            :closable="false"
          />
          <el-form label-width="120px" style="margin-top: 50px">
            <el-form-item label="公司名称">
              <el-input v-model="formDate.name" disabled style="width: 400px" />
            </el-form-item>
            <el-form-item label="公司地址">
              <el-input
                v-model="formDate.companyAddress"
                disabled
                style="width: 400px"
              />
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input
                v-model="formDate.mailbox"
                disabled
                style="width: 400px"
              />
            </el-form-item>
            <el-form-item label="备注">
              <el-input
                v-model="formDate.remarks"
                type="textarea"
                :rows="3"
                disabled
                style="width: 400px"
              />
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 添加的弹层 -->
    <el-dialog
      @close="dialogClose"
      title="新增角色"
      :visible.sync="addDialogVisible"
      width="50%"
    >
      <!-- 表单输入框 -->
      <el-form ref="form" :rules="romRules" :model="addForm" label-width="80px">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model.trim="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model.trim="addForm.description"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onClose">取 消</el-button>
        <el-button type="primary" @click="onAddRole">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分配权限的弹层 -->
    <!-- 关闭时销毁 Dialog 中的元素 destroy-on-close  和 @close 有妙用 -->
    <el-dialog
      title="分配权限"
      destroy-on-close
      @close="onClose"
      :visible.sync="setRoleDialog"
      width="50%"
    >
      <!--:default-checked-keys="defaultCheckedKeys 默认勾选的节点的 key 的数组"
        node-key  节点用来作为唯一标识的属性 配合上面的来用-->
      <el-tree
        ref="preTree"
        :default-checked-keys="defaultCheckedKeys"
        node-key="id"
        default-expand-all
        show-checkbox
        :data="permissions"
        :props="{ label: 'name' }"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRoleDialog = false">取 消</el-button>
        <el-button type="primary" @click="onSaveRights">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getRolesApi, addRoleApi, getCompanyInfo } from '@/api/role'
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('user')
import { getPermissionList } from '@/api/permisson'
import { transListToTree } from '@/utils/index'
import { getRoleInfo, assignPerm } from '@/api/role'
import MixinsPermission from '@/mixins/permission'
export default {
  name: 'setting',
  mixins: [MixinsPermission],
  data() {
    return {
      activeName: 'first',
      tableData: [],
      total: 0,
      pagesize: 5,
      page: 1,
      addDialogVisible: false,
      addForm: {
        name: '',
        description: ''
      },
      romRules: {
        name: [{ required: true, message: '名称不能为空', trigger: 'blur' }]
      },
      formDate: {},
      setRoleDialog: false,
      permissions: [],
      defaultCheckedKeys: [],
      roleId: ''
    }
  },

  created() {
    this.getRoles()
    this.getCompanyInfo()
    this.getPermissions()
  },

  methods: {
    //
    async getRoles() {
      const { rows, total } = await getRolesApi({
        page: this.page,
        pagesize: this.pagesize
      })
      // console.log(rows)
      this.tableData = rows
      this.total = total
    },
    //
    sizeChange(val) {
      // console.log(`每页 ${val} 条`)
      this.pagesize = val
      this.getRoles()
    },
    currentChange(val) {
      // console.log(`当前页: ${val}`)
      this.page = val
      this.getRoles()
    },
    // // 点击取消
    onClose() {
      this.addDialogVisible = false
    },
    // 添加人员
    async onAddRole() {
      // console.log(this.addForm)
      await this.$refs.form.validate()
      const res = await addRoleApi(this.addForm)
      // console.log(res)
      this.$message.success('添加成功')
      this.dialogClose()
      // this.addDialogVisible = false
      this.getRoles()
    },
    //
    dialogClose() {
      this.addForm = {
        name: '',
        description: ''
      }
      // 移除校验
      this.$refs.form.resetFields()
      this.addDialogVisible = false
    },
    async getCompanyInfo() {
      const companyId = this.$store.state.user.userInfo.companyId
      // console.log(companyId)
      this.formDate = await getCompanyInfo(companyId)
      // console.log(this.formDate)
    },
    // 分配权限
    async showRoleDialog(id) {
      this.roleId = id
      this.setRoleDialog = true
      const res = await getRoleInfo(id)
      // console.log(res.permIds)
      this.defaultCheckedKeys = res.permIds
    },
    // 点击对话框确定
    async onSaveRights() {
      // this.$refs.preTree.getCheckedKeys()
      await assignPerm({
        id: this.roleId,
        permIds: this.$refs.preTree.getCheckedKeys()
      })
      this.$message.success('分配成功')
      this.addDialogVisible = false
      this.onClose()
    },
    // 点击取消
    onClose() {
      this.setRoleDialog = false
      this.defaultCheckedKeys = []
    },
    // 数组转树形
    async getPermissions() {
      const res = await getPermissionList()
      // console.log(res)
      const treePermissions = transListToTree(res, '0')
      this.permissions = treePermissions
    }
    // isHas(point) {
    //   // 看看按钮的标识  在没在按钮权限组里面
    //   return this.$store.state.permission.points.includes(point)
    // }
  }
}
</script>

<style scoped lang="less"></style>
