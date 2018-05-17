<template>
	<aby-page ref="page">
		<aby-header title="询价详情" slot="header"></aby-header>
		<div slot="content" class="mui-content">
			<div class="aby-detail" v-if="data">
				<div class="aby-detail-header">
					<span class="colorGreen" v-if="data.selectState == 10">正在进行</span>
					<span v-else>已结束</span>
					<aby-icon-color v-if="data.selectType == 10" class="mui-pull-right" type="line"></aby-icon-color>
					<aby-icon-color v-if="data.selectType == 20" class="mui-pull-right" type="hotel"></aby-icon-color>
					<aby-icon-color v-if="data.selectType == 30" class="mui-pull-right" type="pticket"></aby-icon-color>
					<aby-icon-color v-if="data.selectType == 40" class="mui-pull-right" type="planhotel"></aby-icon-color>
					<aby-icon-color v-if="data.selectType == 50" class="mui-pull-right" type="sticket"></aby-icon-color>
					<aby-icon-color v-if="data.selectType == 60" class="mui-pull-right" type="guide"></aby-icon-color>
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
						<h4 v-if="data.selectType == 20">{{data.fromCity}}→{{data.goCity}}</h4>
						<h4 v-if="data.selectType == 40">预订{{data.goCity}}机票和酒店</h4>
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
								<div class="mui-media-object mui-pull-left">出发时间</div>
								<div class="mui-media-body mui-text-right">{{data.fromTime|filterConvertDate}}</div>
							</a>
						</li>
						<!--航程类型为单程的时候没有返回时间-->
						<li class="mui-table-view-cell mui-media" v-if="data.backTime!==''">
							<a href="javascript:;">
								<div class="mui-media-object mui-pull-left">返程时间</div>
								<div class="mui-media-body mui-text-right">{{data.backTime}}</div>
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
						<h4 v-if="data.selectType == 20">{{data.title}}</h4>
						<li class="mui-table-view-cell mui-media" v-if="data.selectType == 20">
							<a href="javascript:;">
								<div class="mui-media-object mui-pull-left">酒店地点</div>
								<div class="mui-media-body mui-text-right">{{data.hotelAddress}}</div>
							</a>
						</li>
						<li class="mui-table-view-cell mui-media">
							<a href="javascript:;">
								<div class="mui-media-object mui-pull-left">入住时间</div>
								<div class="mui-media-body mui-text-right">{{data.liveTime|filterConvertDate}}</div>
							</a>
						</li>
						<li class="mui-table-view-cell mui-media">
							<a href="javascript:;">
								<div class="mui-media-object mui-pull-left">离店时间</div>
								<div class="mui-media-body mui-text-right">{{data.backTime}}</div>
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
						<h4>预订{{data.scenicName}}门票</h4>
						<li class="mui-table-view-cell mui-media">
							<a href="javascript:;">
								<div class="mui-media-object mui-pull-left">景点名称</div>
								<div class="mui-media-body mui-text-right">{{data.scenicName}}</div>
							</a>
						</li>
						<li class="mui-table-view-cell mui-media">
							<a href="javascript:;">
								<div class="mui-media-object mui-pull-left">游玩时间</div>
								<div class="mui-media-body mui-text-right">{{data.playScenicTime|filterConvertDate}}</div>
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
						<h4>寻找嘉兴导游</h4>
						<li class="mui-table-view-cell mui-media">
							<a href="javascript:;">
								<div class="mui-media-object mui-pull-left">目的地</div>
								<div class="mui-media-body mui-text-right">嘉兴</div>
							</a>
						</li>
						<li class="mui-table-view-cell mui-media">
							<a href="javascript:;">
								<div class="mui-media-object mui-pull-left">接团地</div>
								<div class="mui-media-body mui-text-right">嘉兴</div>
							</a>
						</li>
						<li class="mui-table-view-cell mui-media">
							<a href="javascript:;">
								<div class="mui-media-object mui-pull-left">出行时间</div>
								<div class="mui-media-body mui-text-right">2018-07-14</div>
							</a>
						</li>
						<li class="mui-table-view-cell mui-media">
							<a href="javascript:;">
								<div class="mui-media-object mui-pull-left">天数</div>
								<div class="mui-media-body mui-text-right">7天</div>
							</a>
						</li>
						<li class="mui-table-view-cell mui-media">
							<a href="javascript:;">
								<div class="mui-media-object mui-pull-left">导服费</div>
								<div class="mui-media-body mui-text-right">500元／天</div>
							</a>
						</li>
						<li class="mui-table-view-cell mui-media">
							<a href="javascript:;">
								<div class="mui-media-object mui-pull-left">定金</div>
								<div class="mui-media-body mui-text-right">500元</div>
							</a>
						</li>
						<li class="mui-table-view-cell mui-media">
							<a href="javascript:;">
								<div class="mui-media-object mui-pull-left">性别</div>
								<div class="mui-media-body mui-text-right">女</div>
							</a>
						</li>
						<li class="mui-table-view-cell mui-media">
							<a href="javascript:;">
								<div class="mui-media-object mui-pull-left">精通语言</div>
								<div class="mui-media-body mui-text-right">中文</div>
							</a>
						</li>
						<li class="mui-table-view-cell mui-media">
							<a href="javascript:;">
								<div class="mui-media-object mui-pull-left">从业年限</div>
								<div class="mui-media-body mui-text-right">3年</div>
							</a>
						</li>
						<li class="mui-table-view-cell mui-media">
							<a href="javascript:;">
								<div class="mui-media-object mui-pull-left">业务范围</div>
								<div class="mui-media-body mui-text-right">不限</div>
							</a>
						</li>
					</ul>
				</div>
				<div class="aby-detail-line"></div>
				<div class="aby-detail-remarks">
					<p>备注</p>
					<p class="aby-font-Black">{{data.selectDesc || '无'}}</p>
				</div>
				<div class="aby-detail-line"></div>
				<div class="aby-detail-publisher">
					<ul class="mui-table-view">
						<li class="mui-table-view-cell mui-media">
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
				<div class="aby-detail-btn mui-text-center">
					<aby-icon className="mui-pull-message" type="message"></aby-icon>
					<span class="purchase-finish-btn" v-if="data.selectState == 10" @click="onFinish(data.selectId)">结束</span>
					<span class="purchase-delete-btn aby-font-blue" v-else @click="onDelete(data.selectId)">删除</span>
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
				selectId:this.$route.params.selectId,
				data:'',
			}
		},
		methods: {
			onDelete(selectId){//删除询价
				this.$tool.confirm('您确定要删除吗？', (res) => {
					this.$abyApi.Select.delPublish(selectId, (res)=> {
						this.$router.back();
						this.$tool.toast('删除成功！');
					})
				})
			},
			onFinish(selectId){//结束询价
				this.$tool.confirm('结束询价后将收不到最新留言，确定要结束吗？', (res) => {
					this.$abyApi.Select.closePublish(selectId, (res)=> {
						this.$router.back();
						this.$tool.toast('采购已结束');
					})
				})
			}
		},
		mounted() {
			let reqInfo = {};
			reqInfo.loading = 1;
			reqInfo.selectId = this.selectId;
			this.$abyApi.Select.getPublishDetail(reqInfo,(res)=>{
				this.data = res.cpSelect;
				this.$refs.page.isLoading = false;
			},(err)=>{this.$refs.page.isLoading = false;});
		},
	}
</script>

<style scoped>
/*详情容器*/
	
	.aby-detail {
		padding: 10px;
		margin: 0;
	}
	
	.aby-detail-line {
		background-color: #FFFFFF;
	}
	
	.aby-detail-header,
	.aby-detail-operation,
	.aby-detail-remarks {
		background-color: #FFFFFF;
		padding: 17px;
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
		padding: 8px 15px;
	}
	
	.aby-detail-content h4 {
		padding: 15px 15px;
		margin: 0px;
		text-align: center;
	}
	
	.mui-table-view:before,
	.mui-table-view:after,
	.mui-table-view-cell:after {
		height: 0px;
	}
	.aby-detail-btn{
		background: #fff;
		padding: 10px 0;
	}
	.aby-detail-btn span{
		display: block;
	}
	svg:not(:root){
		width: 23px;
		height: 23px;
	}
	.purchase-finish-btn{
		color: #08C7B5;
	}
</style>