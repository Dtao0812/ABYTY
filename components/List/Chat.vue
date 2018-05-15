<template>
	<ul class="mui-table-view" v-if="list.length>0">
		<li class="mui-table-view-cell mui-media" v-for="(li,i) in list" :key="i" @click="toDetail(li)">
			<a>
				<img class="mui-media-object mui-pull-left" :src="li.sendUser.userFace">
				<span class="mui-badge mui-badge-danger" v-show="li.noReadNum!=0">{{li.noReadNum}}</span>
				<div class="mui-media-body">
					{{li.sendUser.cpName}}
					<p class='mui-ellipsis'>{{li.content.content}}</p>
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
			//聊天页面
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
		    list(val){
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