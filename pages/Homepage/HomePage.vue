<template>

	<aby-page>
		<aby-header title="公司主页" slot="header"></aby-header>
		<div class="mui-content" slot="content">
			<!--个人信息部分-->
			<ul class="mui-table-view mui-table-view-chevron" style="margin-top: 1px;">
				<li class="mui-table-view-cell mui-media">
					<img @click="onGetPhone" class="mui-media-object mui-pull-left" :src="cpUserInfo.cpBasic.cpLogo">
					<div class="mui-media-body">
						{{cpUserInfo.userName}}
						<p class='mui-ellipsis'>{{cpUserInfo.cpBasic.cpName}}</p>
						<img class="aby-img-Authentication" src="../../static/images/example/ID.jpg" />
						<img class="aby-img-Authentication" src="../../static/images/example/ID.jpg" />
					</div>
				</li>
			</ul>
			<div class="space"></div>
			<aby-tab v-if="cpInfo.cpBtype == 10" @eventTabBack="eventTab" :list="tabListTravel" page="homepage" slot="tab">
				<div v-for="(li,i) in tabListTravel" :key="i" :slot="li.id">
					<aby-information v-if="li.type=='infor'" :list="li.data"></aby-information>
					<aby-contacts v-if="li.type=='contacts'" :list="li.data"></aby-contacts>
				</div>
			</aby-tab>
			<aby-tab v-else @eventTabBack="eventTab" :list="tabListLocal" page="homepage" slot="tab">
				<div v-for="(li,i) in tabListLocal" :key="i" :slot="li.id">
					<aby-list v-if="li.type=='line'" :list="li.data"></aby-list>
					<aby-information v-if="li.type=='infor'" :list="li.data"></aby-information>
					<aby-contacts v-if="li.type=='contacts'" :list="li.data"></aby-contacts>
				</div>
			</aby-tab>
		</div>
	</aby-page>

</template>

<script>
	import AbyInformation from './Informatica.vue'
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
				cpInfo: this.$route.params, //路由传回参数
				cpUserInfo:this.$store.state.cpUserInfo,
				basicInfo: {},
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
			onGetPhone(e){//上传图片
//				this.$tool.getPhoto(function(file) {
//					this.basicInfo.files = [];
//					e.target.src = file;
//					var img = {};
//					img.id = 'cpImg';
//					img.src = file;
//					this.basicInfo.files.push(img);
//				}, function(e) {});
			},
			getBasicInfo() { //调基本资料（组团）
				let reqInfo = {};
				reqInfo.loading = 1;
				reqInfo.userId = this.cpInfo.userId;
				this.$abyApi.User.getBasciInfo(reqInfo, (res) => {
//					console.log('组团：'+JSON.stringify(res))
					res.cpUserInfo.cpBasic.cpHeadPhone = this.$abyApi.Crypto.DeCrypt(res.cpUserInfo.cpBasic.cpHeadPhone);
					res.cpUserInfo.cpBasic.cpTel = this.$abyApi.Crypto.DeCrypt(res.cpUserInfo.cpBasic.cpTel);
					this.tabListTravel[0].data = res.cpUserInfo.cpBasic;
				});
			},
			getDownProList() { //调产品下拉（地接）
				let proInfo = {};
				proInfo.loading = 1;
				proInfo.pageNum = 1;
				proInfo.where = {};
				proInfo.keyWord = '',
					proInfo.cpId = this.cpInfo.cpId;
				this.$abyApi.Project.getMyProList(proInfo, (res) => {
//					console.log(res)
					this.tabListLocal[0].data = res.proList
				});
			},
			getUpProList() {//调产品上拉加载更多（地接）
				let proInfo = {};
				proInfo.loading = 1;
				proInfo.pageNum = this.pageNum = ++this.pageNum;
				proInfo.where = {};
				proInfo.keyWord = '',
					proInfo.cpId = this.cpInfo.cpId;
				this.$abyApi.Project.getMyProList(proInfo, (res) => {
					this.tabListLocal[0].data = this.tabListLocal[0].data.concat(res.proList);
				});
			},
			getBasicNotLegal() { //调基本资料（地接）
				let reqInfo = {};
				reqInfo.loading = 1;
				reqInfo.cpId = this.cpInfo.cpId;
				this.$abyApi.User.getBasicNotLegal(reqInfo, (res) => {
//					console.log('地接：' + JSON.stringify(res))
					res.cpBasic.cpHeadPhone = this.$abyApi.Crypto.DeCrypt(res.cpBasic.cpHeadPhone);
					res.cpBasic.cpTel = this.$abyApi.Crypto.DeCrypt(res.cpBasic.cpTel);
					this.tabListLocal[1].data = res.cpBasic;
				});
			},
			getBasicStaffList(data) { //调员工
				let reqInfo = {};
				reqInfo.loading = 1;
				reqInfo.cpId = this.cpInfo.cpId;
				this.$abyApi.User.getBasicStaffList(reqInfo, (res) => {
//					console.log('联系人：' + JSON.stringify(res));
					if(this.cpInfo.cpBtype == 10) {
						this.tabListTravel[1].data = res.cpUserList;
					}else{
						this.tabListLocal[2].data = res.cpUserList;
					}
				})
			},
			initPageInfo() {
				if(this.cpInfo.cpBtype == 10) {
					this.getBasicInfo();
					this.getBasicStaffList();
				} else {
					this.getDownProList();
					this.getBasicNotLegal();
					this.getBasicStaffList();
				}
			},
			eventTab(e) {
				console.log('e:' + JSON.stringify(e.id))
			},
		},
		mounted() {
			this.initPageInfo()
		},
		activated() {
			
		},
		beforeRouteEnter(to, from, next) {
			if(from.name == 'my') {
				next(vm => {
					vm.initPageInfo()
				})
			}else{
				next()
			}
		},
		beforeRouteLeave(to, from, next) {
			if(to.name == 'my') {
				to.meta.noKeepAlive = true;
				from.meta.noKeepAlive = false;
			} else {
				to.meta.noKeepAlive = true;
				from.meta.noKeepAlive = false;
			}
			next();
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
		font-size: 16px;
	}
</style>