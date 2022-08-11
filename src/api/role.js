import request from '@/utils/request'

/**
 * 获取所有角色列表
 * @param {Object} params 请求的页码和条数
 * @returns promise
 */
export const getRolesApi = (params) => {
  return request({
    url: '/sys/role',
    params
  })
}

/**
 * 新增人员
 * @param {Object} data 角色名称和描述
 * @returns  promise
 */
export const addRoleApi = (data) => {
  return request({
    url: '/sys/role',
    method: 'POST',
    data
  })
}

/**
 * 获取公司信息
 * **/
export function getCompanyInfo(companyId) {
  return request({
    url: `/company/${companyId}`
  })
}
