<template>
	<aby-page>
		<aby-header :title="title" slot="header">
			<aby-fonts slot="right" class="aby-mui-bar" @click.native="onFinish(htmlId)" className="mui-pull-right" title="完成"></aby-fonts>
		</aby-header>
		<div class="mui-content" slot="content">
			<textarea name="" v-model="textMsg"></textarea>
		</div>
	</aby-page>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				title: this.$route.params.title,
				textMsg: this.$route.params.textMsg,
				htmlId: this.$route.params.htmlId,
				basicInfo: {}
			}
		},
		methods: {
			fCheckInto(val) {
				var reg = /^[\u0391-\uFFE5A-Za-z]+$/;
				if(reg.test(val)) {
					return true
				} else {
					return false
				}
			},
			isNull(data){
				if(data && data != '' && data != 0) {
					return data;
				} else {
					return '未设置';
				}
			},
			fCheckTel(val) {
				var reg = /^0\d{2,3}-\d{7,8}(-\d{1,6})?$/;
				if(reg.test(val)) {
					return true
				} else {
					return false
				}
			},
			onFinish(htmlId){
				this.basicInfo.files = [];
				this.basicInfo.cpId = this.$store.state.cpUserInfo.cpId;
				switch(htmlId) {
					case 'cpAddress':
						this.basicInfo.cpAddress = this.textMsg;
						this.setBasicInfo();
						break;
					case 'cpHeadName':
						if(this.fCheckInto(this.textMsg)){
							this.basicInfo.cpHeadName = this.textMsg;
							this.setBasicInfo();
						}else{
							this.$tool.toast("联系人只能输入中文或者英文！")
							return
						};
						break;
					case 'cpHeadPhone'://手机
						if(this.isNull(this.textMsg)){
							this.$tool.toast("数据不能为空！")
						}
						this.basicInfo.cpHeadPhone = this.$abyApi.Crypto.EnCrypt(this.textMsg);
						this.setBasicInfo();
						break;
					case 'cpTel'://企业固定电话
						if(this.fCheckTel(this.textMsg)){
							this.basicInfo.cpTel = this.$abyApi.Crypto.EnCrypt(this.textMsg);
							this.setBasicInfo();
						}else{
							this.$tool.toast("电话号码格式错误！")
							return
						};
						break;
					case 'cpIntro':
						this.basicInfo.cpAddress = this.textMsg;
						this.setBasicInfo();
						break;
					case 'cpBizScope'://业务范围
						this.basicInfo.cpBizScope = this.textMsg;
						this.setBasicInfo();
						break;
					case 'cpRoute':
						this.basicInfo.cpRoute = this.textMsg;
						this.setBasicInfo();
						break;
					case 'cpCorpName':
						this.basicInfo.cpCorpName = this.textMsg;
						this.setBasicInfo();
						break;
					default:
						if(this.isNull(this.textMsg)){
							this.$tool.toast("数据不能为空！")
							return;
						}
						setBasicInfo();
						break;
				};
				
			},
			setBasicInfo(){
				console.log('basicInfo:'+JSON.stringify(this.basicInfo))
				this.$abyApi.User.setBasicInfo(this.basicInfo, (res)=>{
					console.log('拿到了数据：'+res);
					this.$router.replace({
						name: 'homePage',
						params: {
							upDateTitle: this.title,
							upDateTextMsg: this.textMsg,
							upHtmlId: this.htmlId
						}
					})
				},(err)=>{
					this.$tool.toast(err);
				})
			}
		},
		mounted() {
			
		},
	}
</script>

<style scoped>
	textarea{
		margin: 10px 5%;
    	width: 90%;
    	min-height: 200px;
    	font-size: 14px;
    	overflow: scroll;
	}
</style>