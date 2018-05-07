<template>
	<aby-pull page="index" ref="pull">
		<aby-header slot="header">
			<div slot="back"></div>
			<header-select slot="select" title="全部询价" @eventSelectBack="eventBack" :selectList="selectList"></header-select>
			<aby-icon slot="right" class="mui-icon mui-pull-right icon-plus" type="plus" @click.native="onPubish"></aby-icon>
			
		</aby-header>
		<div slot="navbar"></div>
		<div class="list-item" slot="loadlist" ref="loadlist">
			<aby-no-content v-if="noContent"></aby-no-content>
			<div class="mui-card space" v-for="(li,i) in list">
				<div class="mui-card-header mui-card-media">
					<img :src="li.publisher.cpLogo">
					<div class="mui-media-body mui-ellipsis">
						{{li.publisher.cpName}}
						<p class="time">{{li.publishTime | filterConvertDateFromNowBy13}}</p>
						<aby-icon-color class="ptype" v-if="li.selectType == 10" type="line"></aby-icon-color>
						<aby-icon-color class="ptype" v-if="li.selectType == 20" type="hotel"></aby-icon-color>
						<aby-icon-color class="ptype" v-if="li.selectType == 30" type="pticket"></aby-icon-color>
						<aby-icon-color class="ptype" v-if="li.selectType == 40" type="planhotel"></aby-icon-color>
						<aby-icon-color class="ptype" v-if="li.selectType == 50" type="sticket"></aby-icon-color>
						<aby-icon-color class="ptype" v-if="li.selectType == 60" type="guide"></aby-icon-color>
					</div>
				</div>
				<div class="mui-card-content" v-if="li.selectType == 10 || li.selectType == 30">
					<div class="mui-card-content-inner mui-navigate-right" @click="toDetail(li.selectId)">
						<h5>{{li.fromCity}}→{{li.goCity}}</h5>
						<p>航程类型：{{li.ticketType}}</p>
						<p>出行时间：{{li.outServTime}}</p>
						<p>人数：{{li.peopleNum}}成人 <span v-if="li.childNum!=0">{{li.childNum}}儿童</span></p>
						<p v-if="li.selectType == 10">天数：{{li.selectDays}}天</p>
						<p v-if="li.selectType == 10">交通方式：{{li.trafficTypeName}}</p>
					</div>
				</div>
				<div class="mui-card-content" v-if="li.selectType == 20">
					<div class="mui-card-content-inner mui-navigate-right" @click="toDetail(li.selectId)">
						<p>入住时间：{{li.liveTime|filterConvertDate}}</p>
						<p>离店时间：{{li.leaveTime|filterConvertDate}}</p>
						<p>房间数：{{li.roomNum}}间</p>
						<p>酒店标准：{{li.hotelStar}}</p>
					</div>
				</div>
				<div class="mui-card-content" v-if="li.selectType == 40">
					<div class="mui-card-content-inner mui-navigate-right" @click="toDetail(li.selectId)">
						<h5>我需要{{li.hotelAddress}}的酒店</h5>
						<p>出行时间：{{li.outServTime}}</p>
						<p>人数：{{li.peopleNum}}成人 <span v-if="li.childNum!=0">{{li.childNum}}儿童</span></p>
						<p>天数：{{li.selectDays}}天</p>
						<p>入住时间：{{li.liveTime|filterConvertDate}}</p>
						<p>离店时间：{{li.leaveTime|filterConvertDate}}</p>
						<p>房间数：{{li.roomNum}}间</p>
						<p>酒店标准：{{li.hotelStar}}</p>
					</div>
				</div>
				<div class="mui-card-content" v-if="li.selectType == 50">
					<div class="mui-card-content-inner mui-navigate-right" @click="toDetail(li.selectId)">
						<h5>我需要预定去{{li.scenicName}}的景点门票</h5>
						<p>游玩时间：{{li.playScenicTime|filterConvertDate}}</p>
						<p>人数：{{li.peopleNum}}成人 <span v-if="li.childNum!=0">{{li.childNum}}儿童</span></p>
					</div>
				</div>
				<div class="mui-card-content" v-if="li.selectType == 60">
					<div class="mui-card-content-inner mui-navigate-right" @click="toDetail(li.selectId)">
						<h5>{{li.title}}</h5>
						<p>目的地：{{li.pbRoadLine}}</p>
						<p>接团地：{{li.pbAddress}}</p>
						<p>出行时间：{{li.playScenicTime|filterConvertDate}}</p>
						<p>天数：{{li.pbDays}}</p>
					</div>
				</div>
				<div class="mui-card-footer">浏览（{{li.readCnt}}）
					<span class="clock font-clock">
						<aby-icon-color type="clock"></aby-icon-color>
						<span :id="li.selectId"></span>
					</span>
				</div>
			</div>
		</div>
	</aby-pull>
</template>

<script>
	import HeaderSelect from '../../components/Header/Select.vue'

	export default {
		components: {
			HeaderSelect
		},
		data() {
			return {
				list: [],
				noContent:false,
				pageNum: 1,
				where: {},
				selectType: '',
				isPrice: '',
				scrollTop: '',
				selectList: [{
						title: '全部询价',
						value: ''
					},
					{
						title: '线路询价',
						value: 10
					},
					{
						title: '酒店询价',
						value: 20
					},
					{
						title: '机票询价',
						value: 30
					},
					{
						title: '机+酒询价',
						value: 40
					},
					{
						title: '门票询价',
						value: 50
					},
					{
						title: '导游服务',
						value: 60
					},
				], // 询价类型

			}
		},
		methods: {
			scroll(top) {
				this.scrollTop = top;
			},
			getPullDown(callback) {
				let reqInfo = {};
				reqInfo.loading = 1; //不显示接口加载动画
				reqInfo.pageNum = this.pageNum = 1;
				reqInfo.isPrice = this.isPrice;
				reqInfo.selectState = 10;
				reqInfo.selectType = this.selectType;
				reqInfo.where = this.where;

				this.$abyApi.Select.getPublishList(reqInfo, (res) => {
					this.$refs.pull.closeLoading();
					this.list = res.cpSelectList;
					callback && callback(this.list);
				}, (err) => {
					callback && callback(false);
				});
			},
			getPullUp(callback) {
				let reqInfo = {};
				reqInfo.loading = 1;
				reqInfo.pageNum = this.pageNum = ++this.pageNum;
				reqInfo.isPrice = this.isPrice;
				reqInfo.selectState = 10;
				reqInfo.selectType = this.selectType;
				reqInfo.where = this.where;

				this.$abyApi.Select.getPublishList(reqInfo, (res) => {
					this.list = this.list.concat(res.cpSelectList);
					callback && callback(this.list);
				}, (err) => {
					callback && callback(false);
				});
			},
			eventBack(e) {
				this.$refs.pull.showLoading();
				this.lists = [];
				this.scrollTop = 0;
				this.pageNum = 1;
				this.selectType = e.value;
				this.getPullDown();
			},
			// 查看详情
			toDetail(id) {
				this.$router.push({
					name: 'purchaseDetails',
					params: {
						selectId: id
					}
				});
			},
			// 发布询价
			onPubish() {
				this.$router.push({
					name: 'purchasePublish'
				});
			},
			// 采购图标显示
			selectIcon(type){
				switch(parseInt(type)){
					case 10: return 'line';break;
					case 20: return 'hotel';break;
					case 30: return 'pticket';break;
					case 40: return 'planhotel';break;
					case 50: return 'sticket';break;
					case 60: return 'guid';break;
				}
			},
		},
		mounted() {
			// 底部导航栏
			this.$parent.eventPageShow(this.$route.name);
			this.getPullDown();
		},
		updated() {
			//初始化倒计时
			for(var i = 0, len = this.list.length; i < len; i++) {
				if(this.list[i].selectState == 10)
					this.$tool.countdown(this.list[i].endTime, this.list[i].selectId);
			}
		},
		activated() {
			// 底部导航栏
			this.$parent.eventPageShow(this.$route.name);
		},
		watch: {
			list(val) {
				this.noContent = val.length == 0;
				this.list = val;
			}
		}
	}
</script>
<style scoped>
	.mui-card {
		font-size: 14px;
		margin: 10px!important;
		border-radius: 0px;
		background-color: #fff;
		-webkit-box-shadow: 0px 0px 3px 0px rgba(187, 187, 187, .6);
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0);
		line-height: 20px;
		border-radius: 4px;
		box-shadow: 0px 0px 3px 0px rgba(187, 187, 187, .6);
		border: 1px solid rgba(255, 255, 255, 1);
	}
	
	.mui-card p {
		margin: 0px;
	}
	
	.mui-card h5 {
		color: #232323;
		font-weight: 500;
	}
	
	.mui-media-body {
		padding-right: 30px;
	}
	
	.mui-card-footer {
		color: #232323;
	}
	
	.time span {
		float: right;
	}
	
	/*询价类型*/
	
	.ptype {
		position: absolute;
		width: 24px;
		height: 24px;
		right: 0px;
		top: 8px;
	}
</style>