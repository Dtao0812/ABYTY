<template>
	<div class="list-item">
		<!--景点产品列表-->
		<ul class="mui-table-view">
			<li class="mui-table-view-cell mui-media" v-for="(item,i) in list">
				<a href="javascript:;" @click="toDetail(item)">
					<img class="mui-media-object mui-pull-left aby-img" :src="item.sFaceImg">
					<div class="mui-media-body aby-list">
						<p class="aby-list-title">{{item.sName}}</p>
						<p class="mui-ellipsis">{{item.sStarlevel}}</p>
						<p class="mui-ellipsis aby-list-company">
							<aby-icon type="business" class="icobusiness"></aby-icon>
							{{item.cpName}}
						</p>
						<p class="mui-ellipsis aby-list-data">
							<span>浏览（{{item.readCnt}}）</span>
							<span class="aby-list-price"><small>￥</small>{{item.sPrice}}起</span>
						</p>
					</div>
				</a>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		components: {},
		name: "listSport",
		props: ['list'],
		data() {
			return {}
		},
		methods: {
			//查看详情
			toDetail(li) {
				if(this.$store.state.loginState) {
					let reqInfo = {};
					reqInfo.sId = li.sId;
					reqInfo.loading = 1;
					this.$abyApi.Sport.getDetail(reqInfo, (res) => {
						this.$router.push({
							name: 'webView',
							params: {
								title: li.sName,
								url: res.scenicInfo.detailUrl,
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