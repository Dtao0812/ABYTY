<template>
	<aby-pull ref="pull">
		<aby-header :title="title" slot="header"></aby-header>
		<aby-navbar slot="navbar" @eventNavBack="eventBack" noScreen="true" noSearch="true" type="10" ref="navbar"></aby-navbar>
		<aby-list slot="loadlist" ref="list" :list="list"></aby-list>
	</aby-pull>
</template>

<script>
	import AbyList from '../../components/List/CardLine.vue'
	export default {
		components: {
			AbyList
		},
		data() {
			return {
				title: '特卖汇',
				pageNum: 1,
				list: []
			}
		},
		methods: {
			init(){
				this.getPullDown();
			},
			scroll(top) {},
			getPullDown(callback) {
				let reqInfo = {};
				reqInfo.pageNum = 1;
				reqInfo.loading = 1;
				reqInfo.recomType = 'quality';
				this.$abyApi.Project.getRecomLineList(reqInfo, (res) => {
					this.$refs.pull.closeLoading();
					this.list = res.proList;
					callback && callback(true);
				}, (err) => {
					callback && callback(false);
				});
			},
			getPullUp(callback) {
				let reqInfo = {};
				reqInfo.recomType = 'quality';
				reqInfo.pageNum = this.pageNum = ++this.pageNum;
				reqInfo.loading = 1;
				this.$abyApi.Project.getRecomLineList(reqInfo, (res) => {
					this.list = this.list.concat(res.proList);
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
		watch: {},
		beforeRouteEnter(to, from, next) {
			if(from.name == 'home') {
				next(vm => {
					vm.init();
				})
			}else{
				next()
			}
		},
	}
</script>

<style scoped>

</style>