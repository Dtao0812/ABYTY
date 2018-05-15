<template>
	<aby-page>
		<aby-header slot="header" title="质保金"></aby-header>
		<div class="mui-content" slot="content">
			<div class="aby-detail-header space">
				<h3 class="price">交纳金额<span>￥{{preDeposit}}</span></h3>
				<p>同意支付{{preDeposit}}元 （原付金额：{{totalPrice}}元 + 支付宝手续费：{{poundage}}元）</p>
			</div>
			<div class="mui-input-row mui-checkbox paymethod space">
				<label><img class="icopay" src="../../static/images/ico/ico_alipay_3x.png"/>支付宝</label>
				<input name="checkbox1" value="" type="checkbox" checked="">
			</div>
			<div class="aby-button-panel">
				<aby-button class="aby-button-blue" title="确认支付" @click.native="toPay"></aby-button>
			</div>
		</div>
	</aby-page>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				preDeposit: this.$route.params.preDeposit, //总金额,
				poundage: this.$route.params.poundage, //手续费,
				totalPrice: this.$route.params.totalPrice, //质保金金额,
				pays:[],
			}
		},
		methods: {
			init(){
				//获取支付通道
				plus.payment.getChannels((channels)=>{
					channels.forEach((val,i)=>{
						var channel = val;
						this.pays[channel.id] = channel;
						this.checkServices(channel);
					})
				},(e)=>{
					this.$toast(e.messsage)
				});
			},
			// 检测是否安装支付服务
			checkServices(pc){
				if(!pc.serviceReady) {
					var txt = null;
					switch(pc.id) {
						case "alipay":
							txt = "检测到系统未安装“支付宝app”，无法完成支付操作，是否立即安装？";
							break;
						default:
							txt = "系统未安装“" + pc.description + "”服务，无法完成支付，是否立即安装？";
							break;
					}
					plus.nativeUI.confirm(txt, function(e) {
						if(e.index == 0) {
							pc.installService();
						}
					}, pc.description);
				}
			},
			// 付款
			toPay(){
				let reqInfo = {};
				reqInfo.channelid = "alipay";
				reqInfo.payType = 0;
				reqInfo.orderInfo = {
					orderName : '',
					orderPrice : this.preDeposit
				};
				this.$abyApi.Pay.payDeposit(reqInfo,(res)=>{
					plus.payment.request(this.pays[reqInfo.channelid], res.order, (result)=> {
						this.$router.back()
					},(e)=>{
						this.$toast("支付失败");
						this.$router.back()
					})
				})
			},
		},
		mounted() {
			this.init();
		},
		activated() {},
	}
</script>

<style scoped>
	.aby-detail-header {
		padding-top: 20px;
	}
	
	.aby-detail-header .price {
		font-weight: 400;
		font-size: 16px;
	}
	
	.aby-detail-header .price span {
		color: #FF9800;
	}
	
	.aby-detail-header p {
		padding: 0px!important;
		font-size: 12px;
	}
	.paymethod{
		background-color: #FFFFFF;
		padding-top: 10px;
		padding-bottom: 10px;
	}
	.paymethod label{
		line-height: 28px;
	}
	.icopay{
		width: 30px;
		margin-right: 10px;
		vertical-align: bottom;
		margin-top: -5px;
	}
	.mui-checkbox input[type=checkbox] {
		top: 21px;
	}
	
	.mui-checkbox input[type=checkbox]:before {
		content: '\E681';
	}
	
	.mui-checkbox input[type=checkbox]:checked:before {
		color: #08C7B5;
	}
	
	.mui-checkbox input[type=checkbox]:checked:before {
		content: '\E690';
	}
</style>