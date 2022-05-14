<template>
	<view class="Reg">
		<view class="content-wrapper">
			<view class="title">
				<h1>欢迎注册</h1>
			</view>
			<view class="login-form">
				<view class="login-form-items">
					<view class="login-form-items-title">姓名</view>
					<input type="text" class="login-input" placeholder="请输入真实姓名" @blur="getName" />
				</view>
				<view class="login-form-items">
					<view class="login-form-items-title">角色</view>
					<picker @change="bindPickerChange" :value="index" :range="array">
						<view class="uni-input">{{array[index]}}</view>
					</picker>
				</view>

				<view class="login-form-items">
					<view class="login-form-items-title">请输入密码</view>
					<input type="password" class="login-input" placeholder="请输入密码" @blur="getpsd1" />
				</view>

				<view class="login-form-items">
					<view class="login-form-items-title">确认密码</view>
					<input type="password" class="login-input" placeholder="确认密码" @blur="getpsd2" />
				</view>
				<view class="login-form-items">
					<view class="login-form-items-title">请输入手机号</view>
					<input type="text" class="login-input1" placeholder="请输入手机号" @blur="getPhoneNumber" />
					<button class="sendMessage" style="background-color: #6EB92B;" @click="sendMsg">code</button>
				</view>
				<view class="login-form-items">
					<view class="login-form-items-title">验证码</view>
					<input type="text" class="login-input" placeholder="验证码" @blur="getcode" />
				</view>


			</view>
		</view>
		<div class="submit-wrapper">
			<button type="primary" class="login-btn1" @click="confirmReg">确认注册</button>
		</div>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				username: '',
				psd: '',
				psd1: '',
				phoneNumber: '',
				code: '',
				needPermission: false,
				array:['普通用户','医生'],
				index:0,
				role:''
			}
		},
		methods: {
			 bindPickerChange: function(e) {
			            console.log('picker发送选择改变，携带值为', e.detail.value)
			            this.index = e.detail.value
			        },
			confirmReg() {
				let that = this;
				if (this.username == '' || this.psd == '' || this.psd1 == '' || this.phoneNumber == '') {
					uni.showModal({
						title: '提示',
						content: '填写不能为空',
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
							action: 'verifyCode',
							params: {
                                type:"register",
								mobile: that.phoneNumber,
								code: that.code,
							}
						},
						success(res) {
							if (JSON.stringify(res.result.code) == 0) {
								if(that.index==0){
									that.role='user'
								}
								else{
									that.role='doctor'
								}
								that.msg = "code is right";
								uniCloud.callFunction({
									name: 'uni-id-test',
									data: {
										action: 'register',
										params: {
											username: that.username,
											password: that.psd,
											mobile: that.phoneNumber,
											role:that.role,
											needPermission: that.needPermission,
						                    mobile_confirmed:1,
										}
									},
									success(res) {
										if (JSON.stringify(res.result.code) == 0) {
											that.msg = "Resgister sucesfullly";
											uni.showLoading({
												title: that.msg,

											});
											setTimeout(function() {
												uni.hideLoading();
											}, 2000);
											uni.redirectTo({
	
												url: '../password/password'
											});
										} else {
											that.msg = JSON.stringify(res.result.msg)
										}


										uni.setStorageSync('uni_id_token', res.result.token)
										uni.setStorageSync('uni_id_token_expired', res.result
											.tokenExpired)
									},
									fail(e) {
										console.error(e)
										uni.showModal({
											showCancel: false,
											content: '注册失败，请稍后再试'
										})
									}
								})

							}
							// });
							else {
								that.msg = JSON.stringify(res.result.msg)
							}
						},
						fail(e) {
							console.error(e)
							uni.showModal({
								showCancel: false,
								content: '验证码错误，请稍后再试'
							})
						}
					})

				}

			},
			sendMsg: function(e) {
				var that = this;
				uniCloud.callFunction({
					name: 'uni-id-test',
					data: {
						action: 'sendSmsCode',
						params: {
                            type:"register",
							mobile: that.phoneNumber,

						}
					},

				})
			},


			getPhoneNumber: function(e) {
				if (!(/^1[3|4|5|6|7|8|9][0-9]{9}$/.test(e.detail.value))) {
					uni.showToast({
						title: '请填写正确手机号码',
						icon: "none",

					});

				} else if (e.detail.value.length != 11) {
					uni.showModal({
						title: '提示',
						content: '请输入11位手机号码',
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
					this.phoneNumber = e.detail.value;
				}

			},
			getName: function(e) {
				console.log(e)
				this.username = e.detail.value;
			},
			getpsd1: function(e) {
				this.psd = e.detail.value;
			},
			getcode: function(e) {
				this.code = e.detail.value;
			},
			getpsd2: function(e) {
				this.psd1 = e.detail.value;
				if (this.psd != this.psd1) {
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
