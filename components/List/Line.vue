<template>
	<div class="list-item">
		<!--线路产品列表-->
		<ul class="mui-table-view" v-for="(item,i) in list" :key="i">
			<li class="mui-table-view-cell mui-media" >
				<a href="javascript:;" @click="toDetail(item)">
					<img class="mui-media-object mui-pull-left aby-img" :src="item.proImage">
					<div class="mui-media-body aby-list">
						<p class="aby-list-title-2">【{{item.mTitle}}】{{item.sTitle}}</p>
						<p class="mui-ellipsis aby-list-company">
							<aby-icon type="business" class="icobusiness"></aby-icon>
							{{item.cpName}}
						</p>
						<p class="mui-ellipsis aby-list-data">
							<span v-if="item.groupType!=='不限'">{{item.groupType}}</span>
							<span>浏览（{{item.readCnt}}）</span>
							<span class="aby-list-price"><small>￥</small>{{item.dPrice}}<small>起</small></span>
						</p>
					</div>
				</a>
				<div class="purchase-btn-group " v-if="pageType == 'myProduct'">
					<span class="purchase-finish-btn" v-if="proState == '1'" :proId="item.proId" @click="onDown">下架</span>
					<span class="purchase-finish-btn" v-if="proState == '2'" :proId="item.proId" @click="onUp">上架</span>
					<span class="purchase-delete-btn" :proId="item.proId" @click="onDelete">删除</span>
				</div>
				<div class="purchase-btn-group " v-if="pageType == 'myCollect'">
					<span class="purchase-delete-btn" :proId="item.proId" @click="onCancel">取消收藏</span>
				</div>
			</li>
			<div class="space" v-if="pageType == 'myProduct' || pageType == 'myCollect'"></div>
		</ul>
		<aby-no-content v-if="noContent"></aby-no-content>
	</div>
</template>

<script>
	export default {
		components: {
		},
		name:"listLine",
		props: ['list', 'page', 'proState'],
		data() {
			return {
				pageType: this.page,
				noContent:false
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
			//上架
			onUp(e){
				this.$tool.confirm('您确定要上架该产品吗？', (res) => {
					let proInfo = {};
					proInfo.proId = e.target.getAttribute('proId');
					proInfo.proState = 1;
					this.$abyApi.Project.setProState(proInfo, (res) => {
						this.$tool.toast('已上架');
						this.$emit("eventLineBack");
					})
				})
			},
			//下架
			onDown(e){
				this.$tool.confirm('您确定要下架该产品吗？', (res) => {
					let proInfo = {};
					proInfo.proId = e.target.getAttribute('proId');
					proInfo.proState = 2;
					this.$abyApi.Project.setProState(proInfo, (res) => {
						this.$tool.toast('已下架');
						this.$emit("eventLineBack");
					})
				})
			},
			onDelete(e){
				this.$tool.confirm('您确定要删除该产品吗？', (res) => {
					let proInfo = {};
					proInfo.loading = 1;
					proInfo.proId = e.target.getAttribute('proId');
					this.$abyApi.Project.delPro(proInfo, (res) => {
						this.$tool.toast('已删除');
						this.$emit("eventLineBack");
					})
				})
			},
			onCancel(e){
				this.$tool.confirm('您确定要取消收藏该产品吗？', (res) => {
					let proInfo = {};
					proInfo.loading = 1;
					proInfo.proId = e.target.getAttribute('proId');
					proInfo.collectState = 2;
					this.$abyApi.Project.getProCollection(proInfo, (res) => {
						this.$tool.toast('已取消');
						this.$emit("eventLineBack");
					})
				})
			}
		},
		mounted() {
		},
		updated(){
			this.noContent = this.list.length == 0;
		},
		watch: {  
		    list(val){
		    	this.list = val;
		    }  
		}  
	}
</script>

<style scoped>
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
	.purchase-finish-btn{
		padding: 5px 20px;
		border-radius: 15px;
		border: 1px solid #53D8CC;
		color: #53D8CC;
	}
	.icobusiness{
		font-size: 12px;
	}
</style>