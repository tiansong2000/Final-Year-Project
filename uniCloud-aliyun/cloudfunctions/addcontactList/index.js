'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const db = uniCloud.database()
	const dbname = 'orders'
	const collection = db.collection('contactList')
	let res = await collection.add({	
		userId: event.userId,
		doctorId: event.doctorId,
		doctorImage: event.doctorImage,
		doctorName:event.doctorName,
		mode: event.mode,
		orderDate: event.orderDate,
		reservationid:event.reservationid,
		userName:event.userName,
		userImage:event.userImage,
		sex:event.sex,
		birthDate:event.birthDate,
		phoneNumber:event.phoneNumber,
		doctoruserId:event.doctoruserId,
		contactContent:'你好!感谢你预约'+event.orderDate+'我的线上'+event.mode
	})
	//返回数据给客户端
	return res
};