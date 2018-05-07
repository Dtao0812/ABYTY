<template>
	<div class="page">
		<slot name="header"></slot>
		<div class="content" @scroll="scroll" ref="content">
			<slot name="navbar"></slot>
			<slot name="content"></slot>
			<slot name="loading"><aby-loading v-show="isLoading"></aby-loading></slot>
			<slot name="footer"></slot>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'page',
		data() {
			return {
				scrollTop: 0,
				isLoading:true
			}
		},
		methods: {
			scroll() {
				this.scrollTop = this.$refs.content.scrollTop
			},
			// 显示加载动画
			showLoading(){
				this.isLoading = true;
			},
			// 关闭加载动画
			closeLoading(){
				this.isLoading = false;
			},
		},
		beforeMount(){
		},
		mounted() {
			this.isLoading = false;
		},
		updated(){
		},
		activated() {
			this.$refs.content.scrollTop = this.scrollTop;
		},
		deactivated() {
		},
		watch:{
		}

	}
</script>

<style scoped>
</style>