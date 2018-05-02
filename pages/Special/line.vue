<template>
	<aby-pull>
		<aby-header title="特价线路" slot="header"></aby-header>
		<aby-navbar slot="navbar" noScreen="true">
		</aby-navbar>
		<div class="mui-content" slot="content">
			<aby-card></aby-card>
		</div>
	</aby-pull>
</template>

<script>
	import AbyCard from '../../components/Card/line.vue'
	export default {
		components: {
			AbyCard
		},
		data() {
			return {

			}
		},
		methods: {},
		mounted() {},
		watch: {}
	}
</script>

<style scoped>
</style>