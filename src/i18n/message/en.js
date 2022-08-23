// 英文语言包
import enLocale from 'element-ui/lib/locale/lang/en'
export default {
  name: 'English',
  dashboard: {
    calendar: 'hello',
    progress: 'progress'
  },
  ...enLocale,
  route: {
    首页: 'dashboard',
    审批: 'approvals',
    考勤: 'attendances',
    组织架构: 'departments',
    员工: 'employees',
    导入: 'importsModule',
    权限管理: 'permission',
    工资: 'salarys',
    公司设置: 'setting',
    社保: 'social_securitys',
    用户: 'user'
  }
}
