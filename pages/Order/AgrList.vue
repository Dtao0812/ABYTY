<template>
	<aby-pull ref="pull">
		<aby-header :title="headerTitle" slot="header">
		</aby-header>
		<aby-list slot="loadlist" ref="list" @eventAgr="eventAgrBack" :identityType="identityType" :list="list"></aby-list>
	</aby-pull>
</template>

<script>
	import AbyList from '../../components/List/Agr.vue'
	export default {
		components: {
			AbyList
		},
		data() {
			return {
				headerTitle: '',
				identityType: '',
				pageNum: 1,
				list: [],
			}
		},
		methods: {
			scroll(top) {
				this.scrollTop = top;
			},
			init() {
				this.headerTitle = this.$route.params.title;
				this.identityType = this.$route.params.identityType;
				this.getPullDown();
			},
			getPullDown(callback) {
				this.orderList = [];
				let reqInfo = {};
				reqInfo.pageNum = this.pageNum = 1;
				if(this.identityType == 'buyer'){
					this.$abyApi.Order.getCollAgrList(reqInfo, (res) => {
						this.$refs.pull.closeLoading();
						this.list = res.data;
						callback && callback(true);
					}, (err) => {
						callback && callback(false);
					});
				}else{
					this.$abyApi.Order.getOutAgrList(reqInfo, (res) => {
						this.list = res.data;
						callback && callback(true);
					}, (err) => {
						callback && callback(false);
					});
				}
			},
			getPullUp(callback) {
				let reqInfo = {};
				reqInfo.pageNum = this.pageNum = ++this.pageNum;
				if(this.identityType == 'buyer'){
					this.$abyApi.Order.getCollAgrList(reqInfo, (res) => {
						this.list = this.list.concat(res.data);
						callback && callback(true);
					}, (err) => {
						callback && callback(false);
					});
				}else{
					this.$abyApi.Order.getOutAgrList(reqInfo, (res) => {
						this.list = this.list.concat(res.data);
						callback && callback(true);
					}, (err) => {
						callback && callback(false);
					});
				}
			},
			// 列表事件监听
			eventAgrBack(){
				this.getPullDown();
			}
		},
		mounted() {
			this.init();
		},
	}
</script>

<style scoped>
</style>