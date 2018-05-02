<template>
	<aby-pull ref="pull">
		<aby-header :title="title" slot="header">
			<header-search v-if="isShowSearch" slot="hSearch"></header-search>
		</aby-header>
		<aby-tab :list="goodsList" @eventTabBack="eventTab" page="myProduct" slot="loadlist">
			<div v-for="(li,i) in goodsList" :key="i" :slot="li.id">
				<list-line v-if="li.type=='linePutaway'" :list="li.data" :proState="proState" page="myProduct" @eventLineBack="eventLine"></list-line>
				<list-line v-if="li.type=='lineNoPutaway'" :list="li.data" :proState="proState" page="myProduct" @eventLineBack="eventLine"></list-line>
			</div>
		</aby-tab>
	</aby-pull>
</template>

<script>
	import HeaderSearch from '../../components/Header/Search.vue'
	import AbySearch from '../../components/Navbar/Search.vue'
	import ListLine from '../../components/List/Line.vue'
	import ListSport from '../../components/List/Sport.vue'
	import ListHotel from '../../components/List/Hotel.vue'
	export default {
		components: {
			HeaderSearch,AbySearch,ListLine,ListSport,ListHotel
		},
		data() {
			return {
				isShowSearch:false,
				title:'我的产品库',
				pageNum:1,
				proState: 1,
				goodsList: [{
						id:'linePutaway',
						title: '已上架',
						type: 'linePutaway',
						data: ''
					},
					{
						id:'lineNoPutaway',
						title: '未上架',
						type: 'lineNoPutaway',
						data: ''
					}
				],
			}
		},
		methods: {
			scroll(top){
				this.isShowSearch =false;
			},
			getPullDown(callback){
				let reqInfo = {};
				reqInfo.loading = 1;
				reqInfo.pageNum = 1;
				if(this.proState == 1){
					this.$abyApi.Project.getMyPro(reqInfo, {proState:1}, (res) => {
						this.$refs.pull.closeLoading();
						this.goodsList[0].data = res.proList;
						callback && callback(true);
					},(err)=>{
						callback && callback(false);
					});
				}else{
					this.$abyApi.Project.getMyPro(reqInfo, {proState:2}, (res) => {
						this.goodsList[1].data = res.proList;
						callback && callback(true);
					},(err)=>{
						callback && callback(false);
					})
				}
			},
			getPullUp(callback){
				let reqInfo = {};
				reqInfo.loading = 1;
				reqInfo.pageNum = this.pageNum = ++this.pageNum;
				if(this.proState == 1){
					this.$abyApi.Project.getMyPro(reqInfo, {proState:1}, (res) => {
						this.goodsList[0].data = this.goodsList[0].data.concat(res.proList);
						callback && callback(true);
					},(err)=>{
						callback && callback(false);
					});
				}else{
					this.$abyApi.Project.getMyPro(reqInfo, {proState:2}, (res) => {
						this.goodsList[1].data = this.goodsList[1].data.concat(res.proList);
						callback && callback(true);
					},(err)=>{
						callback && callback(false);
					})
				}
			},
			// tab点击返回监听
			eventTab(e){
				if(e.id=="linePutaway"){
					this.proState = 1;
					this.getPullDown();
				}else{
					this.proState = 2;
					this.getPullDown();
				}
			},
			eventLine(){//上下架及删除返回监听
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