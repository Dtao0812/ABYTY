<template>
	<div class="card-item">
		<!--酒店产品-->
		<aby-no-content v-if="noContent"></aby-no-content>
		<div class="mui-card aby-special" v-for="(li,i) in list" :key="i" @click="toDetail(li)">
			<div class="mui-card-content">
				<img class="faceTip" src="../../static/images/ico/ico_sale.png" />
				<img class="face" :src="li.cpLogo" />
				<h4 class="aby-list-title mui-ellipsis">{{li.hName}}</h4>
				<p class="aby-list-company mui-ellipsis">{{li.hAddress}}</p>
				<p class="aby-list-company mui-ellipsis">
					<aby-icon type="business" class="icobusiness"></aby-icon>{{li.cpName}}</p>
				<p class="aby-list-data"><span>{{li.hStarlevel}}</span><span>浏览({{li.readCnt}})</span></p>
			</div>
			<div class="mui-card-footer">
				<span class="aby-list-price"><small>￥</small>{{li.dPrice}}<small>起</small></span>
				<span class="look"><aby-icon type="hot" class="icohot"></aby-icon>查看</span>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		components: {},
		props: ['list'],
		data() {
			return {
				noContent:false,
			}
		},
		methods: {
			//查看详情
			toDetail(li) {
				if(this.$store.state.loginState) {
					let reqInfo = {};
					reqInfo.hId = li.hId;
					reqInfo.loading = 1;
					this.$abyApi.Hotel.getDetail(reqInfo, (res) => {
						this.$router.push({
							name: 'webView',
							params: {
								title: li.hName,
								url: res.hotelInfo.detailUrl,
								cpId: li.cpId
							}
						});
					})
				} else {
					this.$router.push({
						name: 'login',
					});
				}
			}
		},
		mounted() {

		},
		watch: {
			list(val) {
				this.noContent = val.length == 0;
				this.list = val;
			}
		}
	}
</script>

<style scoped>
	.icobusiness {
		font-size: 12px;
	}
</style>