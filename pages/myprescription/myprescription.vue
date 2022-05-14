<template>
	<view>
		<view class="doctorlist" v-for="(item,index) in doctorList" :key="index" @click="click(index)">
			<view class="list-image">
				<image :src="item.img" mode="aspectFill"></image>
			</view>
			<view class="list-content" >
				
				<text class="list-Title">{{item.med_name}}</text>
				<view class="professional-area">{{item.med_guige}}</view>
				<view class="professional-area">{{item.instruction}}</view>
			
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
				index1:'',
				
			}
		},
		onLoad() {
			var that = this
			uniCloud.callFunction({
				name: 'myprescription', //云函数的名称
			
			
				data: {
					
				},
				success(res) {
					//console.log(res)
					that.doctorList = res.result.data
			
			
				},
				fail(err) {
					console.error('[云函数] [loginInfo] 调用失败', err)
				}
			})
		},
		methods: {
			input1: function(event) {
				this.inputval = event.target.value
				console.log(this.inputval)
			},
			click(index){
				var that = this
				var name = that.doctorList[index].med_name
				var id =  that.doctorList[index]._id
				
				uni.showModal({
					title: '提示',
					content: '确认选择'+name,
					success: function (res) {
						if (res.confirm) {
							uniCloud.callFunction({
								name: 'changeprescription', //云函数的名称
							
							
								data: {
									id:id
								},
								success(res) {
									//console.log(res)
							
							
								},
								fail(err) {
									console.error('[云函数] [loginInfo] 调用失败', err)
								}
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			inputsearch() {
				var that = this
				if (that.inputval != '') {
					// uniCloud.callFunction({
					// 	name: 'search', //云函数的名称


					// 	data: {
					// 		input: this.inputval
					// 	},
					// 	success(res) {
					// 		//console.log(res)
					// 		that.doctorList = res.result.res


					// 	},
					// 	fail(err) {
					// 		console.error('[云函数] [loginInfo] 调用失败', err)
					// 	}
					// })
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
		border: 4rpx solid red;
	
	}

	.list-image {
		width: 300rpx;
		height: 240rpx;

		padding: 10rpx;
		/* border: 4rpx solid red; */
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

	.list-Title {
		margin-top: 10rpx;
		overflow: hidden;
        font-size: 32rpx;
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