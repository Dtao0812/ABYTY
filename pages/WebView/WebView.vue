<template>
	<aby-page>
		<aby-header :title="webTitle" slot="header"></aby-header>
		<div class="mui-content" slot="content">
			<iframe id="myiframe" ref="iframe" :src="webUrl" width="100%" name="myiframe" height="100%"></iframe>
			<div class="operation" v-if="cpBasic != ''">
				<div class="mui-col-xs-3" @click="toChat">
					<aby-icon class="mui-icon" type="msg"></aby-icon><span class="icotext">聊天</span>
				</div>
				<div class="mui-col-xs-3" @click="toHomePage">
					<aby-icon class="mui-icon" type="business"></aby-icon><span class="icotext">主页</span>
				</div>
				<div class="mui-col-xs-6 btndisabled">
					<input type="button" value="立即预订" />
				</div>
			</div>

		</div>
	</aby-page>
</template>
<style scoped>
	.mui-content {
		height: 100%;
		overflow-x: hidden;
		overflow-y: auto;
	}
	
	iframe {
		border-width: 0;
		height: 100%;
		width: 100%;
		overflow-x: hidden;
		overflow-y: auto;
	}
	
	.operation {
		height: 45px;
		width: 100%;
		position: fixed;
		bottom: 0px;
		background-color: #FFFFFF;
		text-align: center;
		font-size: 14px;
		border-top: 1px solid #F0F0F0;
	}
	
	.operation .mui-col-xs-3,.operation .mui-col-xs-6 {
		float: left;
		padding: 5px 0px;
	}
	
	.operation .mui-icon {
		color: #08C7B5;
	}
	
	.operation .icotext {
		font-size: 12px;
		margin-top: -5px;
		display: block;
	}
	.btndisabled{
		background-color: #F0F0F0;
		color: #FFFFFF;
		height: 100%;
	}
	.btndisabled input{
		border: none;
		background-color: rgba(255,255,255,0);
		color: #DDDDDD;
		line-height: 25px;
	}
</style>
<script>
	export default {
		data() {
			return {
				loading: false,
				webUrl: this.$route.params.url,
				webTitle: this.$route.params.title || '',
				cpId: this.$route.params.cpId || '',
				cpBasic: '',
			}
		},
		mounted() {
			document.getElementById("myiframe").height = document.body.scrollHeight;
		},
		methods: {
			init() {
				this.webUrl = this.$route.params.url;
				this.webTitle = this.$route.params.title || '';
				this.cpId = this.$route.params.cpId || '';
				if(this.cpId != '')this.getCpBasic();
			},
			// 获得用户信息
			getCpBasic() {
				let reqInfo = {};
				reqInfo.cpId = this.cpId;
				this.$abyApi.User.getBasicNotLegal(reqInfo, (res) => {
					this.cpBasic = res.cpBasic
				})
			},
			// 聊天
			toChat() {
				this.$router.push({
					name: 'chat',
					params: {
						userId: this.cpBasic.userId
					}
				});
			},
			// 公司主页
			toHomePage() {
				if(this.cpBasic.userId){
					this.cpBasic.userId = '';
				};
				this.$store.commit('setHomePage', this.cpBasic);
				this.$router.push({
					name: "homePage"
				})
			}
		},
		watch: {
			webUrl(val) {}
		},
		beforeRouteEnter(to, from, next) {
			if(from.name != 'homePage' && from.name != 'chat') {
				next(vm => {
					vm.init();
				})
			}else{
				next()
			}
		},
	}
</script>