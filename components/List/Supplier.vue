<template>
	<div class="list-item">
		<!--导游列表-->
		<aby-no-content v-if="noContent"></aby-no-content>
		<ul class="mui-table-view" v-if="list.length>0">
			<li class="mui-table-view-cell mui-media" v-for="(item,i) in list" :key="i">
				<a href="javascript:;" @click="toHomePage(item)">
					<img class="mui-media-object mui-pull-left aby-img-guide" :src="item.cpLogo">
					<div class="mui-media-body aby-list">
						<p class="aby-list-title">{{item.cpName}}</p>
						<p class="mui-ellipsis">
							<aby-icon className="mui-pull-right" type="location"></aby-icon>
							{{item.cpCityName}}
						</p>
						<p class="mui-ellipsis" v-if="item.cpRoute.length>0">
							营业范围：{{item.cpRoute|filterListToString}}
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
						cpId: li.cpId
					}
				})
			}
		},
		mounted(){
			
		},
//		beforeRouteLeave(to, from, next) {
//			if(to.name == 'homePage') {
//				to.meta.noKeepAlive = false;
//			};
//			next();
//		},
		watch: {
			list(val) {
				this.noContent = val.length == 0;
				this.list = val;
			}
		}
	}
</script>

<style>
</style>