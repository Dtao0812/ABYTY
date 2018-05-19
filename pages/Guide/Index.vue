<template>
	<aby-pull ref="pull">
		<aby-header :title="title" slot="header">
			<header-search v-if="isShowSearch" @eventSearch="searchKey" slot="hSearch"></header-search>
			<aby-icon slot="right" type="screen" className="mui-pull-right" @click.native="toCityList"></aby-icon>
		</aby-header>
		<aby-navbar slot="navbar" @eventNavBack="eventBack" noSearch="true" noScreen="true" type="99" ref="navbar"></aby-navbar>
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
				isShowSearch:false,title:'导游',pageNum:1,orderBy:1,lists:[],
				where:{
					cityId: this.$route.params.cityId||'',
					cityName: this.$route.params.cityName||''
				},
			}
		},
		methods: {
			init(){
				this.$refs.pull.showLoading();
				this.pageNum = 1;
				this.orderBy = 1;
				this.lists = [];
				this.where = {
					cityId: this.$route.params.cityId||'',
					cityName: this.$route.params.cityName||''
				};
				this.getPullDown();
			},
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
					this.$refs.pull.closeLoading();
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
			},
			searchKey(e){
				this.where.cityName = e;
				this.getPullDown();
			},
			// 打开城市检索
			toCityList(){
				this.$router.push({
					name: 'cityList',
					params: {
						pageUrl: this.$route.name,
					}
				});
			}
		},
		mounted() {
			this.getPullDown();
		},
		created() {},
		beforeRouteEnter(to, from, next) {
			if(from.name != 'guidePage') {
				next(vm => {
					vm.init()
				})
			}else{
				next()
			}
		},
	}
</script>

<style>

</style>