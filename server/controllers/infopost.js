// 上传info接口
module.exports = async (ctx, next) => {
    // 通过 Koa 中间件进行登录态校验之后
    // 登录信息会被存储到 ctx.state.$wxInfo
    if (ctx.state.$wxInfo.loginState === 1) {
        // loginState 为 1，登录态校验成功
        console.log('infopost', ctx)
        const infodata = {
            classify: ctx.request.body.classify,
            content: ctx.request.body.content,
            haveimg: ctx.request.body.haveimg,
            imgurl: ctx.request.body.img,
            localvisible: ctx.request.body.localvisible,
            position: ctx.request.body.position
        }
        ctx.state.data['infodata'] = infodata
    } else {
        ctx.state.code = -1
    }
}
