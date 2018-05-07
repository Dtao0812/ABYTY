<template>
	<div class="information">
		<div v-if="list.cpBtype == 10">
			<!--企业信息-->
			<mt-cell title="公司地址">
				<span>{{list.cpAddress|filterNull}}</span>
			</mt-cell>
			<mt-cell title="联系人姓名">
				<span>{{list.cpHeadName|filterNull}}</span>
			</mt-cell>
			<mt-cell title="联系人电话">
				<span>{{list.cpHeadPhone|filterNull}}</span>
			</mt-cell>
			<mt-cell title="固定电话">
				<span>{{list.cpTel|filterNull}}</span>
			</mt-cell>
			<div class="space"></div>
			<mt-cell title="公司介绍" :label="list.cpIntro" class="aby-area"></mt-cell>
		</div>
		<div v-else>
			<!--企业信息-->
			<!--<mt-cell title="业务范围" is-link>-->
				<!--<span class="mui-ellipsis-2">{{list.cpBizScope|filterListToString}}</span>-->
				<!--<span class="mui-ellipsis-2">{{list.cpBizScope|filterListToString}}</span>
			</mt-cell>
			<mt-cell title="主营线路" is-link>
				<span class="mui-ellipsis-2">{{list.cpRoute|filterListToString}}</span>
			</mt-cell>-->
			<mt-cell title="公司地址">
				<span>{{list.cpAddress|filterNull}}</span>
			</mt-cell>
			<mt-cell title="联系人">
				<span>{{list.cpCorpName|filterNull}}</span>
			</mt-cell>
			<mt-cell title="联系电话">
				<span>{{list.cpHeadPhone|filterNull}}</span>
			</mt-cell>
			<mt-cell title="固定电话">
				<span>{{list.cpTel|filterNull}}</span>
			</mt-cell>
			<mt-cell v-if="list.depositType == 0" title="保证金">
				<span>您尚未交纳质保金，点击交纳</span>
			</mt-cell>
			<div class="space"></div>
			<mt-cell title="业务范围" :label="list.cpBizScope|filterListToString" class="aby-area"></mt-cell>
			<div class="space"></div>
			<mt-cell title="主营线路" :label="list.cpRoute|filterListToString" class="aby-area"></mt-cell>
			<div class="space"></div>
			<mt-cell title="公司介绍" :label="list.cpIntro" class="aby-area"></mt-cell>
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
	.mint-cell-value span{
		line-height: 18px!important;
	}
	.mint-cell-label{
		padding-right: 10px;
	}
</style>