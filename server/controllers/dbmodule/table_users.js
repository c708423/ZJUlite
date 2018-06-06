const mysql = require('./mysql')
// const debug = require('debug')('dbmodule > postinfo')
const extend = require('../../unite/extend')
const constants = require('../../constant')
const debug = require('debug')('in users table')
async function newrecord (options) {
    var ans = await mysql('users').insert(extend.objectExtend([options, {
        status: 0,
        email: '',
        ZJUpass: 0
    }])).then((res) => {
        return res
    })
    return ans
}
async function search (openid) {
    if (typeof openid === 'undefined') {
        return constants.SQL_NOT_FOUND
    }
    var ans = await mysql('users').select('*').where('openid', openid).then((res) => {
        debug(res)
        if (res.length === 0) return constants.SQL_NOT_FOUND
        return res
    })
    return ans
}
module.exports = {
    newrecord,
    search
}
