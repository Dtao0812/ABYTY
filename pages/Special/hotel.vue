<template>
	<aby-pull ref="pull">
		<aby-header title="特价酒店" slot="header"></aby-header>
		<aby-navbar slot="navbar" @eventNavBack="eventBack" noScreen="true" noSearch="true" type="10" ref="navbar"></aby-navbar>
		<aby-list slot="loadlist" ref="list" :list="list"></aby-list>
	</aby-pull>
</template>

<script>
	import AbyList from '../../components/List/CardHotel.vue'
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
				reqInfo.recomType = 'special';
				this.$abyApi.Hotel.getRecomHotelList(reqInfo, (res) => {
					this.$refs.pull.closeLoading();
					this.list = res.hotelList;
					if(res.hotelList.length<6)this.$refs.pull.disableLoadBottom();
					callback && callback(true);
				}, (err) => {
					callback && callback(false);
				});
			},
			getPullUp(callback) {
				let reqInfo = {};
				reqInfo.recomType = 'special';
				reqInfo.pageNum = this.pageNum = ++this.pageNum;
				reqInfo.loading = 1;
				this.$abyApi.Hotel.getRecomHotelList(reqInfo, (res) => {
					this.list = this.list.concat(res.hotelList);
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