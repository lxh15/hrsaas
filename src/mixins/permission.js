import permissionPoint from '@/constant/permission'
export default {
  data() {
    return {
      point: permissionPoint
    }
  },
  methods: {
    isHas(point) {
      // 看看按钮的标识  在没在按钮权限组里面
      return this.$store.state.permission.points.includes(point)
    }
  }
}
