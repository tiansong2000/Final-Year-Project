'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const db = uniCloud.database()
	const dbname = 'orders'
	const collection = db.collection('doctorList_dushuhu')
	let res = await collection.add({	
		doctorName:event.doctorName,
		sex: event.sex,
		hospitalName:event.hospitalName,
		Department:event.department,
		Title:event.title,
		Specialist:event.specialist,
		PersonalDetail:event.personalDetail,
		doctornameEng:'xiawei',
		Image:event.Image,
		userId:event.userId,
	})
	//返回数据给客户端
	return res
};
