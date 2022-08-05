import request from '@/utils/request'

export const getDeptsApi = () => {
  return request({
    url: '/company/department'
  })
}
