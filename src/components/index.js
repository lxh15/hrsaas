import PageTools from './PageTools'
import UploadExcel from './UploadExcel'
import UPloadImg from './UPloadImg'
const components = [PageTools, UploadExcel, UPloadImg]
export default {
  install(Vue) {
    //  注册全局的通用栏组件对象
    components.forEach((component) => Vue.component(component.name, component))
  }
}
