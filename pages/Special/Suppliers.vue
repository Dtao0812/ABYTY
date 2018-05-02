<template>
	<aby-pull>
		<aby-header title="优质供应商" slot="header"></aby-header>
		<aby-navbar slot="navbar" noScreen="true">
		</aby-navbar>
		<div class="mui-content" slot="content">
			<!--目前就这一个地方用到就没写组件-->
			<ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media">
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
		</div>
	</aby-pull>
</template>

<script>
	export default {
		components: {

		},
		data() {
			return {

			}
		},
		methods: {},
		mounted() {},
		watch: {}
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
	.iconowlocation{
		font-size: 12px;
	}
</style>