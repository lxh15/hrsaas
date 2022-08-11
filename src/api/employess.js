import request from '@/utils/request'

/**
 * 获取员工简单列表
 * @returns promise
 */
export const getEmployessApi = () => {
  return request({
    url: '/sys/user/simple'
  })
}

/**
 * 获取所有角色列表
 * @param {Object} params {page , pagesize}
 * @returns
 */
export const getEmployessInfoApi = (params) => {
  return request({
    url: '/sys/user',
    params
  })
}
