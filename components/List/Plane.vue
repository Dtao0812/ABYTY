<template>
	<div class="list-item">
		<!--机票供应商列表-->
		<ul class="mui-table-view">
			<li class="mui-table-view-cell mui-media">
				<a>
					<img class="faceTip" src="../../static/images/ico/ico_sale.png" />
					<img class="mui-media-object mui-pull-left aby-img-guide" src="../../static/images/example/card.jpg">
					<div class="mui-media-body aby-list">
						<p class="aby-list-title">南京在路上旅行社</p>
						<p class="mui-ellipsis aby-list-data">
							经营范围：陕西、甘肃、青海、宁夏
						</p>
						<p class="mui-ellipsis aby-list-data">
							联系人：未设置
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
		components: {},
		data() {
			return {
				
			}
		},
		methods: {
			
		},
		mounted() {},
		watch: {
			
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