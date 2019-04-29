import request from '@/utils/request'
/**
 * 获取节点信息
 */
export function getSymbols() {
    return request({
        url: '/symbol/symbols',
        method: 'get'
    })
}