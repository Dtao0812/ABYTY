<template>
	<aby-pull>
		<aby-header title="特价机票" slot="header"></aby-header>
		<aby-navbar slot="navbar" noScreen="true">
		</aby-navbar>
		<div class="mui-content" slot="content">
			<aby-list></aby-list>
		</div>
	</aby-pull>
</template>

<script>
	import AbyList from '../../components/List/Plane.vue'
	export default {
		components: {
			AbyList
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