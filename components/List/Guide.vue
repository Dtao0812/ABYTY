<template>
	<div class="list-item" style="top: 40px;">
		<!--导游列表-->
		<aby-no-content v-if="noContent"></aby-no-content>
		<ul class="mui-table-view">
			<li class="mui-table-view-cell mui-media" v-for="(item,i) in lists">
				<a href="javascript:;">
					<img class="mui-media-object mui-pull-left aby-img-guide" :src="item.aac007">
					<div class="mui-media-body aby-list">
						<p class="aby-list-title">{{item.aac003}}
						<img v-if="item.aac004==1&&item.aac201==2" class="icorealname" src="../../static/images/ico/ico_realman_2x.png" />
						<img v-if="item.aac004==0&&item.aac201==2" class="icorealname" src="../../static/images/ico/ico_realwoman_2x.png" />
						</p>
						<p class="mui-ellipsis">
							<aby-icon type="nowlocation" class="icolocation"></aby-icon>
							{{item.aac204}}
						</p>
						<p class="mui-ellipsis">
							业务范围：{{item.vsBranched|filterListToString}}
						</p>
						<p class="mui-ellipsis">
							服务线路：{{item.vsRoadLines||'未设置'}}
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
				lists:[],
				noContent:false
			}
		},
		methods: {
			
		},
		mounted() {
		},
		watch: {  
		    list(val){
		    	this.noContent = val.length == 0;
		    	this.lists = val;
		    }  
		}  
	}
</script>

<style scoped>
	.icorealname{
		height: 12px;
	}
	.icolocation{
		font-size: 13px;
		margin-right: 1px;
		margin-left: -1px;
	}
</style>