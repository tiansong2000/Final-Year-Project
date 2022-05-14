'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const db = uniCloud.database()
	const dbname = 'orders'
	const collection = db.collection('orders')
	let res = await collection.add({	
		orderDate: event.orderDate,
		doctorName: event.doctorName,
		userName: event.username,
		phoneNumber: event.phoneNumber,
		mode: event.mode,
		doctornameEng: event.doctornameEng,
		reservationid: event.reservationid
	
	})
	//返回数据给客户端
	return res
};
