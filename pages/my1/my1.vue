<template>
	<view class="wrapper">
		<!-- 个人资料 -->
		<view class="profile">
			<view class="meta">
				<view @tap="login">
					<image :src="userInfo.avatar" class="avatar" v-if="this.islog==true"></image>
					<image src="/static/girlhead.png" class="avatar" v-if="this.islog==false"></image>
					<text v-if="this.islog== false" class="nickname">点击登录</text>
					<text class="nickname" v-if="this.islog== true">已登录 {{userInfo.role}}</text>
				
					<text class="nickname" v-if="this.islog== true">{{userInfo.mobile}}</text>
					<!-- user head -->
				</view>
			</view>
		</view>

		<!-- 我的订单 -->
		<view class="orders">
			<view class="title">我的订单</view>
			<view class="sorts">
				<view class="icon-bill" @click="clinicRecord">
					<image class="img" src="../../static/order.png"></image>
					<view>有效订单</view>
				</view>
				<view class="icon-money" v-if="isUser">
					<image class="img" src="../../static/canceledOrder.png"></image>
					<view>已取消订单</view>
				</view>
				<view class="icon-money" v-if="!isUser" @click="timeTable">
					<image class="img" src="../../static/canceledOrder.png"></image>
					<view>时间表</view>
				</view>
			</view>
		</view>
		<!-- 地址管理 -->
		<view class="address icon-arrow" @click="usersetting">
			<image class="img2" src="../../static/usersetting.png"></image>
			<view style="margin-left: 15rpx;">用户设置</view>
		</view>
		<view class="address icon-arrow" @click="outpatientInfo">
			<image class="img2" src="../../static/my/personal.png"></image>
			<view style="margin-left: 15rpx;">个人信息</view>
		</view>
		<view class="address1 icon-arrow" v-if="!isUser">
			<image class="img3" src="../../static/case.png"></image>
			<view style="margin-left: 15rpx; margin-top: 5rpx;">已完成病例</view>
		</view>
		<view class="address1 icon-arrow" v-if="isUser" @click="mycaseHistory">
			<image class="img3" src="../../static/case.png"></image>
			<view style="margin-left: 15rpx; margin-top: 5rpx;">我的病例本</view>
		</view>
		<view class="address icon-arrow" v-if="isUser"@click="mypre" >
			<image class="img2" src="../../static/presciption.png"></image>
			<view style="margin-left: 15rpx; margin-top: 5rpx;">我的处方</view>
		</view>
		<view class="address icon-arrow"v-if="!isUser">
			<image class="img2" src="../../static/presciption.png"></image>
			<view style="margin-left: 15rpx; margin-top: 5rpx;">已开处方</view>
		</view>
		<view class="address icon-arrow">
		
			<button open-type="feedback" style="background-color: white; font-size: 35rpx;" >意见反馈</button>
		</view>
		
		<!-- 其它 -->
		<view class="extra">
			
			<view class="address2 logout" @click="logout">
				退出登录
			</view>
			
		
		</view>
			
	</view>
</template>

<script>
	export default {
		data() {
			return {

				islog: false,
				userInfo: {},
				phoneNumber: '',
				isUser: true,
			}
		},
		onShow: function() {
			let that = this
			// 	this.userInfo = JSON.parse(decodeURIComponent(option.data))
			// 	console.log(that.userInfo)
			// 	if (that.userInfo != '') {
			// 		that.islog = true;
			// 		console.log(that.userInfo)
			// 	}
			
			let allPages = getCurrentPages(); //获取当前页面栈的实例；
			//console.log(allPages);
			let lastPages = allPages.length - 1; // 获得倒数第二个元素的索引；
			//console.log(lastPages);
			let option = allPages[lastPages].options; // 获得上个页面传递的参数；
			//console.log(option.data);
			that.userInfo = option.data

			if (getApp().globalData.isLog == true) {
				that.userInfo = getApp().globalData.userInfo
				that.islog = true
				if(that.userInfo.role== 'doctor'){
					that.isUser= false
				}
				else{
					that.isUser= true
				}
				
			}
		},
		methods: {
			login() {
				uni.navigateTo({
					url: '../password/password'
				})
			},
			mypre() {
				uni.navigateTo({
					url: '../prescription/prescription'
				})
			},
			logout(){
				uni.showModal({
					title: '提示',
					content: '成功登出',
					showCancel:false,
					success: function (res) {
						if (res.confirm) {
							console.log('用户点击确定');
							uni.redirectTo({
								url:'../password/password'
							})
						}
					}
				});
			},
			outpatientInfo(){
				if(this.isUser== true)
				{
				uni.navigateTo({
				url: '../userinfo0/userinfo0',
				})
				}
				else{
					uni.navigateTo({
					url: '../doctorInfo/doctorInfo',
					})
				}
			},
			usersetting(){
				uni.navigateTo({
					url: '../usersetting/usersetting'
				})
			},
			userinfo() {
				uni.navigateTo({
					url: '/pages/userInfo0/userInfo0'
				})
			},
			mycaseHistory() {
				uni.navigateTo({
					url: '/pages/mycaseHistory/mycaseHistory'
				})
			},
			clinicRecord() {
				uni.navigateTo({
					url: '/pages/clinicRecord/clinicRecord'
				})
			},
			timeTable() {
				uni.navigateTo({
					url: '/pages/timeTable/timeTable'
				})
			},
		}
	}
</script>

<style scoped lang="less">
	page{
		height: 80%;
	}
	.wrapper {
		position: absolute;
		top: 0;
		bottom: 0;

		width: 100%;
		background-color: #f4f4f4;
	}

	.profile {
		height: 375rpx;
		background-color: #ea4451;
		display: flex;
		justify-content: center;
		align-items: center;

		.meta {

			.avatar {
				display: block;
				width: 140rpx;
				height: 140rpx;
				border-radius: 50%;
				border: 2rpx solid #c6c6c6;
				overflow: hidden;
				margin-left: 12rpx;
			}

			.nickname {
				display: block;
				text-align: center;
				margin-top: 20rpx;
				font-size: 25rpx;
				color: #fff;
			}
		}
	}


	.orders {
		margin: -17rpx 20rpx 0 20rpx;
		padding: 20rpx 0;
		background-color: #fff;
		border-radius: 4rpx;
		

		.title {
			padding-left: 20rpx;
			font-size: 30rpx;
			color: #333;
			padding-bottom: 20rpx;
			border-bottom: 1rpx solid #eee;
		}

		.sorts {
			padding-top: 30rpx;
			text-align: center;
			display: flex;
		}

		[class*="icon-"] {
			flex: 1;
			font-size: 26rpx;
         
			&::before {
				display: inline-block;
				font-size: 40rpx;
				margin-bottom: 8rpx;
				color: #ea4451;
			}
		}

		.img {
			width: 120rpx;
			height: 120rpx;
		}
	}
    .img2{
		width: 60rpx;
		height: 60rpx;
	}
	.img3{
		width: 72rpx;
		height: 72rpx;
		margin-left: 0rpx;
	}
	.address {
		line-height: 1.5;
		background-color: #fff;
		font-size: 35rpx;
		padding: 25rpx 20rpx 25rpx 20rpx;
		margin: 10rpx 20rpx;
		color: #333;
		border-radius: 4rpx;
		display: flex;
	}
	.address2 {
		line-height: 1.5;
		background-color: #fff;
		font-size: 35rpx;
		padding: 25rpx 20rpx 25rpx 20rpx;
		margin: 10rpx 20rpx;
		color: #333;
		border-radius: 4rpx;
		
	}
	.address1 {
		line-height: 1.5;
		background-color: #fff;
		font-size: 35rpx;
		padding: 20rpx 0 20rpx 10rpx;
		margin: 10rpx 20rpx;
		color: #333;
		border-radius: 4rpx;
		display: flex;
	}

	.extra {
		margin: 0 20rpx;
		background-color: #fff;
		border-radius: 4rpx;

		.item {
			line-height: 1.5;
			padding: 25rpx 0 25rpx 20rpx;
			border-bottom: 1rpx solid #eee;
			font-size: 35rpx;
			color: #333;
		}

		button {
			text-align: left;
			background-color: #fff;

			&::after {
				border: none;
				border-radius: 0;
			}
		}
	}
    .logout{
		text-align: center;
	}
	
	.icon-arrow {
		position: relative;

		&::before {
			position: absolute;
			top: 50%;
			right: 20rpx;
			transform: translateY(-50%);
		}
	}
</style>
