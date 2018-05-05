<template>
	<aby-page>
		<aby-header title="系统通知" slot="header"></aby-header>
		<div class="mui-content" slot="content">
			<div class="mui-card space" v-for="(li,i) in list" :key="i" @click="toDetail(li)" v-if="li.msgType!='travel'">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<h5>
							<!--消息未读红点-->
							<mt-badge size="small" type="error" class="aby-badge-nonum"></mt-badge>
							{{li.msgTypeName}}<span class="time">{{li.publishTime|filterConvertDate}}</span>
							<aby-icon class="mui-icon icon-order" type="msgorder"></aby-icon>
						</h5>
						<p v-if="li.msgType=='hotel_order'" v-html="li.msgContent"></p>
						<p v-if="li.msgType=='interactMsg'" v-text="li.msgTitle"></p>
					</div>
				</div>
			</div>
			<!--<div class="mui-card space">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<h5>
							<aby-icon class="mui-icon icon-sys" type="msgsystem"></aby-icon>
							供应商推荐<span class="time">09:55</span>
						</h5>
						<h4 class="mui-ellipsis">猜您对以下供应商感兴趣</h4>
						<p class="mui-ellipsis">南京牛气冲天旅行社，南京在路上旅行社有限公司</p>
					</div>
				</div>
			</div>-->
		</div>
	</aby-page>
</template>

<script>
	export default {
		components: {},
		props: [],
		data() {
			return {
				list:[],
			}
		},
		methods: {
			// 获得消息列表
			getMsgList(){
				this.$abyApi.Sys.getMsgListLoad((res)=>{
					this.list = res;
				});
			},
			//查看详情
			toDetail(li) {
				this.$abyDb.Msg.updateIsRead({title:li.msgType,value:li.msgId});//标记已读
				let info = JSON.parse(li.msgiOSParams);
				if(info.msgType == 'hotel_order' && info.params.winName == 'order_detail'){
					//订单消息
					this.$router.push({
						name:'orderDetails',
						params:{
							orderId:info.params.orderId,
							identityType: info.params.identityType
						}
					});
				}else if(info.msgType == 'hotel_order' && info.params.winName == 'agreement_detail'){
					//协议消息
					this.$router.push({
						name:'ageDetail',
						params:{
							agreementId: info.params.agreementId,
							identityType: info.params.identityType
						}
					});
				}else if(info.msgType == 'hotel_order' && info.params.winName == 'orderorder_refund_detail'){
					//退款消息
					this.$router.push({
						name:'refundDetail',
						params:{
							orderId: info.params.orderId,
							identityType: info.params.identityType
						}
					});
				}else if(info.msgType == 'system'){
					// 系统消息
				}
			}
		},
		mounted() {
			this.getMsgList();
		},
		watch: {
			list(val) {
			}
		}
	}
</script>

<style scoped>
	.time {
		margin-left: 20px;
	}
	.icon-order,.icon-sys{
		font-size: 20px;
		position: absolute;
		left: 10px;
		margin-top: 2px;
	}
	.icon-sys {
		color: #FF9800;		
	}
	.icon-order {
		color: #52B2E5;
	}
	
	.mui-card {
		-webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, 0);
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0);
	}
	
	.mui-card-content-inner {
		padding: 10px;
	}
	
	.mui-card-content-inner h5,
	.mui-card-content-inner h4,
	.mui-card-content-inner p {
		padding-left: 25px;
	}
	
	.mui-card-content-inner h5 {
		line-height: 24px;
		vertical-align: middle;
		color: #AAAAAA;
	}
	
	.mui-card-content-inner h4 {
		font-size: 14px;
		font-weight: 500;
	}
	
	.mui-card-content-inner p {
		font-size: 12px;
		color: #232323;
		padding-bottom: 0px;
		margin-bottom: 0px;
	}
</style>