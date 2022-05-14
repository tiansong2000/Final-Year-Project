'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const db = uniCloud.database()
	const dbname = 'orders'
	const collection = db.collection('contactContent')
	let res = await collection.add({	
		 
		personId:event.personId,
		content:event.content,
		type:event.type,
		time:event.time,
		
		
	
	})
	//返回数据给客户端
	return res
};