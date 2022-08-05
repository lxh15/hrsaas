<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card">
        <!--  头部  -->
        <TreeTools :isRoot="true" :treeNode="company"></TreeTools>

        <!-- 树节点 -->
        <el-tree
          :data="treeData"
          :props="defaultProps"
          @node-click="handleNodeClick"
          default-expand-all
        >
          <template v-slot="{ data }">
            <TreeTools :treeNode="data"> </TreeTools>
          </template>
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
import TreeTools from './components/tree-tools.vue'
import { getDeptsApi } from '@/api/departments'
import { transListToTree } from '@/utils'
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
      company: { name: '传智教育', manager: '负责人' }
    }
  },
  components: {
    TreeTools
  },
  created() {
    this.loadDapts()
  },
  methods: {
    handleNodeClick(data) {
      console.log(data)
    },
    async loadDapts() {
      const res = await getDeptsApi()
      // console.log(res)
      // 将数组型数据转化为树形数据
      const list = transListToTree(res.depts, '')
      this.treeData = list
    }
  }
}
</script>

<style scoped lang="less"></style>
