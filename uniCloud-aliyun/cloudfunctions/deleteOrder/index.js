'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const db = uniCloud.database()

	const collection = db.collection('orders')
	//console.log(event.data.department)
	const res = await collection.where({
		_id: event.Id
	}).remove()
	//console.log(res)
	//console.log(JSON.stringify(res))
	//返回数据给客户端
	return { 	
		msg:"delete成功",
		
	}
};
