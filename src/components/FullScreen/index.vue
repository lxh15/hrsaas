<template>
  <div style="margin: 0 10px">
    <SvgIcon
      @click="onFullScreen"
      iconClass="fullscreen"
      className="fullscreen"
    />
  </div>
</template>

<script>
import screenfull from 'screenfull'
export default {
  name: 'FullScreen',
  data() {
    return {}
  },

  created() {},

  methods: {
    //   改变全屏
    onFullScreen() {
      if (screenfull.isEnabled) {
        screenfull.toggle()
      }
    }
  }
}
</script>

<style scoped lang="scss">
.fullscreen {
  color: #fff;
  cursor: pointer;
  width: 20px;
  height: 20px;
}
</style>
