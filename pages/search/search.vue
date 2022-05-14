<template>
	<view>
		<view class="search">
			<view class="uni-form-item">
				<view class="uni-form-item1">
					<icon type="search" class="search-icon" size='14'></icon>
					<input class="uni-input" @input="input1" placeholder="请输入关键词" @confirm="inputsearch" />
				</view>
			</view>
		</view>
		<view class="doctorlist" v-for="(item,index) in doctorList" :key="index">
			<view class="list-image">
				<image :src="item.Image" mode="aspectFill"></image>

			</view>
			<view class="list-content" @click="toDoctorDetailList(index)">
				<view class="list-name">{{item.doctorName}}</view>
				<text class="list-Title">{{item.Title}}</text>
				<view class="professional-area">{{item.Specialist}}</view>
				<view class="list-details">
					<view class="list-hospital">苏州独墅湖医院</view>
					<view class="list-money">￥100</view>

				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				inputval: '',
				doctorList: [],
			}
		},
		methods: {
			input1: function(event) {
				this.inputval = event.target.value
				console.log(this.inputval)
			},
			inputsearch() {
				var that = this
				if (that.inputval != '') {
					uniCloud.callFunction({
						name: 'search', //云函数的名称


						data: {
							input: this.inputval
						},
						success(res) {
							//console.log(res)
							that.doctorList = res.result.res


						},
						fail(err) {
							console.error('[云函数] [loginInfo] 调用失败', err)
						}
					})
				}
			}
		}
	}
</script>

<style>
	.uni-form-item1 {
		border-radius: 15rpx;

		background-color: #f5f5f5;
		display: flex;
	}

	.uni-form-item {
		margin-top: 15rpx;
		padding: 10rpx;
		border: 2rpx solid black;
		border-radius: 10rpx;
		margin-bottom: 22rpx;
	}

	.search-icon {
		margin-top: 15rpx;
		margin-left: 5rpx;
	}

	.uni-input {
		margin-top: 3rpx;
		background-color: #f5f5f5;
		margin-left: 10rpx;
	}

	.doctorlist {
		border-bottom: 2rpx solid;
		display: flex;
		padding: 15rpx;
		margin: 20rpx;
		border-radius: 10rpx;
		border-shadow: 0 0 10rpx 2rpx rgba($color: #000000, $alpha: 0.9);
		box-sizing: border-box;
		/*border: 4rpx solid red;*/
	}

	.list-image {
		width: 300rpx;
		height: 240rpx;

		padding: 10rpx;
		border: 4rpx solid red;
		}

	.list-image	image {
			width: 100%;
			height: 100%;
		
	}

	.list-content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding-left: 20rpx;
		width: 100%;
		font-size: 28rpx;
		line-height: 1.2;


	}

	.list-title {
		margin-top: 15rpx;
		overflow: hidden;

		text-overflow: ellipsis;

		display: -webkit-box;

		-webkit-box-orient: vertical;

		-webkit-line-clamp: 2;
	}

	.professional-area {
		margin-top: 15rpx;
		overflow: hidden;

		text-overflow: ellipsis;

		display: -webkit-box;

		-webkit-box-orient: vertical;

		-webkit-line-clamp: 2;
	}


	.list-details {
		display: flex;
		justify-content: space-between;
		font-size: 24rpx;
		margin-top: 10rpx;
		;
	}

	.list-hospital {
		padding: 0 10rpx;
		margin-right: 10rpx;
		border-radius: 30rpx;
		color: red;

	}

	.list-money {
		padding: 0 10rpx;
		margin-right: 10rpx;
		border-radius: 30rpx;
		color: red;

	}
</style>
