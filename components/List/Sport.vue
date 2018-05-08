<template>
	<div class="list-item">
		<!--景点产品列表-->
		<aby-no-content v-if="noContent"></aby-no-content>
		<ul class="mui-table-view" v-if="list.length>0">
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
							<span class="aby-list-price"><small>￥</small>{{item.sPrice}}<small>起</small></span>
						</p>
					</div>
				</a>
				<div class="purchase-btn-group " v-if="pageType == 'myCollect'">
					<span class="purchase-delete-btn" :proId="item.sId" @click="onCancel">取消收藏</span>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		components: {},
		name: "listSport",
		props: ['list','pageType'],
		data() {
			return {
				noContent:false
			}
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
			},
			onCancel(e){
				this.$tool.confirm('您确定要取消收藏该产品吗？', (res) => {
					let proInfo = {};
					proInfo.loading = 1;
					proInfo.sId = e.target.getAttribute('sId');
					proInfo.collectState = 2;
					this.$abyApi.Project.setScenicCollection(proInfo, (res) => {
						this.$emit("eventLineBack");
						this.$tool.toast('已取消');
					})
				})
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
	.purchase-btn-group{
		text-align: right;
	    min-height: 44px;
	    padding-top: 15px;
	    margin-top: 10px;
	    border-top: 1px solid #F0F0F0;
	    font-size: 14px;
	}
	.purchase-delete-btn{
		border: 1px solid #D0D0D0;
		color: #000;
		padding: 5px 20px;
		border-radius: 15px;
	}
</style>