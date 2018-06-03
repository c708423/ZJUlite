const Koa = require('koa')
const app = new Koa()
const debug = require('debug')('koa-weapp-demo')
const response = require('./middlewares/response')
const config = require('./config')
const koabody = require('koa-body')
// 使用响应处理中间件
console.log('_________________________\napp从这个地方开始\n_________________________\n')
app.use(response)
// 解析请求体
app.use(koabody())
// 引入路由分发
const router = require('./routes')
app.use(router.routes())
// 启动程序，监听端口
console.log('_________________________\napp在这里加载完毕\n_________________________\n')
app.listen(config.port, () => debug(`listening on port ${config.port}`))
