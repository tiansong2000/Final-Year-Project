<template>
	<view>
		<scroll-view class="chat" scroll-y="true" :scroll-into-view="viewIndex" scroll-view
			scroll-with-animation='true'>
			<view class="chat-main">
				<view class="chat-box" v-for="(item,index) in msgList" :key="index" v-if="role==='user'">
					<view class="chattime">{{item.time}}</view>
					<view class="msg msg-left" v-if="item.personId=='a'">
						<image class="userimg" :src="doctorImage"></image>
						<view class="message" v-if="item.type==0">
							<view class="msg-txt">{{item.content}}</view>
						</view>
						<view class="message" v-if="item.type==1">
							<image class="msg-img" :src="item.content" mode="widthFix" @tap='previewImg(item.content)'>
							</image>
						</view>
						<!--voice-->
						<view class="message" v-if="item.type==2">
							<view class="msg-txt voice" :style="{width:item.content.time*4+'rpx'}">
								<image class="voice-img" src="../../static/yy.png"></image>
								{{item.content.time}}
							</view>
						</view>
					</view>
					<view class="msg msg-right" v-if="item.personId=='b'">
						<image class="userimg" :src="userImage"></image>
						<view class="message" v-if="item.type==0">
							<view class="msg-txt">{{item.content}}</view>
						</view>
						<view class="message" v-if="item.type==1">
							<image class="msg-img" :src="item.content" mode="widthFix" @tap='previewImg(item.content)'>
							</image>
						</view>
						<view class="message" v-if="item.type==2" @tap='playVoice(item.content.voice)'>
							<view class="msg-txt voice" :style="{width:item.content.time*4+'rpx'}">
								<image class="voice-img" src="../../static/yy.png"></image>
								{{item.content.time}}
							</view>
						</view>
					</view>
				</view>



            <view class="chat-box" v-for="(item,index) in msgList" :key="index" v-if="role==='doctor'">
            	<view class="chattime">{{item.time}}</view>
            	<view class="msg msg-left" v-if="item.personId=='b'">
            		<image class="userimg" :src="userImage"></image>
            		<view class="message" v-if="item.type==0">
            			<view class="msg-txt">{{item.content}}</view>
            		</view>
            		<view class="message" v-if="item.type==1">
            			<image class="msg-img" :src="item.content" mode="widthFix" @tap='previewImg(item.content)'>
            			</image>
            		</view>
            		<!--voice-->
            		<view class="message" v-if="item.type==2">
            			<view class="msg-txt voice" :style="{width:item.content.time*4+'rpx'}">
            				<image class="voice-img" src="../../static/yy.png"></image>
            				{{item.content.time}}
            			</view>
            		</view>
            	</view>
            	<view class="msg msg-right" v-if="item.personId=='a'">
            		<image class="userimg" :src="doctorImage"></image>
            		<view class="message" v-if="item.type==0">
            			<view class="msg-txt">{{item.content}}</view>
            		</view>
            		<view class="message" v-if="item.type==1">
            			<image class="msg-img" :src="item.content" mode="widthFix" @tap='previewImg(item.content)'>
            			</image>
            		</view>
            		<view class="message" v-if="item.type==2" @tap='playVoice(item.content.voice)'>
            			<view class="msg-txt voice" :style="{width:item.content.time*4+'rpx'}">
            				<image class="voice-img" src="../../static/yy.png"></image>
            				{{item.content.time}}
            			</view>
            		</view>
            	</view>
            </view>
			</view>
			
		</scroll-view>

		<submit @inputs="inputs"></submit>

	</view>
</template>

<script>
	import submit from '../../components/submit/submit.vue';
	const recorderManager = uni.getRecorderManager();

	export default {

		data() {
			return {
				msgList: [],
				img: [],
				doctorName: '',
				doctorId: '',
				doctorImage: '',
				userImage: '',
				viewIndex: '',
				userName:'',
				userImage:'',
				Info:[],
				role:'',
				personId:'',
			}
		},
		onLoad: function(option) {
			var that = this
			if (typeof(option.data) != undefined) {
				this.doctorName = option.doctorName
				this.doctorId = option.doctorId
				this.Info = JSON.parse(decodeURIComponent(option.Info))
				this.doctorImage=this.Info.doctorImage
				this.userName = this.Info.userName
				this.userImage = this.Info.userImage
				this.role = getApp().globalData.userInfo.role
				console.log(this.Info.sex)
				getApp().globalData.contactDetail = this.Info
				console.log(getApp().globalData.contactDetail.sex)
				console.log(this.userImage)
				
				if(that.role =='user'){
				uni.setNavigationBarTitle({
					title: that.doctorName
				});
			}else{
				uni.setNavigationBarTitle({
					title: that.userName
				});
			}
			}
			uni.onWindowResize((res) => {
			    console.log('变化后的窗口宽度=' + res.size.windowWidth)
			    console.log('变化后的窗口高度=' + res.size.windowHeight)
			})

		

			uniCloud.callFunction({
						name: 'getContact', //云函数的名称

						success(res) { //console.log(res)
							that.msgList = res.result.data.data
							console.log(that.msgList)
							for (let i = 0; i < that.msgList.length; i++) {
								if (that.msgList[i].type == 1) {
									that.img.unshift(that.msgList[i].content)
								}
								console.log(that.img)
								
								}

							},
							fail(err) {
								console.error('[云函数] [getContact] 调用失败', err)
							}
						})
						

				},
				components: {
					submit,
				},
				methods: {
					previewImg(e) {
						let index = 0;
						for (let i = 0; i < this.img.length; i++) {
							if (this.img[i] == e) {
								index = i;
							}
						}

						let that = this
						uni.previewImage({
							current: index,
							urls: that.img,
							longPressActions: {
								itemList: ['发送给朋友', '保存图片', '收藏'],
								success: function(data) {
									console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index +
										1) + '张图片');
								},
								fail: function(err) {
									console.log(err.errMsg);
								}
							}
						});
					},
					playVoice(e) {
						const innerAudioContext = uni.createInnerAudioContext();
						innerAudioContext.autoplay = true;
						innerAudioContext.src = e;
						innerAudioContext.onPlay(() => {
							console.log('开始播放');
						});
					},
					inputs: function(e) {
						console.log(e);
						var that=this
						if(that.role=='user'){
							that.personId="b"
						}
						else{
							that.personId="a"
						}
						let data = {
							personId: that.personId,
							content: e.message,
							type: e.type,
							time: new Date().toLocaleString(),

						}
						console.log(this.msgList)
						this.msgList.push(data)
						uniCloud.callFunction({
							name: 'addcontactDetail1', //云函数的名称

							data: {
								personId: that.personId,
								content: e.message,
								type: e.type,
								time: new Date().toLocaleString(),
							},
							success(res) {
								that.$nextTick(() => {
										that.viewIndex = "im_" + that.msgList.length;
									})
 
							},
							fail(err) {
								console.error('[云函数] addorders 调用失败', err)
							}
						})
						console.log(this.msgList)
						if (e.type == 1) {
							this.img.push(e.message)
						}
					},


				}
		}
</script>

<style lang="scss">
	page {
		width: 100%;
		background-color: #f5f5f5;
	}

	.chat {
		height: 100%;
	}

	.chat-main {
		padding-left: 32rpx;
		padding-right: 32rpx;
		padding-top: 10rpx;
		padding-bottom: 120rpx;
		display: flex;
		flex-direction: column;


	}

	.chattime {
		font-size: 20rpx;
		color: #8F8F94;
		line-height: 34rpx;
		padding: 20rpx 0;
		text-align: center;
	}


	.userimg {
		width: 80rpx;
		height: 80rpx;
		border-radius: 20rpx;
	}

	.msg {
		display: flex;
		padding: 20rpx 0;

	}


	.msg-left {
		flex-direction: row;

		.voice {
			min-width: 80rpx;
			max-width: 400rpx;

		}

		.voice-img {
			width: 28rpx;
			height: 36rpx;
			float: left;
			transform: rotate(180deg);
		}

	}

	.message {
		margin-left: 10rpx;
		max-width: 480rpx;
		background-color: #fff;
		border-radius: 20rpx;
		padding-left: 20rpx;
		padding-top: 20rpx;
		padding-bottom: 20rpx;
		padding-right: 20rpx;
		margin-right: 10rpx;
		width: auto;
		display: inline-block;

	}

	.msg-txt {
		font-size: 34rpx;
		font-weight: 400;
		color: rgba(39, 40, 50, 1);
		line-height: 60rpx;
		border-radius: 0 20rpx 20rpx 20rpx;
	}

	.msg-img {
		max-width: 480rpx;
		border-radius: 20rpx;
	}


	.msg-right {
		flex-direction: row-reverse;

		.message {
			background-color: #a6cb53;
		}

		.voice {
			min-width: 80rpx;
			max-width: 400rpx;

		}

		.voice-img {
			width: 28rpx;
			height: 36rpx;
			float: right;

		}
	}
</style>
