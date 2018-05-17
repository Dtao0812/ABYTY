<template>
	<aby-page>
		<aby-header title="城市列表" slot="header"></aby-header>
		<aby-search slot="navbar" @eventSearch="searchVal"></aby-search>
		<div slot="content" class="mui-content">
			<div class="mui-scroll-wrapper" v-if="isShow">
				<mt-index-list>
					<mt-index-section v-bind:index="codeList[index]" v-for="(tmps,index) in cityNewList" :key="index">
						<mt-cell v-bind:title="item.name" v-for='(item,i) in tmps' :key="i" @click.native="onSelect(item.cityid,item.name)">
							<p class="fName">{{item.fName}}</p>
						</mt-cell>
					</mt-index-section>
				</mt-index-list>
			</div>
		</div>
	</aby-page>
</template>

<script>
	import AbySearch from '../../components/Header/Search.vue'
	export default {
		components: {
			AbySearch
		},
		data() {
			return {
				cityList: [],//从json文件取到的城市列表
				codeList: [],//字母列表
				cityNewList: [],//最新渲染列表
				isShow: true,
				fromPageUrl:this.$route.params.pageUrl
			}
		},
		methods: {
			//搜索
			//查找指定文本
			findTextInBody(key){
				if(key == ''){
					this.isShow = true;
					this.initCodeData();
					this.initCityData();
					return;
				};
				let citySelectList = [];
				let citySelectFirstList = [];
				let codeSelectList = [];
				this.initCodeData();
				this.initCityData();
				for(let i = 0; i < this.cityNewList.length; i++){
					for(let j = 0; j < this.cityNewList[i].length; j++){
						if(this.cityNewList[i][j].name.match(key)){
							citySelectFirstList.push(this.cityNewList[i]);
							codeSelectList.push(this.codeList[i])
						}
					}
				};
				citySelectFirstList = this.unique(citySelectFirstList);
				codeSelectList = this.unique(codeSelectList);
				for(let i = 0; i < citySelectFirstList.length; i++){
					let cityItemSelect = []; 
					for(let j = 0; j < citySelectFirstList[i].length; j++){
						if(citySelectFirstList[i][j].name.match(key)){
							cityItemSelect.push(citySelectFirstList[i][j]);
						}
					}
					citySelectList.push(cityItemSelect)
				};
				citySelectList.length == 0 ? this.isShow = false : this.isShow = true;
				this.cityNewList = citySelectList;
				this.codeList = codeSelectList;
			},
			unique(arr){//数组去重
			 	var res = [];
			 	for(var i=0; i<arr.length; i++){
			  		if(res.indexOf(arr[i]) == -1){
			   			res.push(arr[i]);
			  		}
			 	}
			 	return res;
			},
			//城市排序
			citySort(arr, codeList){
				let ArrList = [];
				let newArrList = [];
				for(let i = 0; i < arr.length; i++){
					for(let j = 0; j < arr[i].children.length; j++){
						let cityItem = {
							cityid: '',
							name: '',
							letter: '',
							jp: '',
							fName: ''
						};
						cityItem.cityid = arr[i].children[j].cityid;
						cityItem.name = arr[i].children[j].name;
						cityItem.letter = arr[i].children[j].letter;
						cityItem.jp = arr[i].children[j].jp;
						cityItem.fName = arr[i].name;
						ArrList.push(cityItem);
					}
				};
				for(let i = 0; i < ArrList.length; i++){
					for(let j = 0; j < ArrList.length-1-i; j++){
						let arr1 = ArrList[j].letter.slice(0,1).charCodeAt();
						let arr2 = ArrList[j+1].letter.slice(0,1).charCodeAt();
						if(arr1 > arr2){
							let temp = ArrList[j+1];
							ArrList[j+1] = ArrList[j];
							ArrList[j] = temp;
						}else if(arr1 == arr2){
							let arr3 = ArrList[j].letter.slice(1,2).charCodeAt();
							let arr4 = ArrList[j+1].letter.slice(1,2).charCodeAt();
							if(arr3 > arr4){
								let temp = ArrList[j+1];
								ArrList[j+1] = ArrList[j];
								ArrList[j] = temp;
							}
						}
					};
				};
				for(let i = 0; i < codeList.length; i++){
					let ArrCode = [];
					for(let j = 0; j < ArrList.length; j++){
						if(ArrList[j].letter.slice(0,1).charCodeAt() == codeList[i].charCodeAt() + 32){
							ArrCode.push(ArrList[j]);
						}
					}
					newArrList.push(ArrCode);
				}
				return newArrList;
			},
			initCodeData(){//初始化字母列表
				this.codeList = [];
				let codeList = this.codeList;
				for(let i = 0; i < 26; i++){
					const str = "A";
					codeList.push(String.fromCharCode(str.charCodeAt() + i));
				};
			},
			initCityData(){//加载json文件并赋值初始化城市列表
				let packageConfig = require('../../static/city.json')
				this.cityList = packageConfig;
				this.cityNewList = [];
				this.cityNewList = this.citySort(this.cityList, this.codeList);
			},
			// 选择城市
			onSelect(cityid, val){
				this.$router.replace({
					name: this.fromPageUrl,
					params: {
						cityid: cityid,
						cityName: val,
					}
				});
			},
			//监听搜索页面返回关键字
			searchVal(e){
				this.findTextInBody(e);
			}
		},
		mounted() {
			this.initCodeData();
			this.initCityData();
		},
	}
</script>

<style scoped>
	.mui-scroll-wrapper{
		top: 40px;
	}
	.mint-cell{
		border-bottom: 1px solid #ddd;
	}
	.fName{
		margin-bottom: 0;
	}
</style>