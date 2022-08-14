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

/**
 * 删除员工接口
 * ****/

export function delEmployee(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'delete'
  })
}

/** **
 *  新增员工的接口
 * **/
export function addEmployee(data) {
  return request({
    method: 'post',
    url: '/sys/user',
    data
  })
}

/**
 * 批量导入员工
 * @param {Object} data
 * @returns promise
 */
export const improtEmployee = (data) => {
  return request({
    url: '/sys/user/batch',
    method: 'POST',
    data
  })
}

/** *
 *  读取用户详情的基础信息
 * **/
export function getPersonalDetail(id) {
  return request({
    url: `/employees/${id}/personalInfo`
  })
}

/** *
 *  更新用户详情的基础信息
 * **/
export function updatePersonal(data) {
  return request({
    url: `/employees/${data.userId}/personalInfo`,
    method: 'put',
    data
  })
}
