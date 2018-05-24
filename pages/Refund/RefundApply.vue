<template>
	<aby-page>
		<aby-header slot="header" title="退款申请"></aby-header>
		<div class="mui-content" slot="content">
			<ul class="mui-table-view space">
				<li class="mui-table-view-cell liRefundPrice">
					<aby-field modelId="refundPrice" className="aby-input-default" placeholder="请输退款金额" type="number">
						<label class="inLabel" slot="label">退款金额</label>
					</aby-field>
					<span class="maxPrice">最多￥{{payment}}</span>
				</li>
			</ul>
			<div class="space explain">最大金额：{{strPayment}}(订单总额－{{serviceFee}}元退款手续费)</div>
			<ul class="mui-table-view space">
				<li class="mui-table-view-cell liRefundRemark">
					<aby-field modelId="refundDesc" className="aby-input-area" placeholder="请输入申请退款原因" type="textarea" rows="5">
						<label class="areaLabel" slot="label">退款说明</label>
					</aby-field>
				</li>
			</ul>
			<div class="aby-button-panel">
				<aby-button @click.native="onFefund" class="aby-button-blue" title="提交申请"></aby-button>
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
				payment:'',//总额
				serviceFee: '',//手续费
				strPayment:'',//最大退款
				refundPrice:'',//退款金额
				refundDesc:'',//退款原因
			}
		},
		methods: {
			init(){
				
			},
			// 获得详情
			getDetail(){
				let reqInfo = {};
				reqInfo.orderId = this.orderId;
				this.$abyApi.Order.getOrderDetail(reqInfo,(res)=>{
					res.data.orderInfo.proSummary = JSON.parse(res.data.orderInfo.proSummary);
					res.data.orderSummary = JSON.parse(res.data.orderSummary);
					this.payment = res.data.payment;
					this.strPayment = res.data.strPayment;
					// 获取手续费
					let reqfee = {};
					reqfee.payment = res.data.payment;
					reqfee.identityType = this.identityType;
					this.$abyApi.Order.getServiceFee(reqfee,(rtn)=>{
						this.serviceFee = rtn.data;
					})
				})
			},
			// 提交退款申请
			onFefund(){
				if(this.refundPrice == '')return this.$toast('退款金额不能为空');
				if(this.refundPrice <= 0)return this.$toast('退款金额不能低于0');
				if(this.refundDesc == '')return this.$toast('退款原因不能为空');
				let reqInfo = {};
				reqInfo.orderId = this.orderId;
				reqInfo.refundPayment = this.refundPrice;
				reqInfo.refundReason = this.refundDesc;
				this.$abyApi.Order.applyRefund(reqInfo,(res)=>{
					console.log('res:'+JSON.stringify(res))
					this.$toast('已提交申请');
					setTimeout(()=>{
						this.$router.back();
					},2000);
				});
			}
		},
		mounted() {
			this.getDetail();
		},
	}
</script>

<style scoped>
	.liRefundPrice {
		padding: 0px 0px 20px 0px;
	}
	
	.liRefundRemark {
		padding: 0px;
	}
	/*退款说明*/
	
	.explain {
		color: #AAAAAA;
		font-size: 12px;
		text-align: right;
		padding: 0px 15px;
	}
	
	.maxPrice {
		position: absolute;
		color: #FF9800;
		font-size: 12px;
		margin-left: 90px;
		margin-top: -10px;
	}
</style>