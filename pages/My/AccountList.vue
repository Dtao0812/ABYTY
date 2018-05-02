<template>
	<aby-page>
		<aby-header title="子账号管理" slot="header"></aby-header>
		<div class="mui-content" slot="content">
			<div class="mui-card" v-for="tmp in lists">
				<div class="mui-card-content" @click="onLookAccount(tmp.userId)" v-bind:cpUser-id="tmp.userId">
					<div class="mui-card-content-inner mui-navigate-right">
						<div class="mui-col-xs-3 pic">
							<img class="picList" :src="tmp.userFace" />
						</div>
						<div class="mui-col-xs-9 name fontNameTitle">
							{{tmp.userName}}
						</div>
						<div class="mui-col-xs-9 job">
							{{tmp.userPost}}
						</div>
						<br style="clear: both;" />
					</div>
				</div>
				<div class="mui-card-footer">
					<router-link class="mui-card-link fontGray linkLeft" :to="{ name: 'accountAlter', params: {userId: tmp.userId} }"><aby-icon class="marRt" type="edit"></aby-icon>修改</router-link>
					<span v-show="tmp.userStatus == 0" class="mui-card-link fontRed" @click="disable(tmp.userId)"><aby-icon class="btn-forbid marRt" type="forbidden"></aby-icon>停用</span>
					<span v-show="tmp.userStatus == 1" class="mui-card-link fontBlue" @click="onOperation(tmp.userId)"><aby-icon class="btn-enable marRt" type="enable"></aby-icon>启用</span>
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
	.fontGray {
		color: #808080;
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
	
	.pic,
	.name,
	.job {
		float: left;
	}
	
	.pic {
		text-align: left;
		padding: 0px;
	}
	
	.name,
	.job {
		padding: 0px;
	}
	
	.name {
		padding-top: 6px;
	}
	
	.job {
		padding-top: 5px;
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
		border-top: 1px solid #DDDDDD;
	}
	
	.linkLeft {
		margin-right: -100px;
	}
	.fontRed{
		color: red;
	}
	.fontBlue{
		color: #08C7B5;
	}
	.btn-enable{/*启用图标颜色*/
		color: #08C7B5;
	}
	.marRt{
		margin-right: 5px;
	}
</style>