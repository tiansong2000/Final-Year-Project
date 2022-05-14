<template>
	<view class="thispage">
		<view class="left">

			<scroll-view class="gundong" scroll-y="true" v-for="(item,index) in list" :key="index">
				<view :class="{'active':isActive === index}" @click="checked(index)">
					{{item.name}}
				</view>
			</scroll-view>
			<view class="left" style="width: 30%"></view>
		</view>

		<view class="doctorlist" v-for="(item,index) in doctorlist" :key="index">
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
				list: [],
				doctorlist: [],
				isActive: 0,
				index: 0,
				hospitalcode: '',
				firstdepart: ''
			}


		},

		onLoad: function(option) {
			let that = this
			that.hospitalcode = JSON.parse(decodeURIComponent(option.data))
			console.log(that.hospitalcode)

			uniCloud.callFunction({
					name: 'getDepartment', //云函数的名称
					data: {
						hospitalcode: that.hospitalcode
					},
					success(res) {
						//console.log(res)
						that.list = res.result.data
						that.firstdepart = that.list[0].name
						uniCloud.callFunction({
							name: 'doctorList', //云函数的名称


							data: {
								department: that.list[0].name,
								hospitalcode: that.hospitalcode
							},
							success(res) {
								//console.log(res)
								that.doctorlist = res.result.data
								console.log(that.doctorlist)

							},
							fail(err) {
								console.error('[云函数] [loginInfo] 调用失败', err)
							}
						})
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
				console.log(that.list[index].name)

				uniCloud.callFunction({
					name: 'doctorList', //云函数的名称

					data: {
						department: that.list[index].name,
						hospitalcode: that.hospitalcode
					},
					success(res) {
						//console.log(res)
						that.doctorlist = res.result.data
						console.log(that.doctorlist)

					},
					fail(err) {
						console.error('[云函数] [loginInfo] 调用失败', err)
					}
				})



			},

			toDoctorDetailList(index) {
				let that = this

				console.log(index)
				let data = {
					_id: that.doctorlist[index]._id,
					doctorname: that.doctorlist[index].doctorName,
					title: that.doctorlist[index].Title,
					specialist: that.doctorlist[index].Specialist,
					image: that.doctorlist[index].Image,
					detail: that.doctorlist[index].PersonalDetail,
					doctornameEng: that.doctorlist[index].doctornameEng,
					userId:that.doctorlist[index].userId,
					

				}

				uni.setStorage({
					key: 'doctorListHistory', // 存放内容的key, 注: key相同会进行覆盖
					data: encodeURIComponent(JSON.stringify(data)), // 存放的内容
					success: function() { //存放成功的回调函数
						console.log('success缓存');
					}
				});


				uni.navigateTo({
					url: '../doctorlistDetails/doctorlistDetails?data=' + encodeURIComponent(JSON
						.stringify(data)),


				})
			},
		}

	}
</script>

<style>
	.thispage {
		width: 100%;
		height: auto;

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

		width: 73%
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

	.list-Title {
		overflow: hidden;

		text-overflow: ellipsis;

		display: -webkit-box;

		-webkit-box-orient: vertical;

		-webkit-line-clamp: 2;


	}

	.professional-area {
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

	.left {
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
		font-size: 26rpx;
		color: #666;
		border: 2rpx, solid, blue;
	}

	.active {
		color: #333;
		font-weight: 700;
		border-left: 8rpx solid #ff5934;
	}
</style>
