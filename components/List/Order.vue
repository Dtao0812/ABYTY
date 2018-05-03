<template>
	<div class="list-item">
		<!--订单列表-->
		<aby-no-content v-if="list.length==0"></aby-no-content>
		<div class="mui-card space" v-for="(li,i) in list" :key="i">
			<div class="mui-card-header mui-card-media">
				<!--不同类型图标type值不一样 线路：line 机票：pticket 酒店：hotel 导游：guide 机+酒：planhotel-->
				<aby-icon-color v-if="li.orderType == 10" type="line"></aby-icon-color>
				<aby-icon-color v-if="li.orderType == 20" type="hotel"></aby-icon-color>
				<aby-icon-color v-if="li.orderType == 30" type="pticket"></aby-icon-color>
				<aby-icon-color v-if="li.orderType == 40" type="planhotel"></aby-icon-color>
				<aby-icon-color v-if="li.orderType == 50" type="sticket"></aby-icon-color>
				<aby-icon-color v-if="li.orderType == 60" type="guide"></aby-icon-color>
				<div class="mui-media-body">
					{{li.orderTypeDesc}}｜{{li.orderCode}}
					<span class="state">{{li.orderStateDesc}}</span>
				</div>
			</div>
			<div class="mui-card-content" @click="toDetail(li)">
				<div class="mui-card-content-inner">
					<h5 class="mui-ellipsis aby-font-Black">{{li.orderTitle}}<span class="price">￥{{li.strPayment}}</span></h5>
					<p>{{li.goData}} {{li.orderSummary.goCity}}出发</p>
					<p>{{li.orderSummary.peopleCnt}}成人<span v-if="li.orderSummary.childCnt!=0">{{li.orderSummary.childCnt}}儿童</span></p>
				</div>
			</div>
			<div class="mui-card-footer">
				<aby-button v-for="(v,i) in initBtn(li)" @click.native="onBtn(li,v)" :key="i" :title="v.title" :size="v.size" :class="v.bclass"></aby-button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		components: {},
		props: ['list', 'identityType'],
		data() {
			return {
				btnList:[
					{id:1,title:'确认订单',size:'small',bclass:'aby-button-line-blue'},
					{id:2,title:'取消订单',size:'small',bclass:'aby-button-line-default'},
					{id:3,title:'订单备注',size:'small',bclass:'aby-button-line-default'},
					{id:4,title:'修改价格',size:'small',bclass:'aby-button-line-blue'},
					{id:5,title:'付款',size:'small',bclass:'aby-button-line-blue'},
					{id:6,title:'申请退款',size:'small',bclass:'aby-button-line-default'},
					{id:7,title:'退款处理',size:'small',bclass:'aby-button-line-blue'},
					{id:8,title:'退款详情',size:'small',bclass:'aby-button-line-default'},
					{id:9,title:'取消退款',size:'small',bclass:'aby-button-line-blue'},
					{id:10,title:'确认完成',size:'small',bclass:'aby-button-line-blue'},
					{id:11,title:'删除',size:'small',bclass:'aby-button-line-default'},
				]
			}
		},
		methods: {
			init(){
				
			},
			//查看详情
			toDetail(li) {
				this.$router.push({
					name: 'orderDetails',
					params: {
						title: li.orderTitle,
						orderId: li.id,
						identityType:this.identityType
					}
				});
			},
			// 列表按钮显示
			initBtn(obj){
				// 处理按钮
				let bList = [];
				let newBtnList = [];
				if(this.identityType == 'buyer'){
					// 买家
					switch (obj.orderState){
						case 0: bList = [2,5];break;// 待付款
						case 1: bList =  [6];break;// 待出行
						case 2: bList =  [6,10];break;// 待完成
						case 3: bList =  [11];break;// 已完成
						case 4: bList =  [11];break;// 已取消
						case 5: bList =  [11];break;// 超时关闭
						case 6: bList =  [9];break;// 退款中
						case 7: bList =  [11];break;// 已退款
						case 8: bList =  [6];break;// 拒绝退款
						case 9: bList =  [2];break;// 待确认
					}
				}else if(this.identityType == 'seller'){
					// 卖家
					switch (obj.orderState){
						case 0: bList = [3,4];break;// 待付款
						case 1: bList =  [3];break;// 待出行
						case 2: bList =  [3];break;// 待完成
						case 3: bList =  [11];break;// 已完成
						case 4: bList =  [11];break;// 已取消
						case 5: bList =  [11];break;// 超时关闭
						case 6: bList =  [7];break;// 退款中
						case 7: bList =  [11];break;// 已退款
						case 8: bList =  [8];break;// 拒绝退款
						case 9: bList =  [1,2];break;// 待确认
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
				if(btnObj.id == 3){
					// 订单备注
					this.$tool.prompt('输入备注内容',(e)=>{
						let reqInfo = {};
						reqInfo.orderId = liObj.id;
						reqInfo.sellerNote = e.sellerNote;
						this.$abyApi.Order.confirmOrder(reqInfo,(res)=>{
							this.$emit("eventOrder");
						});
					});
				}else if(btnObj.id == 4){
					// 修改价格
					this.$tool.prompt('输入价格',(e)=>{
						let reqInfo = {};
						reqInfo.orderId = liObj.id;
						reqInfo.payment = e.value;
						this.$abyApi.Order.confirmOrder(reqInfo,(res)=>{
							this.$emit("eventOrder");
						});
					})
				}else if(btnObj.id == 5){
					// 去支付
					
				}else if(btnObj.id == 6){
					// 申请退款
					this.$router.push({
						name: 'refundApply',
						params: {
							orderId: li.id,
							identityType:this.identityType
						}
					});
				}else if(btnObj.id == 7){
					// 退款处理
					
				}else if(btnObj.id == 8){
					// 退款详情
					this.$router.push({
						name: 'refundDetail',
						params: {
							orderId: li.id,
							identityType:this.identityType
						}
					});
				}else{
					this.$tool.confirm('您确定要'+btnObj.title+'吗？',(res)=>{
						let reqInfo = {};
						reqInfo.orderId = liObj.id;
						if(btnObj.id == 1){
							// 确认订单
							this.$abyApi.Order.confirmOrder(reqInfo,(res)=>{
								this.$emit("eventOrder");
							});
						}else if(btnObj.id == 2){
							// 取消订单
							this.$abyApi.Order.cancelOrder(reqInfo,(res)=>{
								this.$emit("eventOrder");
							});
						}else if(btnObj.id == 9){
							// 取消申请退款
							this.$abyApi.Order.cancelApply(reqInfo,(res)=>{
								this.$emit("eventOrder");
							});
						}else if(btnObj.id == 10){
							// 确认订单
							this.$abyApi.Order.transactionCompletion(reqInfo,(res)=>{
								this.$emit("eventOrder");
							});
						}else if(btnObj.id == 11){
							// 删除订单
							this.$abyApi.Order.deleteOrder(reqInfo,(res)=>{
								this.$emit("eventOrder");
							});
						}
						
					});
				}
			}
		},
		mounted() {

		},
		watch: {
			list(val) {
				this.list = val;
			}
		},
	}
</script>

<style scoped>
	.mui-card {
		-webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, 0);
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0);
	}
	
	.mui-card-media svg {
		width: 20px;
		height: 20px;
		position: absolute;
	}
	.mui-card-header .mui-card-media,.mui-card-header{
		padding-left: 15px!important;
		padding-right: 15px!important;
	}
	
	.mui-card-header.mui-card-media .mui-media-body {
		margin-left: 25px;
	}
	
	.mui-card-content {
		background-color: #FAFAFA;
	}
	
	.mui-card-content p {
		margin-bottom: 0px;
		font-size: 13px;
	}
	
	.mui-card-footer,
	.mui-card-header {
		border-radius: 0px;
	}
	
	.mui-card-footer:before,
	.mui-card-header:after {
		background-color: #FAFAFA;
	}
	
	.mui-card-content-inner {
		padding: 10px 15px;
	}
	
	.mui-card-content-inner h5 {
		padding-right: 80px;
	}
	
	.mui-card-content-inner .price {
		position: absolute;
		float: right;
		right: 15px;
	}
	
	.mui-card-header.mui-card-media .mui-media-body {
		font-size: 14px;
		line-height: 20px;
	}
	
	.mui-card-footer {
		float: right;
		padding: 10px 15px;
	}
	
	.mui-card-footer button {
		margin-left: 10px;
	}
	/*订单状态*/
	
	.state {
		float: right;
		color: #08C7B5;
	}
</style>