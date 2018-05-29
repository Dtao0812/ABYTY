<template>
	<aby-page ref="page">
		<aby-header title="公司主页" slot="header"></aby-header>
		<div class="mui-content" slot="content">
			<aby-loading v-show="isLoading"></aby-loading>
			<!--个人信息部分-->
			<ul class="mui-table-view mui-table-view-chevron" style="margin-top: 1px;" v-if="cpUserInfo.cpBasic">
				<li class="mui-table-view-cell mui-media">
					<img @click="onLogo" class="mui-media-object mui-pull-left personpic" :src="cpUserInfo.cpBasic.cpLogo||''">
					<span class="btnEditPic" v-if="isOwn">修改Logo</span>
					<div class="mui-media-body">
						<span v-if="isOwn">{{cpUserInfo.userName}}</span>
						<span v-else>{{cpUserInfo.cpBasic.cpHeadName||'未设置'}}</span>
						<p class='mui-ellipsis'>{{cpUserInfo.cpBasic.cpName||'未设置'}}</p>
						<img class="aby-img-Authentication" src="../../static/images/ico/ico_ID_3x.png" />
						<img class="aby-img-Authentication" src="../../static/images/ico/ico_license_3x.png" />
					</div>
				</li>
			</ul>
			<div class="space"></div>
			<aby-tab @eventTabBack="eventTab" :list="tabList" page="homepage" :actSelect="defTab" slot="tab">
				<div v-for="(li,i) in tabList" :key="i" :slot="li.id">
					<aby-list v-if="li.type=='line'" :list="li.data"></aby-list>
					<aby-information v-if="li.type=='infor'" :list="li.data" :isOwn="isOwn"></aby-information>
					<aby-contacts v-if="li.type=='contacts'" :list="li.data"></aby-contacts>
				</div>
			</aby-tab>
		</div>
	</aby-page>

</template>

<script>
	import AbyInformation from './Informatica.vue'//个人主页资料
	import AbyContacts from './Contacts.vue'
	import AbyList from '../../components/List/Line.vue'
	export default {
		components: {
			AbyInformation,
			AbyContacts,
			AbyList
		},
		data() {
			return {
				userId: '',
				cpId: '',
				cpUserInfo: {},
				isOwn:false,//是否自己主页
				isLoading:true,//加载动画
				defTab:0,//默认选项卡
				pageNum: 1,
				tabList:[
					{
						id: 'infor',
						title: '企业信息',
						type: 'infor',
						data: '',
					},
					{
						id: 'contacts',
						title: '联系人',
						type: 'contacts',
						data: '',
					},
				],
			}
		},
		created() {
		},
		methods: {
			init(){
				this.userId = this.$route.params.userId;
				this.cpId = this.$route.params.cpId;
				this.isLoading = true;
				this.cpUserInfo = {};
				if(this.userId == this.$store.state.userId){
					// 自己的主页
					if(this.tabList.length == 3){
						// 在Tab开头删除产品选项卡
						let _tabList = this.tabList;
						_tabList.shift();
						this.tabList = _tabList;
					}
					this.isOwn = true;
					this.cpUserInfo = this.$store.state.cpUserInfo;
					this.defTab = 0;
				}else{
					// 查看别人主页
					this.isOwn = false;
					if(this.tabList.length == 2){
						// 在tab开头插入产品选项卡
						let tabLine = {
							id: 'line',
							title: '店铺产品',
							type: 'line',
							data: '',
						};
						this.tabList.unshift(tabLine);
					}
					this.defTab = 1;
					this.getDownProList();
				}
				this.getBasicInfo();
			},
			//获取企业资料
			getBasicInfo() { 
				let reqInfo = {};
				reqInfo.loading = 1;
				reqInfo.cpId = this.cpId;
				this.$abyApi.User.getBasicNotLegal(reqInfo, (res) => {
					this.cpUserInfo.cpBasic = res.cpBasic;
					this.tabList[this.tabList.length-2].data = this.cpUserInfo;
					this.isLoading = false;
				});
			},
			 //获得产品下拉
			getDownProList() {
				let proInfo = {};
				proInfo.loading = 1;
				proInfo.pageNum = this.pageNum == 1;
				proInfo.where = {};
				proInfo.keyWord = '',
				proInfo.cpId = this.cpId;
				this.$abyApi.Project.getMyProList(proInfo, (res) => {
					this.tabList[0].data = res.proList
				});
			},
			//获得产品上推
			getUpProList() {
				let proInfo = {};
				proInfo.loading = 1;
				proInfo.pageNum = this.pageNum = ++this.pageNum;
				proInfo.where = {};
				proInfo.keyWord = '',
				proInfo.cpId = this.cpId;
				this.$abyApi.Project.getMyProList(proInfo, (res) => {
					this.tabList[0].data = this.tabList[0].data.concat(res.proList);
				});
			},
			//获得员工列表
			getBasicStaffList() {
				let reqInfo = {};
				reqInfo.loading = 1;
				reqInfo.cpId = this.cpId;
				this.$abyApi.User.getBasicStaffList(reqInfo, (res) => {
					this.tabList[this.tabList.length-1].data = res.cpUserList;
				});
			},
			//tab点击事件
			eventTab(e) {
				if(e.id == 'line'){
					this.getDownProList();
				}
				if(e.id == 'infor'){
					this.getBasicInfo();
				}
				if(e.id == 'contacts'){
					this.getBasicStaffList();
				}
			},
			//头像点击
			onLogo(){
				if(this.isOwn){
					this.$tool.getPhoto((file) => {
						this.$tool.loading('正在提交...');
						let reqInfo = {};
						reqInfo.cpId = this.cpId;
						reqInfo.userId = this.userId;
						reqInfo.files = [
							{ id:'cpLogo',src:file }
						];
						this.$abyApi.User.setBasicInfo(reqInfo, (res) => {
							this.$tool.loadingClose();
							this.cpUserInfo.cpBasic.cpLogo = file;
						});
					});
				}
			}
		},
		mounted() {
			this.init();
		},
		watch: {
			cpUserInfo(val) {
				this.cpUserInfo = val;
			},
		},
		beforeRouteEnter(to, from, next) {
			if(from.name=="eidtHomePage"){
				next(vm => {
					vm.cpId = vm.$store.state.cpId;
					vm.getBasicInfo()
				})
			}else if(to.params.cpId == ''){
				next()
			}else{
				next(vm => {
					if(!vm.$route.params.userId){
						next()
					}else{
						vm.init()
					}
					
				})
			}
		},
		
	}
</script>

<style scoped>
	.mui-table-view .mui-media-object {
		line-height: 60px;
		max-width: 60px;
		height: 60px;
	}
	
	.mui-media-body {
		font-size: 14px;
	}
	
	.btnEditPic {
		color: #FFFFFF;
		position: absolute;
		background-color: rgba(0, 0, 0, .4);
		font-size: 12px;
		left: 12px;
		height: 16px;
		width: 65px;
		line-height: 16px;
		text-align: center;
		margin-top: 49px;
		border-bottom-left-radius: 5px;
		border-bottom-right-radius: 5px;
	}
	/*身份标志*/
	.role{
		width: 40px;
		position: absolute;
		margin-left: -50px;
	}
	/*头像*/
	.personpic{
		height: 65px!important;
		width: 65px!important;
		max-width: 65px!important;
		border-radius: 5px!important;
	}
	.aby-img-Authentication{
		margin-top: 5px;
	}
	
</style>