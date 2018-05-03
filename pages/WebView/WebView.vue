<template>
	<aby-page>
		<aby-header :title="webTitle" slot="header"></aby-header>
		<div class="mui-content aby-detail" slot="content">
			<iframe id="myiframe" ref="iframe1" :src="webUrl" width="100%" name="a" height="100%"></iframe>
		</div>
	</aby-page>
</template>
<style scoped>
	.mui-content {
		height: 100%;
	}
	
	iframe {
		border-width: 0;
		height: 100%;
		width: 100%;
	}
	
	.aby-detail {
		padding: 0;
	}
</style>
<script>
	//	import webView from '../../static/js/webView.js'
	export default {
		data() {
			return {
				loading: false,
				webUrl: this.$route.params.url,
				webTitle: this.$route.params.title || ''
			}
		},
		mounted() {
			document.getElementById("myiframe").height = document.body.scrollHeight;
		},
		methods: {},
		watch: {
			webUrl(val) {
			}
		}
	}
</script>