<template>
	<aby-pull ref="pull">
		<aby-header title="特价机票" slot="header"></aby-header>
		<aby-navbar slot="navbar" @eventNavBack="eventBack" noScreen="true" noSearch="true" type="10" ref="navbar"></aby-navbar>
		<aby-list slot="loadlist" ref="list" :list="list"></aby-list>
	</aby-pull>
</template>

<script>
	import AbyList from '../../components/List/CardPlane.vue'
	export default {
		components: {
			AbyList
		},
		data() {
			return {
				pageNum: 1,
				list: []
			}
		},
		methods: {
			scroll(top) {},
			getPullDown(callback) {
				let reqInfo = {};
				reqInfo.pageNum = 1;
				reqInfo.loading = 1;
				this.$abyApi.Supplier.getPlaneList(reqInfo, (res) => {
					this.$refs.pull.closeLoading();
					this.list = res.userList;
					if(res.userList.length<6)this.$refs.pull.disableLoadBottom();
					callback && callback(true);
				}, (err) => {
					callback && callback(false);
				});
			},
			getPullUp(callback) {
				let reqInfo = {};
				reqInfo.pageNum = this.pageNum = ++this.pageNum;
				reqInfo.loading = 1;
				this.$abyApi.Supplier.getPlaneList(reqInfo, (res) => {
					this.list = this.list.concat(res.userList);
					callback && callback(true);
				}, (err) => {
					callback && callback(false);
				});
			},
			eventBack(e) {
				this.list = [];
				this.getPullDown();
			},
		},
		mounted() {
			this.getPullDown();
		},
		watch: {}
	}
</script>

<style scoped>
</style>