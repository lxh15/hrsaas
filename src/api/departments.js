import request from '@/utils/request'

/**
 * 获取组织架构数据
 * @returns  promise
 */
export const getDeptsApi = () => {
  return request({
    url: '/company/department'
  })
}

/**
 * 根据ID删除部门
 * @param {*} id 部门的id
 * @returns promise
 */
export const delDeptsApi = (id) => {
  return request({
    url: `/company/department/${id}`,
    method: 'DELETE'
  })
}

/**
 * 新增部门
 * @param {Object} data 请求的参数
 * @returns promise
 */
export function addDeptApi(data) {
  return request({
    url: '/company/department',
    method: 'POST',
    data
  })
}

/**
 * 根据ID查询部门详情
 * @param {String} id 部门id
 * @returns promise
 */
export const getDeptByIdApi = (id) => {
  return request({
    url: `/company/department/${id}`
  })
}

/**
 * 根据ID修改部门详情
 * @param {Object} data 该部门的详细信息
 * @returns promise
 */
export const editDeptsApi = (data) => {
  return request({
    url: `/company/department/${data.id}`,
    method: 'PUT',
    data
  })
}
