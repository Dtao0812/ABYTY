<template>
	<div class="detail">
		<aby-header title="我的">
			<div slot="back"></div>
			<aby-icon type="setting" slot="right" @click.native="toUrl" class="mui-pull-right"></aby-icon>
		</aby-header>
		<div class="content">
			<!--个人信息部分-->
			<ul class="mui-table-view mui-table-view-chevron" style="margin-top: 1px;">
				<li class="mui-table-view-cell mui-media person">
					<a class="mui-navigate-right" @click="toHomePage">
						<img class="mui-media-object mui-pull-left personpic" :src="cpUserInfo.cpBasic.cpLogo">
						<!--组团-->
						<img v-if="cpUserInfo.cpBasic.cpBtype==10" class="role" src="../../static/images/ico/ico_role_travel.png" />
						<!--地接-->
						<img v-if="cpUserInfo.cpBasic.cpBtype==20" class="role" src="../../static/images/ico/ioc_role_local.png" />
						<!--机票-->
						<img v-if="cpUserInfo.cpBasic.cpBtype==30" class="role" src="../../static/images/ico/ioc_role_local.png" />
						<!--酒店-->
						<img v-if="cpUserInfo.cpBasic.cpBtype==40" class="role" src="../../static/images/ico/ioc_role_local.png" />
						<!--景点-->
						<img v-if="cpUserInfo.cpBasic.cpBtype==50" class="role" src="../../static/images/ico/ioc_role_local.png" />
						
						<div class="mui-media-body">
							{{cpUserInfo.userName|filterNull}}
							<p class='mui-ellipsis'>{{cpUserInfo.cpBasic.cpName|filterNull}}</p>
						</div>
					</a>
				</li>
			</ul>
			<!--菜单部分-->
			<ul class="mui-table-view mui-table-view-chevron space" v-if="cpUserInfo.cpBasic.cpBtype==20">
				<li class="mui-table-view-cell mui-media">
					<router-link class="menu mui-navigate-right" :to="{name:'myGold'}">
						<aby-icon-color class="ptype" type="mygold"></aby-icon-color>我的质保金
						<span class="give-warn" v-show="cpUserInfo.cpBasic.depositType == 0">未交纳<i></i></span>
					</router-link>
				</li>
			</ul>
			<ul class="mui-table-view mui-table-view-chevron space">
				<li class="mui-table-view-cell mui-media">
					<router-link class="menu mui-navigate-right" :to="{name:'myProduct'}">
						<aby-icon-color class="ptype" type="myproduct"></aby-icon-color>我的产品库
					</router-link>
				</li>
			</ul>
			<ul class="mui-table-view mui-table-view-chevron space">
				<li class="mui-table-view-cell mui-media">
					<router-link class="menu mui-navigate-right" :to="{name:'myPurchase'}">
						<aby-icon-color class="ptype" type="myinquiry"></aby-icon-color>我的询价
					</router-link>
				</li>
				<li class="mui-table-view-cell mui-media">
					<router-link class="menu mui-navigate-right" :to="{name:'myCollection'}">
						<aby-icon-color class="ptype" type="mycollection"></aby-icon-color>我的收藏
					</router-link>
				</li>
				<li class="mui-table-view-cell mui-media">
					<router-link class="menu mui-navigate-right" :to="{name:'myCode'}">
						<aby-icon-color class="ptype" type="mycode"></aby-icon-color>店铺二维码
					</router-link>
				</li>
				<li class="mui-table-view-cell mui-media">
					<router-link class="menu mui-navigate-right" :to="{name:'accountList'}">
						<aby-icon-color class="ptype" type="account"></aby-icon-color>子账号管理
					</router-link>
				</li>
			</ul>
			<ul class="mui-table-view mui-table-view-chevron space onDialTel" @click="$tool.dialTelToApp(abyTel)">
				<li class="mui-table-view-cell mui-media menu">
					<span class="mui-navigate-right">
						<aby-icon-color class="ptype" type="service"></aby-icon-color>联系客服
					</span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		components: {
		},
		data() {
			return {
				cpUserInfo:this.$store.state.cpUserInfo,
				abyTel:this.$store.state.abyTel,
				toHomePageInfo: {}
			}
		},
		methods:{
			init(){
				this.$parent.eventPageShow(this.$route.name);
				this.cpUserInfo = this.$store.state.cpUserInfo;
			},
			toUrl(){
				this.$router.push({name:'setting'});
			},
			toHomePage(){
				this.toHomePageInfo.cpId = this.cpUserInfo.cpId;
				this.toHomePageInfo.userId = this.cpUserInfo.userId;
				this.$router.push({
					name:"homePage",
					params:{
						cpId:this.cpUserInfo.cpId,
						userId:this.cpUserInfo.userId,
					}
				})
			},
		},
		mounted() {
			
		},
		activated() {
			this.init();
		},
	}
</script>
<style scoped>
	.mui-table-view-cell {
		padding-top: 15px;
		padding-bottom: 15px;
		padding-left: 13px;
		
	}
	.personpic{
		height: 65px!important;
		width: 65px!important;
		max-width: 65px!important;
		border-radius: 5px!important;
	}
	.mui-media-body{
		padding-left: 6px;
		padding-top: 13px;
	}
	/*身份标志*/
	.role{
		width: 40px;
		position: absolute;
		margin-left: -50px;
	}
	.mui-pull-right{
		color: #707070;
	}
	/*设置按钮*/
	.aby-icon-setting{
		font-size: 18px;
		line-height: 23px;
	}
	.onDialTel{
		margin-bottom: 60px!important;
	}
	.give-warn{
		color: #dd524d;
		float: right;
		margin-right: -25px;
	}
</style>