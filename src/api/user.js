import request from '@/utils/request'

export function emailEditer(emailEditer) {
  return request({
    url: '/user/emailEditer',
    method: 'post',
    data:
      emailEditer
  })
}

export function getUserEmail(token) {
  return request({
    url: '/user/getUserEmail',
    method: 'get',
    params: {
      id: token
    }
  })
}
