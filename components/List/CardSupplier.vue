<template>
	<ul class="mui-table-view">
		<li class="mui-table-view-cell mui-media" v-for="(li,i) in list" :key="i" @click="toHomePage(li)">
			<a>
				<img class="mui-media-object mui-pull-left aby-img-guide" :src="li.cpLogo">
				<div class="mui-media-body aby-list">
					<p class="aby-list-title mui-ellipsis">{{li.cpName}}</p>
					<p class="mui-ellipsis">
						营业范围：{{li.cpRoute}}
					</p>
					<p class="mui-ellipsis">
						<aby-icon type="nowlocation" class="iconowlocation"></aby-icon>{{li.cpCityName}}
					</p>
					<p>
						<span class="look  mui-pull-right"><aby-icon type="hot" class="icohot"></aby-icon>立即联系</span>
					</p>
				</div>
			</a>
		</li>
	</ul>
</template>

<script>
	export default {
		components: {
		},
		props: ['list'],
		data() {
			return {}
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
			},
		},
		mounted(){
			
		}
	}
</script>

<style>
</style>