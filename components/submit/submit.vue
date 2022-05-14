<template>
	<view>
		<view class="submit">
			<view class="submit-chat">
				<view class="topimg" @tap="toSpeak">
					<image :src="talkUrl"></image>
				</view>
				<textarea auto-height="true" class="chatsend btn" :class="{displayNone:istalking}" @input="inputs"
					@focus="focus" v-model="msg"></textarea>
				<view class="record btn" :class="{displayNone:!istalking}" @touchstart="touchstart"
					@touchend="touchend">按住说话</view>
				<view class="topimg" @tap="toEmoji">
					<image src="../../static/submit/emoji.png"></image>
				</view>
				<view class="topimg" @tap="toMoreFunction">
					<image src="../../static/submit/add.png"></image>
				</view>
			</view>
			<view class="emoji" :class="{displayNone:!showEmoji}">
				<emoji @emotion="emotion"></emoji>
			</view>
			<view class="more" :class="{displayNone:!moreFunction}">
				<view class="first-line">
					<view class="function-list" @tap="sendImg('camera')">
						<image src="../../static/submit/camera.png" />
						</image>
						<view class="functionName">拍照</view>
					</view>
					<view class="function-list" @tap="sendImg('album')">
						<image src="../../static/submit/pic.png"></image>
						<view class="functionName">相册</view>
					</view>
					<view class="function-list">
						<image src="../../static/submit/video.png" @click="video"></image>
						<view class="functionName">视频</view>
					</view>
					<view class="function-list">
						<image src="../../static/submit/phone.png" @click="phone"></image>
						<view class="functionName">电话</view>
					</view>
				</view>


				<view class="second-line" >
					<view class="function-list2" @click="historyCase">
						<image src="../../static/submit/file.png"></image>
						<view class="functionName2">病历本</view>
					</view>
					<view class="function-list2">
						<image src="../../static/submit/file.png"@click="pre"></image>
						<view class="functionName2">处方</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import emoji from './emoji/emoji.vue';
	const recorderManager = uni.getRecorderManager();
   const TUICalling = uni.requireNativePlugin("TUICallingUniPlugin-TUICallingModule");
	export default {
		data() {
			return {
				istalking: false,
				talkUrl: '../../static/submit/voice.png',
				showEmoji: false,
				moreFunction: false,
				msg: '',
				timer: '',
				voicelength: 0,
				role:'',

			}
		},
		components: {
			emoji,
		},
		onShow() {
			this.role = getApp().globalData.userInfo.role;
			
			console.log(this.role)
		TUICalling.login({
		        sdkAppID: '1400672789',
		        userID: "st", 
		        userSig: "eJyrVgrxCdYrSy1SslIy0jNQ0gHzM1NS80oy0zLBwsUlUNHilOzEgoLMFCUrQxMDAzNzI3MLS4hMakVBZlEqUNzU1NTIwMAAIlqSmQsSMzM1NDIxNjUwgpqSmQ40tNDRwyswyz8xx8fYyN*nILnSqCzbPK00IMikysjIwt8lN9I9wDG5rDI8L99WqRYAcGkwZA__",
		}, (res) => {
		    console.log(JSON.stringify(res))
		})
			TUICalling.login({
			        sdkAppID: 1400672789,
			        userID: 'xiatian', 
			        userSig: "eJwtzFELgjAYheH-sttCtuW2JnQhBAWVJkXp5WhTvqIxnJYQ-fdMvTzPgfeDzvtT8DI1ihANMJoPG7SxDZQwcAeqAWWny*uHcg40ikiIMRdULOX4mM5BbXpnjFGM8agNPP-GGaHhgkk*VaDqy*s44W3mUusPRyG3sa*K*7u8ZGp3tWluWXvLyQzoJvHFCn1-u4EyZg__",
			}, (res) => {
			    console.log(JSON.stringify(res))
			})
		},
		methods: {

			emotion: function(e) {
				this.msg = this.msg + e;
			},
			video(){
				var avatar = getApp().globalData.contactDetail.userImage
				var avatar1 = getApp().globalData.contactDetail.doctorImage
		
				if(this.role=='user'){
				TUICalling.login({
				        sdkAppID: 1400672789,
				        userID: "st", 
				        userSig: "eJyrVgrxCdYrSy1SslIy0jNQ0gHzM1NS80oy0zLBwsUlUNHilOzEgoLMFCUrQxMDAzNzI3MLS4hMakVBZlEqUNzU1NTIwMAAIlqSmQsSMzM1NDIxNjUwgpqSmQ40tNDRwyswyz8xx8fYyN*nILnSqCzbPK00IMikysjIwt8lN9I9wDG5rDI8L99WqRYAcGkwZA__",
				}, (res) => {
				    console.log(JSON.stringify(res))
				})
				TUICalling.setUserNickname({
				    nickName: "宋恬"
				},(res) => {
				    console.log(JSON.stringify(res))
				})
				// TUICalling.setUserAvatar({
				//     avatar: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-89da7d7f-14e8-44f6-80b9-7297450dccab/f89f6c87-55cc-4dc0-8c61-7c030b20d37a.jpg',
				// 	},(res) => {
				//     console.log(JSON.stringify(res))
				// })	
				TUICalling.call({userID: 'st', type: 2})
				}
				else{
					TUICalling.login({
					        sdkAppID: 1400672789,
					        userID: 'xiatian', 
					        userSig: "eJwtzFELgjAYheH-sttCtuW2JnQhBAWVJkXp5WhTvqIxnJYQ-fdMvTzPgfeDzvtT8DI1ihANMJoPG7SxDZQwcAeqAWWny*uHcg40ikiIMRdULOX4mM5BbXpnjFGM8agNPP-GGaHhgkk*VaDqy*s44W3mUusPRyG3sa*K*7u8ZGp3tWluWXvLyQzoJvHFCn1-u4EyZg__",
					}, (res) => {
					    console.log(JSON.stringify(res))
					})
					TUICalling.setUserNickname({
					    nickName: "宋恬"
					},(res) => {
					    console.log(JSON.stringify(res))
					})
					// TUICalling.setUserAvatar({
					//     avatar: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-89da7d7f-14e8-44f6-80b9-7297450dccab/f89f6c87-55cc-4dc0-8c61-7c030b20d37a.jpg',
					// 	},(res) => {
					//     console.log(JSON.stringify(res))
					// })
					TUICalling.call({userID: "xiatian", type: 2})
					
				}
			},
			// phone(){
			// 	var avatar = getApp().globalData.contactDetail.userImage
			// 	var avatar1 = getApp().globalData.contactDetail.doctorImage
					
			// 	if(this.role=='user'){
			// 	TUICalling.login({
			// 	        sdkAppID: 1400672789,
			// 	        userID: "st", 
			// 	        userSig: "eJyrVgrxCdYrSy1SslIy0jNQ0gHzM1NS80oy0zLBwsUlUNHilOzEgoLMFCUrQxMDAzNzI3MLS4hMakVBZlEqUNzU1NTIwMAAIlqSmQsSMzM1NDIxNjUwgpqSmQ40tNDRwyswyz8xx8fYyN*nILnSqCzbPK00IMikysjIwt8lN9I9wDG5rDI8L99WqRYAcGkwZA__",
			// 	}, (res) => {
			// 	    console.log(JSON.stringify(res))
			// 	})
			// 	TUICalling.setUserNickname({
			// 	    nickName: "宋恬"
			// 	},(res) => {
			// 	    console.log(JSON.stringify(res))
			// 	})
			// 	TUICalling.setUserAvatar({
			// 	    avatar: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-89da7d7f-14e8-44f6-80b9-7297450dccab/f89f6c87-55cc-4dc0-8c61-7c030b20d37a.jpg',
			// 		},(res) => {
			// 	    console.log(JSON.stringify(res))
			// 	})	
			// 	TUICalling.call({userID: "xiatian", type: 1})
			// 	}
			// 	else{
			// 		TUICalling.login({
			// 		        sdkAppID: 140067278,
			// 		        userID: "xiatian", 
			// 		        userSig: "eJwtzFELgjAYheH-sttCtuW2JnQhBAWVJkXp5WhTvqIxnJYQ-fdMvTzPgfeDzvtT8DI1ihANMJoPG7SxDZQwcAeqAWWny*uHcg40ikiIMRdULOX4mM5BbXpnjFGM8agNPP-GGaHhgkk*VaDqy*s44W3mUusPRyG3sa*K*7u8ZGp3tWluWXvLyQzoJvHFCn1-u4EyZg__",
			// 		}, (res) => {
			// 		    console.log(JSON.stringify(res))
			// 		})
			// 		TUICalling.setUserNickname({
			// 		    nickName: "夏冬"
			// 		},(res) => {
			// 		    console.log(JSON.stringify(res))
			// 		})
			// 		TUICalling.setUserAvatar({
			// 		    avatar: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-89da7d7f-14e8-44f6-80b9-7297450dccab/f89f6c87-55cc-4dc0-8c61-7c030b20d37a.jpg',
			// 			},(res) => {
			// 			console.log(JSON.stringify(res))
			// 			},(res) => {
			// 		    console.log(JSON.stringify(res))
			// 		})
			// 		TUICalling.call({userID: "st", type: 1})
			// 	}
			// },
			historyCase(){
				uni.navigateTo({
					url:"../../pages/caseHistory/caseHistory"
				})
			},
			pre(){
				uni.navigateTo({
					url:"../../pages/myprescription/myprescription"
				})
			},
			//start to record
			touchstart() {
				var i = 1;
				this.timer = setInterval(() => {
					i++
					this.voicelength = i;
					if (this.timer > 60) {
						clearInterval(this.timer)
					}
				}, 1000)
                
				recorderManager.start();
				
				console.log("start");
			},
			//end of record
			touchend() {
				let that = this
				clearInterval(this.timer);

				recorderManager.stop();
				recorderManager.onStop((res) => {
					let data = {
						voice: res.tempFilePath,
						time: that.voicelength,
					}
					that.send(data, 2);

				});
			},

			focus() {
				this.showEmoji = false;
				this.moreFunction = false;
				console.log('222')
			},

			toSpeak() {
				let that = this
				this.showEmoji = false;
				this.moreFunction = false;
				if (that.istalking) {
					that.istalking = false;
					that.talkUrl = '../../static/submit/voice.png';
				} else {
					that.istalking = true;
					that.talkUrl = '../../static/submit/keyboard.png';
				}
			},
			toEmoji() {
				let that = this
				that.istalking = false;
				that.talkUrl = '../../static/submit/voice.png';
				if (!this.showEmoji) {
					this.showEmoji = true;
					this.moreFunction = false;
				} else {
					this.showEmoji = false;
					this.moreFunction = false;
				}

			},
			toMoreFunction() {
				let that = this
				that.istalking = false;
				that.talkUrl = '../../static/submit/voice.png';
				if (!this.moreFunction) {
					this.moreFunction = true;
					this.showEmoji = false;

				} else {
					this.moreFunction = false;
					this.showEmoji = false;
				}
			},
			//get photo
			sendImg: function(e) {

				let count = 9;
				let that = this;
				if (e == 'album') {
					count = 9; //默认9
				} else {
					count = 1;
				}
				uni.chooseImage({
					count: count,
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: [e], //从相册选择
					success: (res) => {
						let paths = res.tempFilePaths

						for (let i = 0; i < paths.length; i++) {
							uniCloud.uploadFile({
								filePath: paths[i],
								cloudPath: 'sssw' + '.jpg',
								success(res) {
									let imgUrl = res.fileID
									console.log(res);
									that.send(imgUrl, 1)
								},
							})
						}
					}
				});
			},
			send: function(msg, type) {
				let data = {
					message: msg,
					type: type,

				}
				this.$emit('inputs', data);
				setTimeout(() => {
					this.msg = ''
				}, 0);
			},




			inputs: function(e) {
				let that = this
				var content = e.detail.value;
				var pos = content.indexOf('\n');
				if (pos != -1 && content.length > 1) {
					this.msg.replace('\n', '')
					console.log(this.msg)
					that.send(this.msg, 0);
					setTimeout(() => {
						this.msg = ''
					}, 0);

				}
			}

		}
	}
</script>

<style lang="scss">
	.submit {
		background: rgba(244, 244, 244, 0.96);
		width: 100%;
		position: fixed;
		bottom: 0;
		z-index: 100;
		padding-bottom: 6rpx;
	}

	.displayNone {
		display: none;
	}

	// .function-list {
	// 	width: 100%;
	// 	height: 400rpx;

	// }

	.submit-chat {
		width: 100%;
		display: flex;
		align-items: flex-end;
		box-sizing: border-box;
		padding: 14rpx 10rpx;
		border-top: 1px solid #e7e3ea;

		image {
			width: 56rpx;
			height: 56rpx;
			margin: 14rpx 14rpx;
			flex: auto;

		}

		.record {
			text-align: center;

		}

		.btn {
			flex: auto;
			background-color: #FFFFFF;
			border-radius: 10rpx;
			padding: 20rpx;
			max-height: 140rpx;
			margin: 0 10rpx;

		}

	}

	.more {
		width: 100%;

		background: rgba(236, 237, 238, 1);
		box-sizing: border-box;

		.first-line {

			margin-top: 10rpx;

			.function-list {
				width: 24%;
				text-align: center;
				float: left;
				padding-top: 32rpx;
				border: 2rpx solid red;

				image {
					width: 72rpx;
					height: 72rpx;
					padding: 24rpx;
					background: rgba(255, 255, 255, 1);
					border-radius: 24rpx;
				}

				.functionName {
					font-size: 24rpx;
					color: rgba(39, 40, 50, 0.5);
					line-height: 34rpx;
				}
			}
		}

		.second-line {
                  width: 100%;
			

				.function-list2 {
					width: 24%;
					text-align: center;
					float: left;
					padding-top: 32rpx;
					border: 2rpx solid blue;

					image {
						width: 72rpx;
						height: 72rpx;
						padding: 24rpx;
						background: rgba(255, 255, 255, 1);
						border-radius: 24rpx;
					}

					.functionName2 {
						font-size: 24rpx;
						color: rgba(39, 40, 50, 0.5);
						line-height: 34rpx;
					}
				}
			
		}

	}
</style>
