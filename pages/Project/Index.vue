<template>
	<aby-pull ref="pull">
		<aby-header :title="title" slot="header">
			<header-search v-if="isShowSearch" disabled="true" @click.native="toSearch" slot="hSearch"></header-search>
		</aby-header>
		<aby-navbar slot="navbar" @eventNavBack="eventBack" type="10" ref="navbar"></aby-navbar>
		<aby-list slot="loadlist" ref="list" :list="lists"></aby-list>
	</aby-pull>
</template>

<script>
	import HeaderSearch from '../../components/Header/Search.vue'
	import AbyList from '../../components/List/Line.vue'
	export default {
		components: {
			AbyList,HeaderSearch
		},
		data() {
			return {
				isShowSearch:false,title:'线路产品',pageNum:1,orderBy:1,lists:[]
			}
		},
		methods: {
			scroll(top){
				this.isShowSearch = top >= 40?true:false;
				this.title = top >= 40?'':'线路产品';
			},
			getPullDown(callback){
				let reqInfo = {};
				reqInfo.orderBy = this.orderBy;
				reqInfo.pageNum = 1;
				reqInfo.loading = 1;
				this.$abyApi.Project.getLineListByKeyWord(reqInfo,(res)=>{
					this.$refs.pull.closeLoading();
					this.lists = res.proList;
					callback && callback(true);
				},(err)=>{
					callback && callback(false);
				});
			},
			getPullUp(callback){
				let reqInfo = {};
				reqInfo.orderBy = this.orderBy;
				reqInfo.pageNum = this.pageNum = ++this.pageNum;
				reqInfo.loading = 1;
				this.$abyApi.Project.getLineListByKeyWord(reqInfo,(res)=>{
					this.lists =  this.lists.concat(res.proList);
					callback && callback(true);
				},(err)=>{
					callback && callback(false);
				});
			},
			eventBack(e){
				this.lists = [];
				this.orderBy = e.value;
				this.getPullDown();
			},
			// 跳转到搜索页面
			toSearch() {
				this.$router.push({
					name: 'search',
					params: {
						type: 'pro'
					}
				});
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