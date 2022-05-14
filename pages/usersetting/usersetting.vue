<template>
	<view class="wrapper">
		<!-- 个人资料 -->
		<view class="profile">
			<view class="meta">
				<view @tap="login">
					<image :src="userInfo.avatar" class="avatar" ></image>	
					<!-- user head -->
				</view>
				<button style=" width: 230rpx;height: 80rpx;font-size: 25rpx;margin-top: 20rpx; background-color: #6EB92B;" @click="changHead">更换头像</button>
			</view>
		</view>
	
		
		<!-- 地址管理 -->
		<view class="address icon-arrow" @click="usersetting">
			用户名
			<view class="user-setting">
				{{userInfo.username}}
			</view>
		</view>
		<view class="address icon-arrow">
			绑定手机
			<view class="user-setting">
				{{userInfo.mobile}}
			</view>
		</view>
		<view class="address icon-arrow">
			权限
			<view class="user-setting">
				{{userInfo.role}}
			</view>
		</view>
		<view class="address icon-arrow">
			userID
			<view class="user-setting">
				{{userInfo._id}}
			</view>
		</view>
		<button class="address icon-arrow" @click="changePsd">
			修改密码
		</button>
		
		
	</view>
</template>
 
<script>
	export default {
		data() {
			return {
				userInfo:[]
			}
		},
		methods: {
			changHead(){
				uni.navigateTo({
				url:'../changeHead/changeHead'
				})
			},
			changePsd(){
				uni.navigateTo({
				url:'../changePsd/changePsd'
				})
			},
			},
		onShow() {
			this.userInfo=getApp().globalData.userInfo
		
		}
	}
</script>
 
<style scoped lang="less">
	.wrapper {
		position: absolute;
		top: 0;
		bottom: 0;

		width: 100%;
		background-color: #f4f4f4;
	}

	.profile {
		height: 375rpx;
		background-color: #ffffff;
		display: flex;
		justify-content: center;
		align-items: center;

		.meta {

			.avatar {
				display: block;
				width: 160rpx;
				height: 160rpx;
				border-radius: 50%;
				border: 2rpx solid #c6c6c6;
				overflow: hidden;
				margin-left: 30rpx;
			}

			.nickname {
				display: block;
				text-align: center;
				margin-top: 25rpx;
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
				display: block;
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

	.address {
		line-height: 1.5;
		background-color: #fff;
		font-size: 35rpx;
		padding: 25rpx 0 25rpx 20rpx;
		margin: 10rpx 20rpx;
		color: #333;
		border-radius: 4rpx;
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

	.icon-arrow {
		position: relative;
		padding-right: 60rpx;

		&::before {
			position: absolute;
			top: 50%;
			right: 20rpx;
			transform: translateY(-50%);
		}
	     .user-setting{
			float:right;
			font-size: 36rpx;
		}
	}
</style>


