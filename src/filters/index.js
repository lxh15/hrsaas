import dayjs from 'dayjs'
//在这里定义过滤器
export const formatTime = (val) => {
  return dayjs(val).format('YYYY-MM-DD')
}
