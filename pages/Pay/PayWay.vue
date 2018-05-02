<template>
	<aby-page>
		<aby-header slot="header" title="订单支付"></aby-header>
		<div class="mui-content" slot="content">
			<div v-if="data != ''&&data.strPayment<5000">
				<div class="aby-detail-header mui-text-center price">
					<h4>待支付金额(元)</h4>
					<h3 class="price">￥{{data.strPayment}}</h3>
					<p>订单编号：{{data.orderCode}}</p>
				</div>
				<div class="aby-detail-linegray"></div>
				<div class="orderMsg">
					<p class="aby-list-title">{{data.orderTitle}}</p>
					<p>
						<aby-icon type="business" class="business"></aby-icon>
						{{data.buyerCpname}}
					</p>
				</div>
				<!--支付金额小于5000-->
				<div class="mui-input-row mui-checkbox paymethod space">
					<label>银行卡快捷支付</label>
					<input name="checkbox1" value="" type="checkbox" checked="">
				</div>
				<div class="aby-button-panel">
					<aby-button class="aby-button-blue" title="确认支付" @click.native="toPay"></aby-button>
				</div>
			</div>
			<!--支付大于5000，超限额-->
			<div v-if="data != ''&&data.strPayment>=5000">
				<div class="priceover space">
					<h3 class="">支付金额大于5000元</h3>
					<p>请登录呱啦啦网站www.gualala.cn进行支付</p>
				</div>
				<div class="aby-button-panel space">
					<aby-button class="aby-button-blue" title="扫码登录支付"></aby-button>
				</div>
			</div>
			
			<div class="safe">
				<img src="../../static/images/ico/ico_pay_tl_3x.png" />
				<p>本平台由通联支付提供资金担保</p>
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
				data:'',
			}
		},
		methods: {
			init(){
				this.orderId = this.$route.params.orderId;
				this.data = '';
				this.getDetail();
			},
			// 支付
			toPay(){
				var orderId = this.orderId;
				var orderCode = this.data.orderCode;
				var signature = this.$abyApi.Crypto.MD5(orderId + orderCode + this.data.strPayment+this.data.orderState)
				var url = "http://www.ai-by.com:8080/stOrderWebApi/stpay/h5pay.action?orderId="+orderId+"&orderCode="+orderCode+"&signature="+signature+ "&user_token=" + this.$store.state.user_token;
				this.$router.push({
					name: 'webView',
					params: {
						title: '通联支付',
						url: url
					}
				});
			},
			// 获得详情
			getDetail(){
				let reqInfo = {};
				reqInfo.orderId = this.orderId;
				this.$abyApi.Order.getOrderDetail(reqInfo,(res)=>{
					res.data.orderInfo.proSummary = JSON.parse(res.data.orderInfo.proSummary);
					res.data.orderSummary = JSON.parse(res.data.orderSummary);
					this.data = res.data;
				})
			}
		},
		mounted() {},
		beforeRouteEnter(to, from, next) {
			next(vm => {
				vm.init()
			})
		},
	}
</script>

<style scoped>
	.price h3 {
		color: #FF9800!important;
		font-size: 24px;
		padding-top: 0px;
		margin-top: -5px;
		font-weight: 500;
	}
	
	.orderMsg,
	.paymethod,
	.priceover {
		background-color: #FFFFFF;
		padding: 10px 15px;
	}
	
	.aby-list-title {
		font-size: 14px!important;
	}
	
	.business {
		color: #A0A0A0;
		font-size: 20px;
		vertical-align: bottom;
	}
	
	.priceover {
		text-align: center;
	}
	
	.priceover h3 {
		color: #FF9800!important;
		font-size: 20px;
		font-weight: 500;
	}
	
	.mui-checkbox input[type=checkbox] {
		top: 15px;
	}
</style>