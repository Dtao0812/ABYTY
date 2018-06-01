<template>
	<aby-page class="aby-bg-white">
		<aby-header title="修改密码" slot="header"></aby-header>
		<div class="mui-content aby-bg-white" slot="content">
			<div class="row-input" v-show="isShowPhone">
				<aby-field modelId="userPhone" className="aby-input-line aby-input-line-blue" iclassName="mintui mintui-more aby-font-blue" placeholder="请输入注册手机号" type="tel">
					<aby-icon id="iconLabel" type="loginid" class="aby-font-blue" slot="icon"></aby-icon>
				</aby-field>
				<aby-field modelId="verifyCode" className="aby-input-line aby-input-line-blue" iclassName="mintui mintui-more aby-font-blue" placeholder="请输入验证码" type="number">
					<aby-icon id="iconLabel" type="vcode" class="aby-font-blue" slot="icon"></aby-icon>
				</aby-field>
				<input type="button" class="mui-btn btnVerificationCode" id="btnVerificationCode" @click="onGetVerifyCode" value="获取验证码">
			</div>
			<div class="row-input" v-show="isShowPwd">
				<aby-field modelId="newPassword" className="aby-input-line aby-input-line-blue" iclassName="mintui mintui-more aby-font-blue" placeholder="请设置新密码" type="password">
					<aby-icon id="iconLabel" type="pwd" class="aby-font-blue" slot="icon"></aby-icon>
				</aby-field>
				<aby-field modelId="newPassword_confirm" className="aby-input-line aby-input-line-blue" iclassName="mintui mintui-more aby-font-blue" placeholder="请重复新密码" type="password">
					<aby-icon id="iconLabel" type="pwd" class="aby-font-blue" slot="icon"></aby-icon>
				</aby-field>
			</div>
			<div class="row-button">
				<aby-button title="下一步" @click.native="onSetPwd" class="aby-input-button-blue"></aby-button>
			</div>
		</div>
	</aby-page>
</template>

<script>
	export default {
		data() {
			return {
				userPhone:'',
				newPassword:'',newPassword_confirm:'',code:'',verifyCode:'',
				isShowPhoneDiv:true,
				isShowPhone:true,
				isShowPwd:false,
				getState: this.$route.params.state
			}
		},
		methods: {
			onGetVerifyCode() {
				if(!this.userPhone){
					this.$toast('请输入手机号');
				}else{
					if(this.userPhone == this.$store.state.userPhone || this.getState == 0){
						let reqInfo = {};
						reqInfo.userPhone = this.$abyApi.Crypto.EnCrypt(this.userPhone);
						reqInfo.smsType = 2;
						this.$abyApi.User.getVerificationCode(reqInfo,(res)=>{
							this.$toast("验证码已发送！")
							this.code = res.verifyCode
							this.$tool.disableWait(document.getElementById("btnVerificationCode"))
						});
					}else{
						this.$toast("您输入的注册号码有误，请查证后再输入！")
					}
				}
			},
			onSetPwd(){
				if(this.isShowPhone && !this.isShowPwd){
					if(this.userPhone === '' || this.verifyCode === ''){
						return this.$toast('修改内容不能为空');
					}else if(this.verifyCode !== this.code){
						return this.$toast('验证码不正确');
					}
					this.isShowPhone = false; 
					this.isShowPwd = true;
					return;
				}else{
					if(this.newPassword === '' || this.newPassword_confirm === ''){
						return this.$toast('修改内容不能为空');
					}else if(this.newPassword !== this.newPassword_confirm){
						return this.$toast('密码重复不正确');
					}else{
						let reqInfo = {};
						reqInfo.loginId = this.$abyApi.Crypto.EnCrypt(this.userPhone);
						reqInfo.loginPwd = this.$abyApi.Crypto.MD5(this.newPassword).toString();
						reqInfo.verifyCode = this.verifyCode;
						this.$abyApi.User.setLoginPwd(reqInfo,(res)=>{
							console.log(JSON.stringify(res))
//							if(res.errorcode == 1){
//								
//							}
							this.$tool.toast('修改成功');
							setTimeout(()=>{
								this.$router.back();
							},1000);
						})
					}
				}
			}
		},
		mounted() {
		},
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