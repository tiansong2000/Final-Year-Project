<template>
	<view>
	<view class="recordBox" v-for="(item,index) in information" :key="index">
		<view class="data">
		预约订单
		</view>
		<view></view>
		<view class="reservationTime">
		<view>预约时间:</view>
		<view>{{item.orderDate}}</view>
		</view>
		<view class="category">
		<view>预约模式:</view>
		<view>{{item.mode}}</view>
		</view>
		<view class="category">
		<view>就诊人:</view>
		<view>{{item.userName}}</view>
		</view>
		<view class="doctor">
		<view>主治医生:</view>
		<view>{{item.doctorName}}</view>
		</view>
		<view class="delete" @click="deleteOrder(index)">
			取消订单
		</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				information:[],
				phoneNum:'',
				tag:'',
				
			}
		},
		onLoad() {
			this.phoneNum= getApp().globalData.phoneNumber
			var that = this
			uniCloud.callFunction({
				name: 'getmyOrders', //云函数的名称
			
				data: {	
					phoneNumber: that.phoneNum,																
				},
				success(res) {
					
					console.log(res.result.res)				
			        that.information=res.result.res
					
				},
				fail(err) {
					console.error('[云函数] getmyOrders 调用失败', err)
				}
			})
		},
		methods: {
			 deleteOrder(index){
				 var that=this
				 uni.showModal({
				     title: '提示',
				     content: '确定取消订单',
				     success: function (res) {
				         if (res.confirm) {
				           uniCloud.callFunction({
				           	name: 'deleteOrder', //云函数的名称
				           
				           	data: {	
				           		Id: that.information[index]._id																
				           	},
				           	success(res) {
				           		uni.redirectTo({
				           			url:"../clinicRecord/clinicRecord"
				           		})
				           	},
				           	fail(err) {
				           		console.error('[云函数] getmyOrders 调用失败', err)
				           	}
				           })  
						   uniCloud.callFunction({
						   	name: 'reservationChangetwo', //云函数的名称
						   
						   	data: {	
						   		doctornameEng: that.information[index].doctornameEng,		
						   		id:that.information[index].reservationid,				
						   		
						   	},
						   	success(res) {
						   		console.log(res.data)
						   		
						   		
						   
						   	},
						   	fail(err) {
						   		console.error('[云函数] addorders 调用失败', err)
						   	}
						   })
						   
				         } else if (res.cancel) {
				             console.log('用户点击取消');
				         }
				     }
				 });
			 }
		}
	}
</script>

<style>
	page{
		
	}
	.recordBox{
		box-shadow: 2rpx 2rpx 2rpx white;
		padding: 10rpx;
		background-color: #F5F5F5;
		margin-top: 10rpx;
		width: 95%;
		margin-left: 10rpx;
	}
.reservationTime{
	display: flex;
}
.category{
	display: flex;
}
.doctor{
	display: flex;
}
.delete{
	position: fixed;
	right:10rpx;
	top: 200rpx;
	border: #aa0000 solid 5rpx;
}
		
</style>
