<template>
	<aby-page>
		<aby-header title="子账号管理" slot="header"></aby-header>
		<div class="mui-content" slot="content">
			<div class="mui-card space" v-for="tmp in lists">
				<div class="mui-card-content" @click="onLookAccount(tmp.userId)" v-bind:cpUser-id="tmp.userId">
					<div class="mui-card-content-inner mui-navigate-right">
						<img class="picList pic" :src="tmp.userFace" />
						<h4 class="name aby-list-title">{{tmp.userName}}</h4>
						<p class="job">{{tmp.userPost}}</p>
					</div>
				</div>
				<div class="mui-card-footer">
					<router-link class="mui-card-link aby-font-gray linkLeft" :to="{ name: 'accountAlter', params: {userId: tmp.userId} }"><aby-icon class="marRt" type="edit"></aby-icon>修改</router-link>
					<span v-show="tmp.userStatus == 0" class="mui-card-link fontRed" @click="disable(tmp.userId)"><aby-icon class="btn-forbid marRt" type="forbidden"></aby-icon>停用</span>
					<span v-show="tmp.userStatus == 1" class="mui-card-link aby-font-blue" @click="onOperation(tmp.userId)"><aby-icon class="marRt" type="enable"></aby-icon>启用</span>
				</div>
			</div>
			<aby-button class="btnFixed" title="增加子账号" @click.native="onAdd"></aby-button>
		</div>
	</aby-page>
	
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				lists: []
			}
		},
		methods: {
			onLookAccount(userId) { //查看子账号
				this.$router.push({
					name: 'accountDetail',
					params: {
						userId: userId
					}
				})
			},
			getAccounList() { //获得页面信息
				let userInfo = {};
				userInfo.loading = 1;
				this.$abyApi.User.getAccounList(userInfo, (res) => {
					this.lists = res.cpUserList;
				})
			},
			onOperation(id) { //启用
				this.$tool.confirm('你确定要启用该帐号吗?', (res) => {
					let userInfo = {};
					userInfo.loading = 1;
					userInfo.userId = id;
					userInfo.userStatus = 0;
					this.$abyApi.User.disableAccount(userInfo, (res) => {
						this.getAccounList();
					})
				})
			},
			disable(id) { //停用
				this.$tool.confirm('你确定要停用该帐号吗?', (res) => {
					let userInfo = {};
					userInfo.loading = 1;
					userInfo.userId = id;
					userInfo.userStatus = 1;
					this.$abyApi.User.disableAccount(userInfo, (res) => {
						this.getAccounList();
					})
				})
			},
			onAdd(e) { //新增子账号
				this.$router.push({
					name: 'accountAdd',
					params: {
						userId: e.target.getAttribute('cpUser-id')
					}
				})
			}
		},
		mounted() {
			this.getAccounList();
		},
	}
</script>
<style scoped>
	.mui-content {
		-webkit-overflow-scrolling: touch;
		font-size: 15px;
		color: #333333;
		margin-bottom: 100px;
	}
	/*列表头像尺寸-圆*/
	
	.picList {
		width: 45px;
		height: 45px;
		border-radius: 50%;
		vertical-align: bottom;
	}
	/*带图标超链接图标尺寸*/
	
	.picLink {
		width: 20px;
		margin-right: 8px;
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
	
	.pic {
		float: left;
	}
	
	.pic {
		text-align: left;
		margin-right: 10px;
		
	}
	
	.name,
	.job {
		padding: 0px;
		margin: 0px;
	}
	.name{
		margin-top: 4px;
	}
	/*卡片样式*/
	
	.mui-content>.mui-card:first-child {
		margin-top: 0px;
	}
	
	.mui-card {
		overflow: hidden;
		margin: 0px;
		border: none;
		border-radius: 0px;
	}
	
	.mui-card {
		margin: 0px;
		border-radius: 0px;
		background-color: #fff;
		background-clip: padding-box;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0);
	}
	
	.mui-card-footer:before {
		position: initial;
	}
	
	.mui-card-footer {
		border-top: 1px solid #F0F0F0;
	}
	
	.linkLeft {
		margin-right: -100px;
	}
	.fontRed{
		color: red;
	}
	.marRt{
		margin-right: 5px;
		font-size: 16px;
	}
</style>