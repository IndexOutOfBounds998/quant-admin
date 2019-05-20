import request from '@/utils/request'
/**
 * 提交机器人
 */
export function addOrUpdateRobot(data) {
    return request({
        url: '/robot/addOrUpdateRobot',
        method: 'post',
        data: data
    })
}


export function getRobotById(data) {
    return request({
        url: '/robot/getRobotById',
        method: 'get',
        params: { id: data }
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


