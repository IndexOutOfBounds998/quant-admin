import request from '@/utils/request'
/**
 * 获取节点信息
 */
export function getNodes() {
    return request({
        url: '/node/nodes',
        method: 'get'
    })
}