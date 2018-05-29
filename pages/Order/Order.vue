<template>
	<aby-tab :list="tabList" page="order" @eventTabBack="eventTab">
		<div v-for="(v,x) in tabList" :key="x" :slot="v.id" class="mui-content pt-45">
			<aby-no-content v-if="v.data.length == 0"></aby-no-content>
			<ul class="mui-table-view mui-table-view-chevron space">
				<li class="mui-table-view-cell mui-media" v-for="(li,i) in v.data" v-if="li.id == 'agr'" @click="toAgrList(li)">
					<a class="mui-navigate-right menu">
						<aby-icon-color class="ptype" :type="li.icon"></aby-icon-color> {{li.title}}
						<span class="mui-badge mui-badge-danger" v-if="li.num != 0">{{li.num}}</span>
					</a>
				</li>
			</ul>
			<ul class="mui-table-view mui-table-view-chevron space">
				<li class="mui-table-view-cell mui-media" v-for="(li,i) in v.data" v-if="li.id != 'waitRefund'&&li.id != 'agr'" @click="toList(li)">
					<a class="mui-navigate-right menu">
						<aby-icon-color class="ptype" :type="li.icon"></aby-icon-color> {{li.title}}
						<span class="mui-badge mui-badge-danger" v-if="li.num != 0">{{li.num}}</span>
					</a>
				</li>
			</ul>
			<ul class="mui-table-view mui-table-view-chevron space" v-for="(li,i) in v.data" v-if="li.id == 'waitRefund'" @click="toList(li)">
				<li class="mui-table-view-cell mui-media">
					<a class="mui-navigate-right menu">
						<aby-icon-color class="ptype" :type="li.icon"></aby-icon-color> {{li.title}}
						<span class="mui-badge mui-badge-danger" v-if="li.num != 0">{{li.num}}</span>
					</a>
				</li>
			</ul>
		</div>
	</aby-tab>

</template>

<script>
	export default {
		components: {},
		data() {
			return {
				tabList: [],
				identityType: 'buyer',
			}
		},
		methods: {
			// 初始化
			init() {
				if(this.$store.state.cpBtype == 10){
					this.tabList = [
						{
							id: 'buyersTab',
							title: '买家中心',
							type: 'buyer',
							isTips:this.$store.state.buyer>0,
							num:this.$store.state.buyer,
							data: [
								{id: 'agr',title: '收到的协议',num: 0,state: '',icon: 'myagreement'},
								{id: 'all',title: '全部订单',num: 0,state: '',icon: 'orderall'},
								{id: 'waitConfrim',title: '待确认',num: 0,state: 9,icon: 'orderconfirm'},
								{id: 'waitPay',title: '待付款',num: 0,state: 0,icon: 'orderpay'},
								{id: 'waitSetOut',title: '待出行',num: 0,state: 1,icon: 'ordertrip'},
								{id: 'waitEnd',title: '待完成',num: 0,state: 2,icon: 'orderfinish'},
								{id: 'waitRefund',title: '退款',num: 0,state: 10,icon: 'orderrefund'},
							]
						},
					];
				}else{
					this.tabList = [
						{
							id: 'buyersTab',
							title: '买家中心',
							type: 'buyer',
							isTips:this.$store.state.buyer>0,
							num:this.$store.state.buyer,
							data: [
								{id: 'agr',title: '收到的协议',num: 0,state: '',icon: 'myagreement'},
								{id: 'all',title: '全部订单',num: 0,state: '',icon: 'orderall'},
								{id: 'waitConfrim',title: '待确认',num: 0,state: 9,icon: 'orderconfirm'},
								{id: 'waitPay',title: '待付款',num: 0,state: 0,icon: 'orderpay'},
								{id: 'waitSetOut',title: '待出行',num: 0,state: 1,icon: 'ordertrip'},
								{id: 'waitEnd',title: '待完成',num: 0,state: 2,icon: 'orderfinish'},
								{id: 'waitRefund',title: '退款',num: 0,state: 10,icon: 'orderrefund'},
							]
						},
						{
							id: 'sellerTab',
							title: '卖家中心',
							type: 'seller',
							isTips:this.$store.state.seller>0,
							num:this.$store.state.seller,
							data: [
								{id: 'agr',title: '发出的协议',num: 0,state: '',icon: 'myagreement'},
								{id: 'all',title: '全部订单',num: 0,state: '',icon: 'orderall'},
								{id: 'waitConfrim',title: '待确认',num: 0,state: 9,icon: 'orderconfirm'},
								{id: 'waitPay',title: '待付款',num: 0,state: 0,icon: 'orderpay'},
								{id: 'waitSetOut',title: '待出行',num: 0,state: 1,icon: 'ordertrip'},
								{id: 'waitEnd',title: '待完成',num: 0,state: 2,icon: 'orderfinish'},
								{id: 'waitRefund',title: '退款处理',num: 0,state: 10,icon: 'orderrefund'},
							]
						},
					];
				}
				// 底部导航监听
				this.$parent.eventPageShow(this.$route.name);
				this.getOrderNum();
			},
			// tab点击返回监听
			eventTab(e) {
				this.identityType = e.type;
				if(this.$store.state.cpBtype != 10){
					this.getOrderNum();
				}
			},
			// 获得订单数量
			getOrderNum() {
				this.$abyApi.Order.getNum(this.identityType, (res) => {
					this.tabList.forEach((val, i) => {
						if(this.identityType === val.type) {
							val.data.forEach((v, x) => {
								if(v.id == 'agr') this.tabList[i].data[x].num = res.data.waitConfrimDisNum;
								if(v.id == 'waitConfrim') this.tabList[i].data[x].num = res.data.waitConfirmLineNum;
								if(v.id == 'waitPay') this.tabList[i].data[x].num = res.data.waitPayNum;
								if(v.id == 'waitSetOut') this.tabList[i].data[x].num = res.data.hasPayNum;
								if(v.id == 'waitEnd') this.tabList[i].data[x].num = res.data.waitConfirmNum;
								if(v.id == 'waitRefund') this.tabList[i].data[x].num = res.data.refundingOrderNum;
							})
						}
					})
				});
			},
			// 协议列表
			toAgrList(obj) {
				this.$router.push({
					name: 'agrList',
					params: {
						title: obj.title,
						orderState: obj.state,
						identityType: this.identityType,
					}
				});
			},
			// 订单列表
			toList(obj) {
				this.$router.push({
					name: 'orderList',
					params: {
						title: obj.title,
						orderState: obj.state,
						identityType: this.identityType,
					}
				});
			}
		},
		mounted() {
			this.init();
		},
		activated() {
			this.init();
		},
	}
</script>
<style scoped>
	.top-fixed {
		position: fixed;
		top: 0;
		z-index: 999;
		width: 100%;
		height: 100%;
	}

	.mui-table-view-cell {
		padding-top: 15px;
		padding-bottom: 15px;
	}

</style>