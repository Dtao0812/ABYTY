<template>
	<aby-pull ref="pull">
		<aby-header :title="headerTitle" slot="header">
		</aby-header>
		<aby-list slot="loadlist" ref="list" @eventOrder="eventOrderBack" :list="orderList" :identityType="where.identityType"></aby-list>
	</aby-pull>
</template>

<script>
	import AbyList from '../../components/List/Order.vue'
	export default {
		components: {
			AbyList
		},
		data() {
			return {
				headerTitle: '',
				pageNum: 1,
				keyWord: '',
				where: {
					orderState: '',
					orderType: '',
					identityType: '',
				},
				orderList: []
			}
		},
		created() {
			this.headerTitle = this.$route.params.title;
			this.where.orderState = this.$route.params.orderState;
			this.where.identityType = this.$route.params.identityType;
		},
		methods: {
			scroll(top) {
				this.scrollTop = top;
			},
			init() {
				this.headerTitle = this.$route.params.title;
				this.where.orderState = this.$route.params.orderState;
				this.where.identityType = this.$route.params.identityType;
				this.getPullDown();
			},
			getPullDown(callback) {
				this.orderList = [];
				let reqInfo = {};
				reqInfo.pageNum = this.pageNum = 1;
				reqInfo.where = this.where;
				reqInfo.keyWord = this.keyWord;
				if(this.where.orderState != '10'){
					this.$abyApi.Order.getList(reqInfo, (res) => {
						this.$refs.pull.closeLoading();
						res.data.forEach((v, i) => {
							res.data[i].orderSummary = JSON.parse(v.orderSummary);
							res.data[i].orderInfo.proSummary = JSON.parse(v.orderInfo.proSummary);
						})
						this.orderList = res.data;
						callback && callback(true);
					}, (err) => {
						callback && callback(false);
					});
				}else{
					this.$abyApi.Order.getRefundOrderList(reqInfo,this.where.orderType,this.where.identityType, (res) => {
						this.$refs.pull.closeLoading();
						res.data.forEach((v, i) => {
							res.data[i].orderSummary = JSON.parse(v.orderSummary);
						})
						this.orderList = res.data;
						callback && callback(true);
					}, (err) => {
						callback && callback(false);
					});
				}
				
			},
			getPullUp(callback) {
				let reqInfo = {};
				reqInfo.pageNum = this.pageNum = ++this.pageNum;
				reqInfo.where = this.where;
				reqInfo.keyWord = this.keyWord;
				this.$abyApi.Order.getList(reqInfo, (res) => {
					res.data.forEach((v, i) => {
						res.data[i].orderSummary = JSON.parse(v.orderSummary);
						res.data[i].orderInfo.proSummary = JSON.parse(v.orderInfo.proSummary);
					})
					this.orderList = this.orderList.concat(res.data);
					callback && callback(true);
				}, (err) => {
					callback && callback(false);
				});
			},
			// 列表事件监听
			eventOrderBack(){
				this.getPullDown();
			}
		},
		mounted() {
			this.getPullDown();
		},
		beforeRouteEnter(to, from, next) {
			if(from.name == 'order') {
				next(vm => {
					vm.init()
				})
			}else if(from.name == 'orderDetails' || from.name == 'refundDetail'){
				next(vm => {
					vm.getPullDown()
				})
			}else{
				next()
			}
		},
		beforeRouteLeave(to, from, next) {
			if(to.name == 'order') {
				to.meta.noKeepAlive = true;
				from.meta.noKeepAlive = false;
			} else {
				to.meta.noKeepAlive = true;
				from.meta.noKeepAlive = false;
			}
			next();
		},

	}
</script>

<style scoped>

</style>