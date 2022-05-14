<template>
	<view>
		<view class="top">
			<view class="top-left">
				<view class="name">{{doctorDetail.doctorname}}</view>
				<view class="title">{{doctorDetail.title}}</view>
				<view class="department">{{doctorDetail.department}}</view>
				<view class="hospital">独墅湖医院</view>
			</view>
			<view class="top-right">
				<image class='pic' :src="doctorDetail.image" mode="aspectFill"></image>
					
			</view>
		</view>
		<view class="middle">
			<view class="icon_text">
				<image class="icon1" src="../../static/disease.png"></image>
				<text class="text1">擅长疾病</text>
				<image src="../../static/doctorlistDetail/close.png" class="icon" :class="{displayNone:showMore1}"
					@tap="showSpecialist"></image>
				<image src="../../static/doctorlistDetail/open.png" class="icon" :class="{displayNone:!showMore1}"
					@tap="showSpecialist">
				</image>
			</view>
			<view class="specific-area">{{doctorDetail.specialist}}</view>

		</view>
		<view class="bottom">
			<view class="icon_text">
				<image class="icon1" src="../../static/personaldetail.png"></image>
				<text class="text1">个人简历</text>
				<image src="../../static/doctorlistDetail/close.png" class="icon" :class="{displayNone:showMore2}"
					@tap="showPersonal"></image>
				<image src="../../static/doctorlistDetail/open.png" class="icon" :class="{displayNone:!showMore2}"
					@tap="showPersonal"></image>
			</view>
			<view class="personal-introduction">{{doctorDetail.detail}}</view>
		</view>
		<!-- <view>问诊方式</view>
		<view class="out-patient-method">

			<view class="Message">
				<image class="icon2" src="../../static/消息.png" @tap="toContact"></image>
				<view class='txt'>图文问诊</view>
			</view>
			<view class="Video">
				<image class="icon2" src="../../static/电话.png"></image>
				<view class='txt'>语音问诊</view>
			</view>
			<view class="Audio">
				<image class="icon2" src="../../static/视频.png"></image>
				<view class='txt'>视频问诊</view>
			</view>
		</view> -->
		<view>预约时间表</view>
		<view class="timetable">
			<view class="current-timeslot">

				<view class="uni-input">
					<text class="uni-inputdate" @tap="toReservationTable(0)">{{todaydate}}</text>
					<text class="uni-inputweek">{{todayWeek}}</text>
				</view>
				<view class="uni-input">
					<text class="uni-inputdate" @tap="toReservationTable(1)">{{dateplus1}}</text>
					<text class="uni-inputweek">{{weekplus1}}</text>
				</view>
				<view class="uni-input">
					<text class="uni-inputdate">{{dateplus2}}</text>
					<text class="uni-inputweek">{{weekplus2}}</text>
				</view>
				<view class="uni-input">
					<text class="uni-inputdate">{{dateplus3}}</text>
					<text class="uni-inputweek">{{weekplus3}}</text>
				</view>
				<view class="uni-input">
					<text class="uni-inputdate">{{dateplus4}}</text>
					<text class="uni-inputweek">{{weekplus4}}</text>
				</view>
				<view class="uni-input">
					<text class="uni-inputdate">{{dateplus5}}</text>
					<text class="uni-inputweek">{{weekplus5}}</text>
				</view>
			</view>





		</view>
	</view>
</template>

<script>
	export default {
		data() {

			return {
				doctorDetail: [],
				showMore1: false,
				showMore2: false,
				time: '12:01',
				todaydate: '',
				todayWeek: '',
				dateplus1: '',
				weekplus1: '',
				dateplus2: '',
				weekplus2: '',
				dateplus3: '',
				weekplus3: '',
				dateplus4: '',
				weekplus4: '',
				dateplus5: '',
				weekplus5: ''
			}
		},
		onLoad: function(option) {
			let that = this
			this.doctorDetail = JSON.parse(decodeURIComponent(option.data))
			console.log(this.doctorDetail.image)

			var date1 = new Date();
			var time1 = date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-" + date1
				.getDate(); //time1表示当前时间
			var date2 = new Date(date1);
			date2.setDate(date1.getDate() + 1);

			var date3 = new Date(date2);
			date3.setDate(date2.getDate() + 1);

			var date4 = new Date(date3);
			date4.setDate(date3.getDate() + 1);

			var date5 = new Date(date4);
			date5.setDate(date4.getDate() + 1);
			
			var date6 = new Date(date5);
			date6.setDate(date5.getDate() + 1);

			var time2 = date2.getFullYear() + "-" + (date2.getMonth() + 1) + "-" + date2.getDate();
			var time3 = date3.getFullYear() + "-" + (date3.getMonth() + 1) + "-" + date3.getDate();
			var time4 = date4.getFullYear() + "-" + (date4.getMonth() + 1) + "-" + date4.getDate();
			var time5 = date5.getFullYear() + "-" + (date5.getMonth() + 1) + "-" + date5.getDate();
			var time6 = date6.getFullYear() + "-" + (date6.getMonth() + 1) + "-" + date6.getDate();
			this.todaydate = time1
			this.dateplus1 = time2
			this.dateplus2 = time3
			this.dateplus3 = time4
			this.dateplus4 = time5
            this.dateplus5 = time6

			const weeks = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
			this.todayWeek = weeks[new Date().getDay()];
			this.weekplus1 = weeks[date2.getDay()];
			this.weekplus2 = weeks[date3.getDay()];
			this.weekplus3 = weeks[date4.getDay()];
			this.weekplus4 = weeks[date5.getDay()];
			this.weekplus5 = weeks[date6.getDay()];
			var month = month > 9 ? month : '0' + month;
			var day = day > 9 ? day : '0' + day;

		},

		methods: {
			showSpecialist() {
				this.showMore1 = !this.showMore1
			},
			showPersonal() {
				this.showMore2 = !this.showMore2
			},
			bindTimeChange: function(e) {
				this.time = e.target.value
			},
			toReservationTable(index) {
				var that =this
				console.log(that.doctorDetail.doctorname)
				uni.navigateTo({
					url: '../reservationTable/reservationTable?data='+that.doctorDetail.doctornameEng+ '&doctorName='+that.doctorDetail.doctorname+'&doctorInfo='+encodeURIComponent(JSON.stringify(that.doctorDetail))
				})
			},


			toContact() {
				uni.navigateTo({
					url: '../contactDetail/contactDetail?data=' + encodeURIComponent(JSON
						.stringify(this.doctorDetail)),

				})
			},
		}
	}
</script>

<style>
	page {
		width: 100%;
		weight: auto;

	}

	.displayNone {
		display: none;
	}

	.top {
		padding: 30rpx 30rpx;
		height: 300rpx;
		box-shadow: 0 0 30px 3px #FFFFFF;
		display: flex;
	}

	.top-left {
		width: 65%;
        margin-left: 30rpx;
	}

	.uni-input {}

	.current-timeslot {
		text-align: center;
		font-size: 40rpx;
	}

	.uni-inputweek {}

	.uni-inputdate {}

	.name {
		margin-top: 10rpx;
		font-size: 60rpx;
	}

	.title {
		margin-top: 20rpx;
		font-size: 30rpx;

	}

	.department {
		margin-top: 20rpx;
		font-size: 30rpx;
	}

	.hospital {
		margin-top: 30rpx;
	}

	.top-right {
		width: 40%;
	}

	.pic {
		margin-top: 35rpx;
		width: 70%;
		height: 80%;
		margin-left: 40rpx;
	}

	.middle {

		padding: 30rpx 30rpx;
	}

	.icon1 {
		width: 100rpx;
		height: 100rpx;
	}

	.icon {
		width: 40rpx;
		height: 40rpx;
		margin-top: 32rpx;
	}

	.icon_text {
		display: flex;
	}

	.text1 {
		
		margin-top: 20rpx;
	}

	.bottom {

		padding: 30rpx 30rpx;
	}

	/* 	.out-patient-method {
		padding: 30rpx 30rpx;
		border: 2rpx solid red;
		height: 200rpx;
		display: flex;
	}

	.Message {
		width: 33%;
		border: 2rpx solid #0000FF;

	}

	.Audio {
		width: 33%;
		border: 2rpx solid #0000FF;
	}

	.Video {
		width: 33%;
		border: 2rpx solid #0000FF;
	}

	.txt {
		margin-top: 15rpx;
		margin-left: 35rpx;
	}

	.icon2 {
		width: 100rpx;
		height: 100rpx;
		margin-left: 60rpx;
		margin-top: 10rpx;
	} */
</style>
