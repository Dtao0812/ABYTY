<template>
	<div class="information">
		<div v-if="list.cpBtype == 10">
			<!--企业信息-->
			<mt-cell title="公司地址" is-link :to="{name:'edit', params: {title: '公司地址', textMsg: list.cpAddress, htmlId: 'cpAddress'}}" >
				<span>{{list.cpAddress}}</span>
			</mt-cell>
			<mt-cell title="联系人姓名" is-link :to="{name:'edit', params: {title: '联系人姓名', textMsg: list.cpHeadName, htmlId: 'cpHeadName'}}">
				<span>{{list.cpHeadName}}</span>
			</mt-cell>
			<mt-cell title="联系人电话" is-link :to="{name:'edit', params: {title: '联系人电话', textMsg: list.cpHeadPhone, htmlId: 'cpHeadPhone'}}">
				<span>{{list.cpHeadPhone}}</span>
			</mt-cell>
			<mt-cell title="固定电话" is-link :to="{name:'edit', params: {title: '固定电话', textMsg: list.cpTel, htmlId: 'cpTel'}}">
				<span>{{list.cpTel}}</span>
			</mt-cell>
			<div class="space"></div>
			<mt-cell title="公司介绍" :label="list.cpIntro" is-link :to="{name:'edit', params: {title: '公司介绍', textMsg: list.cpIntro, htmlId: 'cpIntro'}}" class="aby-area"></mt-cell>
		</div>
		<div v-else>
			<!--企业信息-->
			<mt-cell title="业务范围" is-link :to="{name:'edit', params: {title: '业务范围', textMsg: list.cpBizScope, htmlId: 'cpBizScope'}}">
				<!--<span class="mui-ellipsis-2">{{list.cpBizScope|filterListToString}}</span>-->
				<span class="mui-ellipsis-2">{{list.cpBizScope}}</span>
			</mt-cell>
			<mt-cell title="主营线路" is-link :to="{name:'edit', params: {title: '主营线路', textMsg: list.cpRoute, htmlId: 'cpRoute'}}">
				<span class="mui-ellipsis-2">{{list.cpRoute}}</span>
			</mt-cell>
			<mt-cell title="公司地址" is-link :to="{name:'edit', params: {title: '公司地址', textMsg: list.cpAddress, htmlId: 'cpAddress'}}">
				<span>{{list.cpAddress}}</span>
			</mt-cell>
			<mt-cell title="联系人" is-link :to="{name:'edit', params: {title: '联系人', textMsg: list.cpCorpName, htmlId: 'cpCorpName'}}">
				<span>{{list.cpCorpName}}</span>
			</mt-cell>
			<mt-cell title="联系电话" is-link :to="{name:'edit', params: {title: '联系电话', textMsg: list.cpHeadPhone, htmlId: 'cpHeadPhone'}}">
				<span>{{list.cpHeadPhone}}</span>
			</mt-cell>
			<mt-cell title="固定电话" is-link :to="{name:'edit', params: {title: '固定电话', textMsg: list.cpTel, htmlId: 'cpTel'}}">
				<span>{{list.cpTel}}</span>
			</mt-cell>
			<mt-cell v-if="list.depositType == 0" title="保证金" is-link>
				<span>您尚未交纳质保金，点击交纳</span>
			</mt-cell>
			<div class="space"></div>
			<mt-cell title="公司介绍" :label="list.cpIntro" is-link :to="{name:'edit', params: {title: '公司介绍', textMsg: list.cpIntro, htmlId: 'cpIntro'}}" class="aby-area"></mt-cell>
		</div>
	</div>
</template>

<script>
	export default {
		components: {},
		name: 'information',
		props: ['list'],
		data() {
			return {
				lists: this.list,
			}
		},
		methods: {
			
		},
		mounted() {
			
		},
		watch: {  
		    list(val){
		    	this.lists = val;
		    },
		},
		activated(){
			let upHtmlId = this.$route.params.upHtmlId?this.$route.params.upHtmlId:'';
			let upDateTextMsg = this.$route.params.upDateTextMsg?this.$route.params.upDateTextMsg:'';
			if(upHtmlId == 'cpAddress'){
				this.list.cpAddress = upDateTextMsg;
			}
			if(upHtmlId == 'cpHeadName'){
				this.list.cpHeadName = upDateTextMsg;
			}
			if(upHtmlId == 'cpHeadPhone'){
				this.list.cpHeadPhone = upDateTextMsg;
			}
			if(upHtmlId == 'cpTel'){
				this.list.cpTel = upDateTextMsg;
			}
			if(upHtmlId == 'cpBizScope'){
				this.list.cpBizScope = upDateTextMsg;
			}
			if(upHtmlId == 'cpRoute'){
				this.list.cpRoute = upDateTextMsg;
			}
			if(upHtmlId == 'cpCorpName'){
				this.list.cpCorpName = upDateTextMsg;
			}
			if(upHtmlId == 'cpIntro'){
				this.list.cpIntro = upDateTextMsg;
			}
		}
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
</style>