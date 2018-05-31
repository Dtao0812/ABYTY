<template>
	<div id="app">
		<transition :name="pageDirection" :mode="mode">
			<keep-alive>
				<router-view v-if="!$route.meta.noKeepAlive" class="Router"></router-view>
			</keep-alive>
		</transition>

		<transition :name="pageDirection" :mode="mode">
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
		data() {
			return {
				mode:'in-out'
			}
		},
		methods: {},
		mounted() {},
		watch:{
		}
	}
</script>

<style>

</style>