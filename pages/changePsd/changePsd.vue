<template>
	<view class="Reg">
		<view class="content-wrapper">
			<view class="title">
				<h1>更改密码</h1>
			</view>
			<view class="login-form">
				
				

				<view class="login-form-items">
					<view class="login-form-items-title">输入旧密码</view>
					<input type="password" class="login-input" placeholder="请输入旧密码" @blur="getoldPsd" />
				</view>

				<view class="login-form-items">
					<view class="login-form-items-title">输入新密码</view>
					<input type="password" class="login-input" placeholder="请输入新密码" @blur="getnewPsd1" />
				</view>
				<view class="login-form-items">
					<view class="login-form-items-title">确认新密码</view>
					<input type="password" class="login-input" placeholder="请输入新密码" @blur="getnewPsd2" />
				</view>


			</view>
		</view>
		<div class="submit-wrapper">
			<button type="primary" class="login-btn1" @click="confirmReg">确认修改</button>
		</div>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				oldPsd:'',
				newPsd1:'',
				newPsd2:'',
			}
		},
		methods: {
			
			confirmReg() {
				let that = this;
				if (this.oldPsd == '' || this.newPsd1 == '' || this.newPsd2 == '') {
					uni.showModal({
						title: '提示',
						content: '不能为空',
						confirmColor: '#12B368',
						success: function(res) {
							if (res.confirm) {
								console.log('用户点击确定');
							} else if (res.cancel) {
								console.log('用户点击取消');
							}

						}
					});

				} else {
					uniCloud.callFunction({
						name: 'uni-id-test',
						data: {
							action: 'updatePwd',
							params: {
                                
								uid: getApp().globalData.userInfo._id,
								oldPassword: that.oldPsd,
								newPassword: that.newPsd1,
							}
						},
						success(res) {
							if (JSON.stringify(res.result.code) == 0) {
							uni.redirectTo({
								url:'../usersetting/usersetting',
							})	

							}
							// });
							else {
								that.msg = JSON.stringify(res.result.msg)
							}
						},
						fail(e) {
							console.error(e)
							
						}
					})

				}

			},
			


			
			getoldPsd: function(e) {
				this.oldPsd = e.detail.value;
			},
			getnewPsd1: function(e) {
				this.newPsd1 = e.detail.value;
			},
			getnewPsd2: function(e) {
				this.newPsd2 = e.detail.value;
				if (this.newPsd1 != this.newPsd2) {
					uni.showModal({
						title: '提示',
						content: '密码输入不一致',
						confirmColor: '#12B368',
						success: function(res) {
							if (res.confirm) {
								console.log('用户点击确定');
							} else if (res.cancel) {
								console.log('用户点击取消');
							}

						}
					});
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #F4F5F6;
	}

	.sendMessage {
		font-size: 30rpx;
		width: 18%;
		text-align: left;
		height: 80rpx;

	}

	.Reg {
		.content-wrapper {
			width: 100%;

			.title {
				margin-top: 10rpx;
				width: 100%;
				margin-bottom: 10px;

				h1 {
					border: 0px;
					width: 50%;
					margin: 0 auto;
					text-align: center;
					border-bottom: 1px solid #E3E3E3;
					height: 50px;
					line-height: 50px;
					font-size: 17px;
					overflow: hidden;
					font-weight: 400;
				}
			}

			.login-form {
				margin: 40rpx 20rpx 40rpx 30rpx;
				background: #FFFFFF;

				.login-form-items {
					padding: 25rpx 18rpx;
					border-bottom: 2rpx solid #F3F4F5;
					position: relative;
					display: -webkit-flex;
					display: flex;

					.login-form-items-title {
						width: 35%;
						line-height: 50rpx;
						height: 55rpx;
						flex-shrink: 0;
					}

					.login-input {
						width: 100%
					}

					.login-input1 {
						width: 80%
					}


				}
			}
		}

		.login-API {
			height: 150rpx;
			margin-top: 15rpx;
			display: flex;
			justify-content: center;
		}



		.login-API-txt {
			text-align: center;
			margin-top: 0;
		}

		.login-API-weixin {
			height: 90rpx;
			width: 80rpx;

		}

		.login-API-weixin-image {
			width: 100%;
			height: 75%;
		}

		.login-API-weixin-txt {
			width: 100%;
			height: 25%;
		}


		.submit-wrapper {
			padding: 10px;
			padding-top: 10px;
		}

		.login-btn2 {
			background-color: "green";
		}

	}
</style>
