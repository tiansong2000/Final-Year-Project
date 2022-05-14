'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	
	    const res = await uniCloud.sendSms({
	      //smsKey、smsSecret值为开通
	      smsKey: 'c6cd86534935aff090bfe9d4c440d219', 
	      smsSecret: '5edfb2ff083ea8d8f421fb7fd95e54f4',
	      phone: event.phoneNumber, // 为验证码的接收者号码
	      templateId: '14206', // 短信模板id
		   data: {
		          date: event.date,
				  time:event.time
		        
		        }
		      })
		      // 调用成功，请注意这时不代表发送成功
		      return res

};
