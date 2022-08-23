import PageTools from './PageTools'
import UploadExcel from './UploadExcel'
import UPloadImg from './UPloadImg'
import Calendar from './Calendar'
import FullScreen from './FullScreen'
import SvgIcon from './SvgIcon'
import ToggleLang from './ToggleLang'
const components = [
  PageTools,
  UploadExcel,
  UPloadImg,
  Calendar,
  FullScreen,
  SvgIcon,
  ToggleLang
]
export default {
  install(Vue) {
    //  注册全局的通用栏组件对象
    components.forEach((component) => Vue.component(component.name, component))
  }
}
