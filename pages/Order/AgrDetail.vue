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
			<ul class="mui-table-view space">
				<li class="mui-table-view-cell">
					<p class="mui-pull-right creattime">创建时间：{{info.createTime | filterConvertDate}}</p>
					<br />
					<table class="table table-bordered table-striped">
						<tbody>
							<tr>
								<td>甲方</td>
								<td>{{info.sellerInfo.cpName}}</code>
								</td>
							</tr>
							<tr>
								<td>乙方</td>
								<td>{{info.buyerInfo.cpName}}
								</td>
							</tr>
							<tr>
								<td>合同标题</td>
								<td>{{info.title}}</td>
							</tr>
							<tr>
								<td>收款帐号</td>
								<td>
									<div class="bank-logo">
										<img :src="info.bankInfo.bankFace" alt="" />
									</div>
									<div class="bank-number">
										<span>对公</span> {{info.bankInfo.holderName}}（{{info.bankInfo.account}}）
										<p>{{info.bankInfo.bankSubName}}</p>
									</div>
								</td>
							</tr>
							<tr>
								<td>出行日期</td>
								<td>{{info.goDate}}至{{info.backDate}}</td>
							</tr>
							<tr>
								<td>人数</td>
								<td>{{info.adultsNum}}成人<span v-if="info.childNum !=0"> {{info.childNum}}儿童</span></td>
							</tr>
							<tr>
								<td>结算价格</td>
								<td>￥{{info.totalPrice}}</td>
							</tr>
							<tr>
								<td>甲方联系人</td>
								<td>{{info.sellerInfo.userName}}（{{info.sellerInfo.contactPhone}}）</td>
							</tr>
							<tr>
								<td>乙方联系人</td>
								<td>{{info.buyerInfo.userName}}（{{info.buyerInfo.contactPhone}}）</td>
							</tr>
							<tr>
								<td colspan="2" class="mui-text-center">合同内容</td>
							</tr>
							<tr>
								<td colspan="2" v-html="info.content"></td>
							</tr>
						</tbody>
					</table>
				</li>
			</ul>
			<!--卖家发票样式-->
			<table class="table3" border="1" cellspacing="0" cellpadding="0" v-if="info.state == 2 && info.isInvoice == 1">
				<tr>
					<td class="mui-col-xs-3">是否开票</td>
					<td class="mui-col-xs-9">
						需要发票
					</td>
				</tr>
				<tr>
					<td>发票抬头</td>
					<td>
						{{info.invoiceName}}
					</td>
				</tr>
				<tr>
					<td>纳税人识别号</td>
					<td>{{info.invoiceNumer}}</td>
				</tr>
				<tr>
					<td>发票内容</td>
					<td>{{info.invoiceContent}}</td>
				</tr>
			</table>
			<!--买家发票-->
			<ul class="mui-table-view" v-if="identityType == 'buyer' && info.state == '1'">
				<li class="mui-table-view-cell invoice">
					<h4><input type="checkbox" @click="isSelectInvoiceType=!isSelectInvoiceType" :checked="isSelectInvoiceType"/> 开具发票</h4>
					<div v-if="isSelectInvoiceType">
						<p><input type="text" placeholder="发票抬头" v-model="invoiceName"/></p>
						<p><input type="text" placeholder="税号"  v-model="invoiceNumer"/></p>
						<p><input type="text" placeholder="发票内容"  v-model="invoiceContent"/></p>
					</div>
				</li>
			</ul>
			<div class="operation">
				<div class="mui-col-xs-2" @click="toChat">
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
						<input type="button" value="确认协议" @click="confirmAgr"/>
					</div>
				</div>
				<div class="mui-col-xs-8 btnblue" v-else>
					<input type="button" value="查看订单" @click="toOrderDetail" />
				</div>
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
				isSelectInvoiceType:true,//是否开票
				invoiceName:'',// 开票抬头
				invoiceNumer:'',// 税号
				invoiceContent:'',// 发票内容
				tel:'',//联系电话,
				orderId:'',
			}
		},
		methods: {
			init() {
				this.agreementId = this.$route.params.agreementId||'';
				this.identityType = this.$route.params.identityType||'';
				this.orderId = this.$route.params.orderId||'';
				this.getDetail();
			},
			// 获得详情
			getDetail() {
				this.$refs.page.showLoading();
				this.$abyApi.Order.getAgreementDetail(this.agreementId, (res) => {
					this.$refs.page.closeLoading();
					this.info = res.data;
					this.tel = this.identityType == 'seller' ? res.data.buyerInfo.contactPhone : res.data.sellerInfo.contactPhone;
				});
			},
			// 确认协议
			confirmAgr(){
				if(this.isSelectInvoiceType){
					if(this.invoiceName == '')return this.$toast("请输入发票抬头内容");
					if(this.invoiceNumer == '')return this.$toast("请输入税号");
					if(this.invoiceContent == '')return this.$toast("请输入发票内容");
				}
				let reqInfo = {};
				reqInfo.id = this.info.id;
				reqInfo.isSelectInvoice = this.isSelectInvoiceType?1:0;
				reqInfo.invoiceName = this.invoiceName;
				reqInfo.invoiceNumer = this.invoiceNumer;
				reqInfo.invoiceContent = this.invoiceContent;
				reqInfo.updataTime = new Date().getTime();
				this.$abyApi.Order.confirmAgreementById(reqInfo,(res)=>{
					this.$toast("订单生成成功，请去订单中心查看订单！");
					this.getDetail();
				});
			},
			// 查看订单详情
			toOrderDetail(){
				if(this.orderId != ''){
					this.$router.back()
				}else{
					this.$router.push({
						name: 'orderDetails',
						params: {
							identityType: this.identityType,
							orderId: this.info.orderId,
							page: 'agrDetail',
							agreementId:this.agreementId
						}
					});
				}
			},
			// 打开聊天界面
			toChat(){
				this.$router.push({
					name: 'chat',
					params: {
						userId:this.identityType == 'seller' ? this.info.buyerInfo.userId : this.info.sellerInfo.userId
					}
				});
			}
		},
		mounted() {
			this.getDetail();
		},
		beforeRouteEnter(to, from, next) {
			if(from.params.orderId ==""){
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
	h4 {
		font-size: 16px;
	}
	
	.sender p {
		font-size: 12px;
	}
	
	.creattime {
		font-size: 12px;
	}
	
	.table {
		width: 100%;
		max-width: 100%;
		margin-bottom: 20px;
		margin-top: 10px;
	}
	
	.table-bordered {
		border: 1px solid #ddd;
	}
	
	.table-bordered>tbody>tr>th {
		border: 1px solid #ddd;
	}
	
	.table-bordered>tbody>tr>th,
	.table-bordered>tfoot>tr>th,
	.table-bordered>thead>tr>td,
	.table-bordered>tbody>tr>td,
	.table-bordered>tfoot>tr>td {
		border: 1px solid #ddd;
		padding: 5px;
		font-size: 12px;
	}
	/*发票*/
	
	.invoice {
		padding-bottom: 20px;
		margin-bottom: 60px;
	}
	
	.invoice input[type=text] {
		height: 30px;
		margin: 10px 0px 0px 0px;
		border-radius: 2px;
		font-size: 12px;
		padding-left: 8px;
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
	.operation .mui-col-xs-8{
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
	}
	
	.bank-logo {
		width: 35px;
		float: left;
	}
	
	.bank-number {
		margin-left: 40px;
	}
</style>