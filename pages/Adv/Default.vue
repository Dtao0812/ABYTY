<template>
	<div class="page">
		<div class="mui-content content" ref="content">
			<span class="skip" v-if="num >= 0" @click="toHome">
				{{skipText}}
			</span>
			<div class="aby-bg" :style="'background-image: url('+bgUrl+');'" @click="onBg"></div>
			<div class="aby-logo">
				<img src="../../static/images/logo/log_font.png" />
				<p>靠谱的旅游同业都在用</p>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				bgUrl: this.$store.state.advImg,
				skipText: '',
				num: 3,
			}
		},
		methods: {
			// 去首页
			toHome() {
				this.$router.replace({
					name: 'home'
				});
			},
			// 倒计时
			countDown() {
				let _num = this.num = this.num - 1;
				this.skipText = '跳过(' + _num + ')';
				if(_num >= 0) {
					setTimeout(() => {
						this.countDown()
					}, 1000)
				}
			},
			// 点击广告图
			onBg() {
				this.$router.replace({
					name:'webView',
					params:{
						title:this.$store.state.advTitle,
						url:this.$store.state.advUrl
					}
				})
			}
		},
		mounted() {
			try {
				if(plus) plus.navigator.closeSplashscreen();
			} catch(err) {};

			this.countDown();
		},
		watch: {
			num(val) {
				if(val == 0) {
					setTimeout(() => {
						this.$router.push({
							name: 'home'
						});
					}, 500)
				}
			}
		}
	}
</script>

<style scoped>
	.content {
		top: 0 !important;
	}
	
	.aby-bg {
		height: 80%;
		background-size: 100% 100%;
		background-position: center;
	}
	
	.aby-logo {
		height: 20%;
		text-align: center;
		font-size: 12px;
		padding-top: 10%;
	}
	
	.aby-logo img {
		height: 20px;
		width: auto;
	}
	
	.skip {
		position: absolute;
		right: 20px;
		top: 20px;
		background-color: #B6B6B6;
		padding: 2px 5px;
	}
</style>