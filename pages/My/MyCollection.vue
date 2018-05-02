<template>
	<aby-pull ref="pull">
		<aby-header :title="title" slot="header">
			<!--<header-search v-if="isShowSearch" slot="hSearch"></header-search>-->
		</aby-header>
		<aby-search class="aby-search" slot="navbar"></aby-search>
		
		<aby-tab :list="goodsList" @eventTabBack="eventTab" page="myCollect" slot="loadlist">
			<div v-for="(li,i) in goodsList" :key="i" :slot="li.id">
				<list-line v-if="li.type=='line'" :list="li.data"></list-line>
				<list-sport v-if="li.type=='sport'" :list="li.data"></list-sport>
				<list-hotel v-if="li.type=='hotel'" :list="li.data"></list-hotel>
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
				title:'我的收藏',
				pageNum:1,
				goodsList: [{
						id:'line',
						title: '线路',
						type: 'line',
						data: ''
					},
					{
						id:'hotel',
						title: '酒店',
						type: 'hotel',
						data: ''
					},
					{
						id:'sport',
						title: '门票',
						type: 'sport',
						data: ''
					}
				],
			}
		},
		methods: {
			scroll(top){
				this.isShowSearch = top >= 40?true:false;
				this.title = top >= 40?'':'我的收藏';
			},
			getPullDown(callback){
				let reqInfo = {};
				reqInfo.pageNum = 1;
				reqInfo.keyWord = '',
				this.$abyApi.All.getCollections(reqInfo, (res) => {
					this.$refs.pull.closeLoading();
					this.goodsList[0].data = res.lineList;
					this.goodsList[1].data = res.hotelList;
					this.goodsList[2].data = res.sportList;
					callback && callback(true);
				},(err)=>{
					callback && callback(false);
				})
			},
//			getPullUp(callback){
//				let reqInfo = {};
//				reqInfo.pageNum = 1;
//				reqInfo.keyWord = '',
//				this.$abyApi.All.getCollections(reqInfo, (res) => {
//					console.log('res:'+JSON.stringify(res))
//					this.goodsList[0].data = res.lineList;
//					this.goodsList[1].data = res.hotelList;
//					this.goodsList[2].data = res.sportList;
//					
//				})
//			},
//			eventBack(e){
////				this.lists = [];
////				this.orderBy = e.value;
//				this.getPullDown();
//			}
			// tab点击返回监听
			eventTab(e){
				console.log(e.id)
			}
		},
		mounted() {
			this.getPullDown();
		},
		created() {}
	}
</script>

<style scoped>
	.aby-search{
		margin-top: 45px;
	}
</style>