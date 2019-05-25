import request from '@/utils/request'

export function backTest(pam) {
  return request({
    url: '/indicator/backTest',
    method: 'post',
    data: pam
  })
}

