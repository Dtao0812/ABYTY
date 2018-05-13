<template>
	<aby-page ref="page">
		<!--卖家中心为“收到的协议”  买家中心为“发出的协议”-->
		<aby-header title="协议详情" slot="header"></aby-header>
		<div class="mui-content" slot="content" v-if="info != ''">
			<ul class="mui-table-view">
				<li class="mui-table-view-cell sender">
					<h4>{{info.title}}</h4>
					<p>发件人：{{info.sellerInfo.cpName}} - {{info.sellerInfo.userName}}</p>
					<p>收件人：{{info.buyerInfo.cpName}} - {{info.buyerInfo.userName}}</p>
					<p>时间：{{info.sendTime | filterConvertDate}}</p>
				</li>
			</ul>
			<div class="aby-detail-content space">
				<ul class="mui-table-view">
					<li class="mui-table-view-cell mui-media">
						<div class="mui-media-object mui-pull-left">合同标题</div>
						<div class="mui-media-body">{{info.title}}</div>
					</li>
					<li class="mui-table-view-cell mui-media">
						<div class="mui-media-object mui-pull-left">创建时间</div>
						<div class="mui-media-body">{{info.createTime | filterConvertDate}}</div>
					</li>
					<li class="mui-table-view-cell mui-media">
						<div class="mui-media-object mui-pull-left">甲方</div>
						<div class="mui-media-body">{{info.sellerInfo.cpName}}</div>
					</li>
					<li class="mui-table-view-cell mui-media">
						<div class="mui-media-object mui-pull-left">乙方</div>
						<div class="mui-media-body">{{info.buyerInfo.cpName}}</div>
					</li>
					<li class="mui-table-view-cell mui-media">
						<div class="mui-media-object mui-pull-left">收款账户</div>
						<div class="mui-media-body">
							<p class="aby-font-Black"><span class="banktip">对公</span>{{info.bankInfo.holderName}}</p>
							<div class="bank-number">
								<img class="bank-logo" :src="info.bankInfo.bankFace" alt="" />{{info.bankInfo.account}}
								<p>{{info.bankInfo.bankSubName}}</p>
							</div>
						</div>
					</li>
				</ul>
			</div>
			<div class="aby-detail-content space">
				<ul class="mui-table-view">
					<li class="mui-table-view-cell mui-media">
						<div class="mui-media-object mui-pull-left">出行日期</div>
						<div class="mui-media-body">{{info.goDate}}至{{info.backDate}}</div>
					</li>
					<li class="mui-table-view-cell mui-media">
						<div class="mui-media-object mui-pull-left">人数</div>
						<div class="mui-media-body">{{info.adultsNum}}成人<span v-if="info.childNum !=0"> {{info.childNum}}儿童</span></div>
					</li>
					<li class="mui-table-view-cell mui-media">
						<div class="mui-media-object mui-pull-left">结算价格</div>
						<div class="mui-media-body">￥{{info.totalPrice}}</div>
					</li>
					<li class="mui-table-view-cell mui-media">
						<div class="mui-media-object mui-pull-left">甲方联系人</div>
						<div class="mui-media-body">{{info.sellerInfo.userName}}（{{info.sellerInfo.contactPhone}}）</div>
					</li>
					<li class="mui-table-view-cell mui-media">
						<div class="mui-media-object mui-pull-left">乙方联系人</div>
						<div class="mui-media-body">{{info.buyerInfo.userName}}（{{info.buyerInfo.contactPhone}}）</div>
					</li>
				</ul>
			</div>
			<div class="aby-detail-content space">
				<ul class="mui-table-view">
					<li class="mui-table-view-cell mui-media">
						<div class="mui-media-object mui-pull-left">合同内容</div>
						<div class="mui-media-body"></div>
					</li>
					<li class="mui-table-view-cell aby-font-Black" v-html="info.content"></li>
				</ul>
			</div>
			<!--卖家发票样式-->
			<div class="aby-detail-content space" v-if="info.state == 2 && info.isInvoice == 1">
				<ul class="mui-table-view">
					<li class="mui-table-view-cell mui-media">
						<div class="mui-media-object mui-pull-left">是否开票</div>
						<div class="mui-media-body">需要发票</div>
					</li>
					<li class="mui-table-view-cell mui-media">
						<div class="mui-media-object mui-pull-left">发票抬头</div>
						<div class="mui-media-body">{{info.invoiceName}}</div>
					</li>
					<li class="mui-table-view-cell mui-media">
						<div class="mui-media-object mui-pull-left">税号</div>
						<div class="mui-media-body">{{info.invoiceNumer}}</div>
					</li>
					<li class="mui-table-view-cell mui-media">
						<div class="mui-media-object mui-pull-left">发票内容</div>
						<div class="mui-media-body">{{info.invoiceContent}}</div>
					</li>

				</ul>
			</div>
			<!--买家发票-->
			<ul class="mui-table-view space" v-if="identityType == 'buyer' && info.state == '1'">
				<li class="mui-table-view-cell">
					<div class="mui-input-row mui-checkbox mui-left">
						<label>开具发票</label>
						<input name="checkbox" value="" type="checkbox" @click="isSelectInvoiceType=!isSelectInvoiceType" :checked="isSelectInvoiceType">
					</div>
					<div v-if="isSelectInvoiceType" class="invoice">
						<p><input type="text" placeholder="发票抬头" v-model="invoiceName" /></p>
						<p><input type="text" placeholder="税号" v-model="invoiceNumer" /></p>
						<p><input type="text" placeholder="发票内容" v-model="invoiceContent" /></p>
					</div>
				</li>
			</ul>
		</div>
		<div class="operation" slot="footer">
			<div class="mui-col-xs-2" @click="toChat()">
				<aby-icon class="mui-icon" type="chat"></aby-icon><span class="icotext">聊天</span>
			</div>
			<div class="mui-col-xs-2" @click="$tool.dialTelToApp(tel)">
				<aby-icon class="mui-icon" type="call"></aby-icon><span class="icotext">联系</span>
			</div>
			<div v-if="info.state == 1">
				<div class="mui-col-xs-4 btndefault">
					<input type="button" value="刷新协议" @click="getDetail" />
				</div>
				<div class="mui-col-xs-4 btnblue">
					<input type="button" value="确认协议" @click="confirmAgr" />
				</div>
			</div>
			<div class="mui-col-xs-8 btnblue" v-else>
				<input type="button" value="查看订单" @click="toOrderDetail" />
			</div>
		</div>
	</aby-page>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				agreementId: this.$route.params.agreementId,
				identityType: this.$route.params.identityType,
				info: '',
				isSelectInvoiceType: true, //是否开票
				invoiceName: '', // 开票抬头
				invoiceNumer: '', // 税号
				invoiceContent: '', // 发票内容
				tel: '', //联系电话,
				orderId: '',
			}
		},
		methods: {
			init() {
				this.agreementId = this.$route.params.agreementId || '';
				this.identityType = this.$route.params.identityType || '';
				this.orderId = this.$route.params.orderId || '';
				this.getDetail();
			},
			// 获得详情
			getDetail() {
				this.$refs.page.showLoading();
				this.$abyApi.Order.getAgreementDetail(this.agreementId, (res) => {
					this.$refs.page.closeLoading();
					this.$toast("获取协议成功！");
					this.info = res.data;
					this.tel = this.identityType == 'seller' ? res.data.buyerInfo.contactPhone : res.data.sellerInfo.contactPhone;
				});
			},
			// 确认协议
			confirmAgr() {
				if(this.isSelectInvoiceType) {
					if(this.invoiceName == '') return this.$toast("请输入发票抬头内容");
					if(this.invoiceNumer == '') return this.$toast("请输入税号");
					if(this.invoiceContent == '') return this.$toast("请输入发票内容");
				}
				let reqInfo = {};
				reqInfo.id = this.info.id;
				reqInfo.isSelectInvoice = this.isSelectInvoiceType ? 1 : 0;
				reqInfo.invoiceName = this.invoiceName;
				reqInfo.invoiceNumer = this.invoiceNumer;
				reqInfo.invoiceContent = this.invoiceContent;
				reqInfo.updataTime = new Date().getTime();
				this.$abyApi.Order.confirmAgreementById(reqInfo, (res) => {
					this.$toast("订单生成成功，请去订单中心查看订单！");
					this.getDetail();
				});
			},
			// 查看订单详情
			toOrderDetail() {
				if(this.orderId != '') {
					this.$router.back()
				} else {
					this.$router.push({
						name: 'orderDetails',
						params: {
							identityType: this.identityType,
							orderId: this.info.orderId,
							page: 'agrDetail',
							agreementId: this.agreementId
						}
					});
				}
			},
			// 打开聊天界面
			toChat() {
				this.$router.push({
					name: 'chat',
					params: {
						userId: this.identityType == 'seller' ? this.info.buyerInfo.userId : this.info.sellerInfo.userId
					}
				});
			}
		},
		mounted() {
			this.getDetail();
		},
		beforeRouteEnter(to, from, next) {
			if(from.params.orderId == "" || from.name == "agrList") {
				next(vm => {
					vm.init()
				})
			} else {
				next()
			}
		},
	}
</script>

<style scoped>
	/*为了解决底部按钮不固定问题*/
	
	.mui-content {
		position: fixed;
		top: 0px;
		left: 0;
		bottom: 41px;
		padding-top: 40px;
		/*距离底部的距离为底部盒子的高度，自己也可以设置*/
		overflow-y: scroll;
		width: 100%;
		height: auto;
		-webkit-overflow-scrolling: touch;
		/*这句是为了滑动更顺畅*/
	}
	
	h4 {
		font-size: 15px;
		font-weight: 400;
	}
	
	.sender p {
		font-size: 12px;
	}
	
	.creattime {
		font-size: 12px;
	}
	/*发票*/
	
	.invoice {
		padding-bottom: 20px;
	}
	
	.invoice input[type=text] {
		height: 30px;
		margin: 10px 0px 0px 0px;
		border-radius: 2px;
		font-size: 12px;
		padding-left: 8px;
		border: 1px solid #DDDDDD;
	}
	
	.operation {
		height: 45px;
		width: 100%;
		position: fixed;
		bottom: 0px;
		background-color: #FFFFFF;
		text-align: center;
		font-size: 14px;
		border-top: 1px solid #F0F0F0;
	}
	
	.operation .mui-col-xs-2,
	.operation .mui-col-xs-4,
	.operation .mui-col-xs-8 {
		float: left;
		padding: 5px 0px;
	}
	
	.operation .mui-icon {
		color: #08C7B5;
	}
	
	.operation .icotext {
		display: block;
		font-size: 12px;
		margin-top: -5px;
	}
	
	.btndefault input,
	.btnblue input {
		border: none;
		height: 36px;
	}
	
	.btndefault {
		border-left: 1px solid #F0F0F0;
	}
	
	.btndefault,
	.btndefault input {
		background-color: #f6f8fa;
		color: #656b79;
	}
	
	.btnblue,
	.btnblue input {
		background-color: #08C7B5;
		color: #FFFFFF;
	}
	
	.account-payee span {
		display: inline-block;
		background: #98c72b;
		color: #fff;
		padding: 0 3px;
		margin-right: 3px;
	}
	
	.bank-logo{
		width: 15px;
		float: left;
		vertical-align: bottom;
		margin-top: 2px;
		margin-right: 2px;
	}
	
	.banktip{
		background-color: #08C7B5;
		color: #FFFFFF;
		padding:0px 2px;
		font-size: 12px;
		margin-right: 5px;
	}
	.mui-table-view:before,
	.mui-table-view:after,
	.mui-table-view-cell:after {
		background-color: #FFFFFF;
	}
	
	.mui-checkbox.mui-left input[type=checkbox] {
		left: 0px;
		top: 6px;
		width: 20px;
		height: 20px;
		font-size: 20px;
	}
	
	.mui-checkbox input[type=checkbox]:checked:before,
	.mui-checkbox input[type=checkbox]:before {
		font-size: 20px;
	}
	
	.mui-checkbox.mui-left label
	{
		padding-right: 15px;
		padding-left: 28px;
	}
	.mui-content{
		padding-bottom: 30px;
	}
</style>