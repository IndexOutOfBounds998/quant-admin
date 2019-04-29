import request from '@/utils/request'
/**
 * 提交机器人
 */
export function addRobot(data) {
    return request({
        url: '/robot/addRobot',
        method: 'post',
        data: data
    })
}

export function getRobots() {
    return request({
        url: '/robot/list',
        method: 'get'
    })
}

export function operatingRobot(id) {
    return request({
        url: '/robot/operatingRobot',
        method: 'get',
        params: id
    })
}

/**
 * 删除机器人
 */
export function deleteRobot(id) {
    return request({
        url: '/robot/deleteRobot',
        method: 'get',
        params: id
    })
}


