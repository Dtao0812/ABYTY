<template>
	<aby-page>
		<aby-header title="酒店" slot="header">
		</aby-header>
		<div class="mui-content" slot="content">
			<aby-banner pageType="3"></aby-banner>
			<div class="">
				<div class="mint-cell">
					<div class="mint-cell-wrapper">
						<div class="mint-cell-title" @click="onSelectCity">
							<span class="mint-cell-text">
								<aby-icon type="hotelcity" class="icohotel"></aby-icon>
								入住城市</span>
							<span class="mint-cell-label aby-font-Black">{{cityName}}</span>
						</div>
						<div class="mint-cell-value is-link">
							<span></span>
						</div>
						<i class="mint-cell-allow-right"></i>
						<div class="btnSelCity">
							<aby-icon type="nowlocation"></aby-icon>
							<p>当前位置</p>
						</div>
					</div>
					<div class="mint-cell-right"></div>
				</div>
				<div class="mint-cell">
					<div class="mint-searchbar-inner">
						<aby-icon type="search" class="icosearch"></aby-icon>
						<input type="search" v-model="keyword" placeholder="请输入搜索关键字" class="mint-searchbar-core">
					</div>
				</div>
				<div class="mint-cell">
					<aby-button title="查询" @click.native="onSearch" class="aby-input-button-blueF"></aby-button>
				</div>
			</div>
		</div>
	</aby-page>

</template>

<script>
	import AbyBanner from '../../components/Swipe/Banner.vue'
	export default {
		components: {
			AbyBanner,
		},
		data() {
			return {
				keyword: '',
				cityName: this.$route.params.cityName || '北京'
			}
		},
		methods: {
			// 搜索酒店
			onSearch() {
				this.$router.push({
					name: 'hotel',
					params: {
						keyword: this.keyword,
						cityName: this.cityName
					}
				});
			},
			// 选择城市
			onSelectCity() {
				this.$router.push({
					name: 'cityList',
					params: {
						pageUrl: this.$route.name,
					}
				});
			}
		},
		mounted() {},
	}
</script>

<style scoped>
	.mint-cell-text {
		font-size: 14px;
		color: #AAAAAA;
	}
	
	.mint-cell-label {
		font-size: 18px;
	}
	
	.mint-cell {
		border-bottom: 1px solid #F0F0F0;
		padding: 15px 10px;
	}
	
	.mint-searchbar-core {
		margin-top: 14px;
		height: 28px;
		background: rgba(255, 255, 255, 0);
		text-align: left;
	}
	
	.mint-cell-allow-right::after {
		right: 120px;
		position: absolute;
	}
	
	.btnSelCity{
		text-align: center;
		color: #08C7B5;
	}
	.btnSelCity p{
		font-size: 12px;
		margin-top: 10px;
	}
	.icohotel{
		font-size: 15px;
	}
	.icosearch{
		font-size: 25px;
		color: #707070!important;
	}
	.mint-searchbar-core{
		padding: 10px 5px;
	}
</style>