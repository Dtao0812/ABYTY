<template>
	<aby-page>
		<aby-header :title="webTitle" slot="header"></aby-header>
		<div class="mui-content aby-detail" slot="content">
			<iframe id="myiframe" :src="webUrl" width="100%" height="100%"></iframe>
		</div>
	</aby-page>
</template>
<style scoped>
	.mui-content{
		height: 100%;
	}
	iframe {
		border-width: 0;
		height: 100%;
		width: 100%;
	}
	.aby-detail{
		padding: 0;
	}
</style>
<script>
	export default {
		data() {
			return {
				loading: false,
				webUrl: this.$route.params.url,
				webTitle: this.$route.params.title||''
			}
		},
		mounted() {
			document.getElementById("myiframe").height = document.body.scrollHeight;
		},
		methods: {}
	}
</script>