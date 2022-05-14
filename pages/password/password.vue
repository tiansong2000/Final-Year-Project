<template>
	<view class="content">
		<view class="title">
			<h1>Log-in</h1>
		</view>
		<input type="text" v-model="username" placeholder="用户名/邮箱/手机号" />
		<input type="text" v-model="password" password="true" placeholder="密码" />
		<view class="row">
			<checkbox-group @change="permissionChange">
				<label>
					<checkbox value="needPermission" /><text>启用Permission，一般在管理后台需要传递此参数</text>
				</label>
			</checkbox-group>
		</view>
		<view class="buttongroup">
			<button type="default" style="width: 90%" @tap="register">注册</button>
			<button type="primary" style="width: 90%" @tap="login">登录</button>
			<!-- <button type="default" @tap="updatePwd">修改密码</button>
		<button type="default" @tap="resetPwd">重设密码</button> -->
		</view>
		<view class="login-API">
			<view class='login-API-weixin'>
				<image class='login-API-weixin-image' src='../../static/weixin.png' @tap="loginByweixin"></image>
				<view class="login-API-weixin-txt"></view>
			</view>
			<view class='login-API-weixin'>
				<image class='login-API-weixin-image' src='../../static/login.png' @tap="loginByphone"></image>
				<view class="login-API-weixin-txt"></view>
			</view>
		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				username: '',
				password: '',
				needPermission: false,
				msg: '',
				userInfo: {

				}
			}
		},
		methods: {
			permissionChange(e) {
				this.needPermission = e.detail.value.indexOf('needPermission') > -1
			},
			loginByweixin(e) {
				var that = this;
				uni.login({
					provider: 'weixin',
					success: (res) => {
						uniCloud.callFunction({
							name: 'uni-id-test',
							data: {
								action: 'loginByWeixin',
								params: {
									code: res.code
								}
							},
							success(res) {
								console.log("11")
							}

						})
					}
				});

				uni.getUserProfile({
					desc: "Login",
					success: (res) => {
						that.userInfo = res.userInfo;
						uni.showToast({
							title: 'Login Wechat',
							duration: 1500
						});
						uni.switchTab({
							url: '../my1/my1?data=' + that.userInfo
						})
					}

				})

			},
			loginByphone() {
				uni.navigateTo({
					url: '../phoneLog/phoneLog'
				})
			},
			register() {
				uni.navigateTo({
					url: '../Registration/Registration'
				})
				// uniCloud.callFunction({
				// 	name: 'uni-id-test',
				// 	data: {
				// 		action: 'register',
				// 		params: {
				// 			username: this.username,
				// 			password: this.password,
				// 			needPermission: this.needPermission
				// 		}
				// 	},
				// 	success(res) {
				// 		uni.showModal({
				// 			showCancel: false,
				// 			content: JSON.stringify(res.result)
				// 		})
				// 		uni.setStorageSync('uni_id_token', res.result.token)
				// 		uni.setStorageSync('uni_id_token_expired', res.result.tokenExpired)
				// 	},
				// 	fail(e) {
				// 		console.error(e)
				// 		uni.showModal({
				// 			showCancel: false,
				// 			content: '注册失败，请稍后再试'
				// 		})
				// 	}
				// })
			},
			login() {
				var that = this
				uniCloud.callFunction({
					name: 'uni-id-test',
					data: {
						action: 'login',
						params: {
							username: this.username,
							password: this.password,
							needPermission: this.needPermission
						}
					},
					success(res) {
						if (JSON.stringify(res.result.code) == 0) {
							that.msg = "Log-in sucesfullly";
							var thatres=res

							uni.showModal({
								content: that.msg,
								showCancel: false,
								buttonText: '确定',
								success: (res) => {

									if (res.confirm) {
										getApp().globalData.isLog = true;
                                        getApp().globalData.userInfo = thatres.result.userInfo
										getApp().globalData.phoneNumber = that.username
										
										console.log(thatres.result.userInfo)

										uni.switchTab({
										
											url: '../my1/my1'
										});

									} else if (res.cancel) {
										console.log('用户点击取消');
									}
								}
							})




						} else {
							that.msg = JSON.stringify(res.result.msg);
							uni.showModal({
								content: that.msg,
								showCancel: false,
								buttonText: '确定',
							})
						}

						uni.setStorageSync('uni_id_token', res.result.token)
						uni.setStorageSync(
							'uni_id_token_expired', res.result.tokenExpired)

					},
					fail(e) {
						console.error(e)
						uni.showModal({
							showCancel: false,
							content: '登录失败，请稍后再试'
						})
					}
				})
			},
			updatePwd() {
				uniCloud.callFunction({
					name: 'uni-id-test',
					data: {
						action: 'updatePwd',
						params: {
							oldPassword: '123456',
							newPassword: 'abcdef'
						}
					},
					success(res) {
						uni.showModal({
							showCancel: false,
							content: JSON.stringify(res.result)
						})
					},
					fail(e) {
						console.error(e)
						uni.showModal({
							showCancel: false,
							content: '修改失败，请稍后再试'
						})
					}
				})
			},
			resetPwd() {
				uniCloud.callFunction({
					name: 'uni-id-test',
					data: {
						action: 'resetPwd'
					},
					success(res) {
						if (res.result.code === 0) {
							uni.showModal({
								showCancel: false,
								content: '密码已重置为123456'
							})
						} else {
							uni.showModal({
								showCancel: false,
								content: JSON.stringify(res.result)
							})
						}
					},
					fail(e) {
						console.error(e)
						uni.showModal({
							showCancel: false,
							content: '重置失败，请稍后再试'
						})
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	.title {
		width: 100%;
		margin-bottom: 10px;
		float: left;

		h1 {
			border: 0px;
			width: 50%;
			margin: 0 auto;
			text-align: center;
			border-bottom: 1rpx solid #E3E3E3;
			height: 150rpx;
			line-height: 150rpx;
			font-size: 40rpx;
			overflow: hidden;
			font-weight: 400;
		}
	}

	.buttongroup {
		margin-top: 100rpx;
	}

	.login-API {
		display: flex;
	}


	.login-API-txt {
		text-align: center;
		margin-top: 0;
	}

	.login-API-weixin {
		height: 90rpx;
		width: 80rpx;
		margin-left: 165rpx;

		margin-top: 20rpx;

	}

	.login-API-weixin-image {
		width: 100%;
		height: 75%;
	}

	.login-API-weixin-txt {
		width: 100%;
		height: 25%;
	}
</style>
