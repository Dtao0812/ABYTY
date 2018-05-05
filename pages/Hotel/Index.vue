<template>
	<aby-pull ref="pull">
		<aby-header :title="title" slot="header">
			<header-search v-if="isShowSearch" slot="hSearch"></header-search>
		</aby-header>
		<aby-navbar slot="navbar" @eventNavBack="eventBack" type="30" ref="navbar"></aby-navbar>
		<aby-list slot="loadlist" ref="list" :list="lists"></aby-list>
	</aby-pull>
</template>

<script>
	import HeaderSearch from '../../components/Header/Search.vue'
	import AbyList from '../../components/List/Hotel.vue'
	export default {
		components: {
			AbyList,
			HeaderSearch
		},
		data() {
			return {
				isShowSearch: false,
				title: '酒店',
				pageNum: 1,
				orderBy: 1,
				lists: [],
				keyword:this.$route.params.keyword,
				where: {
					cityName: this.$route.params.cityName,
				}
			}
		},
		methods: {
			scroll(top) {
				this.isShowSearch = top >= 40 ? true : false;
				this.title = top >= 40 ? '' : '酒店';
			},
			getPullDown(callback) {
				let reqInfo = {};
				reqInfo.pageNum = 1;
				reqInfo.loading = 1;
				reqInfo.keyWord = this.keyword;
				reqInfo.orderBy = this.orderBy;
				reqInfo.where = this.where;

				this.$abyApi.Hotel.getHotelListByKeyWord(reqInfo, (res) => {
					this.$refs.pull.closeLoading();
					this.lists = res.hotelList;
					callback && callback(true);
				}, (err) => {
					callback && callback(false);
				});
			},
			getPullUp(callback) {
				let reqInfo = {};
				reqInfo.pageNum = this.pageNum = ++this.pageNum;
				reqInfo.loading = 1;
				reqInfo.keyWord = this.keyword;
				reqInfo.orderBy = this.orderBy;
				reqInfo.where = this.where;

				this.$abyApi.Hotel.getHotelListByKeyWord(reqInfo, (res) => {
					this.lists = this.lists.concat(res.hotelList);
					callback && callback(true);
				}, (err) => {
					callback && callback(false);
				});
			},
			eventBack(e) {
				this.$refs.pull.showLoading();
				this.lists = [];
				if(e.tabid === 1) {
					this.orderBy = e.value;
				} else if(e.tabid === 2) {
					this.where.hStarlevel = e.text;
				} else if(e.tabid === 3) {
					this.where.hBrand = e.text;
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