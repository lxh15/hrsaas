<template>
  <el-dialog
    @open="onOpen"
    @close="onClose"
    title="分配角色"
    :visible="visible"
  >
    <el-checkbox-group v-model="checkList">
      <!-- lable有两个用途  可以用插槽  一个记录id  一个记录那name渲染页面 -->
      <el-checkbox v-for="item in roles" :key="item.id" :label="item.id">
        {{ item.name }}
      </el-checkbox>
    </el-checkbox-group>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onClose">取 消</el-button>
      <el-button type="primary" @click="assignRole">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getRolesApi } from '@/api/role'
import { getUserDetail } from '@/api/user'
import { assignRoles } from '@/api/employess'
export default {
  name: 'AssignRole',
  data() {
    return {
      checkList: [],
      roles: []
    }
  },
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    employeesId: {
      type: String
    }
  },
  methods: {
    onClose() {
      this.$emit('update:visible', false)
    },
    // 弹层打开的时候 会触发
    onOpen() {
      this.getRpleList()
      this.getUserDetail()
    },
    async getRpleList() {
      const { rows } = await getRolesApi()
      this.roles = rows
    },
    async getUserDetail() {
      const { roleIds } = await getUserDetail(this.employeesId)
      console.log(roleIds)
      this.checkList = roleIds
    },
    async assignRole() {
      await assignRoles({
        id: this.employeesId,
        roleIds: this.checkList
      })
      this.$message.success('更改成功')
      this.onClose()
    }
  }
}
</script>
