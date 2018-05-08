<template>
	<div id="app">
		<transition :name="pageDirection" mode="in-out">
			<keep-alive>
				<router-view v-if="!$route.meta.noKeepAlive" class="Router"></router-view>
			</keep-alive>
		</transition>

		<transition :name="pageDirection" mode="in-out">
			<router-view v-if="$route.meta.noKeepAlive" class="Router"></router-view>
		</transition>
	</div>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		name: 'app',
		computed: {
			...mapState([
				'pageDirection'
			])
		},
		methods: {},
		mounted() {},
	}
</script>

<style>

</style>