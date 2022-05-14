'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const db = uniCloud.database()
	const dbname = 'orders'
	const collection = db.collection('caseHistory')
	let res = await collection.add({	
		
		patientName:event.patientName,
		sex: event.sex,
		orderDate:event.orderDate,
		phoneNumber: event.phoneNumber,
		birthDate: event.birthDate,
		doctorName: event.doctorName,
		mainasking: event.mainasking,
		sicknessHistory: event.	sicknessHistory,
		result:event.result,
		recommendation:event.recommendation,
		userId:event.userId,
	})
	//返回数据给客户端
	return res
};
