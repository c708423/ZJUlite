// 上传info接口
module.exports = async (ctx, next) => {
    // 通过 Koa 中间件进行登录态校验之后
    // 登录信息会被存储到 ctx.state.$wxInfo
    if (ctx.state.$wxInfo.loginState === 1) {
        // loginState 为 1，登录态校验成功
        const userinfo = ctx.state.$wxInfo.userinfo
        const infodata = {
            classify: ctx.request.body.classify,
            content: ctx.request.body.content,
            imgurl: ctx.request.body.img,
            position: ctx.request.body.position,
            oldprice: ctx.request.body.oldprice,
            newprice: ctx.request.body.newprice
        }

    } else {
        ctx.state.code = -1
    }
}
