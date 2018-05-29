<template>
	<div class="card-item">
		<!--线路产品-->
		<aby-no-content v-if="noContent"></aby-no-content>
		<div class="mui-card aby-special" v-for="(li,i) in list" :key="i" @click="toDetail(li)">
			<div class="mui-card-content">
				<img v-if="li.isClear == 1" class="faceTip" src="../../static/images/ico/ico_sale.png" />
				<img class="face" :src="li.proImage" :style="{ height: imgHeight }"/>
				<h4 class="aby-list-title-2">【{{li.mTitle}}】{{li.sTitle}}</h4>
				<p class="aby-list-company mui-ellipsis"><aby-icon type="business" class="icobusiness"></aby-icon>{{li.cpName}}</p>
				<p class="aby-list-data mui-ellipsis"><span v-if="li.groupType != '不限'" v-text="li.groupType"></span><span>浏览({{li.readCnt}})</span></p>
			</div>
			<div class="mui-card-footer">
				<span class="aby-list-price" v-if="li.dPrice!=0"><small>￥</small>{{li.dPrice}}<small>起</small></span>
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
				noContent:false,
				imgHeight: 0
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
			setImgHeight(){
				let imgArr = document.getElementsByClassName("face");
				if(imgArr[0])this.imgHeight = 2*imgArr[0].clientWidth / 3 + "px";
			}
		},
		mounted() {
			this.setImgHeight();
		},
		watch: {  
		    list(val){
		    	this.noContent = val.length == 0;
		    	this.list = val;
		    	this.setImgHeight();
		    }  
		}  
	}
</script>

<style scoped>
	.card-item{
		/*min-height: 800px;*/
	}
	.icobusiness {
		font-size: 12px;
	}
</style>