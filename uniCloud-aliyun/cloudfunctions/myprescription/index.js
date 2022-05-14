exports.main = async (event, context) => {
	//event为客户端上传的参数
	//context 包含了调用信息和运行状态 ， 获取每次调用的上下文
	// console.log('event : ', event)
	//得到集合的引用  进行增删改查
	const db = uniCloud.database()
	const collection = db.collection('prescription')
	
	const res = await collection.get()
	//console.log(res)
	//console.log(JSON.stringify(res))
	//返回数据给客户端
	return { 	
		msg:"查询成功",
		data:res.data
	}
};