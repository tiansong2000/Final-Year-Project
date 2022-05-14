<template>
	<view class="con">
		<view class="choosePic" @tap="chooseImg">
			<image src="../../static/submit/add.png"></image>
			<view class="functionName">从相片选择</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				path: '',
				id: '',
			}
		},
		methods: {
			chooseImg() {
				this.id = getApp().globalData.userInfo._id
				var that = this
				uni.chooseImage({
					count: 1,
					success(res) {
						console.log(res);
						if (res.tempFilePaths.length > 0) {
							let filePath = res.tempFilePaths[0]
							//进行上传操作


							// promise方式
							uniCloud.uploadFile({
								filePath: filePath,
								cloudPath: that.id + '.jpg',
								success(res) {	
									let imgUrl = res.fileID
									console.log(res);
									
								},
								
								success:(res)=> {
									console.log(res.fileID)
									let imgUrl = res.fileID
									uniCloud.callFunction({
										name: 'uni-id-test',
										data: {
											action: 'setAvatar',
											params: {
												uid: that.id,
												avatar: imgUrl
											}
										},
										success(res) {
											uni.showModal({
												showCancel: false,
												content: '头像修改成功'
											})
											uni.navigateBack({
												url:'../usersetting/usersetting'
											})
										},
										fail(e) {
											console.error(e)
											uni.showModal({
												showCancel: false,
												content: '修改失败，请稍后再试'
											})
										}
									})
									getApp().globalData.userInfo.avatar=imgUrl
								},
								fail() {},
								complete() {}
							});


						}
					}
				});
				
			}
		},
	}
</script>

<style lang="scss">
	.con {
		display: flex;
		text-align: center;
		justify-content: center;
	}

	.choosePic {

		image {

			margin-top: 200rpx;
			width: 150rpx;
			height: 150rpx;
		}
	}
</style>
