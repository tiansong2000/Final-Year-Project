<template>
	<view class="info-page">
		<view class="title">个人信息表</view>
		<view class="input">
			<view class="name">
				<label class="a">
					姓名:
				</label>
				<input class="b" @blur="enterName" />
			</view>

			<view class="sex">
				<picker @change="bindPickerChange" :range="array">
					<label>性别：</label>
					<label class="">{{array[index]}}</label>
				</picker>
			</view>
			<view class="alergic">
				<picker @change="bindPickerChange6" :range="array3">
					<label>民族：</label>
					<label class="">{{array3[index6]}}</label>
				</picker>
			</view>
			<view class="birth">

				<picker mode="date" :value="date" fields="month" :start="startDate" :end="endDate" @change="dateChange">
					<label>出生年月：</label>
					<label>{{date}}</label>
				</picker>
			</view>
			<view class="alergic">
				<picker @change="bindPickerChange1" :range="array1">
					<label>是否有过敏史：</label>
					<label class="">{{array1[index1]}}</label>
				</picker>
				<view class="alergic">
					<picker @change="bindPickerChange2" :range="array2">
						<label>是否有过重大疾病：</label>
						<label class="">{{array2[index2]}}</label>
					</picker>
				</view>
				<view class="alergic">
					<picker @change="bindPickerChange3" :range="array1">
						<label>是否家族有遗传疾病：</label>
						<label class="">{{array1[index3]}}</label>
					</picker>
				</view>
				<view class="alergic">
					<picker @change="bindPickerChange4" :range="array1">
						<label>婚否：</label>
						<label class="">{{array1[index4]}}</label>
					</picker>
				</view>

			</view>

		</view>
		<button class='btn' type="primary" @click="confirm()">Confirm</button>
	</view>
</template>

<script>
	export default {
		data() {
			const currentDate = this.getDate({
				format: 'yyyy-mm'
			})
			return {
				name: '',
				array: ['请选择', '男', '女 '],
				index: 0,
				date: currentDate,
				array1: ['请选择', '是', '否'],
				index1: 0,
				array2: ['请选择', '无', '心脏病', '糖尿病', '精神疾病', '先天性疾病'],
				index2: 0,
				index3: 0,
				index4: 0,
				index6: 0,
				array3: ['请选择', '汉族', '蒙古族', '回族', '藏族', '苗族', '维吾尔', '彝族', '壮族', '布依族'],
				name: '',
				sex: '',
				nationality: '',
				isAllergic: '',
				hasSickness: '',
				hasfamilySick: '',
				ismarriged: '',
			}
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},

		methods: {
			enterName: function(event) {
				this.name = event.target.value
				console.log(this.name)
			},
			confirm() {
				var that = this
				

				if (this.name == '' || this.index == 0 || this.index1 == 0 || this.index2==0 || this.index3 == 0 || this
					.index4 == 0 || this.index6 == 0) {
						console.log(this.name)
						console.log(this.index1)
						console.log(this.index2)
						console.log(this.index3) 
						console.log(this.index4)
						console.log(this.index6) 
						console.log(this.index)
					uni.showModal({
						title: '提示',
						content: '请填写完整个人信息',
						showCancel: false,

					});
				} else {
					uni.showModal({
						title: '提示',
						content: '确认填写正确',
						showCancel: false,
						success: function(res) {
							
							if (res.confirm) {
								uniCloud.callFunction({
									name: 'adduserInfo',
									data: {

					
											name: that.name,
											sex: that.sex,
											nationality: that.nationality,
											date: that.date,
											isAllergic: that.isAllergic,
											hasSickness: that.hasSickness,
											hasfamilySick: that.hasfamilySick,
											ismarriged: that.ismarriged,
											id:getApp().globalData.userInfo._id

										
									},
									success(res) {
										uni.showModal({
											showCancel: false,
											content: "个人信息添加成功"
										})
										uni.switchTab({
							
											url: '../my1/my1'
										})
									},
									fail(e) {
										console.error(e)
										uni.showModal({
											showCancel: false,
											content: 'Fail，请稍后再试'
										})
									}
								})
								
							} else if (res.cancel) {

							}
						}
					});
				}
			},
			dateChange(e) {
				this.date = e.target.value.slice(0, 7);
				console.log(this.date.slice(0, 7));
			},
			bindPickerChange: function(e) { //改变的事件名
				//console.log('picker发送选择改变，携带值为', e.target.value)   用于输出改变索引值
				this.index = e.target.value //将数组改变索引赋给定义的index变量
				this.sex = this.array[this.index] //将array【改变索引】的值赋给定义的jg变量
					console.log(this.sex )		//输出获取的籍贯值，例如：中国
					console.log()		//输出获取的籍贯值，例如：中国
			},
			bindPickerChange1: function(e) { //改变的事件名
				//console.log('picker发送选择改变，携带值为', e.target.value)   用于输出改变索引值
				this.index1 = e.target.value //将数组改变索引赋给定义的index变量
				this.isAllergic = this.array1[this.index1] //将array【改变索引】的值赋给定义的jg变量
				//	console.log("籍贯为：",this.jg)		//输出获取的籍贯值，例如：中国
			},
			bindPickerChange2: function(e) { //改变的事件名
				//console.log('picker发送选择改变，携带值为', e.target.value)   用于输出改变索引值
				this.index2 = e.target.value //将数组改变索引赋给定义的index变量
				this.hasSickness = this.array2[this.index2] //将array【改变索引】的值赋给定义的jg变量
				//	console.log("籍贯为：",this.jg)		//输出获取的籍贯值，例如：中国
			},
			bindPickerChange3: function(e) { //改变的事件名
				//console.log('picker发送选择改变，携带值为', e.target.value)   用于输出改变索引值
				this.index3 = e.target.value //将数组改变索引赋给定义的index变量
				this.hasfamilySick = this.array1[this.index3] //将array【改变索引】的值赋给定义的jg变量
				//	console.log("籍贯为：",this.jg)		//输出获取的籍贯值，例如：中国
			},
			bindPickerChange4: function(e) { //改变的事件名
				//console.log('picker发送选择改变，携带值为', e.target.value)   用于输出改变索引值
				this.index4 = e.target.value //将数组改变索引赋给定义的index变量
				this.ismarriged = this.array1[this.index4] //将array【改变索引】的值赋给定义的jg变量
				//	console.log("籍贯为：",this.jg)		//输出获取的籍贯值，例如：中国
			},
			bindPickerChange6: function(e) { //改变的事件名
				//console.log('picker发送选择改变，携带值为', e.target.value)   用于输出改变索引值
				this.index6 = e.target.value //将数组改变索引赋给定义的index变量
				this.nationality = this.array3[this.index6] //将array【改变索引】的值赋给定义的jg变量
				//	console.log("籍贯为：",this.jg)		//输出获取的籍贯值，例如：中国
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;
				// day = day > 9 ? day : '0' + day;
				return `${year}-${month}`;
			}
		}
	}
</script>

<style>
	.info-page {
		margin-top: 50rpx;    
		font-size: 40rpx;
		
	}
	.title {
		text-align: center;
	}
	.input{
		margin-left: 40rpx;
	}

	.name {
		display: flex;
		font-size: 45rpx;
		margin-top: 70rpx;
		height: 60rpx;

	}

	.btn {
		margin-top: 300rpx;
		width: 90%;
	}

	.a {
		justify-content: center;

	}

	.b {
		font-size: 45rpx;
	}

	.sex {
		font-size: 45rpx;
		margin-top: 20rpx;
		height: 60rpx;
	}

	.birth {

		font-size: 45rpx;
		margin-top: 20rpx;
		height: 60rpx;
		
	}

	.input {}

	.alergic {
		font-size: 45rpx;
		margin-top: 20rpx;
		height: 60rpx;
	}
</style>
