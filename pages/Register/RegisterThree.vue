<template>
	<aby-page class="aby-bg-white">
		<aby-header title="认证" slot="header"></aby-header>
		<div slot="content" class="mui-content aby-bg-white">
			<div class="row-input">
				<aby-field modelId="cpBasic.cpName" className="aby-input-line aby-input-line-blue" iclassName="mintui mintui-more aby-font-blue" placeholder="请输入企业名称" type="text">
					<aby-icon id="iconLabel" type="business" class="aby-font-blue" slot="icon"></aby-icon>
				</aby-field>
				<aby-field modelId="cpBasic.cpChartered" className="aby-input-line aby-input-line-blue" iclassName="mintui mintui-more aby-font-blue" placeholder="请输入营业执照编号" type="text">
					<aby-icon id="iconLabel" type="licensewhite" class="aby-font-blue" slot="icon"></aby-icon>
				</aby-field>
				<aby-field modelId="cpBasic.cpCorpName" className="aby-input-line aby-input-line-blue" iclassName="mintui mintui-more aby-font-blue" placeholder="请输入您的姓名" type="text">
					<aby-icon id="iconLabel" type="name" class="aby-font-blue" slot="icon"></aby-icon>
				</aby-field>
				<aby-field modelId="cpBasic.cpCorpID" className="aby-input-line aby-input-line-blue" iclassName="mintui mintui-more aby-font-blue" placeholder="请输入您的身份证号" type="text">
					<aby-icon id="iconLabel" type="IDwhite" class="aby-font-blue" slot="icon"></aby-icon>
				</aby-field>
			</div>
			<div class="space"></div>
			<div class="imgListTwoTwo">
				<div v-for="(img,index) in cpImgs" :class="'imgList_'+img.id" :key="index" @click="onSelectImg(img.id)">
					<img v-if="img.src != ''" :src="img.src" />
					<span class="mui-icon mui-icon-refreshempty icon-bg" v-show="img.btnUpload" @click="onSelectImg(img.id)"></span>
				</div>
				<br style="clear: both;" />
			</div>
			<div class="row-link">
				<router-link :to="{ name: 'picExample' }" class="linkBlue">1. 查看正确照片示例 >></router-link><br />
				<router-link :to="{ name: 'picWhy' }" class="linkBlue">2. 为什么要传照片>></router-link>
			</div>
			<div class="row-button">
				<aby-button title="提交" @click.native="onRegister" class="aby-input-button-blue"></aby-button>
			</div>
		</div>
	</aby-page>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				cpBasic: {
					cpName: '111',
					cpChartered: '',
					cpCorpID: '',
					cpCorpName: '',
					cpId: '',
					cpBtype: this.$route.params.cpBtype
				},
				cpImgs: [{
					id: 10,
					src: '',
					btnUpload: false
				}, {
					id: 20,
					src: '',
					btnUpload: false
				}, {
					id: 30,
					src: '',
					btnUpload: false
				}]
			}
		},
		methods: {
			onRegister() {
				if(this.cpBasic.cpName === '') return this.$tool.toast('请输入企业名称');
				if(this.cpBasic.cpChartered === '') return this.$tool.toast('请输入营业执照编号');
				if(this.cpBasic.cpCorpName === '') return this.$tool.toast('请输入您的姓名');
				if(this.cpBasic.cpCorpID === '') return this.$tool.toast('请输入您的身份证号');
				if(this.cpImgs[0].src === '') return this.$tool.toast('请上传营业执照');
				if(this.cpImgs[1].src === '') return this.$tool.toast('请上传个人身份证');
				if(this.cpImgs[2].src === '') return this.$tool.toast('请上传个人名片');
				var reqInfo = {};
				reqInfo.cpBasic = this.cpBasic;
				reqInfo.files = this.cpImgs;
				this.$abyApi.User.setUserUploadCred(reqInfo, (res) => {
					if(res) {
						this.$toast("已提交成功，正在等待审核");
						setTimeout(()=>{
							this.$router.push({
								name: 'home'
							});
						},1500)
					}
				});
			},
			onSelectImg(id) {
				this.$tool.getPhoto((file) => {
					this.cpImgs.forEach((value, index) => {
						if(value.id == id) {
							this.cpImgs[index].src = file;
							this.cpImgs[index].btnUpload = true;
						}
					})
				})
			},
			plusReady(){
				
			}
		},
		mounted() {
			document.addEventListener("plusready", this.plusReady, false);  
		},
	}
</script>

<style>
	.row-input {
		padding: 0px 20px;
		margin-top: 20px;
	}
	
	.row-button {
		padding: 30px 30px 0px 30px;
	}
	/*.row-input {
		padding: 0px 10px;
		margin-top: 20px;
	}
	
	.row-button {
		padding: 20px 10px 50px 10px;
	}*/
	
	.row-link {
		padding: 15px 30px 0px 30px;
		font-size: 14px;
	}
	
	.row-link a {
		color: #08C7B5;
	}
	/*两行两列图片排序*/
	.imgListTwoTwo{
		padding: 0px 30px;
		position: relative;
	}
	
	.imgListTwoTwo div {
		position: relative;
		width: 49%;
		height: 100px !important;
		vertical-align: bottom;
		float: left;
		margin-bottom: 2%;
		background-size: 100% 100%;
		background-position: center;
		background-repeat: no-repeat;
	}
	
	.imgListTwoTwo img {
		width: 100%;
		height: 100%;
		vertical-align: bottom;
		background-size: 100% 100%;
		background-position: center;
		background-repeat: no-repeat;
	}
	
	.icon-bg {
		background-color: #2091E1;
		border-radius: 50%;
		color: #FFFFFF;
		position: absolute;
		right: 0;
		top: 0;
	}

	
	.imgList_10 {
		background-image: url(../../static/images/btn/btn_Lisense.png);
	}
	
	.imgList_20 {
		background-image: url(../../static/images/btn/btn_uploadUserID.png);
		margin-left: 2%;
	}
	
	.imgList_30 {
		background-image: url(../../static/images/btn/btn_uploadCard.png);
	}
</style>