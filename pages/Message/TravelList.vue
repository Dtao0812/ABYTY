<template>
	<aby-page>
		<aby-header title="旅游咨询" slot="header"></aby-header>
		<div class="mui-content" slot="content">
			<div v-for="li in list">
				<div class="timepanel">
					<span class="time">{{li.publishTime|filterConvertDate}}</span>
				</div>		
				<div class="mui-card space" v-for="(x,i) in li.msgContent" :key="i">
					<div class="mui-card-content">
						<div class="mui-card-content-inner" v-if="i==0" @click="toDetail(x)">
							<div class="cardface">
								<img class="bookface" :src="x.coverImg" />
								<p class="tipTitle aby-list-title-2">{{x.title}}</p>
							</div>
						</div>
						<div class="carditem" v-else @click="toDetail(x)">
							<p class="itemtitle mui-ellipsis-2">{{x.title}}</p>
							<img class="itemimg" :src="x.coverImg" />
						</div>
					</div>
				</div>
			</div>
			<aby-no-content v-if="list.length==0"></aby-no-content>
		</div>
	</aby-page>
</template>

<script>
	export default {
		components: {},
		props: [],
		data() {
			return {
				list:[],
			}
		},
		methods: {
			// 获得消息列表
			getMsgList(){
				this.$abyApi.Sys.getMsgListLoad((res)=>{
					let nList = [];
					res.forEach((v)=>{
						if(v.msgType == 'travel')nList.push(v);
					})
					this.list = nList;
				});
			},
			// 详情
			toDetail(obj){
				this.$router.push({
					name:'webView',
					params:{
						url:obj.url,
						title:obj.title
					}
				});
			}
		},
		mounted() {
			this.getMsgList();
		},
		watch: {
		}
	}
</script>

<style scoped>
	.cardface {
		position: relative;
	}
	
	.bookface {
		width: 100%;
		vertical-align: bottom;
	}
	
	.tipTitle {
		position: absolute;
		padding: 5px 10px;
		background-color: rgba(0, 0, 0, .6);
		width: 100%;
		color: #FFFFFF!important;
		font-weight: 400!important;
		height: 50px;
		margin-top: -50px;
	}
	
	.carditem {
		padding: 5px 0px;
		margin-top: 10px;
		margin-left: 10px;
		margin-right: 10px;
		position: relative;
		border-bottom: 1px solid #F0F0F0;
	}
	
	.mui-card-content-inner{
		padding-bottom: 0px!important;
		padding: 10px;
	}
	
	.itemtitle {
		padding-right: 70px;
		color: #232323;
	}
	
	.itemimg {
		width: 50px;
		height: 50px;
		position: absolute;
		right: 0px;
		top: 0px;
	}
	.timepanel{
		text-align: center;
		padding: 15px 0px 0px 0px;
	}
	
	.time {
		background-color: rgba(0,0,0,.3);
		color: #FFFFFF;
		padding: 3px 5px;
		border-radius: 3px;
	}
	
	.mui-card {
		margin: 10px!important;
		border-radius: 4px;
		-webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, 0);
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0);
	}
</style>