<template>
	<div class="list-item">
		<!--酒店产品列表-->
		<aby-no-content v-if="noContent"></aby-no-content>
		<ul class="mui-table-view" v-if="list.length>0">
			<li class="mui-table-view-cell mui-media" v-for="(li,i) in list" :key="i">
				<a href="javascript:;" @click="toDetail(li)">
					<img class="mui-media-object mui-pull-left aby-img" :src="li.hFaceImg">
					<div class="mui-media-body aby-list">
						<p class="aby-list-title">{{li.hName}}</p>
						<p class="mui-ellipsis">
							<aby-icon type="nowlocation" class="icolocation"></aby-icon>{{li.hAddress}}</p>
						<p class="mui-ellipsis aby-list-company">
							<aby-icon type="business" class="icobusiness"></aby-icon>
							{{li.cpName}}
						</p>
						<p class="mui-ellipsis aby-list-data">
							<span>{{li.hStarlevel}}</span>
							<span>浏览（{{li.readCnt}}）</span>
							<span class="aby-list-price"><small>￥</small>{{li.sPrice}}<small>起</small></span>
						</p>
					</div>
				</a>
				<div class="purchase-btn-group " v-if="pageType == 'myCollect'">
					<span class="purchase-delete-btn" :proId="item.hId" @click="onCancel">取消收藏</span>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		components: {},
		props: ['list'],
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
			},
			onCancel(e){
				this.$tool.confirm('您确定要取消收藏该产品吗？', (res) => {
					let proInfo = {};
					proInfo.loading = 1;
					proInfo.hId = e.target.getAttribute('hId');
					proInfo.collectState = 2;
					this.$abyApi.Project.setHotelCollection(proInfo, (res) => {
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
	.icolocation {
		font-size: 13px;
		margin-right: 3px;
		margin-left: -1px;
	}
	
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