<template>
	<view class="emoji">
		<view class="emoji-line" v-for="(line,i) in emoji" :key="i">
			<view class="each-emoji" v-for="(item,index) in line" :key="index" @tap="clickEmoji(item)">
				{{item}}
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				emoji:[
					['😀','😁','😂','🤣','😃','😄','😅','😉'],
					['😊','😗','😖','😭','😳','🤧','😈','💀'],
					['💩','👫','👀','👠','👧🏼','👩','👩‍🍳','💪🏽'],
					['👈','🤞🏼','👌🏼','👍🏿','👏🏻','🙏🏾','🙉','❤','💚'],
					['🎵','💯','🈚','🌹','🥀','🐶','🏃🏻‍♀️','💃','💏'],
					['👨‍👩‍👧','🚩','🏳','🏳️‍🌈','🕚','📢','🔔','▶️'],
					['🍇','🍉','🍑','🍗','🍳','🍦','😱','😵','😷'],
					['🍇','🍉','🍑','🍗','🍳','🍦','😱','😵','😷']
				]
			}
		},
		
		methods: {
			clickEmoji(e){
			this.$emit('emotion',e)	
			}
			
		}
	}
</script>

<style lang="scss">
	
.emoji{
	width:100%;
	height: 460rpx;
	padding: 16rpx 12rpx;
	box-sizing: border-box;
	overflow: hidden;
	overflow-y: auto;
	.emoji-line{
		display: flex;
		margin-top: 20rpx;
		.each-emoji{
			flex:1;
			text-align: center;
		}
	}
}
</style>
