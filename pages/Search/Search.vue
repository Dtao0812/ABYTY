<template>
	<div class="aby-bg-white">
		<div class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left" @click="goBack"></div>
		<mt-search class="searchPanel" v-model="value" cancel-text="取消" @keyup.enter.native="onSearch" placeholder="搜索">
			<div class="type-page-item  keyWordBtn" v-for="(li,i) in list" :key="i">
				<div class="mui-pull-left page-item-content aby-font-Black" @click="onSearchType(li.keyword,li.searchType)">
					{{li.keyWordDescribe}}
				</div>
			</div>
			<br style="clear: both;" />
		</mt-search>
		<div class="history">
			<h5>搜索历史<aby-icon type="delete" class="mui-pull-right icodelete"></aby-icon></h5>
			<div>
				<span class="tip" v-for="s in searchList" @click="onRecord(s)">{{s}}</span>
			</div>
		</div>

		<div class="history">
			<h5>猜你喜欢</h5>

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
			}
		},
		methods: {
			//返回上一页
			goBack() {
				this.$router.back();
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
				this.toResult();
			},
			// 搜索类型点击事件
			onSearchType(value, type) {
				this.$router.replace({
					name: 'searchResult',
					params: {
						type: type,
						keyword: value
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
				this.$tool.localStorage.setSearch(this.searchType, this.value);
				this.$router.replace({
					name: 'searchResult',
					params: {
						type: this.searchType,
						keyword: this.value,
					}
				});
			}
		},
		mounted() {
			this.searchList = this.$tool.localStorage.getSearch(this.searchType);
		},
		watch: {
			value(val) {
				if(val !== '') this.searchProTypeList();
			}
		}
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
		margin-top: 10px;
	}
	
	.icodelete {
		font-size: 15px;
		background-color: #FFFFFF!important;
	}
</style>