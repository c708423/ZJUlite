const { mysql } = require('../qcloud')

var registerback = async ctx => {
	var email = ctx.request.query.email

	//var res = await mysql("User").update({isregister:true}).where({ email })
	console.log(email)

	ctx.response.type = 'html';
    ctx.response.body = '<p>ZJU身份信息激活成功</p>';
}

module.exports = registerback