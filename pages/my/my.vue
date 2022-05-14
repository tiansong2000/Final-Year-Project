<template>
	<view class="container">
		<view class="position-relative">

			<button type="default" size="mini" class="login-btn" @tap="login">
				<image src="userInfo.avatarUrl" v-if="this.islog==true"></image>
				<image src="/static/girlhead.png" v-if="this.islog== false"></image>
				<text class="txt" v-if="this.islog== false">点击登录</text>
				<text class="txt" v-if="this.islog== true">已登录</text>
				<!-- user head -->
			</button>
			<view class="service-box">
				<view class="" style="margin-bottom: 40rpx; margin-top:10rpx;">我的订单</view>
				<view class="row">
					<view class="grid"@click="clinicRecord">
						<view class="image">
							<image src="/static/my/历史记录.png"></image>
						</view>
						<view class="txt">所有订单</view>
					</view>
					<view class="grid" @tap="attendance">
						<view class="image">
							<image src="/static/my/我的订单.png"></image>
						</view>
						<view class="txt">已取消订单</view>
					</view>

				</view>
			</view>
			<!-- service box begin -->
			<view class="service-box1">
				<view class="" style="margin-bottom: 60rpx; margin-top:20rpx;">个人中心</view>
				<view class="row">

					<view class="grid">
						<view class="image">
							<image src="/static/my/我的处方-01.png"></image>
						</view>
						<view class="txt">我的处方</view>
					</view>
					<view class="grid" @tap="clinicRecord">
						<view class="image">
							<image src="/static/my/病历本.png"></image>
						</view>
						<view class="txt">我的病例</view>
					</view>
					<view class="grid" @tap="userinfo">
						<view class="image">
							<image src="/static/my/个人信息.png"></image>
						</view>
						<view class="txt">个人信息</view>
					</view>
					<view class="grid" @tap="userinfo">
						<view class="image">
							<image src="/static/my/账号管理.png"></image>
						</view>
						<view class="txt">账号管理</view>
					</view>
					<view class="grid" @tap="addresses">
						<view class="image">
							<image src="/static/my/意见反馈.png"></image>
						</view>
						<view class="txt">意见反馈</view>
					</view>
					<view class="grid" @tap="services">
						<view class="image">
							<image src="/static/my/关于APP.png"></image>
						</view>
						<view class="txt">关于APP</view>
					</view>
				</view>
			</view>
			<!-- service box end -->
			<!-- tips begin -->

		</view>
		<!-- tisps end -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
				islog: false,
				userInfo: {}
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
			that.userInfo=option.data
			
				if (getApp().globalData.isLog == true) {
					this.islog = true;
				}
		},
		methods: {
			login() {
				uni.navigateTo({
					url: '../password/password'
				})
			},
			userinfo() {
				uni.navigateTo({
					url: '/pages/userinfo/userinfo'
				})
			},
			clinicRecord() {
				uni.navigateTo({
					url: '/pages/clinicRecord/clinicRecord'
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	page {
		height: auto;
		background-color: #ffffff;
	}

	

	.txt {
		font-size: 35rpx;

	}

	.service-box {
		width: 100%;
		background-color: #FFFFFF;
		padding: 30rpx 30rpx 10rpx;
		/*border: 2rpx solid red;*/
		height: 250rpx;
		margin-top: 50rpx;

		.row {
			display: flex;
			flex-wrap: wrap;
			color: #007AFF;
			font-size: 10rpx;
			padding-bottom: -0rpx;

			.grid {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				margin-bottom: 30rpx;
				width: 25%;
				position: relative;

				.image {
					image {
						width: 80rpx;
						height: 80rpx;
						margin-bottom: 20rpx;
					}
				}

				.new-badage {
					width: 40rpx;
					height: 40rpx;
					position: absolute;
					top: 0;
					right: 30rpx;
				}
			}
		}
	}


	.service-box1 {
		width: 100%;
		background-color: #FFFFFF;
		padding: 30rpx 20rpx 10rpx;
		/*	border: 2rpx solid red;*/
		height: 500rpx;

		.row {
			display: flex;
			flex-wrap: wrap;
			color: #007AFF;
			font-size: 10rpx;
			padding-bottom: 0rpx;

			.grid {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				margin-bottom: 50rpx;
				width: 25%;
				position: relative;

				.image {
					image {
						width: 80rpx;
						height: 80rpx;
						margin-bottom: 20rpx;
					}
				}

				.new-badage {
					width: 40rpx;
					height: 40rpx;
					position: absolute;
					top: 0;
					right: 30rpx;
				}
			}
		}
	}
</style>
