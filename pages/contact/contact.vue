<template>
	<view class="messageList" >
		<view v-for="(item,index) in doctorInfo" :key="index" class="item" @click="toContatctDetail(index)" >
			
			<view class="friend-img-box" v-if="role=== 'doctor'" >
				<image class="friend-img" :src="item.userImage" mode="">	
				</image>
			</view>
			
			<view class="friend-img-box" v-if="role=== 'user'">
				<image class="friend-img" :src="item.doctorImage" mode="">		
				</image>
			</view>
			<view class="text">
				<view class="top">
					
					<view class="name" v-if="role=== 'doctor'">
						{{item.userName}}
					</view>
					
					<view class="name" v-if="role=== 'user'">
						{{item.doctorName}}
					</view>

					<view class="time">
						{{item.e}}
					</view>
				</view>
				<view class="msg-content">
					{{item.contactContent}}
				</view>
			</view>

		</view>

	
	
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				doctorInfo: [],
				isUser: true,
				role:'user',
				
				
			}
		},
		onShow() {
			var that = this;
			
			if(getApp().globalData.isLog== true){
				
			if(getApp().globalData.userInfo.role== 'user'){
			    that.role = "user"
				console.log(getApp().globalData.role)
			uniCloud.callFunction({
				name: 'getcontactList', //云函数的名称
			
				data: {
					userId:getApp().globalData.userInfo._id
			
				},
				success(res) {
					console.log(res.result.res)
			       that.doctorInfo=res.result.res
				 
			
			
				},
				fail(err) {
					console.error('[云函数] getcontactList 调用失败', err)
				}
			})
			}
			else{
				
			    that.isUser= false;
				   that.role = "doctor"
				uniCloud.callFunction({
					name: 'getcontactList_doctor', //云函数的名称
				
					data: {
						userId:getApp().globalData.userInfo._id
				
					},
					success(res) {
						console.log(res.result.res)
				       that.doctorInfo=res.result.res
				      
				
					},
					fail(err) {
						console.error('[云函数] getcontactList 调用失败', err)
					}
				})
			}
			}
		},
		methods: {
			
			toContatctDetail(index) {
				var that = this;
				console.log("1")
				uni.navigateTo({
					url: '../contactDetail/contactDetail?doctorId='+that.doctorInfo[index].doctorId+'&doctorName='+that.doctorInfo[index].doctorName+'&Info='+encodeURIComponent(JSON.stringify(that.doctorInfo[index]))
				})

			},
		},
	}
</script>

<style>
	page {
		width: 100%;
		height: auto
	}

	.messageList {
		margin-top: 15rpx;
		border: 4rpx solid red;
	}

	.item {
		height: 140rpx;
		padding: 10 10rpx;
		border-bottom: #555555;

	}

	.friend-img-box {
		float: left;
		margin-left: 12rpx;
		margin-top: 10rpx;


	}

	.friend-img {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
	}

	.text {
		float: left;
		margin-left: 15px;
		height: 50px;
		width: 75%;
		color: #333333;

	}

	.top {
		height: 25px;
		line-height: 26rpx;
		margin-top: 25rpx;

	}

	.name {
		float: left;
		font-size: 40rpx;

	}

	.time {
		float: right;
		font-size: 13px;
		color: #999999;

	}

	.msg-content {
		height: 50rpx;
		line-height: 50rpx;
		font-size: 28rpx;
		color: #999999;
		margin-top: 5rpx;
		overflow:hidden; /*溢出的部分隐藏*/
		  white-space: nowrap; /*文本不换行*/
		  text-overflow:ellipsis;
		


	}
</style>
