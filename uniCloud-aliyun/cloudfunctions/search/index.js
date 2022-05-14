'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const db = uniCloud.database()
	const dbname = 'doctorList_dushuhu'
	const collection = db.collection(dbname)
	const dbCmd = db.command
	const input = event.input
	//console.log(event.data.department)
	const res = await collection.where(dbCmd.or([
		{
		    doctorName: event.input
		  },
		  {
		    Department:event.input
		  },
		  {
		    Title:event.input
		  },
		  ])).get()
	//返回数据给客户端
	return {
		msg:"查询成功",
		res:res.data
	}
};
