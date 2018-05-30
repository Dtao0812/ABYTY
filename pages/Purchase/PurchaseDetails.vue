<template>
	<aby-page ref="page">
		<aby-header title="询价详情" slot="header"></aby-header>
		<div slot="content" class="mui-content">
			<div class="aby-detail" v-if="data">
				<div class="aby-detail-header font-clock">
					<aby-icon type="clock" class="clock"></aby-icon>
					<span :id="data.selectId">计算中...</span>
					<aby-icon-color class="ptype mui-pull-right" v-if="data.selectType == 10" type="line"></aby-icon-color>
					<aby-icon-color class="ptype mui-pull-right" v-if="data.selectType == 20" type="hotel"></aby-icon-color>
					<aby-icon-color class="ptype mui-pull-right" v-if="data.selectType == 30" type="pticket"></aby-icon-color>
					<aby-icon-color class="ptype mui-pull-right" v-if="data.selectType == 40" type="planhotel"></aby-icon-color>
					<aby-icon-color class="ptype mui-pull-right" v-if="data.selectType == 50" type="sticket"></aby-icon-color>
					<aby-icon-color class="ptype mui-pull-right" v-if="data.selectType == 60" type="guide"></aby-icon-color>
				</div>
				<div class="aby-detail-line"></div>
				<div class="aby-detail-content">
					<!--线路询价-->
					<ul class="mui-table-view" v-if="data.selectType == 10">
						<h4>{{data.fromCity}}→{{data.goCity}}</h4>
						<li class="mui-table-view-cell mui-media">
							<a href="javascript:;">
								<div class="mui-media-object mui-pull-left">目的地</div>
								<div class="mui-media-body mui-text-right">{{data.goCity}}</div>
							</a>
						</li>
						<li class="mui-table-view-cell mui-media">
							<a href="javascript:;">
								<div class="mui-media-object mui-pull-left">出发地</div>
								<div class="mui-media-body mui-text-right">{{data.fromCity}}</div>
							</a>
						</li>
						<li class="mui-table-view-cell mui-media">
							<a href="javascript:;">
								<div class="mui-media-object mui-pull-left">出行时间</div>
								<div class="mui-media-body mui-text-right">{{data.fromTime|filterConvertDate}}</div>
							</a>
						</li>
						<li class="mui-table-view-cell mui-media">
							<a href="javascript:;">
								<div class="mui-media-object mui-pull-left">行程天数</div>
								<div class="mui-media-body mui-text-right">{{data.selectDays}}天</div>
							</a>
						</li>
						<li class="mui-table-view-cell mui-media">
							<a href="javascript:;">
								<div class="mui-media-object mui-pull-left">人数</div>
								<div class="mui-media-body mui-text-right">{{data.peopleNum}}成人 <span v-if="data.childNum!=0">{{data.childNum}}儿童</span></div>
							</a>
						</li>
						<li class="mui-table-view-cell mui-media">
							<a href="javascript:;">
								<div class="mui-media-object mui-pull-left">交通方式</div>
								<div class="mui-media-body mui-text-right">{{data.trafficTypeName}}</div>
							</a>
						</li>
					</ul>
					<!--机票询价-->
					<ul class="mui-table-view" v-if="data.selectType == 30||data.selectType == 40">
						<h4 v-if="data.selectType == 30">{{data.fromCity}}→{{data.goCity}}</h4>
						<h4 v-if="data.selectType == 40">预定{{data.goCity}}的机票和酒店</h4>
						<li class="mui-table-view-cell mui-media">
							<a href="javascript:;">
								<div class="mui-media-object mui-pull-left">出发地</div>
								<div class="mui-media-body mui-text-right">{{data.fromCity}}</div>
							</a>
						</li>
						<li class="mui-table-view-cell mui-media">
							<a href="javascript:;">
								<div class="mui-media-object mui-pull-left">目的地</div>
								<div class="mui-media-body mui-text-right">{{data.goCity}}</div>
							</a>
						</li>
						<li class="mui-table-view-cell mui-media">
							<a href="javascript:;">
								<div class="mui-media-object mui-pull-left">航程类型</div>
								<div class="mui-media-body mui-text-right">{{data.ticketType}}</div>
							</a>
						</li>
						<li class="mui-table-view-cell mui-media">
							<a href="javascript:;">
								<div class="mui-media-object mui-pull-left">出行时间</div>
								<div class="mui-media-body mui-text-right">{{data.fromTime | filterConvertDate}}</div>
							</a>
						</li>
						<!--航程类型为单程的时候没有返回时间-->
						<li class="mui-table-view-cell mui-media" v-if="data.backTime!='0'">
							<a href="javascript:;">
								<div class="mui-media-object mui-pull-left">返程时间</div>
								<div class="mui-media-body mui-text-right">{{data.backTime | filterConvertDate}}</div>
							</a>
						</li>
						<li class="mui-table-view-cell mui-media">
							<a href="javascript:;">
								<div class="mui-media-object mui-pull-left">人数</div>
								<div class="mui-media-body mui-text-right">{{data.peopleNum}}成人 <span v-if="data.childNum!=0">{{data.childNum}}儿童</span></div>
							</a>
						</li>
					</ul>
					<!--酒店询价-->
					<ul class="mui-table-view" v-if="data.selectType == 20||data.selectType == 40">
						<h4 v-if="data.selectType == 20">预定{{data.hotelAddress}}的酒店</h4>
						<li class="mui-table-view-cell mui-media" v-if="data.hotelAddress">
							<a href="javascript:;">
								<div class="mui-media-object mui-pull-left">酒店地点</div>
								<div class="mui-media-body mui-text-right">{{data.hotelAddress}}</div>
							</a>
						</li>
						<li class="mui-table-view-cell mui-media">
							<a href="javascript:;">
								<div class="mui-media-object mui-pull-left">入住时间</div>
								<div class="mui-media-body mui-text-right">{{data.liveTime | filterConvertDate}}</div>
							</a>
						</li>
						<li class="mui-table-view-cell mui-media">
							<a href="javascript:;">
								<div class="mui-media-object mui-pull-left">离店时间</div>
								<div class="mui-media-body mui-text-right">{{data.leaveTime | filterConvertDate}}</div>
							</a>
						</li>
						<li class="mui-table-view-cell mui-media">
							<a href="javascript:;">
								<div class="mui-media-object mui-pull-left">房间数</div>
								<div class="mui-media-body mui-text-right">{{data.roomNum}}间</div>
							</a>
						</li>
						<li class="mui-table-view-cell mui-media">
							<a href="javascript:;">
								<div class="mui-media-object mui-pull-left">酒店标准</div>
								<div class="mui-media-body mui-text-right">{{data.hotelStar}}</div>
							</a>
						</li>
					</ul>
					<!--景点询价-->
					<ul class="mui-table-view" v-if="data.selectType == 50">
						<h4>预定{{data.scenicName}}景点门票</h4>
						<li class="mui-table-view-cell mui-media">
							<a href="javascript:;">
								<div class="mui-media-object mui-pull-left">景点名称</div>
								<div class="mui-media-body mui-text-right">{{data.scenicName}}</div>
							</a>
						</li>
						<li class="mui-table-view-cell mui-media">
							<a href="javascript:;">
								<div class="mui-media-object mui-pull-left">游玩时间</div>
								<div class="mui-media-body mui-text-right">{{data.playScenicTime | filterConvertDate}}</div>
							</a>
						</li>
						<li class="mui-table-view-cell mui-media">
							<a href="javascript:;">
								<div class="mui-media-object mui-pull-left">人数</div>
								<div class="mui-media-body mui-text-right">{{data.peopleNum}}成人 <span v-if="data.childNum!=0">{{data.childNum}}儿童</span></div>
							</a>
						</li>
					</ul>
					<!--导游询价-->
					<ul class="mui-table-view" v-if="data.selectType == 60">
						<h4>{{data.pbTitle}}</h4>
						<li class="mui-table-view-cell mui-media">
							<a href="javascript:;">
								<div class="mui-media-object mui-pull-left">目的地</div>
								<div class="mui-media-body mui-text-right">{{data.pbRoadLine}}</div>
							</a>
						</li>
						<li class="mui-table-view-cell mui-media">
							<a href="javascript:;">
								<div class="mui-media-object mui-pull-left">接团地</div>
								<div class="mui-media-body mui-text-right">{{data.pbAddress}}</div>
							</a>
						</li>
						<li class="mui-table-view-cell mui-media">
							<a href="javascript:;">
								<div class="mui-media-object mui-pull-left">出行时间</div>
								<div class="mui-media-body mui-text-right">{{data.pbDateTime}}</div>
							</a>
						</li>
						<li class="mui-table-view-cell mui-media">
							<a href="javascript:;">
								<div class="mui-media-object mui-pull-left">天数</div>
								<div class="mui-media-body mui-text-right">{{data.pbDays}}天</div>
							</a>
						</li>
						<li class="mui-table-view-cell mui-media">
							<a href="javascript:;">
								<div class="mui-media-object mui-pull-left">导服费</div>
								<div class="mui-media-body mui-text-right">{{data.pbDayFee}}元／天</div>
							</a>
						</li>
						<li class="mui-table-view-cell mui-media">
							<a href="javascript:;">
								<div class="mui-media-object mui-pull-left">定金</div>
								<div class="mui-media-body mui-text-right">{{data.pbDepositFee}}元</div>
							</a>
						</li>
						<li class="mui-table-view-cell mui-media">
							<a href="javascript:;">
								<div class="mui-media-object mui-pull-left">性别</div>
								<div class="mui-media-body mui-text-right">{{data.pbSex}}</div>
							</a>
						</li>
						<li class="mui-table-view-cell mui-media">
							<a href="javascript:;">
								<div class="mui-media-object mui-pull-left">精通语言</div>
								<div class="mui-media-body mui-text-right">{{data.pbLanguges}}</div>
							</a>
						</li>
						<li class="mui-table-view-cell mui-media">
							<a href="javascript:;">
								<div class="mui-media-object mui-pull-left">从业年限</div>
								<div class="mui-media-body mui-text-right">{{data.pbYears}}年</div>
							</a>
						</li>
						<li class="mui-table-view-cell mui-media">
							<a href="javascript:;">
								<div class="mui-media-object mui-pull-left">业务范围</div>
								<div class="mui-media-body mui-text-right">{{data.pbBranched}}</div>
							</a>
						</li>
					</ul>
				</div>
				<div v-if="data.selectType == 60">
					<div class="aby-detail-remarks" v-if="data.pbDetail!=''">
						<p>备注</p>
						<p>{{data.pbDetail}}</p>
					</div>
				</div>
				<div v-else>
					<div class="aby-detail-linegray" v-if="data.selectDesc!=''"></div>
					<div class="aby-detail-remarks" v-if="data.selectDesc"> 
						<p class="title">备注</p>
						<p>{{data.selectDesc}}</p>
					</div>
				</div>
				<div class="aby-detail-line"></div>
				<div class="aby-detail-publisher">
					<ul class="mui-table-view">
						<li class="mui-table-view-cell mui-media" @click="toHomePage(data.publisher)">
							<a>
								<img class="mui-media-object mui-pull-left" :src="data.publisher.cpLogo">
								<div class="mui-media-body mui-ellipsis">
									{{data.publisher.cpName}}
									<p>{{data.crateTime | filterConvertDateFromNow}}<span class="mui-pull-right">浏览（{{data.readCnt}}）</span></p>
								</div>
							</a>
						</li>
					</ul>
				</div>
				<div class="aby-detail-line"></div>
				<div class="aby-detail-operation mui-text-center aby-font-blue" @click="toChat(data.publisher.userId)">
					<aby-icon type="rob" class="icorob"></aby-icon>
					抢单
				</div>
			</div>
		</div>
	</aby-page>
</template>

<script>
	import HeaderSelect from '../../components/Header/Default.vue'

	export default {
		components: {
			HeaderSelect
		},
		data() {
			return {
				selectId: this.$route.params.selectId,
				data: '',
			}
		},
		methods: {
			init(){
				this.$refs.page.showLoading();
				this.selectId = this.$route.params.selectId;
				this.data = '';
				
				let reqInfo = {};
				reqInfo.loading = 1;
				reqInfo.selectId = this.selectId;
				this.$abyApi.Select.getPublishDetail(reqInfo, (res) => {
					this.data = res.cpSelect;
					this.$refs.page.closeLoading();
				}, (err) => {
					this.$refs.page.closeLoading();
				});
			},
			// 聊天
			toChat(userId){
				this.$router.push({
					name:'chat',
					params:{
						userId: userId
					}
				});
			},
			// 公司主页
			toHomePage(li){
				this.$router.push({
					name:"homePage",
					params:{
						cpId: li.cpId
					}
				})
			}
		},
		updated() {
			//初始化倒计时
			if(this.data.endTime)this.$tool.countdown(this.data.endTime, this.data.selectId);
		},
		mounted() {
			this.init();
		},
		beforeRouteEnter(to, from, next) {
			if(from.name == 'purchase') {
				next(vm => {
					vm.init()
				})
			}else{
				next()
			}
		},
	}
</script>

<style scoped>
	/*详情容器*/
	
	.aby-detail {
		padding: 10px;
		margin: 0;
	}
	.aby-detail .title{
		color: #AAAAAA;
		font-size: 13px;
	}
	.aby-detail-header,
	.aby-detail-operation,
	.aby-detail-remarks {
		background-color: #FFFFFF;
		padding: 15px 17px;
	}
	
	.aby-detail-header {
		font-size: 14px;
	}
	
	.aby-detail-header .clock {
		font-size: 16px;
	}
	
	.aby-detail-header .mui-pull-right {
		width: 24px;
		height: 24px;
		margin-top: -2px;
	}
	
	.aby-detail-content .mui-media-object {
		width: 70px;
		max-width: 70px;
		color: #AAAAAA;
	}
	
	.aby-detail-content .mui-table-view .mui-media-object,
	.aby-detail-content .mui-table-view .mui-media-body {
		line-height: 20px;
		height: 20px;
		font-size: 13px;
	}
	
	.aby-detail-content .mui-table-view-cell {
		padding: 8px;
	}
	
	.aby-detail-content h4 {
		padding: 15px 15px 30px 15px;
		margin: 0px;
		text-align: center;
	}
	
	.icorob{
		font-size: 18px;
	}
	
	.mui-table-view:before,
	.mui-table-view:after,
	.mui-table-view-cell:after {
		height: 0px;
	}

</style>