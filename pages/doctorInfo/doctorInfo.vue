<template>

		<view>
		<view class="info-page">
			<view class="title">
			医生个人信息	
			</view>
			<view class="input">
				<view class="name">
					<label class="a">
						姓名:
					</label>
					<text>{{userInfo.doctorName}}</text>
				</view>
	
				<view class="sex">
						<label>性别：</label>
						<text>{{userInfo.sex}}</text>
					
				</view>
				
				<view class="alergic">
					
						<label>医院名称： </label>
						<text>{{userInfo.hospitalName}}</text>
					
				</view>
				
				<view class="birth">
	
					
						<label>科室： </label>
						<text>{{userInfo.Department}}</text>
					
				</view>
				
				<view class="birth">
					
						<label>职称：</label>
						<text>{{userInfo.Title}}</text>
							</view >
					<view class="shanchang">
					<view class="lingyu">
						<view class="a">
							擅长领域：
						</view>
						<text class="b">{{userInfo.Specialist}}</text>
					</view>
					<view class="lingyu">
						<view class="a">
							个人简介：
						</view>
						<text class="b">{{userInfo.PersonalDetail}}</text>
					</view>		
	
				</view>
	
			</view>
			<button class='btn' type="primary" @click="edit()">编辑个人信息</button>
		</view>
		</view>
	
</template>

<script>
	export default {
		data() {
			return {
				userInfo:[],
				userId:'',
			}
		},
		
		onShow() {
			this.userInfo=getApp().globalData.userInfo
			this.userId = this.userInfo._id
			var that = this
			uniCloud.callFunction({
				name: 'getdoctorInfo',
				data: {
						userId:that.userId
				},
				success(res) {
					console.log(res.result.res[0])
					that.userInfo=res.result.res[0]
				},
				fail(e) {
					console.error(e)
					uni.showModal({
						showCancel: false,
						content: '失败，请稍后再试'
					})
				}
			})
		},
		methods: {
			edit(){
				uni.navigateTo({
					url:'../doctorInfo0/doctorInfo0',
				})
			}
		}
	}
</script>

<style>
	.info-page {
		margin-top: 50rpx;
		font-size: 40rpx;

	}
	.title{
		text-align: center;
		font-size: 40rpx;
		
		
	}
	.input{
		margin-left: 40rpx;
	}

	.name {
		display: flex;
		font-size: 45rpx;
		margin-top: 70rpx;


	}

	.btn {
		margin-top: 40rpx;
		width: 90%;
	}

	.a {
		

	}

	.b {
		font-size: 45rpx;
	     margin-top: 30rpx;
		font-size: 35rpx;
	}
	.c{
		
	}

	.sex {
		font-size: 45rpx;
		margin-top: 20rpx;
	}
	.shanchang{
		margin-top: 20rpx;
		font-size: 40rpx;
	}
	.lingyu{
		
		margin-top: 20rpx;
		width: 95%;
	}

	.birth {

		font-size: 45rpx;
		margin-top: 20rpx;
	}

	.input {}

	.alergic {
		font-size: 45rpx;
		margin-top: 20rpx;
	}
</style>


