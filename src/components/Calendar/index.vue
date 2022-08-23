<template>
  <div class="calendar">
    <el-row type="flex" justify="end">
      <el-col :span="4">
        <el-select @change="updateCalecdar" v-model="currentYears">
          <el-option
            v-for="item in years"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="3">
        <el-select @change="updateCalecdar" v-model="currentMonth">
          <el-option v-for="item in 12" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <!--  -->
    <el-calendar v-model="currentDate">
      <template v-slot:dateCell="{ date }">
        <div
          style="
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
          "
        >
          {{ date.getDate() }}
          <span style="margin-left: 5px; color: red" v-if="isWeek(date)"
            >休</span
          >
        </div>
      </template>
    </el-calendar>
  </div>
</template>

<script>
export default {
  name: 'Calendar',
  data() {
    return {
      currentYears: 2022,
      currentMonth: 8,
      years: [],
      currentDate: 4
    }
  },

  created() {
    this.initCaldndar()
  },

  methods: {
    initCaldndar() {
      const date = new Date()
      this.currentYears = date.getFullYear()
      this.currentMonth = date.getMonth() + 1
      this.years = Array(11)
        .fill(this.currentYears - 5)
        .map((item, index) => item + index)
      this.currentDate = date
    },
    isWeek(date) {
      return date.getDay() === 6 || date.getDay() === 0
    },
    // 切换年月 日历变化
    updateCalecdar() {
      this.currentDate = this.currentYears + '-' + this.currentMonth
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .el-calendar {
  .el-calendar__header {
    display: none;
  }
  .el-calendar__body {
    .el-calendar-table td {
      border: none !important;
    }
  }
}
</style>
