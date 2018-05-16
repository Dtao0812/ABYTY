<template>
	<aby-page>
		<aby-header title="新增子账号" slot="header"></aby-header>
		<div class="mui-content" slot="content">
			<div class="mui-card">
				<form class="mui-input-group">
					<div class="mui-input-row">
						<label class="icoInput"><aby-icon class="btn-enable" type="name"></aby-icon></label>
						<input type="text" placeholder="请输入姓名" v-model="userName">
						
					</div>
					<div class="mui-input-row">
						<label class="icoInput"><aby-icon class="btn-enable" type="job"></aby-icon></label>
						<input type="text" class="mui-input-clear" placeholder="请输入职位" v-model="userPost">
					</div>
				</form>
			</div>
			<h5 class="space"></h5>
			<div class="mui-card">
				<form class="mui-input-group">
					<div class="mui-input-row">
						<label class="icoInput"><aby-icon class="btn-enable" type="loginid"></aby-icon></label>
						<input type="number" pattern="\d*" placeholder="请输入手机号码" v-model="userPhone">
						
					</div>
					<div class="mui-input-row">
						<label class="icoInput"><aby-icon class="btn-enable" type="vcode"></aby-icon></label>
						<input type="number" pattern="\d*" class="mui-input-clear" placeholder="请输入验证码" v-model="cpCorpID">
						<input type="button" class="mui-btn btnVerificationCode" id="btnVerificationCode" @click="onBtnVerificationCode" value="获取验证码">
					</div>
				</form>
			</div>
			<!--<span class="linkBlue">收不到验证码？</span>-->
			<h5 class="space"></h5>
			<div class="mui-card">
				<form class="mui-input-group">
					<div class="mui-input-row">
						<label class="icoInput"><aby-icon class="btn-enable" type="pwd"></aby-icon></label>
						<input type="password" placeholder="请输入初始密码" v-model="userPassword">
						
					</div>
					<div class="mui-input-row">
						<label class="icoInput"><aby-icon class="btn-enable" type="pwd"></aby-icon></label>
						<input type="password" class="mui-input-clear" placeholder="请重复初始密码" v-model="userPasswordConfirm">
					</div>
				</form>
			</div>
			<aby-button class="btnFixed" title="确认提交" @click.native="OnSubmit"></aby-button>
		</div>
		
	</aby-page>	
</template>

<script>
	export default {
		components: {
		},
		data() {
			return {
				cpUserInfo: {},
				userName: '',//姓名
				userPost: '',//职位
				userPhone:'',//电话
				cpCorpID: '',//验证码
				userPassword: '',//初始密码
				userPasswordConfirm: ''//重复初始密码
				
			}
		},
		methods:{
			onBtnVerificationCode(){//获取验证码
				if(!this.$tool.formValidation.phoneVerfication(this.userPhone)) {
					this.$tool.toast('手机号码不正确');
					return; 
				};
				let userInfo = {};
				userInfo.userPhone = this.$abyApi.Crypto.EnCrypt(this.userPhone);
				userInfo.smsType = 1;
				this.$abyApi.User.getVerificationCode(userInfo, (res)=>{
					this.cpUserInfo.verifyCode = res.verifyCode;
					this.cpUserInfo.userPhone = userInfo.userPhone;
					this.$tool.disableWait(document.getElementById('btnVerificationCode'))
				})
			},
			infoVerification(){//验证页面信息
				if(this.userName == '') {
					this.$tool.toast('请输入姓名');
					return false;
				}
				if(this.userPost == '') {
					this.$tool.toast('请输入职位');
					return false;
				}
				if(this.userPhone == '') {
					this.$tool.toast('请输入手机号');
					return false;
				}
				if(this.cpCorpID == '') {
					this.$tool.toast('验证码不能为空');
					return false;
				}
				//密码
				if(this.userPassword == ''){
					this.$tool.toast('请设置密码');
					return false;
				}
				//二次密码
				if(this.userPassword_confirm == ''){
					this.$tool.toast('请再次输入密码');
					return false;
				}
				//两次密码是否一样
				if(this.userPassword != this.userPasswordConfirm){
					this.$tool.toast('两次输入的密码不一致');
					return false;
				}
				//判断验证码是否正确
				if(this.cpCorpID != this.cpUserInfo.verifyCode){
					this.$tool.toast('验证码不正确');
					return false;
				}
				return true;
			},
			OnSubmit(){//提交
				if(this.infoVerification()){
					this.cpUserInfo.loading = 1;
					this.cpUserInfo.userPassword = this.$abyApi.Crypto.EnCrypt(this.userPassword).toString();
					this.cpUserInfo.userName = this.userName;
					this.cpUserInfo.userPost = this.userPost;
					this.$abyApi.User.setAccounInfo(this.cpUserInfo, (res)=>{
						this.$tool.toast('添加成功！');
						setTimeout(function(){
							this.$router.back();
						},1000)
					})
				}
			}
		},
		mounted() {
			
		},
	}
</script>
<style scoped>
	.mui-content {
		-webkit-overflow-scrolling: touch;
		font-size: 15px;
		color: #333333;
	}
	.btnVerificationCode {
		float: right;
		margin-top: -37px;
		margin-right: 10px;
		color: #08C7B5!important;
		padding: 8px 0px!important;
		width: 100px!important;
		border: 1px solid #08C7B5;
		border-radius: 5px;
	}
	/*标题为ico的输入框行样式*/
	.mui-input-row label {
	    width: 15%;
	}
	.mui-input-row label~input{
	    width: 85%;
	    font-size: 14px;
	    color: #aaa;
	}

	.icoInput {
		text-align: center;
	}
	.icoInput img {
		width: 20px;
		margin-top: -2px;
	}
	.btnBlue {
		color: #FFFFFF!important;
		background-color: #336162!important;
		border: none!important;
		height: 45px;
	}
	.linkBlue {
		color: #336162;
		padding-left: 10px;
	}
	.btnFixed {
		position: fixed;
		bottom: 0px;
		margin-bottom: 30px!important;
		text-align: center;
		line-height: 10px;
		border-radius: 0px;
		background-color: #08C7B5;
		width: 90%;
    	margin: 0 5%;
    	font-size: 14px;
	}
	.mui-content>.mui-card:first-child{
		margin-top: 10px;
	}
	.mui-input-group .mui-input-row:after{
		left: 0;
	}
</style>