<template>
	<aby-page>
		<aby-header title="设置" slot="header"></aby-header>
		<div slot="content" class="mui-content">
			<ul class="mui-table-view mui-table-view-chevron">
				<li class="mui-table-view-cell" id="editPwd">
					<router-link :to="{ name: 'setPassword' }" class="mui-navigate-right">重置登录密码</router-link>
				</li>
			</ul>
			<h5 class="mui-content-padded"></h5>
			<ul class="mui-table-view mui-table-view-chevron">
				<li class="mui-table-view-cell" id="editPwd">
					<router-link :to="{ name: 'feedback' }" class="mui-navigate-right">意见反馈</router-link>
				</li>
			</ul>
			<h5 class="mui-content-padded"></h5>
			<ul class="mui-table-view mui-table-view-chevron">
				<li class="mui-table-view-cell" id="about">
					<router-link :to="{ name: 'picAbout' }" class="mui-navigate-right">关于我们 <i class="mui-pull-right update" id="versionTxt">{{versionTxt}}</i></router-link>
				</li>
			</ul>
			<h5 class="mui-content-padded"></h5>
			<ul class="mui-table-view mui-table-view-chevron">
				<li id="feedback" class="mui-table-view-cell">
					<a class="mui-navigate-right">客服电话：<span @click="onDialTel" class="fontGrayBlue floatRight">{{tel}}</span></a>
				</li>
			</ul>
			<div class="aby-button-panel">
				<aby-button class="aby-button-blue" title="退出登录" @click.native="onLogExit"></aby-button>
			</div>
		</div>
	</aby-page>
</template>

<script>
	export default {
		data() {
			return {
				tel: this.$store.state.abyTel,
				versionTxt: 'V' + this.$store.state.version || '',
			}
		},
		methods: {
			onDialTel() {
				this.$tool.dialTelToApp(this.tel);
			},
			onLogExit() {
				this.$tool.confirm("您确定要退出登录吗？退出后所有信息都会自动清空！",(res)=>{
					this.$store.commit('clearState');
					this.$router.push({
						name: 'home'
					});
				})
			}
		},
		mounted() {},
	}
</script>

<style scoped>
	.btnFixed {
		position: fixed!important;
		bottom: 0px!important;
		margin-bottom: 0px!important;
		text-align: center!important;
		line-height: 10px!important;
		border-radius: 0px!important;
	}
	
	.mui-table-view-cell {
		padding-top: 15px;
		padding-bottom: 15px;
		padding-left: 15px;
	}
	
	.mui-navigate-right:after,
	.mui-push-right:after {
		top: 24px;
	}
	.aby-button-panel{
		margin-top: 50px;
	}
</style>