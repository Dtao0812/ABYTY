<template>
	<aby-pull ref="pull">
		<aby-header :title="title" slot="header">
			<header-search v-if="isShowSearch" slot="hSearch"></header-search>
		</aby-header>
		<aby-navbar slot="navbar" @eventNavBack="eventBack" type="40" ref="navbar"></aby-navbar>
		<aby-list slot="loadlist" ref="list" :list="lists"></aby-list>
	</aby-pull>
</template>

<script>
	import HeaderSearch from '../../components/Header/Search.vue'
	import AbyList from '../../components/List/Sport.vue'
	export default {
		components: {
			AbyList,
			HeaderSearch
		},
		data() {
			return {
				isShowSearch: false,
				title: '景点门票',
				pageNum: 1,
				orderBy: 1,
				lists: [],
				where: {}
			}
		},
		methods: {
			scroll(top) {
				this.isShowSearch = top >= 40 ? true : false;
				this.title = top >= 40 ? '' : '景点门票';
			},
			getPullDown(callback) {
				let reqInfo = {};
				reqInfo.pageNum = 1;
				reqInfo.loading = 1;
				reqInfo.where = this.where;

				this.$abyApi.Sport.getSportsListByKeyWord(reqInfo, (res) => {
					this.$refs.pull.closeLoading();
					this.lists = res.scenicList;
					callback && callback(true);
				}, (err) => {
					callback && callback(false);
				});
			},
			getPullUp(callback) {
				let reqInfo = {};
				reqInfo.pageNum = this.pageNum = ++this.pageNum;
				reqInfo.loading = 1;
				reqInfo.where = this.where;

				this.$abyApi.Sport.getSportsListByKeyWord(reqInfo, (res) => {
					this.lists = this.lists.concat(res.scenicList);
					callback && callback(true);
				}, (err) => {
					callback && callback(false);
				});
			},
			eventBack(e) {
				this.lists = [];
				if(e.tabid === 1) {
					this.orderBy = e.value;
				} else if(e.tabid === 4) {
					this.where.sStarlevel = e.value;
				}
				this.getPullDown();
			}
		},
		mounted() {
			this.getPullDown();
		},
		created() {}
	}
</script>

<style>

</style>