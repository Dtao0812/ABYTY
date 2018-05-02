<template>
	<div>
		<div class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left" @click="goBack"></div>
		<mt-search class="searchPanel" v-model="value" cancel-text="取消" @keyup.enter.native="onSearch" placeholder="搜索">
			<div class="type-page-item  keyWordBtn" v-for="(li,i) in list" :key="i">
				<div class="mui-pull-left page-item-content aby-font-Black" @click="onSearchType(li.keyword,li.searchType)">
					{{li.keyWordDescribe}}
				</div>
			</div>
			<br style="clear: both;" />
		</mt-search>
		<aby-tab :list="tabList" page="indexSearch" @eventTabBack="eventTab" slot="tab"></aby-tab>
		<div>
			<h5>搜索历史</h5>
			<div>
				<span v-for="s in searchList" @click="onRecord(s)">{{s}}</span>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				value: '',
				searchType: this.$route.params.type,
				list: [],
				searchList: [], //搜索记录
				tabSelect: 'line',
				tabSelectId: 0,
				tabList: [{
						id: 0,
						title: '产品',
						type: 'line',
						data: ''
					},
					{
						id: 1,
						title: '供应商',
						type: 'supplier',
						data: ''
					},
				],
			}
		},
		methods: {
			//返回上一页
			goBack() {
				this.$router.push({
					name: 'home',
				});
			},
			// 根据输入内容显示搜索类型
			searchProTypeList() {
				let reqInfo = {};
				reqInfo.loading = 1;
				reqInfo.keyWord = this.value;
				reqInfo.searchType = this.searchType;
				this.$abyApi.Project.getSearchTypeByKeyWord(reqInfo, (res) => {
					this.list = res.seachTypeList;
				});
			},
			// 键盘搜索按钮事件
			onSearch() {
				this.$tool.localStorage.setSearch(this.value);
				this.toResult();
			},
			// 搜索类型点击事件
			onSearchType(value, type) {
				this.$router.push({
					name: 'searchIndexResult',
					params: {
						type: type,
						keyword: value,
						page: 'index',
						tabSelect: this.tabSelect,
						tabSelectId: this.tabSelectId,
					}
				});
			},
			// 点击记录
			onRecord(key) {
				this.value = key;
				this.toResult();
			},
			// 跳转
			toResult() {
				this.$router.push({
					name: 'searchIndexResult',
					params: {
						type: this.searchType,
						keyword: this.value,
						page: 'index',
						tabSelect: this.tabSelect,
						tabSelectId: this.tabSelectId,
					}
				});
			},
			// tab返回
			eventTab(e) {
				this.tabSelect = e.type;
				this.tabSelectId = e.id;
			}
		},
		mounted() {
			this.searchList = this.$tool.localStorage.getSearch();
		},
	}
</script>

<style scoped>
	.mint-search {
		height: 80%;
	}
	
	.type-page-item {
		overflow: hidden;
		padding: 10px;
		background-color: #FFFFFF;
		border-bottom: 1px solid #AEAEAE;
	}
	
	.page-item-content {
		padding-left: 10px;
		border-radius: 4px;
	}
	
	.blue {
		color: #99cb22!important;
	}
	.mui-action-back{
		background-color: #FFFFFF;
		height: 44px;
		line-height: 39px;
		width: 35px;
		text-align: center;
		position: absolute;
		top: 0px;
		left: 0px;
		z-index: 99;
	}
	
</style>