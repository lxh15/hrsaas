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
