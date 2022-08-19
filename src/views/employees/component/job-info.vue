<template>
  <div>
    <i
      class="el-icon-printer"
      @click="$router.push('/employees/print/' + userId + '?type=job')"
    ></i>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userId: this.$route.params.id
    }
  },

  created() {},

  methods: {}
}
</script>

<style scoped></style>
