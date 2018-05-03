<template>
	<div class="card-item">
		<!--线路产品-->
		<div class="mui-card aby-special" v-for="(li,i) in list" :key="i">
			<div class="mui-card-content">
				<img v-if="li.isClear == 1" class="faceTip" src="../../static/images/ico/ico_sale.png" />
				<img class="face" :src="li.proImage" />
				<h4 class="aby-list-title-2">【{{li.mTitle}}】{{li.sTitle}}</h4>
				<p class="aby-list-company mui-ellipsis"><aby-icon type="business" class="icobusiness"></aby-icon>{{li.cpName}}</p>
				<p class="aby-list-data mui-ellipsis"><span v-if="li.groupType != '不限'" v-text="li.groupType"></span><span>浏览({{li.readCnt}})</span></p>
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
		components: {
		},
		props: ['list', 'page', 'proState'],
		data() {
			return {
			}
		},
		methods: {
			//查看详情
			toDetail(li){
				let proUrl = li.detailUrl + '?token='+this.$store.state.user_token + '&proId='+li.proId;
				this.$router.push({
					name: 'webView',
					params: {
						title: li.mTitle,
						url: proUrl,
						cpId:li.cpId
					}
				});
			},
		},
		mounted() {
		},
		watch: {  
		    list(val){
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