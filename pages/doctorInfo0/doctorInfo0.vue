<template>
	<view class="info-page">
		<view class="title">医生个人信息</view>
		<view class="input">
			<view class="name">
				<label class="a">
					姓名:
				</label>
				<input class="c" @blur="enterName" />
			</view>

			<view class="sex">
				<picker @change="bindPickerChange" :range="array_sex">
					<label>性别：</label>
					<label class="">{{array_sex[index_sex]}}</label>
				</picker>
			</view>
			
			<view class="alergic">
				<picker @change="bindPickerChange1" :range="hospitalnameList">
					<label>医院名称： </label>
					<label class="">{{hospitalnameList[index1]}}</label>
				</picker>
			</view>
			
			<view class="birth">

				<picker @change="bindPickerChange2" :range="departmentnameList">
					<label>科室： </label>
					<label>{{departmentnameList[index2]}}</label>
				</picker>
			</view>
			
			<view class="alergic">
				<picker @change="bindPickerChange3" :range="title">
					<label>职称：</label>
					<label class="">{{title[index3]}}</label>
				</picker>
				</view>
				<view class="shanchang">
					<view class="a">
						擅长领域：
					</view>
					<uni-easyinput type="textarea" class='b' placeholder="请输入内容" @blur="Specialist"></uni-easyinput>
				</view>
				<view class="geren">
					<view class="a">
						个人简介：
					</view>
					<uni-easyinput type="textarea" class='b' placeholder="请输入内容" @blur="PersonalDetail"></uni-easyinput>
				</view>		

			

		</view>
		<button class='btn' type="primary" @click="confirm()">Confirm</button>
	</view>
</template>

<script>
	export default {
		data() {
			
			return {
				name: '',
				array_sex: ['请选择', '男', '女 '],
				index_sex: 0,
				sex:'',
				index1:0,
				hospitalList:[],
				hospitalnameList:[],
				hospitalName:'',
				departmentList:[],
				departmentnameList:[],
				departmentName:'',
				index2:0,
				index3:0,
				title:['主任医师','副主任医师','住院医师'],
				titleName:'',
				specialist:'',
				personalDetail:''
				
				
			}
		},
		
		onLoad() {
		    var that =this
			uniCloud.callFunction({
				name: 'getAllhospitalname', //云函数的名称
				success(res) {
					//console.log(res)
					that.hospitalList = res.result.data
					for (let i = 0; i < that.hospitalList.length; i++) {
						that.hospitalnameList.push(that.hospitalList[i].hospitalName)
						}
			
				},
				fail(err) {
					console.error('[云函数] [loginInfo] 调用失败', err)
				}
			})
			uniCloud.callFunction({
				name: 'getDepartment', 
				data: {
						hospitalcode: 'dushuhu'
					},
				success(res) {
					//console.log(res)
					that.departmentList = res.result.data
					console.log(that.departmentList[0].name)
					for (let i = 0; i < that.departmentList.length; i++) {
						that.departmentnameList.push(that.departmentList[i].name)
						}
			
				},
				fail(err) {
					console.error('[云函数] [loginInfo] 调用失败', err)
				}
			})
		},

		methods: {
			Specialist: function(event) {
				this.specialist = event.target.value
				console.log(this.specialist)
			},
			PersonalDetail: function(event) {
				this.personalDetail = event.target.value
				console.log(this.personalDetail)
				
			},
			enterName: function(event) {
				this.name = event.target.value
				
				
			},
			confirm() {
				var that = this
				

				if (this.name == '' || this.index_sex == 0 ||this.specialist=='' ||this.personalDetail=='') {
						
					uni.showModal({
						title: '提示',
						content: '请填写完整个人信息',
						showCancel: false,

					});
				} else {
					uni.showModal({
						title: '提示',
						content: '确认填写正确',
						showCancel: false,
						success: function(res) {
						console.log(that.name)	
							if (res.confirm) {
								uniCloud.callFunction({
									name: 'adddoctorInfo',
									data: {
										
											doctorName: that.name,
											sex: that.sex,
											hospitalName:that.hospitalName,
											department:that.departmentName,
											title:that.titleName,
											specialist:that.specialist,
											personalDetail:that.personalDetail,
											Image:getApp().globalData.userInfo.avatar,
											userId:getApp().globalData.userInfo._id,
										
									},
									success(res) {
										uni.showModal({
											showCancel: false,
											content: "医生信息添加成功"
										})
										uni.navigateTo({
											url: '../my1/my1'
										})
									},
									fail(e) {
										console.error(e)
										uni.showModal({
											showCancel: false,
											content: 'Fail，请稍后再试'
										})
									}
								})
								
							} else if (res.cancel) {

							}
						}
					});
				}
			},
			
			bindPickerChange: function(e) { //改变的事件名
				//console.log('picker发送选择改变，携带值为', e.target.value)   用于输出改变索引值
				this.index_sex = e.target.value //将数组改变索引赋给定义的index变量
				this.sex = this.array_sex[this.index_sex] //将array【改变索引】的值赋给定义的jg变量
					//输出获取的籍贯值，例如：中国
			},
			bindPickerChange1: function(e) { //改变的事件名
				//console.log('picker发送选择改变，携带值为', e.target.value)   用于输出改变索引值
				this.index1 = e.target.value //将数组改变索引赋给定义的index变量
				this.hospitalName = this.hospitalList[this.index1].hospitalName //将array【改变索引】的值赋给定义的jg变量
				//	console.log("籍贯为：",this.jg)		//输出获取的籍贯值，例如：中国
				console.log(this.hospitalName)
			},
			bindPickerChange2: function(e) { //改变的事件名
				//console.log('picker发送选择改变，携带值为', e.target.value)   用于输出改变索引值
				this.index2 = e.target.value //将数组改变索引赋给定义的index变量
				this.departmentName = this.departmentnameList[this.index2]
				 console.log(this.departmentName)
				//将array【改变索引】的值赋给定义的jg变量
				//	console.log("籍贯为：",this.jg)		//输出获取的籍贯值，例如：中国
			},
			bindPickerChange3: function(e) { //改变的事件名
				//console.log('picker发送选择改变，携带值为', e.target.value)   用于输出改变索引值
				this.index3 = e.target.value //将数组改变索引赋给定义的index变量
				this.titleName = this.title[this.index3] //将array【改变索引】的值赋给定义的jg变量
				//	console.log("籍贯为：",this.jg)		//输出获取的籍贯值，例如：中国
			},
			
			
		}
	}
</script>

<style>
	.info-page {
		margin-top: 50rpx;

		font-size: 60rpxx;



	}
	.title{
		text-align: center;
		font-size: 40rpx;
	}
	.input{
		margin-left: 20rpx;
	}

	.name {
		display: flex;
		font-size: 45rpx;
		margin-top: 70rpx;


	}
	.shanchang{
		font-size: 45rpx;
		margin-top: 20rpx;
	}
	.geren{
		font-size: 45rpx;
		margin-top: 20rpx;
	}

	.btn {
		margin-top: 40rpx;
		width: 90%;
	}

	.a {
		

	}

	.b {
		font-size: 45rpx;
		height:220rpx;
		border:solid 2rpx #000000;
		width: 85%;
		margin-top: 30rpx;
		margin-left:34rpx;
	}
	.c{
		font-size: 45rpx;
	}

	.sex {
		font-size: 45rpx;
		margin-top: 20rpx;
	}

	.birth {

		font-size: 45rpx;
		margin-top: 20rpx;
	}

	.input {}

	.alergic {
		font-size: 45rpx;
		margin-top: 20rpx;
	}
</style>

