<template>

	<view class="info-page">
		<view class="title">个人信息表</view>
		<view class="input">
			<view class="name">
				<text class="a">
					姓名:
				</text>
				<text>{{userInfo.name}}</text>
			</view>

			<view class="sex">
				
					<text>性别：</text>
					<text >{{userInfo.sex}}</text>
			
			</view>
			<view class="alergic">
				
					<text>民族：</text>
					<text>{{userInfo.nationalist}}</text>
				
			</view>
			<view class="birth">

				
					<text>出生年月：</text>
					<text>{{userInfo.birthDate}}</text>
				
			</view>
			<view class="alergic">
				
					<text>是否有过敏史：</text>
					<text >{{userInfo.isAllergic}}</text>
		
				<view class="alergic">
					
						<text>是否有过重大疾病：</text>
						<text>{{userInfo.hasSickness}}</text>
					</picker>
				</view>
				<view class="alergic">
				
						<text>是否家族有遗传疾病：</text>
						<text>{{userInfo.hasfamilySick}}</text>
					
				</view>
				<view class="alergic">
					
						<text>婚否：</text>
						<text>{{userInfo.ismarriged}}</text>
					
				</view>

			</view>

		</view>
		<button class='btn' type="primary" @click="edit()">编辑个人信息</button>
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
				name: 'getuserInfo',
				data: {
						userId:that.userId
				},
				success(res) {
					console.log(res.result.res[0])
					that.userInfo=res.result.res[0]
					getApp().globalData.personalInfo=that.userInfo
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
					url:'../userinfo/userinfo',
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
		font-size: 40rpxx;
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
		justify-content: center;
	
	}
	
	.b {}
	
	.sex {
		font-size: 45rpx;
		margin-top: 30rpx;
	}
	
	.birth {
	
		font-size: 45rpx;
		margin-top: 30rpx;
	}
	
	.input {}
	
	.alergic {
		font-size: 45rpx;
		margin-top: 30rpx;
	}

</style>

