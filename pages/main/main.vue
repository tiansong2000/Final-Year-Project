<template>
	<view class="box">
		<view class="search">
			<view class="uni-form-item">
				<view class="uni-form-item1">
					<icon type="search" class="search-icon" size='14'></icon>
					<input class="uni-input" @input="input1" placeholder="请输入关键词" @confirm="inputsearch" />
				</view>
			</view>
		</view>
		<view class="container">
			<view class="banner">
				<image src="/static/main-pic.png" mode="aspectFit" class="bg">
				</image>
				<view class="intro">

				</view>
			</view>
			<view class="content">
				<view class="entrance">
					<view class="item" @tap="toHospitalList">
						<image src="/static/hospitalmain.png" class="icon"></image>
						<view class="title">专家预约</view>
					</view>
					<view class="item" @tap="toSearch">
						<image src="/static/category.png" class="icon"></image>
						<view class="title">搜索</view>
					</view>
				</view>

				<view class="recommend-box">
					<view>历史点击</view>
					<view class="recommend">
						<view class="doctorlist" v-for="(item,index) in historylist" :key="index">
							<view class="list-image">
								<image :src="item.image" mode="aspectFill"></image>
							</view>
							<view class="list-content" @tap="toDoctorListDetails(index)">
								<view class="list-name">{{item.doctorname}}</view>
								<text class="list-title">{{item.title}}</text>
								<view class="professional-area">{{item.specialist}}</view>
								<view class="list-details">
									<view class="list-hospital">独墅湖医院</view>
									<view class="list-money">￥100</view>

								</view>
							</view>
						</view>
					</view>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				historylist: []
			}
		},
		onShow: function(option) {
			let that = this
			uni.getStorage({
				key: 'doctorListHistory', //需要获取的key
				success: function(res) { //获取成功的回调

					console.log(JSON.parse(decodeURIComponent(res.data)))
					var t = JSON.parse(decodeURIComponent(res.data)).specialist
					console.log(t)
					var i = that.historylist.findIndex((value) => value.specialist === t)
					if (i == -1) {
						that.historylist.unshift(JSON.parse(decodeURIComponent(res.data)))
						console.log(that.historylist)
					} else {
						that.historylist.splice(i, 1) //删除i位置的数据
						that.historylist.unshift(JSON.parse(decodeURIComponent(res.data)))
					}
				}

			});
			console.log(that.historylist)
		},
		methods: {

			toSearch() {
				console.log("1")
				uni.navigateTo({
					url: '../search/search'
				})
			},
			toHospitalList() {
				console.log("1")
				uni.navigateTo({
					url: '/pages/hospitalList/hospitalList'
				})
			},
			toDoctorListDetails(index) {
				let that = this
				uni.navigateTo({
						url: '/pages/doctorlistDetails/doctorlistDetails?data=' + encodeURIComponent(JSON.stringify(that.historylist[index]))
						})
				},
			}
		}
</script>

<style lang="scss" scoped>
	page {
		height: auto;
		min-height: 100%;
		
	}


	.uni-form-item {
		margin-top: 15rpx;
		padding: 10rpx;
		border: 2rpx solid black; 
		width: 96%;
		border-radius: 10rpx;
		margin-bottom:22rpx;
		margin-left: 1rpx;
	}

	.uni-form-item1 {
		border-radius: 15rpx;
		
		background-color: #f5f5f5;
		display: flex;
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

	.img-text {
		margin-left: 20rpx;
	}

	page {
		height: auto;
		min-height: 100%;
	}

	/* #endif */
	.banner {
		position: relative;
		width: 100%;
		height: 750rpx;

		.bg {
			width: 100%;
			height: 630rpx;
		}

		.intro {
			position: absolute;
			top: calc(90rpx + var(--status-bar-height));
			left: 40rpx;
			color: #FFFFFF;
			display: flex;
			flex-direction: column;

			.greet {
				font-size: 12rpx;
				margin-bottom: 10rpx;
			}

			.note {
				font-size: 12rpx;
			}
		}
	}


	.entrance {
		position: relative;
		margin-top: -80rpx;
		margin-bottom: 30rpx;
		border-radius: 10rpx;
		background-color: #ffffff;
		padding: 30rpx 0;
		display: flex;
		align-items: center;
		justify-content: center;

		.item {
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			position: relative;

			&:nth-child(1):after {
				content: '';
				position: absolute;
				width: 1rpx;
				background-color: #ddd;
				right: 0;
				height: 100%;
				transform: scaleX(0.5) scaleY(0.8);
			}

			.icon {
				width: 84rpx;
				height: 90rpx;
				margin: 20rpx;
			}

			.title {
				font-size: 30rpx;

				font-weight: 600;
			}
		}
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

		image {
			width: 100%;
			height: 100%;
		}
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
	.container{
		margin-top: 70rpx;
	}
</style>
