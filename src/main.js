import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control
import dayjs from 'dayjs'

import * as directive from '@/directives'
import Component from '@/components'
//统一引用 统一注册过滤器
import * as filters from '@/filters'
import Print from 'vue-print-nb'
import i18n from '@/i18n'
Vue.use(Print)

for (let key in filters) {
  Vue.filter(key, filters[key])
}
Vue.use(Component) // 注册自己的插件
// mock假数据
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// for循环所有的自定义指令并添加
for (let key in directive) {
  Vue.directive(key, directive[key])
}
// set ElementUI lang to EN
Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})

// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

Vue.filter('formatTime', (val) => {
  return dayjs(val).format('YYYY-MM-DD')
})
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: (h) => h(App)
})
