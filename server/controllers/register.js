const { mysql } = require('../qcloud')
const nodemailer = require('../node_modules/nodemailer')

// var m_w = 123456789;
// var m_z = 987654321;
// var mask = 0xffffffff;

// // Takes any integer
// function seed(i) {
//     m_w = i;
// }

// // Returns number between 0 (inclusive) and 1.0 (exclusive),
// // just like Math.random().
// function random()
// {
//     m_z = (36969 * (m_z & 65535) + (m_z >> 16)) & mask;
//     m_w = (18000 * (m_w & 65535) + (m_w >> 16)) & mask;
//     var result = ((m_z << 16) + m_w) & mask;
//     result /= 4294967296;
//     return result + 0.5;
// }

const register = async(ctx,next)=>{
    const body = ctx.request.body

	// if (ctx.state.$wxInfo.loginState === 1) {
        // loginState 为 1，登录态校验成功
        var zjuEmail= body.email //读取post数据
        var openid = body.userinfo.openId
	  	var identity = openid

	  	//seed(Math.random(5757))
		var randomEmailString='test'; //随机邮件id
		var emaillink='https://c708423.top/weapp/registerback/?email='+randomEmailString;
		//发送邮件
		nodemailer.createTestAccount('SMTP',(err, account) => {
		    // create reusable transporter object using the default SMTP transport
		    let transporter = nodemailer.createTransport({
		        host: 'smtp.qq.com',
		        port: 587,
		        secure: false, // true for 465, false for other ports
		        auth: {
		            user: 'wangkaikai2014@foxmail.com', // generated ethereal user
		            pass: 'eiptfyqppdwvbbjh' // generated ethereal password
		        }
		    });

		    // setup email data with unicode symbols
		    let mailOptions = {
		        from: 'wangkaikai2014@foxmail.com', // sender address
		        to: zjuEmail + '@zju.edu.cn', // list of receivers
		        subject: 'Hello , 欢迎使用ZJULite！', // Subject line
		        //text: randomEmailString, // plain text body
		        html: '<b>你好，请点击链接</b><a href='+ emaillink +'>' + emaillink + '</a><b>完成激活</b>' // html body
		    };

		    // send mail with defined transport object
		    transporter.sendMail(mailOptions, (error, info) => {
		        if (error) {
		            return console.log(error);
		        }
		        console.log('Message sent: %s', info.messageId);
		        // Preview only available when sending through an Ethereal account
		        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

		        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
		        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
		    });
		});

    // } else {
    //     ctx.state.code = -1
    // }
    ctx.state.data='i amm good'
}

module.exports = register
