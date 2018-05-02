<template>
	<aby-pull>
		<aby-header :title="title" slot="header">
			<header-search v-if="isShowSearch" slot="hSearch"></header-search>
			<aby-icon slot="right" type="screen" className="mui-pull-right" ></aby-icon>
		</aby-header>
		<aby-navbar slot="navbar" @eventNavBack="eventBack" type="99" ref="navbar"></aby-navbar>
		<aby-list slot="loadlist" ref="list" :list="lists"></aby-list>
	</aby-pull>
</template>

<script>
	import HeaderSearch from '../../components/Header/Search.vue'
	import AbyList from '../../components/List/Guide.vue'
	export default {
		components: {
			AbyList,HeaderSearch
		},
		data() {
			return {
				isShowSearch:false,title:'导游',pageNum:1,orderBy:1,lists:[],where:{}
			}
		},
		methods: {
			scroll(top){
				this.isShowSearch = top >= 40?true:false;
				this.title = top >= 40?'':'导游';
			},
			getPullDown(callback){
				let reqInfo = {};
				reqInfo.pageIndex = 1;
				reqInfo.loading = 1;
				reqInfo.where = this.where;
				
				this.$abyApi.Guide.getGuiderList(reqInfo,(res)=>{
					this.lists = res.userlist;
					callback && callback(true);
				},(err)=>{
					callback && callback(false);
				});
			},
			getPullUp(callback){
				let reqInfo = {};
				reqInfo.pageIndex = this.pageNum = ++this.pageNum;
				reqInfo.loading = 1;
				reqInfo.where = this.where;
				
				this.$abyApi.Guide.getGuiderList(reqInfo,(res)=>{
					this.lists =  this.lists.concat(res.userlist);
					callback && callback(true);
				},(err)=>{
					callback && callback(false);
				});
			},
			eventBack(e){
				this.lists = [];
				if(e.tabid === 1){
					this.orderBy = e.value;
				}else if(e.tabid === 4){
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