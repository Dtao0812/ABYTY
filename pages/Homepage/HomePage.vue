<template>

	<aby-page>
		<aby-header title="公司主页" slot="header"></aby-header>
		<div class="mui-content" slot="content">
			<!--个人信息部分-->
			<ul class="mui-table-view mui-table-view-chevron" style="margin-top: 1px;">
				<li class="mui-table-view-cell mui-media">
					<img class="mui-media-object mui-pull-left" :src="cpUserInfo.cpLogo">
					<div class="mui-media-body">
						{{cpUserInfo.cpHeadName|filterNull}}
						<p class='mui-ellipsis'>{{cpUserInfo.cpName|filterNull}}</p>
						<img class="aby-img-Authentication" src="../../static/images/ico/ico_ID_3x.png" />
						<img class="aby-img-Authentication" src="../../static/images/ico/ico_license_3x.png" />
					</div>
				</li>
			</ul>
			<div class="space"></div>
			<aby-tab v-show="cpBtype == 10" @eventTabBack="eventTab" :list="tabListTravel" page="homepage" actSelect="0" slot="tab">
				<div v-for="(li,i) in tabListTravel" :key="i" :slot="li.id">
					<aby-information v-if="userId&&li.type=='infor'" :list="li.data"></aby-information>
					<all-information v-if="!userId&&li.type=='infor'" :list="li.data"></all-information>
					<aby-contacts v-if="li.type=='contacts'" :list="li.data"></aby-contacts>
				</div>
			</aby-tab>
			<aby-tab v-show="cpBtype != 10" @eventTabBack="eventTab" :list="tabListLocal" page="homepage" actSelect="1" slot="tab">
				<div v-for="(li,i) in tabListLocal" :key="i" :slot="li.id">
					<aby-list v-if="li.type=='line'" :list="li.data"></aby-list>
					<aby-information v-if="userId&&li.type=='infor'" :list="li.data"></aby-information>
					<all-information v-if="!userId&&li.type=='infor'" :list="li.data"></all-information>
					<aby-contacts v-if="li.type=='contacts'" :list="li.data"></aby-contacts>
				</div>
			</aby-tab>
		</div>
	</aby-page>

</template>

<script>
	import AbyInformation from './Informatica.vue'//个人主页资料
	import AllInformation from './InformaticaAll.vue'//其他供应商主页资料
	import AbyContacts from './Contacts.vue'
	import AbyList from '../../components/List/Line.vue'
	export default {
		components: {
			AbyInformation,
			AllInformation,
			AbyContacts,
			AbyList
		},
		data() {
			return {
				userId: this.$store.state.userIdHome,
				cpId: this.$store.state.cpIdHome,
				cpBtype: '',
				cpUserInfo: {},
				pageNum: 1,
				tabListTravel: [{ //组团社
						id: 'infor',
						title: '企业信息',
						type: 'infor',
						data: ''
					},
					{
						id: 'contacts',
						title: '联系人',
						type: 'contacts',
						data: ''
					},
				],
				tabListLocal: [{ //地接社
						id: 'line',
						title: '店铺产品',
						type: 'line',
						data: '',
					},
					{
						id: 'infor',
						title: '企业信息',
						type: 'infor',
						data: ''
					},
					{
						id: 'contacts',
						title: '联系人',
						type: 'contacts',
						data: ''
					},
				],
			}
		},
		created() {
			console.log('homepageCreat')
		},
		methods: {
			getBasicInfo() { //调基本资料（个人）
				let reqInfo = {};
				reqInfo.loading = 1;
				reqInfo.userId = this.userId;
				this.$abyApi.User.getBasciInfo(reqInfo, (res) => {
					res.cpUserInfo.cpBasic.cpHeadPhone = res.cpUserInfo.cpBasic.cpHeadPhone?this.$abyApi.Crypto.DeCrypt(res.cpUserInfo.cpBasic.cpHeadPhone):'';
					res.cpUserInfo.cpBasic.cpTel = res.cpUserInfo.cpBasic.cpTel?this.$abyApi.Crypto.DeCrypt(res.cpUserInfo.cpBasic.cpTel):'';
					this.cpUserInfo.cpLogo = res.cpUserInfo.cpBasic.cpLogo;
					this.cpUserInfo.cpHeadName = res.cpUserInfo.cpBasic.cpHeadName;
					this.cpUserInfo.cpName = res.cpUserInfo.cpBasic.cpName;
					this.cpBtype = res.cpUserInfo.cpBasic.cpBtype;
					if(this.cpBtype == 10){
						this.tabListTravel[0].data = res.cpUserInfo.cpBasic;
					}else{
						this.tabListLocal[1].data = res.cpUserInfo.cpBasic;
					}
				});
			},
			getBasicNotLegal() { //调基本资料（其他）
				let reqInfo = {};
				reqInfo.loading = 1;
				reqInfo.cpId = this.cpId;
				console.log('reqInfo:'+JSON.stringify(reqInfo))
				this.$abyApi.User.getBasicNotLegal(reqInfo, (res) => {
					this.cpUserInfo.cpLogo = res.cpBasic.cpLogo;
					this.cpUserInfo.cpHeadName = res.cpBasic.cpHeadName;
					this.cpUserInfo.cpName = res.cpBasic.cpName;
					res.cpBasic.cpHeadPhone = res.cpBasic.cpHeadPhone? this.$abyApi.Crypto.DeCrypt(res.cpBasic.cpHeadPhone): '';
					res.cpBasic.cpTel = res.cpBasic.cpTel?this.$abyApi.Crypto.DeCrypt(res.cpBasic.cpTel):'';
					this.cpBtype = res.cpBasic.cpBtype;
					if(this.cpBtype == 10){
						this.tabListTravel[0].data = res.cpBasic;
					}else{
						this.tabListLocal[1].data = res.cpBasic;
					}
				});
			},
			getDownProList() { //调产品下拉（地接）
				let proInfo = {};
				proInfo.loading = 1;
				proInfo.pageNum = 1;
				proInfo.where = {};
				proInfo.keyWord = '',
					proInfo.cpId = this.cpId;
				this.$abyApi.Project.getMyProList(proInfo, (res) => {
					this.tabListLocal[0].data = res.proList
				});
			},
			getUpProList() {//调产品上拉加载更多（地接）
				let proInfo = {};
				proInfo.loading = 1;
				proInfo.pageNum = this.pageNum = ++this.pageNum;
				proInfo.where = {};
				proInfo.keyWord = '',
					proInfo.cpId = this.cpId;
				this.$abyApi.Project.getMyProList(proInfo, (res) => {
					this.tabListLocal[0].data = this.tabListLocal[0].data.concat(res.proList);
				});
			},
			getBasicStaffList() { //调员工
				let reqInfo = {};
				reqInfo.loading = 1;
				reqInfo.cpId = this.cpId;
				console.log(reqInfo.cpId)
				this.$abyApi.User.getBasicStaffList(reqInfo, (res) => {
					if(this.cpBtype == 10) {
						this.tabListTravel[1].data = res.cpUserList;
					}else{
						this.tabListLocal[2].data = res.cpUserList;
					}
				})
			},
			eventTab(e) {
				if(e.id == 'line'){
					this.getDownProList();
				};
				if(e.id == 'infor'){
					if(this.userId){
						this.getBasicInfo();
					}else{
						this.getBasicNotLegal();
					}
				};
				if(e.id == 'contacts'){
					this.getBasicStaffList();
				}
			},
		},
		mounted() {
			if(this.userId){
				this.getBasicInfo();
			}else{
				this.getBasicNotLegal();
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
</style>