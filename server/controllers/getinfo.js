// 上传info接口
const debug = require('debug')('infopost')
const table = require('./dbmodule/table_postinfo')
const constants = require('../constant')
module.exports = async (ctx, next) => {
    // 通过 Koa 中间件进行登录态校验之后
    // 登录信息会被存储到 ctx.state.$wxInfo
    // loginState 为 1，登录态校验成功
    // debug(ctx.request.body)
    console.log(ctx.request.query)
    var lastid = typeof ctx.request.query.lastid === 'undefined' ? 0 : Number(ctx.request.query.lastid)
    var classify = typeof ctx.request.query.classify === 'undefined' ? '全部' : ctx.request.query.classify
     // console.log('wxinfo', ctx.state.$wxInfo)
    await table.searchinfo({ id: lastid, classify }).then((res) => {
        ctx.state.data = res
        // console.log(res)
    }).catch((err) => {
        debug(err)
    })
    ctx.state.code = 0
}
