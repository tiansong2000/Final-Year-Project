<template>
	<view class="thispage">

		<view class="left-scroll">
			<scroll-view class="gundong" scroll-y="true" v-for="(item,index) in list" :key="index">
				<view :class="{'active':isActive === index}" @click="checked(index)">
					{{item.districtName}}
				</view>

			</scroll-view>
		</view>



		<view class="doctorlist" v-for="(item,index) in hospitalList" :key="index" @tap="toDoctorList(index)">
			<view class="list-image">
				<image src="../../static/hospital.jpg" mode="aspectFill"></image>
			</view>
			<view class="list-content">
				<view class="list-name">{{item.hospitalName}}</view>
				<text class="list-category">{{item.address}} </text>
				<view class="professional-area">{{item.phoneNumber}}</view>
				<view class="list-details">
					<view class="list-hospital">苏州三甲医院</view>
					<view class="list-money">{{item.districtName}}</view>

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
				list: [],
				isActive: 0,
				hospitalList: [],
				index: 0,
				hospitalname:''
			}
		},
		onLoad() {
			let that = this
			uniCloud.callFunction({
					name: 'getDistrict', //云函数的名称

					success(res) {
						//console.log(res)
						that.list = res.result.data.data
						console.log(that.list)
					},
					fail(err) {
						console.error('[云函数] [loginInfo] 调用失败', err)
					}
				}),
				uniCloud.callFunction({
					name: 'hospitalList', //云函数的名称


					data: {
						districtName: "姑苏区"
					},
					success(res) {
						//console.log(res)
						that.hospitalList = res.result.data
						console.log(that.hospitalList)

					},
					fail(err) {
						console.error('[云函数] [loginInfo] 调用失败', err)
					}
				})
		},
		methods: {
			checked(index) {
				let that = this
				this.isActive = index
				console.log(that.list[index].districtName)

				uniCloud.callFunction({
					name: 'hospitalList', //云函数的名称

					data: {
						districtName: that.list[index].districtName
					},
					success(res) {
						//console.log(res)
						that.hospitalList = res.result.data
						console.log(that.hospitalList)

					},
					fail(err) {
						console.error('[云函数] [loginInfo] 调用失败', err)
					}
				})
			},
			toDoctorList(index) {
				let that = this
				if (that.hospitalList[index].hospitalName == '苏州市独墅湖医院') {
	
						that.hospitalname= 'dushuhu'
					
				}

				// 	title: that.doctorlist[index].Title,
				// 	specialist: that.doctorlist[index].Specialist,
				// 	image: that.doctorlist[index].Image,
				// 	detail: that.doctorlist[index].PersonalDetail




				// uni.setStorage({
				// 	key: 'doctorListHistory', // 存放内容的key, 注: key相同会进行覆盖
				// 	data: encodeURIComponent(JSON.stringify(data)), // 存放的内容
				// 	success: function() { //存放成功的回调函数
				// 		console.log('success缓存');
				// 	}
				// });


				uni.navigateTo({
					url: '../doctorList/doctorList?data=' + encodeURIComponent(JSON
						.stringify(that.hospitalname)),


				})
			},
		}


	}
</script>

<style>
	page {
		width: 100%;
	}


	.doctorlist {
		border-bottom: 2rpx solid;
		display: flex;
		padding: 15rpx;
		margin-left: 200rpx;
		border-radius: 10rpx;
		border-shadow: 0 0 10rpx 2rpx rgba($color: #000000, $alpha: 0.9);
		box-sizing: border-box;
		border: 4rpx solid red;
		height: 300rpx;
		width: 70%
	}

	.list-image {
		width: 40%;
		height: 240rpx;

		overflow: hidden;
		border: 4rpx solid red;
	}

	.list-image image {
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


	.list-details {
		display: flex;
		justify-content: space-between;
		font-size: 24rpx;
	}

	.list-hospital {
		padding: 0 10rpx;
		margin-right: 10rpx;
		border-radius: 30rpx;
		color: red;
		border: 2rpx solid red;
	}

	.list-money {
		padding: 0 10rpx;
		margin-right: 10rpx;
		border-radius: 30rpx;
		color: red;
		border: 2rpx solid red;
	}




	.left-scroll {
		width: 25%;
		overflow-x: auto;
		position: fixed;
		height: 100%;
	}

	.gundong {
		width: 100%;

		overflow-x: auto;

	}

	.gundong view {
		height: 100rpx;
		line-height: 100rpx;
		text-align: center;
		/*  background-color: #f1f1f1; */
		font-size: 28rpx;
		color: #666;
		border: 2rpx, solid, blue;
	}

	.active {
		color: #333;
		font-weight: 800;
		border-right: 8rpx solid #ff5934;

	}
</style>
