exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const db = uniCloud.database()
	const collection = db.collection('doctorList_dushuhu')
	//console.log(event.data.department)
	const res = await collection.where({
		userId: event.userId,
	}).get()
	//返回数据给客户端
	return {
		
		res:res.data
	}
};