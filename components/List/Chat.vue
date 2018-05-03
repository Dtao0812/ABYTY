<template>
	<ul class="mui-table-view">
		<li class="mui-table-view-cell mui-media" v-for="(li,i) in list" :key="i" @click="toDetail(li)">
			<a>
				<img class="mui-media-object mui-pull-left aby-img-guide" src="../../static/images/example/card.jpg">
				<div class="mui-media-body aby-list">
					<p class="aby-list-title mui-ellipsis">南京在路上旅行社有限公司</p>
					<p class="mui-ellipsis">
						经营范围：陕西、甘肃、青海、宁夏
					</p>
					<p class="mui-ellipsis">
						<aby-icon type="nowlocation" class="iconowlocation"></aby-icon>南京市
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
		components: {},
		props: ['list'],
		data() {
			return {}
		},
		methods: {
			//查看详情
			toDetail(li) {
				this.$router.push({
					name: 'chat',
					params: {
						userId:li.sendUser.userId
					}
				});
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
	.mui-table-view-cell {
		padding: 13px 15px;
	}
	
	.mui-table-view .mui-media-object {
		width: 45px;
		height: 45px;
		max-width: 45px;
		border-radius: 4px;
	}
	
	.mui-media-body {
		padding-top: 2px;
		font-size: 16px;
	}
	
	.state-blue {
		color: #08C7B5;
	}
	
	.state-gray {
		color: #AAAAAA;
	}
	
	.mui-badge {
		right: auto!important;
		left: 45px;
		top: 25%!important;
	}
</style>