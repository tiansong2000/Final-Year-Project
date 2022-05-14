<template>
	<view class="info-page">
		<view class="title">患者病例</view>
		<view class="input">
			<view class="first-line">
				<view class="name">
					<label class="a">
						姓名:
					</label>
					<label>{{patientInfo.userName}}</label>
				</view>

				<view class="sex">

					<label>性别：</label>
					<label class="">{{patientInfo.sex}}</label>

				</view>
			</view>
			<view class="date">

				<label>问诊时间： </label>
				<label class="">{{patientInfo.orderDate}}</label>

				</picker>
			</view>

			<view class="type">


				<label>问诊方式： </label>
				<label>{{patientInfo.mode}}</label>

			</view>
			<view class="phone">


				<label>联系电话： </label>
				<label>{{patientInfo.phoneNumber}}</label>

			</view>
			<view class="birth">


				<label>出生日期： </label>
				<label>{{patientInfo.birthDate}}</label>

			</view>

			<view class="docName">

				<label>医生姓名：</label>
				<label>{{patientInfo.doctorName}}</label>

				
			</view>
			<view class="main-asking">

				<label>主要诉求：</label>
				<input class="inputline" @blur="mainasking1" />
				</picker>
			</view>
			<view class="sick-description">
				<label>既往病史：</label>
				<uni-easyinput type="textarea" class='b' placeholder="请输入内容" @blur="sicknessHistory1"></uni-easyinput>
			</view>


			<view class="result">
				<label>初步诊断：</label>
				<input class="inputline" @blur="result1" />

			</view>
			<view class="recommendation">
				<label>处理意见：</label>
				<uni-easyinput type="textarea" class='b' placeholder="请输入内容" @blur="recommendation"></uni-easyinput>

			</view>
			<view class="result">
				<label>医生签字：</label>
				<input class="inputline" />
			</view>
		</view>
		<button class='btn' type="primary" @click="confirm()">Submit</button>
	</view>
</template>

<script>
	export default {
		data() {

			return {
				name: '',
				sex: '',
				index1: 0,
				hospitalList: [],
				hospitalnameList: [],
				hospitalName: '',
				departmentList: [],
				departmentnameList: [],
				departmentName: '',
				index2: 0,
				index3: 0,
				title: ['主任医师', '副主任医师', '住院医师'],
				titleName: '',
				specialist: '',
				personalDetail: '',
				patientInfo:[],
				mainasking:'',
				sicknessHistory:'',
				result:'',
				recommend:'',


			}
		},

		onLoad() {
			var that = this
			this.patientInfo=getApp().globalData.contactDetail
			console.log(this.patientInfo)
			// uniCloud.callFunction({
			// 	name: 'getAllhospitalname', //云函数的名称
			// 	success(res) {
			// 		//console.log(res)
			// 		that.hospitalList = res.result.data
			// 		for (let i = 0; i < that.hospitalList.length; i++) {
			// 			that.hospitalnameList.push(that.hospitalList[i].hospitalName)
			// 		}

			// 	},
			// 	fail(err) {
			// 		console.error('[云函数] [loginInfo] 调用失败', err)
			// 	}
			// })
			
		},

		methods: {
			sicknessHistory1: function(event) {
				this.sicknessHistory = event.target.value
				
			},
			recommendation: function(event) {
				this.recommend = event.target.value
				
			},
			result1: function(event) {
				this.result= event.target.value
				console.log(this.result)

			},
			mainasking1: function(event) {
				this.mainasking = event.target.value				
			},
			
			enterName: function(event) {
				this.name = event.target.value
			},
			confirm() {
				var that = this
				if (this.mainasking == '' || this.sicknessHistory == '' || this.result == '' || this.recommend== '') {

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
									name: 'addcaseHistory',
									data: {
 
										patientName: that.patientInfo.userName,
										sex: that.patientInfo.sex,
										orderDate: that.patientInfo.orderDate,
										phoneNumber: that.patientInfo.phoneNumber,
										birthDate: that.patientInfo.birthDate,
										doctorName: that.patientInfo.doctorName,
										mainasking: that.mainasking,
										sicknessHistory: that.sicknessHistory,
										result:that.result,
										recommendation:that.recommend,
										userId:that.patientInfo.userId,

									},
									success(res) {
										uni.showModal({
											showCancel: false,
											content: "添加成功"
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
								uni.navigateTo({
									url: '../my1/my1'
								})
							} else if (res.cancel) {

							}
						}
					});
				}
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

	.title {
		text-align: center;
		font-size: 40rpx;
	}

	.input {
		margin-left: 30rpx;
	}

	.first-line {
		display: flex;
		flex-direction: row;
		/* border:solid 1rpx red; */
		margin-top: 60rpx;
		height: 60rpx;
	}

	.name {

		font-size: 40rpx;
		width: 50%;
		/* border:solid 1rpx red; */

	}

	.sex {
		font-size: 40rpx;
		width: 50%;
	}
    .date{
		    margin-top: 20rpx;
			font-size: 40rpx;
	}
	.type{
		margin-top: 20rpx;
		font-size: 40rpx;
	}
	.phone{
		margin-top: 20rpx;
		font-size: 40rpx;
	}
	.birth{
		margin-top: 20rpx;
		font-size: 40rpx;
	}
	.docName{
		margin-top: 20rpx;
		font-size: 40rpx;
	}
	.main-asking{
		margin-top: 20rpx;
		font-size: 40rpx;
	}
	.sick-description{
		margin-top: 20rpx;
		font-size: 40rpx;
	}
	.result {
		margin-top: 20rpx;
		font-size: 40rpx;
	}
	.recommendation{
		margin-top: 20rpx;
		font-size: 40rpx;
	}
	
	.shanchang {
		font-size: 45rpx;
		margin-top: 20rpx;
	}

	.geren {
		font-size: 45rpx;
		margin-top: 20rpx;
	}
    .inputline{
		font-size: 35rpx;
		border-bottom: ;
	}
	.btn {
		margin-top: 40rpx;
		width: 90%;
	}

	.a {}

	.b {
		font-size: 45rpx;
		height: 220rpx;
		border: solid 2rpx #000000;
		width: 86%;
		margin-top: 30rpx;
		margin-left: 34rpx;
	}

	.c {
		font-size: 45rpx;
	}



	

	.input {}

	.alergic {
		font-size: 45rpx;
		margin-top: 20rpx;
	}
</style>
