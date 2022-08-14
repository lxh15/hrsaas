import request from '@/utils/request'

/**
 * 登陆的接口
 * @param {Object} data password mobile
 * @returns promise
 */
export function login(data) {
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}
/**
 * 获取基本信息
 * @returns promise
 */
export const getUserInfoApi = () => {
  return request({
    url: '/sys/profile',
    method: 'POST'
  })
}

/**
 * 获取用户详细信息
 * @param {String} id 用户的id
 * @returns parmise
 */
export const getUserDetail = (id) => {
  return request({
    url: '/sys/user/' + id,
    method: 'GET'
  })
}

/**
 * 更改以后保存
 * @param {*} id
 * @returns
 */
export const getUserDetailById = (data) => {
  return request({
    url: `/sys/user/${data.id}`,
    method: 'PUT',
    data
  })
}
