<template>
	<view class="content">
		<view class="title">
			<h1>Log-in via phone</h1>
		</view>
		<input type="text" v-model="phoneNum" placeholder="手机号" />
		<button style="width:20%;background-color: #6EB92B; margin-left: 0;" @click="sendMsg">code</button>
		<input type="text" v-model="code" placeholder="验证码" />
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
		<!-- <view class="login-API">
			<view class='login-API-weixin'>
				<image class='login-API-weixin-image' src='../../static/微信登录.png'></image>
				<view class="login-API-weixin-txt"></view>
			</view>
			<view class='login-API-weixin'>
				<image class='login-API-weixin-image' src='../../static/一键登录.png'></image>
				<view class="login-API-weixin-txt"></view>
			</view>
		</view> -->


	</view>
</template>

<script>
	export default {
		data() {
			return {
				phoneNum: '',
				code: '',
				needPermission: false,
				msg: ''
			}
		},
		methods: {
			permissionChange(e) {
				this.needPermission = e.detail.value.indexOf('needPermission') > -1
			},
			sendMsg() {
				var that = this;
				uniCloud.callFunction({
					name: 'uni-id-test',
					data: {
						action: 'sendSmsCode',
						params: {
							type: 'login',
							mobile: that.phoneNum,

						}
					},
					success(res) {
						if (JSON.stringify(res.result.code) == 0) {
							that.msg = "code is sent";

						} else {
							that.msg = res.result.msg
						}
						uni.showModal({
							content: that.msg
						})
					}

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
				console.log(that.code)
				uniCloud.callFunction({
					name: 'uni-id-test',
					data: {
						action: 'loginBySms',
						params: {
							type: 'login',
							mobile: that.phoneNum,
							code: that.code,
						}
					},
					success(res) {
						if (JSON.stringify(res.result.code) == 0) {
							that.msg = "Log-in sucesfullly";

							var thatres = res

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
										getApp().globalData.role = thatres.result.userInfo.role

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
						}

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
