'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const db = uniCloud.database()
	const dbname = 'orders'
	const collection = db.collection('userInfo')
	let res = await collection.add({	
		name: event.name,
		sex:event.sex,
		nationalist:event.nationality,
		birthDate: event.date,
		isAllergic:event.isAllergic,
		hasSickness: event.hasSickness,
		hasfamilySick: event.hasfamilySick,
		ismarriged:event.ismarriged,
	    userId: event.id
	})
	//返回数据给客户端
	return res
};
