<template>
  <el-dropdown @command="onComand">
    <span class="el-dropdown-link">
      <svg-icon style="color: #fff; font-size: 20px" icon-class="language" />
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
        :disabled="key === $i18n.locale"
        v-for="(value, key) in messages"
        :key="key"
        :command="key"
      >
        {{ value.name }}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { messages } from '@/i18n'
import Cookie from 'js-cookie'
export default {
  name: 'ToggleLang',
  data() {
    return {
      messages
    }
  },

  created() {},

  methods: {
    onComand(val) {
      // 变换语言需要刷新  给切换语言持久化
      this.$router.go(0)
      Cookie.set('lang', val)
      // console.log('切换语言')
      this.$i18n.locale = val
    }
  }
}
</script>

<style scoped></style>
