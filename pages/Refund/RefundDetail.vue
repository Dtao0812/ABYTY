<template>
	<aby-page>
		<aby-header title="退款详情" slot="header">
		</aby-header>
		<div class="mui-content aby-detail" slot="content" v-if="info!=''">
			<div class="aby-detail-header mui-text-center">
				<h4>{{info.orderStateDesc}}</h4>
				<div v-if="identityType == 'seller'">
					<p v-if="info.orderState==0">买家还有<span id="countDownTimestamp" style="display: inline-block;">{{info.countDownTimestamp}}</span>完成支付，超时将自动关闭</p>
					<p v-if="info.orderState==1">买家已付款，等待发团日期发团</p>
					<p v-if="info.orderState==2">等待买家确认完成，还有<span id="waitConfirmDownTimestamp" style="display: inline-block;">{{info.countDownTimestamp}}</span>自动确认</p>
					<p v-if="info.orderState==3">完成时间：{{info.endTime | filterConvertDate}}</p>
					<p v-if="info.orderState==4">订单已被取消，取消时间：{{info.closeTime | filterConvertDate}}</p>
					<p v-if="info.orderState==5">订单超时，已自动关闭</p>
					<p v-if="info.orderState==6">如有疑问可拨打采购商电话<br />如果存在争议可直接联系呱啦啦客服介入调解。</p>
					<p v-if="info.orderState==7">您已同意退款，退款金额:￥{{info.refundAmount}}（订单金额-{{info.serviceFee}}退款手续费），将于2-7个工作日退回到买家付款账户。<br />退款时间：{{info.refundDealTime|filterConvertDate}}</p>
					<p v-if="info.orderState==8">您已拒绝采购商的退款申请，拒绝理由：{{info.refuseReason}}<br />拒绝时间：{{info.refundDealTime|filterConvertDate}}</p>
					<p v-if="info.orderState==9">采购商已经下单，请尽快确认订单</p>
				</div>
				<div v-if="identityType == 'buyer'">
					<p v-if="info.orderState==0">您有<span id="countDownTimestamp" style="display: inline-block;">{{info.countDownTimestamp}}</span><br />完成支付，如果超时将自动关闭</p>
					<p v-if="info.orderState==1">订单已支付，等待发团日期发团</p>
					<p v-if="info.orderState==2">旅游团已发出，行程结束后记得确认付款喔～还有<span><span id="waitConfirmDownTimestamp" style="display: inline-block;">{{info.waitConfirmDownTimestamp}}</span></span>自动确认</p>
					<p v-if="info.orderState==3">完成时间：{{info.endTime | filterConvertDate}}</p>
					<p v-if="info.orderState==4">供应商已取消了您的订单</p>
					<p v-if="info.orderState==5">订单超时，已自动关闭</p>
					<p v-if="info.orderState==6">已提交退款申请给供应商，若供应商1个工作日内未处理将转交呱啦啦客服介入处理</p>
					<p v-if="info.orderState==7">供应商已确认无误，系统已将￥{{info.refundAmount}}元退款给您，将于2-7个工作日退回到您的付款账户，请注意查收。<br />退款时间：{{info.refundDealTime|filterConvertDate}}</p>
					<p v-if="info.orderState==8">您的退款申请已被供应商拒绝，拒绝理由：{{info.refuseReason}}<br />拒绝时间：{{info.refundDealTime|filterConvertDate}}</p>
					<p v-if="info.orderState==9">等待供应商确认订单</p>
				</div>
				<aby-button v-for="(v,i) in initBtn(info.orderState)" @click.native="onBtn(info,v)" :key="i" :title="v.title" :size="v.size" :class="v.bclass"></aby-button>
			</div>
			<div class="aby-detail-line"></div>
			
			<!-- 显示对方信息 -->
			<div v-if="$store.state.userId == info.buyerId">
				<div class="aby-detail-publisher">
					<ul class="mui-table-view">
						<li class="mui-table-view-cell mui-media" @click="toHomepage(info.buyerId)">
							<img class="mui-media-object mui-pull-left" :src="info.buyerFace">
							<div class="mui-media-body mui-ellipsis">
								{{info.buyerCpname}}
								<p></p>
							</div>
						</li>
					</ul>
				</div>
				<div class="aby-detail-line"></div>
				<div class="aby-detail-operation">
					<aby-button type="default" title="在线联系" class="aby-button-contact"><img src="../../static/images/btn/btnDelRed.png" slot="imgs"></aby-button>
					<aby-button type="default" title="电话联系" class="aby-button-contact" @click.native="$tool.dialTelToApp(info.buyerPhone)"><img src="../../static/images/btn/btnDelRed.png" slot="imgs"></aby-button>
					<span class="aby-line-vertical"></span>
				</div>
			</div>
			<div v-else>
				<div class="aby-detail-publisher">
					<ul class="mui-table-view">
						<li class="mui-table-view-cell mui-media" @click="toHomepage(info.sellerId)">
							<img class="mui-media-object mui-pull-left" :src="info.sellerFace">
							<div class="mui-media-body mui-ellipsis">
								{{info.sellerCpname}}
								<p></p>
							</div>
						</li>
					</ul>
				</div>
				<div class="aby-detail-line"></div>
				<div class="aby-detail-operation">
					<aby-button type="default" title="在线联系" class="aby-button-contact"><img src="../../static/images/btn/btnDelRed.png" slot="imgs"></aby-button>
					<aby-button type="default" title="电话联系" class="aby-button-contact" @click.native="$tool.dialTelToApp(info.sellerPhone)"><img src="../../static/images/btn/btnDelRed.png" slot="imgs"></aby-button>
					<span class="aby-line-vertical"></span>
				</div>
			</div>
			<div class="space"></div>
			
			<div class="aby-detail-content" v-if="info.orderInfo.proType == 1">
				<ul class="mui-table-view">
					<li class="mui-table-view-cell mui-media">
						<div class="mui-media-object mui-pull-left">产品标题</div>
						<div class="mui-media-body">{{info.orderInfo.proTitle}}</div>
					</li>
					<!--基于产品订单详情Start-->
					<li class="mui-table-view-cell mui-media">
						<div class="mui-media-object mui-pull-left">产品编号</div>
						<div class="mui-media-body">{{info.orderInfo.proSummary.lineId}}</div>
					</li>
					<!--基于产品订单详情End-->
					<li class="mui-table-view-cell mui-media">
						<div class="mui-media-object mui-pull-left">出行时间</div>
						<div class="mui-media-body">{{info.goData}}</div>
					</li>
					<!--基于产品订单详情Start-->
					<li class="mui-table-view-cell mui-media">
						<div class="mui-media-object mui-pull-left">出发地</div>
						<div class="mui-media-body">{{info.orderSummary.goCity}}</div>
					</li>
					<!--基于产品订单详情End-->
					<li class="mui-table-view-cell mui-media">
						<div class="mui-media-object mui-pull-left">人数</div>
						<div class="mui-media-body">{{info.orderSummary.peopleCnt}}成人 <span v-if="info.orderSummary.childCnt !=0">{{info.orderSummary.childCnt}}儿童</span></div>
					</li>
					<!--基于产品订单详情Start-->
					<li class="mui-table-view-cell mui-media">
						<div class="mui-media-object mui-pull-left">房间数</div>
						<div class="mui-media-body">{{info.orderSummary.roomCnt}}间</div>
					</li>
					<!--基于产品订单详情End-->
				</ul>
				<div class="aby-detail-line"></div>
				<div class="aby-detail-total mui-text-right">
					合计<span class="aby-detail-price">￥{{info.strPayment}}</span>
				</div>
			</div>
			
			<div class="aby-detail-content space">
				<ul class="mui-table-view">
					<li class="mui-table-view-cell mui-media">
						<div class="mui-media-object mui-pull-left">退款原因</div>
						<div class="mui-media-body">{{info.refundReason}}</div>
					</li>
					<li class="mui-table-view-cell mui-media">
						<div class="mui-media-object mui-pull-left">退款金额</div>
						<div class="mui-media-body">￥5299.00</div>
					</li>
					<li class="mui-table-view-cell mui-media">
						<div class="mui-media-object mui-pull-left">手续费</div>
						<div class="mui-media-body">￥{{info.refundAmount}}(订单总额*6‰)</div>
					</li>
					<li class="mui-table-view-cell mui-media">
						<div class="mui-media-object mui-pull-left">申请时间</div>
						<div class="mui-media-body">{{info.applyRefundTime | filterConvertDate}}</div>
					</li>
				</ul>
			</div>
		</div>
	</aby-page>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				orderId:this.$route.params.orderId,
				identityType:this.$route.params.identityType,
				serviceFee: '',
				btnList:[
					{id:1,title:'同意退款',size:'small',bclass:'aby-button-line-blue'},
					{id:2,title:'取消退款',size:'small',bclass:'aby-button-line-default'},
					{id:3,title:'再次申请',size:'small',bclass:'aby-button-line-default'},
					{id:4,title:'拒绝退款',size:'small',bclass:'aby-button-line-blue'},
				],
				info:'',
			}
		},
		methods: {
			init(){
				
			},
			// 列表按钮显示
			initBtn(orderState){
				// 处理按钮
				let bList = [];
				let newBtnList = [];
				if(this.identityType == 'buyer'){
					// 买家
					switch (orderState){
						case 6: bList =  [2,3];break;// 退款中
						case 8: bList =  [3];break;// 拒绝退款
					}
				}else if(this.identityType == 'seller'){
					// 卖家
					switch (orderState){
						case 6: bList =  [1,4];break;// 退款中
					}
				}
				this.btnList.forEach((v,i)=>{
					bList.forEach((x)=>{
						if(x == v.id)newBtnList.push(v);
					})
				});
				
				return newBtnList;
			},
			// 按钮事件
			onBtn(liObj,btnObj){
				if(btnObj.id == 4){
					// 拒绝退款
					this.$tool.prompt({inputPlaceholder: '请输入拒绝理由'},'您确定要拒绝退款吗？',(e)=>{
						let reqInfo = {};
						reqInfo.orderId = liObj.id;
						reqInfo.refuceReason = e.value;
						this.$abyApi.Order.refuceRefund(reqInfo,(res)=>{
							this.getDetail();
						});
					});
				}else{
					this.$tool.confirm('您确定要'+btnObj.title+'吗？',(res)=>{
						let reqInfo = {};
						reqInfo.orderId = liObj.id;
						if(btnObj.id == 1){
							// 同意退款
							this.$abyApi.Order.agreeRefund(reqInfo,(res)=>{
								this.getDetail();
							});
						}else if(btnObj.id == 2){
							// 取消退款
							this.$abyApi.Order.cancelApply(reqInfo,(res)=>{
								this.getDetail();
							});
						}else if(btnObj.id == 3){
							// 再次申请
							this.$abyApi.Order.applyRefund(reqInfo,(res)=>{
								this.getDetail();
							});
						}
					});
				}
			},
			// 获得详情
			getDetail(){
				let reqInfo = {};
				reqInfo.orderId = this.orderId;
				this.$abyApi.Order.getOrderDetail(reqInfo,(res)=>{
					console.log('数据：'+JSON.stringify(res))
					res.data.orderInfo.proSummary = JSON.parse(res.data.orderInfo.proSummary);
					res.data.orderSummary = JSON.parse(res.data.orderSummary);
					this.info = res.data;
					// 获取手续费
					let reqfee = {};
					reqfee.payment = res.data.payment;
					reqfee.identityType = this.identityType;
					this.$abyApi.Order.getServiceFee(reqfee,(rtn)=>{
						this.serviceFee = rtn.data;
					})
				})
			},
			toHomepage(userId){
				let reqInfo = {
					userId: userId
				};
				this.$abyApi.User.getBasciInfo(reqInfo, (res) => {
					this.$refs.page.closeLoading();
					this.cpId = res.cpUserInfo.cpId;
					this.$router.push({
						name:"homePage",
						params:{
							cpId: this.cpId
						}
					})
				});
			}
		},
		mounted() {
			this.getDetail();
			console.log(this.$store.state.userId)
			console.log(this.info)
		},
		watch: {
			list(val) {
				this.list = val;
			}
		}
	}
</script>

<style>
	
</style>