// 上传info接口
const debug = require('debug')('infopost')
const table = require('./dbmodule/table_postinfo')
const constants = require('../constant')
module.exports = async (ctx, next) => {
    // 通过 Koa 中间件进行登录态校验之后
    // 登录信息会被存储到 ctx.state.$wxInfo
    if (ctx.state.$wxInfo.loginState === 1) {
        // loginState 为 1，登录态校验成功
        // debug(ctx.request.body)
        var infodata = {
            classify: typeof ctx.request.body.classify === 'undefined' ? '' : ctx.request.body.classify,
            content: typeof ctx.request.body.content === 'undefined' ? '' : ctx.request.body.content,
            haveimg: typeof ctx.request.body.haveimg === 'undefined' ? 0 : ctx.request.body.haveimg,
            imgurl: typeof ctx.request.body.imgurl === 'undefined' ? '' : ctx.request.body.imgurl,
            localvisible: typeof ctx.request.body.localvisible === 'undefined' ? '' : ctx.request.body.localvisible,
            position: typeof ctx.request.body.location === 'undefined' ? '' : ctx.request.body.location
        }
        if (infodata.classify === constants.ITEM_IS_GOODS) {
            infodata.oldprice = typeof ctx.request.body.oldprice === 'undefined' ? 0 : ctx.request.body.oldprice
            infodata.newprice = typeof ctx.request.body.newprice === 'undefined' ? 0 : ctx.request.body.newprice
            infodata.isgoods = 1
        } else {
            infodata.oldprice = 0
            infodata.newprice = 0
            infodata.isgood = 0
        }
        // console.log('wxinfo', ctx.state.$wxInfo)
        table.insertinfo(infodata, {'owner': ctx.state.$wxInfo.userinfo.openId}).then((res) => {
            // console.log(res)
        }).catch((err) => {
            debug(err)
        })
        ctx.state.code = 0
    } else {
        ctx.state.code = -1
    }
}
