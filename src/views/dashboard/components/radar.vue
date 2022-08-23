<template>
  <div class="radarCharts" ref="main"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  data() {
    return {}
  },

  created() {},
  mounted() {
    this.initRadar()
  },
  methods: {
    initRadar() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(this.$refs.main)
      // 绘制图表
      myChart.setOption({
        backgroundColor: '#789afb',
        title: {
          text: '人员绩效表',
          textStyle: {
            color: '#eee'
          }
        },
        legend: {
          data: ['张三', '李四']
        },
        axisLine: {
          lineStyle: {
            color: 'red'
          }
        },
        radar: {
          // shape: 'circle',
          indicator: [
            { name: '加班', max: 100 },
            { name: '迟到', max: 100 },
            { name: '打游戏', max: 100 },
            { name: '睡觉', max: 100 },
            { name: '调休', max: 100 },
            { name: 'bug处理', max: 100 }
          ]
        },
        series: [
          {
            name: 'Budget vs spending',
            type: 'radar',
            data: [
              {
                value: [100, 30, 20, 35, 100, 80],
                name: '张三'
              },
              {
                value: [50, 40, 100, 60, 40, 100],
                name: '李四'
              }
            ]
          }
        ]
      })
    }
  }
}
</script>

<style scoped lang="scss">
.radarCharts {
  width: 500px;
  height: 500px;
}
</style>
