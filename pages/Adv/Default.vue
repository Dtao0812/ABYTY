<template>
	<div class="mui-content">
		<div class="adpanel">
			<span class="btnclose" v-if="num >= 0" @click="toHome">{{skipText}}</span>
			<img :src="bgUrl"  @click="onBg"/>
		</div>
		<div class="logoPanel">
			<img src="../../static/images/logo/logo_txt_3x.png" />
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
				num: 6,
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
				this.skipText = '跳过( ' + _num + ' )';
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
	.mui-content{
		background-color: #FFFFFF;
		height: 100%;
	}
	
	.adpanel {
		width: 100%;
	}
	
	.adpanel img {
		width: 100%;
	}
	
	.btnclose {
		position: absolute;
		background-color: rgba(0, 0, 0, .5);
		color: #FFFFFF;
		font-size: 12px;
		padding: 2px 6px;
		right: 10px;
		top: 10px;
		border-radius: 4px;
	}
	
	.logoPanel {
		width: 100%;
		background-color: #FFFFFF;
		text-align: center;
		padding: 25px 10px;
		position: fixed;
		bottom: 0px;
		left: 0px;
	}
	
	.logoPanel img {
		width: 40%;
	}
</style>