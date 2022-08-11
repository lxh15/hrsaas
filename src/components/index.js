import PageTools from './PageTools'

const components = [PageTools]
export default {
  install(Vue) {
    //  注册全局的通用栏组件对象
    components.forEach((component) => Vue.component(component.name, component))
  }
}
