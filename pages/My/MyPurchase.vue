<template>
	<aby-pull ref="pull">
		<aby-header title="我的询价" slot="header"></aby-header>
		<aby-list @getPullDown="getPullDown" slot="loadlist" ref="loadlist" :list="lists"></aby-list>
	</aby-pull>
</template>

<script>
	import AbyList from '../../components/List/Purchase.vue'
	export default {
		components: {
			AbyList
		},
		data() {
			return {
				lists: [],
				scrollTop: '',
				pageNum: 1
			}
		},
		methods:{
			scroll(top) {
				this.scrollTop = top;
			},
			getPullDown(callback){
				let reqInfo = {};
				reqInfo.loading = 1; //不显示接口加载动画
				reqInfo.pageNum = 1;
				this.$abyApi.Select.getMyPublishList(reqInfo, (res)=>{
					this.$refs.pull.closeLoading();
					this.lists = res.cpSelectList;
					callback && callback(res.cpSelectList.length);
				},(err)=>{
					callback && callback(false);
				});
			},
			getPullUp(callback){
				let reqInfo = {};
				reqInfo.loading = 1; //不显示接口加载动画
				reqInfo.pageNum = this.pageNum = ++this.pageNum;
				this.$abyApi.Select.getMyPublishList(reqInfo, (res)=>{
					this.lists = this.lists.concat(res.cpSelectList);
					callback && callback(true);
				},(err)=>{
					callback && callback(false);
				});
			}
		},
		mounted() {
			this.getPullDown();
		},
		updated(){
			//初始化倒计时
//			for(var i = 0, len = this.list.length; i < len; i++) {
//				if(this.list[i].selectState == 10)
//					this.$tool.countdown(this.list[i].outServTime, this.list[i].selectId);
//			}
		},
	}
</script>
<style scoped>
	
</style>