'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const db = uniCloud.database()
	const dbname = 'orders'
	const collection = db.collection('contactContent')
	let res = await collection.add({	
		orderDate: event.orderDate,
		doctorId: event.doctorId,
		mode: event.mode,
		personId:'a',
		content:'你好！感谢预约我的'+event.mode+'我将于'+event.orderDate+'准时为您看诊',
		type:0,
		
		
	
	})
	//返回数据给客户端
	return res
};
