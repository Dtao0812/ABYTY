<template>
	<aby-page>
		<aby-header title="账号详情" slot="header"></aby-header>
		<div class="mui-content" slot="content">
			<ul id="list" class="mui-table-view mui-table-view-chevron">
				<li class="mui-table-view-cell">
					<a>
						<div class="mui-col-xs-4 divheadpic">
							<img class="picList" :src="pageInfo.userFace" />
						</div>
						<div class="mui-col-xs-8 mui-ellipsis divname">
							<span class="fontNameTitle">{{pageInfo.userName}}</span>
						</div>
	
					</a>
				</li>
				<router-link class="linkBlue" :to="{ name: 'accountAlter', params: {userId: pageInfo.userId,lable: 'detail'} }" replace><img class="picLink" src="" />修改</router-link>
			</ul>
			<h5 class="space"></h5>
			<div class="mui-card">
				<form class="mui-input-group">
					<div class="mui-input-row verificationCode">
						<label>电话</label>
						<input type="text" disabled="disabled" class="mui-input-clear" v-bind:value="pageInfo.userPhone">
					</div>
					<div class="mui-input-row">
						<label>职位</label>
						<input type="text" disabled="disabled"placeholder="请输入职位" v-bind:value="pageInfo.userPost" />
					</div>
					<!--<div class="mui-input-row verificationCode">
						<label>地区</label>
						<input type="text" disabled="disabled" class="mui-input-clear" placeholder="未设置地区" value="">
					</div>-->
				</form>
			</div>
			<h5 class="marginThin"></h5>
			<div class="paddingTen">
				<div v-show="pageInfo.userStatus==0" @click="disable(pageInfo.userId)">
					<aby-button class="btnFixed" title="停用子账户" ></aby-button>
				</div>
				<div v-show="pageInfo.userStatus==1" @click="onOperation(pageInfo.userId)">
					<aby-button class="btnFixed" title="启用子账户" ></aby-button>
				</div>
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
				routerParams: this.$route.params.userId,//路由传来的数据
				pageInfo: '',//頁面用户信息
			}
		},
		methods:{
			getAccountInfo(){//获得页面信息
				var reqInfo = {};
				reqInfo.loading = 1;
				reqInfo.userId = this.routerParams;
				this.$abyApi.User.getAccountInfo(reqInfo, (res)=>{
					res.cpUserInfo.userPhone = this.$abyApi.Crypto.DeCrypt(res.cpUserInfo.userPhone);
					this.pageInfo = res.cpUserInfo;
				})
			},
			onOperation(userId) { //启用
				this.$tool.confirm('你确定要启用该帐号吗?', (res) => {
					let userInfo = {};
					userInfo.loading = 1;
					userInfo.userId = userId;
					userInfo.userStatus = 0;
					this.$abyApi.User.disableAccount(userInfo, (res) => {
						this.getAccountInfo();
					})
				})
			},
			disable(userId) { //停用
				this.$tool.confirm('你确定要停用该帐号吗?', (res) => {
					let userInfo = {};
					userInfo.loading = 1;
					userInfo.userId = userId;
					userInfo.userStatus = 1;
					this.$abyApi.User.disableAccount(userInfo, (res) => {
						this.getAccountInfo();
					})
				})
			},
		},
		mounted() {
			this.getAccountInfo()
		},
	}
</script>
<style scoped>
	.mui-content .mui-table-view{
		margin-top: 0;
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
	    border: 1px solid #ddd;
	    border-radius: 0px;
	    background-color: #fff;
	    background-clip: padding-box;
	    box-shadow: 0 1px 2px rgba(0,0,0,0);
	}
	.linkBlue
	{
		position: absolute;
		margin-top: -55px;
		right: 15px;
		border: 1px solid #2091E1;
		border-radius: 20px;
		padding: 3px 10px;
	}
	.linkBlue img
	{
		width: 10px;
		vertical-align: middle;
		margin-right: 8px;
	}
	.picList {
		width: 60px;
		height: 60px;
		border-radius: 50%;
		vertical-align: bottom;
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