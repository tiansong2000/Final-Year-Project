<template>
	<view>
		<view class="container">
			<!--预约时间-->
			<view class="scroll-view scroll-view_H">
				<view class='list' :style="{ width: width + 'px'}">
					<view v-for="(item,index) in calendar" :key="index" @click="select(index)" class='listItem'
						:class='[currentIndex===index? "current":""]'>
						<view class='text name'>{{ item.week }}</view>
						<view class='text date'>{{ item.date }}</view>
					</view>
				</view>
			</view>
			<view class="uni-list" style="margin-left: 30rpx;margin-top: 30rpx;">
						<checkbox-group @change="checkboxChange">
							
							<label class="uni-list-cell uni-list-cell-pd" v-for="item in items" :key="item.value">
								<view style="display: flex; margin-top: 60rpx;">
								<view>
									<checkbox :value="item.value" :checked="item.checked" />
								</view>
								<view >{{item.name}}</view>
								
								</view>
							</label>
						
						</checkbox-group>
					</view>
			<view class="button">
				<button class="confirm" type="primary" @tap="clickConfirm">
					确认
				</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "Scheduling",
		data() {
			return {
				calendar: [],
				maxdays: 14,
				width: 186,
				currentIndex: 0,
				currentTime: 0,
				timeArr: [],
				dateArr: [],
                doctornameEng:'',
				  doctorName:'',
				cur_date: [],
				twoCalendar: [],
				allTimeArr: [],
                date:'',
				doctorInfo:[],
				items: [{
										value: 'USA',
										name: '8:00-8:30'
									},
									{
										value: 'CHN',
										name: '8:30-9:00',
										
									},
									{
										value: 'BRA',
										name: '9:00-9:30'
									},
									{
										value: 'JPN',
										name: '9:30-10:00'
									},
									{
										value: 'ENG',
										name: '10:00-10:30'
									},
									{
										value: 'FRA',
										name: '10:30-11:00'
									},
									{
										value: 'Mid',
										name: '11:30-12:00'
									},
									{
										value: 'TT',
										name: '13:30-14:00'
									}
								]

				
			}

		},
		onLoad: function(option) {
			this.timeArr = this.allTimeArr;
			console.log(this.doctorInfo.image)
			const that = this
			
			const date = new Date();
			const cur_year = date.getFullYear();
			const cur_month = date.getMonth() + 1;
			const cur_date = date.getDate();
			this.cur_date = cur_date;
			const weeks_ch = ['日', '一', '二', '三', '四', '五', '六'];
			//当前月份的天数
			let monthLength = that.getThisMonthDays(cur_year, cur_month)
			// 下个月
			let next_date = 1;
			let next_month = date.getMonth() + 2;
			let next_year = date.getFullYear();
			if (next_month > 12) {
				next_month = 1;
				next_year = date.getFullYear() + 1;
			}
			//下个月份的天数
			let nextMonthLength = that.getThisMonthDays(next_year, next_month)
			//利用构造函数创建对象
			function calendar(date, week, cur_month, cur_year) {
				this.date = [cur_year, cur_month, date].map(that.utils().formatNumber).join('-');
				that.date = this.date
				if (date == cur_date) {
					this.week = "今天";
				} else {
					this.week = '星期' + week;
				}
			}
			//当前月份的第一天是星期几
			let week = that.getFirstDayOfWeek(cur_year, cur_month)
			let x = week;
			for (let i = 1; i <= monthLength; i++) {
				//当循环完一周后，初始化再次循环
				if (x > 6) {
					x = 0;
				}
				//利用构造函数创建对象
				that.twoCalendar[i] = new calendar(i, [weeks_ch[x]][0], cur_month, cur_year)
				x++;
			}
			let next_week = that.getFirstDayOfWeek(next_year, next_month);
			let next_x = next_week;
			for (let i = 1; i <= nextMonthLength; i++) {
				//当循环完一周后，初始化再次循环
				if (next_x > 6) {
					next_x = 0;
				}
				//利用构造函数创建对象
				that.twoCalendar[monthLength + i] = new calendar(i, [weeks_ch[next_x]][0], next_month, next_year)
				next_x++;
			}

			that.getCalenderByDay(that.maxdays, that.cur_date, that.twoCalendar)
           
            
		},

		methods: {
			//确认按钮
			clickConfirm() {
				var that = this;
				var index = that.currentIndex;
				
				uni.showModal({
					title: '提示',
					content: '我的时间表: ' + that.calendar[that.currentIndex].date + '    ' + '可预约时段确认正确',
					success: function(res) {
						var time = that.calendar[that.currentIndex].date + '   ' + that.timeArr[that
							.currentTime].time;
						if (res.confirm) {
							uni.navigateTo({
								url: '../modeselection/modeselection?date='+that.calendar[that.currentIndex].date+'&time='+that.timeArr[that
							.currentTime].time  +'&doctornameEng='+that.doctornameEng+'&doctorName='+that.doctorName+'&doctorInfo='+encodeURIComponent(JSON.stringify(that.doctorInfo))
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			// 获取当月天数
			getThisMonthDays(year, month) {
				return new Date(year, month, 0).getDate();
			},
			// 计算每月第一天是星期几
			getFirstDayOfWeek(year, month) {
				return new Date(Date.UTC(year, month - 1, 1)).getDay();
			},

			utils() {
				const formatTime = date => {
					const year = date.getFullYear()
					const month = date.getMonth() + 1
					const day = date.getDate()
					const hour = date.getHours()
					const minute = date.getMinutes()
					const second = date.getSeconds()

					return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(
						formatNumber).join(':')
				}

				const formatDate = date => {
					const year = date.getFullYear()
					const month = date.getMonth() + 1
					const day = date.getDate()

					return [year, month, day].map(formatNumber).join('-')
				}
				const formatNumber = n => {
					n = n.toString()
					return n[1] ? n : '0' + n
				}
				const dateDiff = (firstDate, secoundDate) => {
					// 如果 firstDate >= secoundDate 返回true 反之 false
					return new Date(firstDate) - new Date(secoundDate) >= 0
				}
				return {
					formatTime,
					formatDate,
					formatNumber,
					dateDiff
				}
			},

			// 日期赋值(原)
			getCalenderByDay(maxDays, current_date, twoCalendar) {
				const that = this
				//限制要渲染的日历数据天数为7天以内（用户体验）
				let flag = twoCalendar.slice(current_date, twoCalendar.length - current_date <= maxDays ? twoCalendar
					.length : (current_date + maxDays))
				that.calendar = flag

				//设置scroll-view的子容器的宽度
				that.width = 186 * parseInt(twoCalendar.length - current_date <= maxDays ? twoCalendar.length : maxDays)
			},

			select: function(index) {
				//为上半部分的点击事件
				this.currentIndex = index
				var that = this
				
			},
			selectTime: function(tindex) {
				//为下半部分的点击事件
				this.currentTime = tindex
			},
			checkboxChange: function (e) {
							var items = this.items,
								values = e.detail.value;
							for (var i = 0, lenI = items.length; i < lenI; ++i) {
								const item = items[i]
								if(values.includes(item.value)){
									this.$set(item,'checked',true)
								}else{
									this.$set(item,'checked',false)
								}
							}
						}
		}
	}
</script>

<style>
	.scroll-view {
		/*height: 128px;*/
		height: 180rpx;
		width: 100%;
		overflow: auto;
	}
	.uni-list-cell {
		justify-content: flex-start;
	}

	.confirm {
		margin-top: 20rpx;
		width: 90%;
	}

	.scroll-view .list {
		display: flex;
		flex-wrap: nowrap;
		justify-content: flex-start;
		width: 1300px;
	}

	.scroll-view .listItem {
		text-align: center;
		width: 200rpx;
		height: 180rpx;
		background-color: #f1f2f6;
		padding-top: 45rpx;
		box-sizing: border-box;
		/* float: left; */
		display: inline-block;
	}

	.scroll-view .listItem text {
		display: block;
	}

	.scroll-view .listItem .name {
		font-size: 21rpx;
	}

	.scroll-view .listItem .date {
		font-size: 21rpx;
	}

	.scroll-view .current {
		background-color: #76aef8;

	}

	.scroll-view .current .text {
		color: #fff;
	}

	.time {
		width: 95%;
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		margin: 0 auto;
		margin-top: 30px;
	}

	.time .listItem {
		width: 25%;
		height: 100px;
		text-align: center;
		box-sizing: border-box;
		background-color: #fff;
		padding-top: 40rpx;
		border: 1px solid #b9c1c8;
	}

	.time .listItem text {
		display: block;
		font-size: 50rpx;
	}

	.time .current {
		background-color: #6eb92b;
		border: 1px solid #6eb92b;
	}

	.time .current .text {
		color: #fff;
	}

	.operate button {
		width: 300px;
		height: 88px;
		background-color: #fff;
	}

	.operate .del {

		color: #e54449;
	}

	.operate button::after {
		border: 2px solid #e54449;
	}

	.operate {
		display: flex;
		flex-wrap: nowrap;
		justify-content: space-around;
	}

	.operate button:nth-child(2):after {
		border: 2px solid #e54449;
	}

	.operate .save {
		color: #fff;
		background-color: #e54449;

	}

	.operate {
		width: 100%;
		padding: 30px 0;
		background-color: #fff;
		position: fixed;
		bottom: 0;
	}
</style>

