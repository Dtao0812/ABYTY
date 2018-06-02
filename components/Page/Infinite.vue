<template>
	<div class="page-infinite-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
		<div id="list" style="padding-bottom: 60px;">
			<slot name="loading">
				<aby-loading v-show="isLoading"></aby-loading>
			</slot>
			<div id="loadDiv" style="height: 100%;" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="50">
				<slot name="loadlist" ref="loadlist"></slot>
				<br style="clear:both"/>
			</div>
			<p v-show="isButtonLoading" class="page-infinite-loading">
				<mt-spinner type="fading-circle"></mt-spinner>
				加载中...
			</p>
		</div>
	</div>
</template>
<script>
	export default {
		props: ['type'],
		data() {
			return {
				list: [],
				tabType:this.type,
				loading: false,
				allLoaded: false,
				wrapperHeight: 0,
				isLoading: true,
				isButtonLoading: false,
			};
		},
		methods: {
			loadMore() {
				this.loading = true;
				this.isButtonLoading = true;
				setTimeout(() => {
					this.$emit("eventinfiniterBack", this.type, (res) => {
						this.isLoading = false;
						if(res){
							this.loading = false;
							this.isButtonLoading = true;
						}else{
							this.loading = true;
							this.isButtonLoading = false;
						}
					});
				}, 1500);
			},
			// 显示加载动画
			showLoading(){
				this.isLoading = true;
			},
			// 关闭加载动画
			closeLoading() {
				setTimeout(() => {
					this.isLoading = false;
				}, 1500)
			},
		},
		mounted() {
			this.wrapperHeight = document.documentElement.clientHeight;
			document.getElementById('loadDiv').scrollTop = 0;
			console.log(document.documentElement.clientHeight)
			document.getElementById("loadDiv").style.height = document.documentElement.clientHeight;
		},
		watch:{
			type(val){
				this.tabType = val;
			}
		}
	};
</script>

<style scoped>
	.page-infinite {}
	
	.page-infinite-desc {
		text-align: center;
		color: #666;
		padding-bottom: 5px;
		border-bottom: solid 1px #eee;
	}
	
	.page-infinite-listitem {
		height: 50px;
		line-height: 50px;
		border-bottom: solid 1px #eee;
		text-align: center;
	}
	
	.page-infinite-listitem:first-child {
		border-top: solid 1px #eee;
	}
	
	.page-infinite-wrapper {
		margin-top: -1px;
		overflow: scroll;
	}
	
	.page-infinite-loading {
		text-align: center;
		height: 50px;
		line-height: 50px;
	}
	
	.page-infinite-loading div {
		display: inline-block;
		vertical-align: middle;
		margin-right: 5px;
	}
</style>