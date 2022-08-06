<template>
  <el-dialog
    @close="onClose"
    :title="deptTitle"
    :visible="dialogVisible"
    width="50%"
  >
    <el-form
      :model="formDate"
      :rules="fromRules"
      ref="form"
      label-width="100px"
    >
      <el-form-item label="部门名称" prop="name">
        <el-input
          v-model="formDate.name"
          placeholder="请输入部门名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input
          v-model="formDate.code"
          placeholder="请输入部门编码"
        ></el-input>
      </el-form-item>
      <el-form-item label="部门负责人" prop="mansger">
        <el-select
          v-model="formDate.manager"
          style="width: 100%"
          placeholder="请选择部门负责人"
        >
          <el-option
            v-for="item in deptsList"
            :key="item.id"
            :label="item.username"
            :value="item.username"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input
          v-model="formDate.introduce"
          type="textarea"
          placeholder="请输入部门介绍"
        ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onClose">取 消</el-button>
      <el-button @click="onSave" type="primary">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {
  getDeptsApi,
  addDeptApi,
  getDeptByIdApi,
  editDeptsApi
} from '@/api/departments'
import { getEmployessApi } from '@/api/employess'
export default {
  data() {
    // 检验部门名称是否重复
    const chenDeptName = async (rules, value, callback) => {
      let isRepeat
      if (this.formDate.id) {
        const { depts } = await getDeptsApi()
        // console.log(depts)
        // console.log(this.formDate)
        const filtersDepts = depts.filter((item) => {
          return item.pid === this.formDate.pid && item.id !== this.formDate.id
        })
        // console.log(filtersDepts)
        isRepeat = filtersDepts.some((item) => item.name === value)
      } else {
        console.log(this.currTreeNode)
        // 如果这个部门没有子部门 就不用循环了
        if (!this.currTreeNode.children) return callback()
        // 判断value 是否已经存在   true代表存在 重复   false 代表不重复
        isRepeat = this.currTreeNode.children.some(
          (item) => item.name === value
        )
      }
      // console.log(isRepeat)
      // true代表存在 重复   false 代表不重复
      isRepeat ? callback(new Error('部门重复')) : callback()
    }

    // 检验部门编码是否重复
    const chenDeptCode = async (rules, value, callback) => {
      const { depts } = await getDeptsApi()
      let isRepeat = true
      // 判断有没有id
      // 如果有就是编辑 先把自己的id剔除 免得部门编号重复
      if (this.formDate.id) {
        isRepeat = depts
          .filter((item) => item.id !== this.formDate.id)
          .some((item) => item.code === value)
      } else {
        isRepeat = depts.some((item) => item.code === value)
      }
      // console.log(depts)

      isRepeat ? callback(new Error('部门编码重复')) : callback()
    }
    return {
      formDate: {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      },
      fromRules: {
        name: [
          { required: true, message: '部门名称不能为空', trigger: 'blur' },
          {
            validator: chenDeptName,
            trigger: 'blur'
          }
        ],
        code: [
          { required: true, message: '部门编码不能为空', trigger: 'blur' },
          { validator: chenDeptCode, trigger: 'blur' }
        ],
        manager: [
          { required: true, message: '部门负责人不能为空', trigger: 'change' }
        ],
        introduce: [
          { required: true, message: '部门介绍  不能为空', trigger: 'blur' }
        ]
      },
      deptsList: []
    }
  },
  props: {
    dialogVisible: {
      type: Boolean
    },
    currTreeNode: {
      type: Object
    }
  },
  created() {
    this.getDeptsList()
  },
  computed: {
    deptTitle() {
      return this.formDate.id ? '编辑部门' : '添加部门'
    }
  },
  methods: {
    // 获取员工列表 渲染部门负责人
    async getDeptsList() {
      const res = await getEmployessApi()
      // console.log(res)
      this.deptsList = res
    },
    onClose() {
      this.$emit('update:dialogVisible', false)
      // 对话框关闭 清除校验规则 并把表单恢复到初始值
      this.$refs.form.resetFields()
      this.formDate = {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      }
    },
    async onSave() {
      await this.$refs.form.validate()
      try {
        // console.log(this.fromDate)
        if (this.formDate.id) {
          console.log('编辑')
          await editDeptsApi(this.formDate)
          this.$message.success('修改部门成功')
          this.onClose()
          this.$emit('addSuccess')
        } else {
          this.formDate.pid = this.currTreeNode.id
          const res = await addDeptApi(this.formDate)
          // console.log(res)
          this.$message.success('添加部门成功')
          this.onClose()
          this.$emit('addSuccess')
        }
      } catch (error) {
        this.$message.error('添加部门失败')
      }
    },
    async getDeptsById(id) {
      this.formDate = await getDeptByIdApi(id)
      // console.log(res)
    }
  }
}
</script>

<style scoped></style>
