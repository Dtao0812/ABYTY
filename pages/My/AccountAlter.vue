<template>
	<aby-page>
		<aby-header title="修改账户" slot="header"></aby-header>
		<div class="mui-content" slot="content">
			<ul id="list" class="mui-table-view mui-table-view-chevron">
				<li class="mui-table-view-cell">
					<a class="mui-navigate-right">
						<div class="mui-col-xs-4 divheadpic">
							<img class="picList" :src="pageInfo.userFace" />
						</div>
						<div class="mui-col-xs-8 mui-ellipsis divname">
							<input class="fontNameTitle" type="text" v-model="pageInfo.userName">
						</div>
					</a>
				</li>
			</ul>
			<div class="mui-card">
				<form class="mui-input-group">
					<div class="mui-input-row">
						<label class="mui-navigate-right">电话</label>
						<input type="text" disabled="disabled" v-bind:value="pageInfo.userPhone"/>				
					</div>
					<div class="mui-input-row">
						<label class="mui-navigate-right">职位</label>
						<input type="text" placeholder="请输入职位" v-model="pageInfo.userPost"/>				
					</div>
				</form>
			</div>
			<aby-button class="btnFixed" title="保存" @click.native="onSaveMsg"></aby-button>
		</div>
	</aby-page>
</template>

<script>
	export default {
		components: {
		},
		data() {
			return {
				routerParams:this.$route.params.userId,//路由传来的数据
				pageInfo: {},
				cpUserInfo: {},//储存用户信息
			}
		},
		methods:{
			infoVerification(){//验证页面信息
				if(this.pageInfo.userName == '') {
					Vue.$tool.toast('姓名不能为空');
					return false;
				}
				if(this.pageInfo.userPost == '') {
					Vue.$tool.toast('职位不能为空');
					return false;
				}
				return true;
			},
			onSaveMsg(){//保存
				if(this.infoVerification()){
					this.cpUserInfo.loading = 1,
					this.cpUserInfo.userId = this.routerParams;
					this.cpUserInfo.userPost = this.pageInfo.userPost;
					this.cpUserInfo.userName = this.pageInfo.userName;
					this.$abyApi.User.setAccounInfo(this.cpUserInfo, (res)=>{
						this.$tool.toast('修改成功');
						this.$router.back();
					})
				}
			},
			getAccountInfo(){//获得页面信息
				let reqInfo = {};
				reqInfo.loading = 1;
				reqInfo.userId = this.routerParams;
				console.log(reqInfo.userId)
				this.$abyApi.User.getAccountInfo(reqInfo, (res)=>{
					this.pageInfo = res.cpUserInfo;
					//TODO
					this.pageInfo.userPhone = this.$abyApi.Crypto.DeCrypt(res.cpUserInfo.userPhone);
					
				})
			}
		},
		mounted() {
			this.getAccountInfo()
		},
	}
</script>
<style scoped>
	.mui-content {
		background-color: #FFFFFF;
		/*#efeff4;*/
		-webkit-overflow-scrolling: touch;
		font-size: 15px;
		color: #333333;
	}
	/*列表头像尺寸-圆*/
	.picList {
		width: 60px;
		height: 60px;
		border-radius: 50%;
		vertical-align: bottom;
	}
	/*带图标超链接图标尺寸*/
	.picLink {
		width: 20px;
		margin-right: 8px;
	}
	/*带图标按钮图标尺寸*/
	.picBtn {
		width: 23px;
		margin-right: 8px;
		vertical-align: middle;
	}
	.fontNameTitle {
		font-size: 16px;
		border: 0px !important;
		font-weight: 500;
	}
	
	.divname,.divheadpic
	{
		float: left;
	}
	.divname
	{
		line-height: 56px;
	}
	.mui-card {
	    overflow: hidden;
	    margin: 0px;
	    border-top: 1px solid #ddd;
	    border-bottom: 1px solid #ddd;
	    border-radius: 0px;
	    background-color: #fff;
	    background-clip: padding-box;
	    box-shadow: 0 1px 2px rgba(0,0,0,0);
	}
	.btnFixed {
		position: fixed!important;
		bottom: 0px!important;
		margin-bottom: 30px!important;
		text-align: center!important;
		line-height: 10px!important;
		border-radius: 0px!important;
		background-color: #08C7B5;
		width: 90%;
    	margin: 0 5%;
	}
</style>