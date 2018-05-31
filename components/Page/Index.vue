<template>
	<div class="page">
		<div @scroll="scroll" ref="content" style="height: 100%;">
			<transition name="">
				<keep-alive>
					<router-view v-if="!$route.meta.noKeepAlive">
					</router-view>
				</keep-alive>
			</transition>

			<transition name="">
				<router-view v-if="$route.meta.noKeepAlive">
				</router-view>
			</transition>
		</div>
		<div class="footer">
			<aby-tabBar ref='footer'></aby-tabBar>
		</div>
	</div>
</template>

<script>
	import AbyTabBar from '../Navbar/Bottom.vue'
	export default {
		components: {
			AbyTabBar
		},
		name: 'page',
		data() {
			return {
				scrollTop: 0
			}
		},
		methods: {
			scroll() {
				this.scrollTop = this.$refs.content.scrollTop
			},
			eventPageShow(name) {
				this.$refs.footer.eventPageShow(name);
			}
		},
		mounted() {},
		activated() {
			this.$refs.content.scrollTop = this.scrollTop;
		},
		deactivated() {}

	}
</script>

<style scoped>
</style>