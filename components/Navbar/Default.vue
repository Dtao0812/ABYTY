<template>
	<div class="navbar" ref="navbar">
		<slot name="navbar">
			<aby-search :type="pageType" v-if="!isShowSearch||!isFixed" :placeholder="searchPlaceholder"></aby-search>
			<slot name="navbar_1"></slot>
			<aby-screen :fixed="isFixed" :type="pageType" v-if="!isShownoScreen" :noSearch="isShowSearch" @eventScreen="eventNavBack"></aby-screen>
		</slot>
	</div>
</template>

<script>
	import AbySearch from './Search.vue'
	import AbyScreen from './Screen.vue'

	export default {
		components: {
			AbyScreen,
			AbySearch
		},
		props: ['title', 'type', 'noSearch', 'placeholder','noScreen'],
		data() {
			return {
				headerTitle: this.title,
				isFixed: false,
				isShowSearch: this.noSearch || false,
				isShownoScreen: this.noScreen || false,
				pageType: this.type,
				searchPlaceholder:this.placeholder
			}
		},
		methods: {
			scroll(top) {
				this.isFixed = top >= 40 ? true : false;
			},
			eventNavBack(e) {
				this.$emit("eventNavBack", e);
			},
		},
		mounted() {},
	}
</script>

<style scoped>
	.navbar{
		padding-top: 45px;
	}
	.aby-search {
		position: absolute !important;
		top: 11px !important;
		left: 10px !important;
	}
	.mui-bar .mui-title {
		left: 10px;
	}
	
	.mui-search input {
		border-radius: 12px;
		background-color: #F0F0F0;
		text-align: left;
	}
</style>