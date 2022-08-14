<template>
  <el-dialog title="提示" @close="onClose" :visible="visible" width="50%">
    <el-form ref="from" :model="formData" :rules="rules" label-width="120px">
      <el-form-item label="姓名" prop="username">
        <el-input
          v-model="formData.username"
          style="width: 50%"
          placeholder="请输入姓名"
        />
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input
          v-model="formData.mobile"
          style="width: 50%"
          placeholder="请输入手机号"
        />
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker
          v-model="formData.timeOfEntry"
          style="width: 50%"
          placeholder="请选择日期"
        />
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select
          v-model="formData.formOfEmployment"
          style="width: 50%"
          placeholder="请选择"
        >
          <el-option
            v-for="item in hireType"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input
          v-model="formData.workNumber"
          style="width: 50%"
          placeholder="请输入工号"
        />
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <!-- <el-input
          v-model="formData.departmentName"
          style="width: 50%"
          placeholder="请选择部门"
        /> -->
        <el-select
          @focus="getDepts"
          v-model="formData.departmentName"
          style="width: 50%"
          placeholder="请选择部门"
          ref="dept"
        >
          <el-option class="treeSelect" value="" v-loading="loading"
            ><el-tree
              @node-click="treeNodeClick"
              :data="depts"
              :props="treeDept"
            ></el-tree>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="转正时间" prop="correctionTime">
        <el-date-picker
          v-model="formData.correctionTime"
          style="width: 50%"
          placeholder="请选择日期"
        />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onClose">取 消</el-button>
      <el-button type="primary" @click="onSave">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import employees from '@/constant/employees'
const { hireType } = employees
import { getDeptsApi } from '@/api/departments'
import { transListToTree } from '@/utils'
import { addEmployee } from '@/api/employess'
export default {
  name: 'AddDemployee',
  data() {
    return {
      hireType,
      formData: {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      },
      rules: {
        username: [
          { required: true, message: '用户姓名不能为空', trigger: 'blur' },
          {
            min: 1,
            max: 4,
            message: '用户姓名为1-4位'
          }
        ],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: '手机号格式不正确',
            trigger: 'blur'
          },
          {
            max: '11',
            min: '11'
          }
        ],
        formOfEmployment: [
          { required: true, message: '聘用形式不能为空', trigger: 'change' }
        ],
        workNumber: [
          { required: true, message: '工号不能为空', trigger: 'blur' }
        ],
        departmentName: [
          { required: true, message: '部门不能为空', trigger: 'change' }
        ],
        timeOfEntry: [{ required: true, message: '入职时间', trigger: 'blur' }]
      },
      depts: [],
      treeDept: {
        children: 'children',
        label: 'name'
      },
      loading: false
    }
  },

  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    onClose() {
      this.$emit('update:visible', false)
      //   清除表单校验规则
      this.$refs.from.resetFields()
    },
    // 获取
    async getDepts() {
      this.loading = true
      const { depts } = await getDeptsApi()
      //   console.log(depts)
      transListToTree(depts, '')
      this.depts = depts
      this.loading = false
    },
    treeNodeClick(row) {
      this.formData.departmentName = row.name
      // 使 input 失去焦点，并隐藏下拉框
      this.$refs.dept.blur()
    },
    onSave() {
      this.$refs.from.validate(async (vali) => {
        if (!vali) {
          return
        }
        await addEmployee(this.formData)
        this.$message.success('添加成功')
        this.onClose()
        this.$emit('add-success')
        console.log('发送请求')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-select-dropdown__item.hover,
.el-select-dropdown__item:hover {
  background-color: #fff;
  overflow: unset;
}
.treeSelect {
  height: 100px;
}
</style>
