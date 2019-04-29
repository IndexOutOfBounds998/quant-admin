import request from '@/utils/request'

export function getAccountList(query) {
  return request({
    url: '/account/accountsByUid',
    method: 'get',
    params: query
  })
}

export function getAccounts(query) {
  return request({
    url: '/account/accounts',
    method: 'get',
    params: query
  })
}
/**
 * 获取账户余额
 */
export function getBalanceList(query) {
  return request({
    url: '/balance/getBalanceList',
    method: 'get',
    params: query
  })

}

export function createOrUpdateAccount(data) {
  return request({
    url: '/account/addOrUpdate',
    method: 'post',
    data: data
  })
}

