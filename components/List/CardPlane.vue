<template>
	<div class="list-item">
		<!--机票供应商列表-->
		<aby-no-content v-if="noContent"></aby-no-content>
		<ul class="mui-table-view" v-if="list.length>0">
			<li class="mui-table-view-cell mui-media" v-for="(li,i) in list" :key="i" @click="toHomePage(item)">
				<a>
					<img class="faceTip" src="../../static/images/ico/ico_sale.png" />
					<img class="mui-media-object mui-pull-left aby-img-guide" :src="li.cpLogo">
					<div class="mui-media-body aby-list">
						<p class="aby-list-title">{{li.cpName}}</p>
						<p class="mui-ellipsis" v-if="li.cpRoute.length>0">
							营业范围：{{li.cpRoute|filterListToString}}
						</p>
						<p class="mui-ellipsis aby-list-data">
							联系人：{{li.cpHeadName}}
						</p>
						<p>
							<span class="look  mui-pull-right"><aby-icon type="hot" class="icohot"></aby-icon>立即联系</span>
						</p>
					</div>
				</a>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		components: {
		},
		props: ['list'],
		data() {
			return {
				noContent:false
			}
		},
		methods:{
			// 公司主页
			toHomePage(li){
				this.$router.push({
					name:"homePage",
					params:{
						userId: li.userId,
						cpId: li.cpId
					}
				})
			}
		},
		mounted(){
			
		},
		watch: {  
		    list(val){
		    	this.noContent = val.length == 0;
		    	this.list = val;
		    }  
		}  
	}
</script>

<style scoped>
	.look {
		background-color: #FF605D;
		color: #FFFFFF;
		font-size: 12px;
		padding: 2px 5px;
		border-radius: 5px;
	}
	
	.look .mui-icon {
		font-size: 10px;
	}
</style>