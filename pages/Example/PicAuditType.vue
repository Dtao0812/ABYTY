<template>
	<aby-page>
		<aby-header title="帐号状态" slot="header">
			<aby-fonts slot="right" class="aby-mui-bar" className="mui-pull-right" @click.native="toLogin" title="切换帐号"></aby-fonts>
		</aby-header>
		<div slot="content" class="mui-content">
			<div class="divStatus">
				<img v-if="auditState===0" src="../../static/images/status/status_auditting.png" />
				<img v-if="auditState===2" src="../../static/images/status/status_auditFail.png" />
				<img v-if="auditState===''||!auditState" src="../../static/images/status/status_notAudit.png" />
				<h5 class="marginComm"></h5>
				<h3 class="fontBlue">{{auditTitle}}</h3>
				<h5 class="mui-content-padded"></h5>
				<p id="auditDesc" v-html="auditDesc"></p>
			</div>
			<div class="paddingTen" v-if="auditState===''||auditState===2||auditState===4">
				<aby-button :title="btnTitle" @click.native="toNext" class="aby-button-blue"></aby-button>
			</div>
			<div class="textBottom mui-text-center">
				客服电话：<span class="linkBlue" @click="onDialTel">{{tel}}</span>
			</div>
		</div>
	</aby-page>
</template>

<script>

	export default {
		components: {
		},
		data() {
			return {
				tel: this.$store.state.abyTel,
				auditTitle: '',
				auditDesc: this.$store.state.cpBasic.auditDesc||'',
				auditState: this.$store.state.cpBasic.cpAuditState||'',
				btnTitle: '提交认证'
			}
		},
		methods: {
			onDialTel() {
				this.$tool.dialTelToApp(this.tel);
			},
			toNext(){
				if(this.auditState === 2 || this.auditState === '' || this.auditState === 4){
					this.$router.push({ name: 'registerTwo' });
				}
			},
			//切换帐号
			toLogin(){
				this.$store.commit("clearState");
				this.$router.push({ name: 'login' });
			}
		},
		mounted() {
			switch(this.auditState) {
				case 0:
					this.auditTitle = '您的账号正在审核中';
					break;
				case 2:
					this.auditTitle = '审核未通过';
					this.btnTitle = '重新认证';
					break;
				case 4:
				default:
					this.auditTitle = '';
					this.auditDesc = '为了保证其他用户的权益<br/>您还没有认证，无法使用app功能';
					this.btnTitle = '提交认证';
					break;
			}
		},
	}
</script>

<style scoped>
	.aby-mui-bar {
		font-size: 15px !important;
		height: 100%;
		vertical-align: middle;
	}
	
	.divStatus {
		text-align: center;
		padding: 60px 20px 30px 20px;
	}
	
	.divStatus img {
		width: 100px;
	}
	.paddingTen {
		padding: 0px 10px;
	}
	.textBottom {
		width: 100%;
		position: absolute;
		bottom: 15px;
	}
</style>