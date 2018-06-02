<template>
	<div class="aby-bg-white">
		<div class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left" @click="goBack"></div>
		<form action="">
			<mt-search class="searchPanel" v-model="value" cancel-text="取消" @keyup.enter.native="onSearch" placeholder="搜索">
				<!--<div class="type-page-item  keyWordBtn" v-for="(li,i) in list" :key="i">
				<div class="mui-pull-left page-item-content aby-font-Black" @click="onSearchType(li.keyword,li.searchType)">
					{{li.keyWordDescribe}}
				</div>
			</div>
			<br style="clear: both;" />-->
			</mt-search>
		</form>

		<aby-tab :list="tabList" page="indexSearch" @eventTabBack="eventTab" slot="tab">
			<div class="history" v-for="(li,i) in tabList" :key="i" :slot="li.id">
				<h5>搜索历史<aby-icon type="delete" class="mui-pull-right icodelete" @click.native="clearSearch(i)"></aby-icon></h5>
				<div>
					<span class="tip" v-for="s in li.searchList" @click="onRecord(s)">{{s}}</span>
				</div>
			</div>
		</aby-tab>
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
				tabSelect: 'line',
				tabSelectId: 0,
				tabList: [{
						id: 0,
						title: '产品',
						type: 'line',
						data: '',
						searchList: this.$tool.localStorage.getSearch('line'), //搜索记录
					},
					{
						id: 1,
						title: '供应商',
						type: 'supplier',
						data: '',
						searchList: this.$tool.localStorage.getSearch('supplier'), //搜索记录
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
				this.$tool.localStorage.setSearch(this.tabSelect, this.value);
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
			},
			// 清空搜索记录
			clearSearch(key) {
				this.$tool.confirm('您确定要清空搜索记录吗？', (res) => {
					this.tabList[key].searchList = [];
					this.$tool.localStorage.clearSerch(this.tabSelect);
				});
			}
		},
		mounted() {},
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
	
	.mui-action-back {
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
	
	.history {
		padding: 10px 15px 20px 15px;
	}
	
	.history h5 {
		margin-bottom: 10px;
	}
	
	.history .tip {
		background-color: #F0F0F0;
		border-radius: 15px;
		font-size: 14px;
		padding: 5px 10px;
		margin-right: 15px;
		margin-top: 6px;
		display: inline-block;
	}
	
	.icodelete {
		font-size: 15px;
		background-color: #FFFFFF!important;
	}
</style>