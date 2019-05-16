import request from '@/utils/request'

/**
 * 添加策略
 */
export function addOrUpdateStrategy(data) {
  return request({
    url: '/strategy/addOrUpdateStrategy',
    method: 'post',
    data: data
  })
}
/**
 * 获取策略
 */
export function getStrategys() {
  return request({
    url: '/strategy/strategyList',
    method: 'get'
  })
}
/**
 * 获取策略simple
 */
export function getSimpleStrategys() {
  return request({
    url: '/strategy/simpleStrategyList',
    method: 'get'
  })
}

/**
 * 获取策略
 */
export function getStrategyById(params) {
  return request({
    url: '/strategy/getStrategyById',
    method: 'get',
    params
  })
}

export function deleteStrategy(params) {
  return request({
    url: '/strategy/deleteStrategy',
    method: 'get',
    params
  })
}
