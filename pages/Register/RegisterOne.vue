<template>
	<aby-page class="aby-bg-white">
		<aby-header title="注册" slot="header"></aby-header>
		<div slot="content" class="mui-content aby-bg-white">
			<div class="row-input">
				<aby-field modelId="userPhone" className="aby-input-line aby-input-line-blue" iclassName="mintui mintui-more aby-font-blue" placeholder="请输入手机号" type="tel">
					<aby-icon id="iconLabel" type="loginid" class="aby-font-blue" slot="icon"></aby-icon>
				</aby-field>
				<aby-field modelId="verycode" className="aby-input-line aby-input-line-blue" iclassName="mintui mintui-more aby-font-blue" placeholder="请输入验证码" type="number">
					<aby-icon id="iconLabel" type="vcode" class="aby-font-blue" slot="icon"></aby-icon>
				</aby-field>
				<input type="button" class="mui-btn btnVerificationCode" id="btnVerificationCode" @click="getVerificationCode" value="获取验证码">
				<aby-field modelId="userPassword" className="aby-input-line aby-input-line-blue" iclassName="mintui mintui-more aby-font-blue" placeholder="请设置密码" type="password">
					<aby-icon id="iconLabel" type="pwd" class="aby-font-blue" slot="icon"></aby-icon>
				</aby-field>
				<aby-field modelId="userPassword_confirm" className="aby-input-line aby-input-line-blue" iclassName="mintui mintui-more aby-font-blue" placeholder="请重复密码" type="password">
					<aby-icon id="iconLabel" type="pwd" class="aby-font-blue" slot="icon"></aby-icon>
				</aby-field>
			</div>
			<div class="row-button">
				<aby-button title="注册" @click.native="toNext" class="aby-input-button-blue"></aby-button>
			</div>
			<div class="row-link">
				注册代表您已阅读并同意
				<router-link class="linkBlue" :to="{ name:'picRegisteragre' }">《呱啦啦服务标准及责任规定》</router-link>
			</div>
		</div>
	</aby-page>
</template>

<script>
	import AbySearch from '../../components/Header/Search.vue'

	export default {
		components: {
			AbySearch
		},
		data() {
			return {
				userPhone: '',
				verycode: '',
				userPassword: '',
				userPassword_confirm: '',
				code: ''
			}
		},
		methods: {
			getVerificationCode() {
				if(this.userPhone === '') return this.$toast('手机号不能为空');

				let reqInfo = {};
				reqInfo.userPhone = this.$abyApi.Crypto.EnCrypt(this.userPhone);
				reqInfo.smsType = 1;
				this.$abyApi.User.getVerificationCode(reqInfo, (res) => {
					this.code = res.verifyCode
					this.$tool.disableWait(document.getElementById("btnVerificationCode"))
				})
			},
			toNext() {
				if(this.userPhone === '' || this.verycode === '' || this.userPassword === '' || this.userPassword_confirm === '') {
					return this.$toast('请填写完整后注册');
				} else if(this.verycode !== this.code) {
					return this.$toast('验证码不正确');
				} else if(this.userPassword !== this.userPassword_confirm) {
					return this.$toast('密码重复不正确');
				} else if(this.userPassword.length < 6){
					return this.$toast('密码不能小于6位数字');
				} else{
					let reqInfo = {};
					reqInfo.userPhone = this.$abyApi.Crypto.EnCrypt(this.userPhone);
					reqInfo.userPassword = this.$abyApi.Crypto.MD5(this.userPassword);
					this.$abyApi.User.setRegister(reqInfo, (res) => {
						this.$store.commit('setUserToken', res.user_token);
						this.$router.push({
							name: 'registerTwo'
						});
					})
				}
			}
		},
		mounted() {},
	}
</script>

<style scoped>
	.row-input {
		padding: 0px 20px;
		margin-top: 50px;
	}
	
	.row-button {
		padding: 20px 30px 0px 30px;
	}
	
	.row-link {
		padding: 15px 30px 0px 30px;
		font-size: 14px;
	}
	
	.row-link a {
		color: #08C7B5;
	}
	
	.btnVerificationCode {
		float: right;
		margin-top: -52px;
		margin-right: 10px;
		color: #08C7B5!important;
		padding: 8px 3px!important;
		min-width: 85px;
		border: none;
		background: rgba(255, 255, 255, 0);
		border-left: 1px solid #08C7B5;
		border-radius: 0px;
	}
</style>