<template>
	<div class="page">
		<aby-header title="" slot="header" transparent="true"></aby-header>
		<div class="content" ref="content">
			<div class="mui-content aby-bg-login">
				<div class="divLogo">
					<img class="logo" src="../../static/images/logo/logo_white.png" />
				</div>
				<div class="row-input">
					<aby-field modelId="loginId" className="aby-input-line" iclassName="mintui mintui-more aby-font-white" placeholder="请输入手机号" type="tel">
						<aby-icon id="iconLabel" type="loginidwhite" class="aby-font-white" slot="icon"></aby-icon>
					</aby-field>
					<aby-field modelId="loginPwd" className="aby-input-line" iclassName="mintui mintui-more aby-font-white" placeholder="密码至少六位" type="password">
						<aby-icon id="iconLabel" type="pwdwhite" class="aby-font-white" slot="icon"></aby-icon>
					</aby-field>
				</div>
				<div class="row-button">
					<aby-button title="登录" @click.native="onLogin" class="aby-input-line-button"></aby-button>
				</div>
				<div class="row-link">
					<router-link :to="{ name: 'registerOne' }">立即注册</router-link>
					<router-link class="mui-pull-right" :to="{ name: 'setPassword' }">忘记密码</router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		components: {
			
		},
		data() {
			return {
				loginId: '',
				loginPwd: ''
			}
		},
		methods: {
			onLogin() {
				if(this.loginId === '') return this.$toast('帐号不能为空');
				if(this.loginPwd === '') return this.$toast('密码不能为空');

				let reqInfo = {};
				reqInfo.loginId = this.$abyApi.Crypto.EnCrypt(this.loginId);
				reqInfo.loginPwd = this.$abyApi.Crypto.MD5(this.loginPwd);
				this.$abyApi.User.doLogin(reqInfo, (res) => {
					window.localStorage.setItem('user_token', res.user_token);
					this.$store.commit('setUserInfo', res);
					this.$store.commit('popRouteChain');
					this.$router.push({
						name: 'home'
					});
				})
			},
		},
		mounted() {
		},
	}
</script>

<style scoped>
	/*logo部分div*/
	
	.divLogo {
		text-align: center;
		padding-top: 90px;
		padding-bottom: 30px;
	}
	/*logo*/
	
	.logo {
		width: 85px;
	}
	
	.row-input {
		padding: 0px 20px;
	}
	
	.row-button {
		padding: 30px 30px 0px 30px;
	}
	
	.row-link {
		padding: 15px 30px 0px 30px;
		font-size: 14px;
	}
	
	.row-link a {
		color: #FFFFFF;
	}
	/*忘记密码*/
	
	.btnForgotPwd {
		float: right;
		right: 10px;
		color: #336162!important;
		border: none!important;
		width: 80px!important;
		top: 100px;
	}
	/*修改公共组件样式*/
	
	.content {
		top: 0 !important;
	}
	.mui-bar-nav.mui-bar .mui-icon{
		color: #FFFFFF!important;
	}
</style>