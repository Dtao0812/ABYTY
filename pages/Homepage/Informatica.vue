<template>
	<div class="information" v-if="cpUserInfo!=''">
		<!--企业信息-->
		<mt-cell title="公司地址" :is-link="isOwn" replace @click.native="toEdit('公司地址','cpAddress')">
			<span>{{cpUserInfo.cpBasic.cpAddress|filterNull}}</span>
		</mt-cell>
		<mt-cell title="联系人姓名" :is-link="isOwn" replace @click.native="toEdit('公司地址','cpHeadName')">
			<span>{{cpUserInfo.cpBasic.cpHeadName|filterNull}}</span>
		</mt-cell>
		<mt-cell title="联系人电话" :is-link="isOwn"  @click.native="toEdit('联系人电话','cpHeadPhone')">
			<span>{{deCrypt(cpUserInfo.cpBasic.cpHeadPhone)}}</span>
		</mt-cell>
		<mt-cell title="固定电话" :is-link="isOwn"  @click.native="toEdit('固定电话','cpTel')">
			<span>{{deCrypt(cpUserInfo.cpBasic.cpTel)}}</span>
		</mt-cell>
		<mt-cell v-if="cpUserInfo.cpBasic.depositType == 1" title="质保金">
			<span>已缴纳</span>
		</mt-cell>
		<div v-if="cpUserInfo.cpBasic.cpBtype != 10">
			<div class="space"></div>
			<mt-cell title="主营线路" :label="cpUserInfo.cpBasic.cpRoute|filterListToString" :is-link="isOwn" class="aby-area"  @click.native="toEdit('主营线路','cpRoute')"></mt-cell>
			<div class="space"></div>
			<mt-cell title="业务范围" :label="cpUserInfo.cpBasic.cpBizScope|filterListToString" :is-link="isOwn" class="aby-area"  @click.native="toEdit('业务范围','cpBizScope')"></mt-cell>
		</div>
		<div class="space"></div>
		<mt-cell title="公司介绍" :label="cpUserInfo.cpBasic.cpIntro" :is-link="isOwn" class="aby-area"  @click.native="toEdit('公司介绍','cpIntro')"></mt-cell>
	</div>
</template>

<script>
	export default {
		components: {},
		name: 'information',
		props: ['list','isOwn'],
		data() {
			return {
				cpUserInfo: this.list||'',
			}
		},
		methods: {
			// 解密
			deCrypt(info) {
				if(info) {
					return this.$abyApi.Crypto.DeCrypt(info);
				} else {
					return '未设置';
				}
			},
			// 编辑
			toEdit(title,id){
				if(this.isOwn){
					let textMsg = this.cpUserInfo.cpBasic[id];
					if(id == 'cpHeadPhone'|| id == 'cpTel'){
						textMsg = this.$abyApi.Crypto.DeCrypt(textMsg);
					}
					this.$router.push({
						name:'eidtHomePage',
						params:{
							title:title,
							htmlId:id,
							textMsg:textMsg
						}
					});
				}
			}
		},
		mounted() {
		},
		watch: {
			list(val) {
				this.cpUserInfo = val;
			},
		},
	}
</script>

<style scoped>
	.btnFixed {
		text-align: center;
		line-height: 10px;
		border-radius: 0px;
		background-color: #08C7B5;
		width: 90%;
		margin: 30px 5%;
	}
	
	.mint-cell-value span {
		line-height: 18px!important;
	}
</style>