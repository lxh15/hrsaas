<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card
        v-loading="loading"
        element-loading-text="拼命加载中"
        class="box-card"
      >
        <!--  头部  -->
        <TreeTools @add="add" :isRoot="true" :treeNode="company"></TreeTools>

        <!-- 树节点 -->
        <el-tree
          :data="treeData"
          :props="defaultProps"
          @node-click="handleNodeClick"
          @add="dialogVisible = true"
          default-expand-all
        >
          <template v-slot="{ data }">
            <TreeTools
              @remove="loadDapts"
              @add="add"
              :treeNode="data"
              @edit="showEdit"
            >
            </TreeTools>
          </template>
        </el-tree>
      </el-card>
    </div>
    <!-- 添加部门弹层 -->
    <AddDept
      ref="addDept"
      :dialogVisible.sync="dialogVisible"
      :currTreeNode="currTreeNode"
      @addSuccess="loadDapts"
    ></AddDept>
  </div>
</template>

<script>
import TreeTools from './components/tree-tools.vue'
import { getDeptsApi } from '@/api/departments'
import { transListToTree } from '@/utils'
import AddDept from './components/add-dept.vue'
export default {
  data() {
    return {
      defaultProps: {
        label: 'name'
      },
      treeData: [
        { name: '总裁办', children: [{ name: '董事会' }] },
        { name: '行政部' },
        { name: '人事部' }
      ],
      company: { name: '传智教育', manager: '负责人' },
      dialogVisible: false,
      currTreeNode: {},
      loading: false
    }
  },
  components: {
    TreeTools,
    AddDept
  },
  created() {
    this.loadDapts()
  },
  methods: {
    handleNodeClick(data) {
      // console.log(data)
    },
    async loadDapts() {
      this.loading = true
      const res = await getDeptsApi()
      // console.log(res)
      // 将数组型数据转化为树形数据
      const list = transListToTree(res.depts, '')
      this.treeData = list
      this.loading = false
    },
    add(val) {
      this.dialogVisible = true
      this.currTreeNode = val
    },
    // 编辑功能
    showEdit(val) {
      // 首先打开弹层
      this.dialogVisible = true
      this.$refs.addDept.getDeptsById(val.id)
    }
  }
}
</script>

<style scoped lang="less"></style>
