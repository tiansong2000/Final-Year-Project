<template>
	<view>
		<view>
		<view class="recordBox" v-for="(item,index) in Info" :key="index">
			<view class="data">
			我的病历本
			</view>
		
			<view class="reservationTime">
			<view class="name">患者名字:</view>
			<view class="content">{{item.patientName}}</view>
			</view>
			<view class="reservationTime">
			<view class="name">患者性别:</view>
			<view class="content">{{item.sex}}</view>
			</view>
			<view class="category">
			<view class="name">看诊时间:</view>
			<view class="content">{{item.orderDate}}</view>
			</view>
			<view class="category">
			<view class="name">主要诉求:</view>
			<view class="content">{{item.mainasking}}</view>
			</view>
			<view class="doctor">
			<view class="name">主治医生:</view>
			<view class="content">{{item.doctorName}}</view>
			<view class="nextpage">
				查看详情
			</view>
		
			</view>
			
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phoneNumber:'',
				Info:[],
			}
		},
		onLoad() {
			this.phoneNumber= getApp().globalData.userInfo.mobile
			var that = this
			uniCloud.callFunction({
				name: 'gethistoryCase', //云函数的名称
			
				data: {	
					phoneNumber: that.phoneNumber,																
				},
				success(res) {
					
					console.log(res.result.res)				
			        that.Info=res.result.res
					
				},
				fail(err) {
					console.error('[云函数] getcaseHistory 调用失败', err)
				}
			})
		},
		methods: {
			
		}
	}
</script>

<style>
	page{
		background: #F5f5f5
	}
.recordBox{
		
		padding: 30rpx;
		margin-top: 20rpx;
		font-size: 40rpx;
			text-align: center;
			background-color: #ffffff;
			
	}
.reservationTime{
	display: flex;

	
}
.nextpage{
	float: right;
	border: #aa0000 solid 5rpx;
    margin-top: 30rpx;
    border-radius: 25rpx;
	font-size: 35rpx;
	margin-bottom: 20rpx;
    margin-left: 180rpx;
}
.name{

	margin-top: 30rpx;
}
.category{
	display: flex;
}
.doctor{
	display: flex;
	/* border: #000000 solid 2rpx; */
}
.content{
	
	}

</style>
