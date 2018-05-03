<template>
	<div class="list-item">
		<aby-no-content v-if="list.length==0"></aby-no-content>
		<ul class="mui-table-view" v-for="(li,i) in list" :key="i">
			<li class="mui-table-view-cell mui-media" v-if="identityType == 'seller'" @click="toDetail(li)">
				<img class="mui-media-object mui-pull-left" :src="li.buyerInfo.cpLogo" >
				<div class="mui-media-body aby-list">
					<p class="aby-list-title">
						<mt-badge size="small" type="error" class="aby-badge-nonum"></mt-badge>{{li.title}}
					</p>
					<!--买家中心-->
					<p class="mui-ellipsis">
						发件人：{{li.buyerInfo.cpName}}
					</p>
					<p class="mui-ellipsis">
						{{li.createTime | filterConvertDate}}
						<!--已确认的调用样式state-gray-->
						<span class="mui-pull-right state-blue" v-if="li.state==0">草稿</span>
						<span class="mui-pull-right state-blue" v-else-if="li.state==1">待确认</span>
						<span class="mui-pull-right state-gray" v-else>已确认</span>
					</p>
					<i class="mint-cell-allow-right"></i>
				</div>
			</li>
			<li class="mui-table-view-cell mui-media" v-if="identityType == 'buyer'" @click="toDetail(li)">
				<img class="mui-media-object mui-pull-left" :src="li.sellerInfo.cpLogo" >
				<div class="mui-media-body aby-list">
					<p class="aby-list-title">
						<mt-badge size="small" type="error" class="aby-badge-nonum" v-if="li.state==1"></mt-badge>{{li.title}}
					</p>
					<!--卖家中心-->
					<p class="mui-ellipsis">
						收件人：{{li.sellerInfo.cpName}}
					</p>
					<p class="mui-ellipsis">
						{{li.createTime | filterConvertDate}}
						<!--已确认的调用样式state-gray-->
						<span class="mui-pull-right state-blue" v-if="li.state==0">草稿</span>
						<span class="mui-pull-right state-blue" v-else-if="li.state==1">待确认</span>
						<span class="mui-pull-right state-gray" v-else>已确认</span>
					</p>
					<i class="mint-cell-allow-right"></i>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		components: {
		},
		props: ['list','identityType'],
		data() {
			return {
			}
		},
		methods: {
			//查看详情
			toDetail(li){
				this.$router.push({
					name: 'agrDetail',
					params: {
						agreementId: li.id,
						identityType: this.identityType
					}
				});
			}
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
	.mui-media img{
		max-width: 50px;
		height: 50px;
	}
	.mui-media-body p{
		padding-right: 20px;
	}
	.state-blue{
		color: #08C7B5;
	}
	.state-gray{
		color: #AAAAAA;
	}
</style>