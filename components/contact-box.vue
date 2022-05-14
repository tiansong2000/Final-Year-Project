<template>
	<view class="newsList">
		<view class="item">
			<view class="author-img-box">
				<img class="author-img" src="../static/girlhead.png" mode="">
				</image>
				</view>
				<view class="text">
				<view class="top">
					<view class="name">
						张三
					</view>
					
					<view class="time">
						Monday
						</view>
					</view>
					<view class="content">
						你好很高兴认识你
					</view>
					
				
			</view>
			
		</view>
		<view class="item">
			<view class="author-img-box">
				<img class="author-img" src="../static/girlhead.png" mode="">
				</image>
				</view>
				<view class="text">
				<view class="top">
					<view class="name">
						张三
					</view>
					
					<view class="time">
						Monday
						</view>
					</view>
					<view class="content">
						你好很高兴认识你
					</view>
					
				
			</view>
			
		</view>
	</view>
</template>

<script>
</script>

<style>
	.newsList{
		margin-top: 15rpx;
	}
	.item{
		height:80rpx;
		padding: 10 10rpx;
		border-bottom: #555555;
		border: 4rpx solid red;
	}
	.author-img-box{
		float: left;
		margin-left:12rpx;
		margin-top: 10rpx;
		
		
	}
	.author-img{
		width:45px;
		height:45px;
		border-radius: 50%;
		
		
	}
	.text{
		float :left;
		margin-left: 15px;
		height:50px;
		width:75%;
		color:#333333;
	
	}
	.top{
		height:25px;
		line-height: 26rpx;
		margin-top: 5rpx;
		
	}
	.name{
		float: left;
		font-size: 20px;
		
	}
	.time{
		float:right;
		font-size:13px;
		color:#999999;
		
	}
	.content{
		height:25px;
		line-height: 25px;
		font-size:15px;
		color:#999999;
		margin-top: 20rpx;
		margin-left: 25rpx;
		
	}
</style>