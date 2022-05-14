<template>
	<view>

		<view class="out-patient-method">
			问诊模式选择
			<view class="Message" hover-class="button-click" @tap="toContact(0)">
				<view class="left-section">
					<image class="icon2" src="../../static/picword.png"></image>
					<view class='txt'>图文问诊</view>
				</view>
				<view class="pricetag">30mins</view>
				<view class="pricetag">100RMB</view>

			</view>
			<view class="Video" hover-class="button-click" @tap="toContact(1)">
				<view class="left-section">
					<image class="icon2" src="../../static/phone.png"></image>
					<view class='txt'>语音问诊</view>
				</view>
				<view class="pricetag">30mins</view>
				<view class="pricetag">100RMB</view>

			</view>

			<view class="Audio" hover-class="button-click" @tap="toContact(2)">
				<view class="left-section">
					<image class="icon2" src="../../static/video.png"></image>
					<view class='txt'>视频问诊</view>
				</view>
				<view class="pricetag">30mins</view>
				<view class="pricetag">100RMB</view>

			</view>

		</view>

	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				time: '',
				doctorName: '',
				date: '',
				orderdate: '',
				doctornameEng: '',
				doctorInfo:[]
			}
		},
		onLoad: function(option) {
			this.date = option.date
			this.time = option.time
			this.orderdate = option.date + ' ' + option.time
			this.doctornameEng = option.doctornameEng
			this.doctorName = option.doctorname
			this.id = option.id
			this.doctorInfo =JSON.parse(decodeURIComponent(option.doctorInfo))
			
			console.log(this.doctorInfo.doctorname)
		},
		methods: {

			toContact(index) {
				var that = this;
				if (index == 0) {
					var mode = "图文问诊";
				} else if (index == 1) {
					var mode = "语音问诊";
				} else if (index == 2) {
					var mode = "视频问诊";
				}
				uni.showModal({
					title: '提示',
					content: '问诊模式:' + mode,
					success: function(res) {

						if (res.confirm) {
							console.log(getApp().globalData.isLog)
							if (getApp().globalData.isLog == false) {
								uni.showModal({
									title: '提示',
									content: '请先登录',
									success: function(res) {
										if (res.confirm) {
											uni.navigateTo({
												url:'../password/password'
											})
										} else if (res.cancel) {
											console.log('用户点击取消');
										}
									}
								});
							} else if(getApp().globalData.isLog == true){
								uniCloud.callFunction({
									name: 'addOrders', //云函数的名称

									data: {
										mode: mode,
										doctorName: that.doctorName,
										phoneNumber: getApp().globalData.userInfo.phoneNumber,
										username: getApp().globalData.userInfo.username,
										orderDate: that.orderdate,
										doctornameEng: that.doctornameEng,
										reservationid:that.id

									},
									success(res) {
										console.log(res)
										that.timeArr = res.result.data


									},
									fail(err) {
										console.error('[云函数] addorders 调用失败', err)
									}
								})

								uniCloud.callFunction({
									name: 'reservationChange', //云函数的名称

									data: {
										doctorName: that.doctornameEng,
										date: that.date,
										time: that.time

									},
									success(res) {
										console.log(res.data)
                                      


									},
									fail(err) {
										console.error('[云函数] addorders 调用失败', err)
									}
								})
								uniCloud.callFunction({
									name: 'sendMsg', //云函数的名称
								
									data: {
										phoneNumber: getApp().globalData.phoneNumber,
									    date: that.date,
									    time: that.time
								
									},
									success(res) {
										
								        
								
								
									},
									fail(err) {
										console.error('[云函数] addorders 调用失败', err)
									}
								})
								uniCloud.callFunction({
									name: 'addcontactDetail', //云函数的名称
								
									data: {
										 doctorId: that.doctorInfo._id,
										 mode: mode,
										 orderDate: that.orderdate,
								
									},
									success(res) {
													
								
									},
									fail(err) {
										console.error('[云函数] addorders 调用失败', err)
									}
								})
								uniCloud.callFunction({
									name: 'addcontactList', //云函数的名称
								
									data: {
										userId: getApp().globalData.userInfo._id,
									    doctorId: that.doctorInfo._id,
									    doctorImage: that.doctorInfo.image,
										doctorName:that.doctorInfo.doctorname,
										mode: mode,
										orderDate: that.orderdate,
									    userImage:getApp().globalData.userInfo.avatar,
										userName:getApp().globalData.userInfo.username,
										reservationid:that.id,
										phoneNumber: getApp().globalData.userInfo.mobile,
										sex:getApp().globalData.personalInfo.sex,
										birthDate:getApp().globalData.personalInfo.birthDate,
										doctoruserId:that.doctorInfo.userId,
										
										
								
									},
									success(res) {
										
								        uni.switchTab({
								        
								        	url: '../my1/my1'
								        })
								
								
									},
									fail(err) {
										console.error('[云函数] addorders 调用失败', err)
									}
								})
								
							}

							
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});



			},
		}
	}
</script>

<style>
	.out-patient-method {
		padding: 30rpx 30rpx;
	}

	.Message {
		width: 100%;
		/* border: 2rpx solid #0000FF; */
		display: flex;
		margin-top: 20rpx;

	}

	.button-click {
		transform: scale(0.9, 0.9);

	}



	.pricetag {
		text-align: center;
		/* 	border: 2rpx solid #0000FF; */
		margin-left: 100rpx;
		margin-top: 130rpx;
		font-size: 40rpx;
	}

	.Audio {
		width: 100%;
		/* border: 2rpx solid #0000FF; */
		display: flex;
		margin-top: 60rpx;
	}

	.Video {
		width: 100%;
		/* border: 2rpx solid #0000FF; */
		display: flex;
		margin-top: 60rpx;
	}

	.txt {
		margin-top: 15rpx;
		margin-left: 35rpx;
	}

	.icon2 {
		width: 100rpx;
		height: 100rpx;
		margin-left: 40rpx;
		margin-top: 10rpx;
	}
</style>
