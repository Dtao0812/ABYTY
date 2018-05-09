<template>
	<aby-pull ref="pull">
		<aby-header title="" slot="header">
			<header-search slot="hSearch" :placeholder="keyword" @eventSearch="eventSearchBack"></header-search>
			<aby-fonts slot="right" class="aby-mui-bar mui-pull-right" title="搜索" @click.native="getPullDown()"></aby-fonts>
		</aby-header>
		<aby-navbar v-if="isNull" slot="navbar" @eventNavBack="eventBack" :type="type" noSearch="true" ref="navbar">
		</aby-navbar>
		
		<list-line v-if="isNull&&type==10" slot="loadlist" ref="list" :list="lists"></list-line>
		<list-hotel v-if="isNull&&type==30" slot="loadlist" ref="list" :list="lists"></list-hotel>
		<list-sport v-if="isNull&&type==40" slot="loadlist" ref="list" :list="lists"></list-sport>

		<!--<div v-if="!isNull" slot="explain">
			<div class="list-item">
				<ul class="mui-table-view">
					<li class="mui-table-view-cell mui-media">
						<a href="javascript:;">
							<img class="mui-media-object mui-pull-left aby-img" src="../../static/images/example/card.jpg">
							<div class="mui-media-body aby-list">
								<p class="aby-list-title-2">抱歉，未能找到您搜索的内容</p>
								<p class="aby-list-title-2">
									为您筛选出3家可提供服务供应商，请联系他们咨询看看哦~
								</p>
							</div>
						</a>
					</li>
				</ul>
			</div>
			<h3>联系一下</h3>
			<div class="list-item">
				<ul class="mui-table-view">
					<li class="mui-table-view-cell mui-media">
						<a href="javascript:;">
							<img class="mui-media-object mui-pull-left aby-img-guide" src="../../static/images/example/card.jpg">
							<div class="mui-media-body aby-list">
								<p class="aby-list-title">金羽</p>
								<p class="mui-ellipsis">
									<aby-icon className="mui-pull-right" type="location"></aby-icon>
									南京市
								</p>
								<p class="mui-ellipsis">
									业务范围：领队、全陪、地陪
								</p>
								<p class="mui-ellipsis">
									服务线路：上海、南京、云南、北京
								</p>
							</div>
						</a>
					</li>
				</ul>
			</div>
		</div>-->
	</aby-pull>
</template>

<script>
	import HeaderSearch from '../../components/Header/Search.vue'
	import ListLine from '../../components/List/Line.vue'
	import ListHotel from '../../components/List/Hotel.vue'
	import ListSport from '../../components/List/Sport.vue'
	export default {
		components: {
			ListLine,ListSport,HeaderSearch,ListHotel
		},
		data() {
			return {
				page:this.$route.params.page,//上级页面名称
				pageNum: 1,
				orderBy: 1,
				lists: [],
				type: this.$route.params.type,//搜索类型
				keyword: this.$route.params.keyword,//关键字
				isNull: true,//内容是否为空
				where:{},
				tabList: [{
						id:'line',
						title: '产品',
						type: 'line',
						data: ''
					},
					{
						id:'supplier',
						title: '供应商',
						type: 'supplier',
						data: ''
					},
				],
			}
		},
		methods: {
			scroll(top) {},
			// 获取线路详情
			getLineList(info,pullType,callback){
				this.$abyApi.Project.getLineListByKeyWord(info, (res) => {
					if(pullType == 1){
						// 下拉
						this.$refs.pull.closeLoading();
						this.lists = res.proList;
						this.isNull = res.proList.length>0;
					}else{
						// 上拉
						this.lists = this.lists.concat(res.proList);
					}
					callback && callback(true);
				}, (err) => {callback && callback(false)});
			},
			// 获得酒店列表
			getHotelList(info,pullType,callback){
				this.$abyApi.Hotel.getHotelListByKeyWord(info, (res) => {
					if(pullType == 1){
						// 下拉
						this.$refs.pull.closeLoading();
						this.lists = res.hotelList;
						this.isNull = res.hotelList.length>0;
					}else{
						// 上拉
						this.lists = this.lists.concat(res.hotelList);
					}
					callback && callback(true);
				}, (err) => {callback && callback(false)});
			},
			// 获得景点列表
			getSportList(info,pullType,callback){
				this.$abyApi.Sport.getSportsListByKeyWord(info, (res) => {
					if(pullType == 1){
						// 下拉
						this.$refs.pull.closeLoading();
						this.lists = res.scenicList;
						this.isNull = res.scenicList.length>0;
					}else{
						// 上拉
						this.lists = this.lists.concat(res.scenicList);
					}
					callback && callback(true);
				}, (err) => {callback && callback(false)});
			},
			// 获得供应商列表
			getSupplierList(info,pullType,callback){
				this.$abyApi.Sport.getSportsListByKeyWord(info, (res) => {
					if(pullType == 1){
						// 下拉
						this.$refs.pull.closeLoading();
						this.lists = res.scenicList;
						this.isNull = res.scenicList.length>0;
					}else{
						// 上拉
						this.lists = this.lists.concat(res.scenicList);
					}
					callback && callback(true);
				}, (err) => {callback && callback(false)});
			},
			// 获得搜索结果
			getPullDown(callback) {
				this.lists = [];
				let reqInfo = {};
				reqInfo.keyWord = this.keyword;
				reqInfo.orderBy = this.orderBy;
				reqInfo.pageNum = 1;
				reqInfo.loading = 1;
				reqInfo.where = this.where;
				
				if(this.type == 10){
					this.getLineList(reqInfo,1,(res) => {callback && callback(res)});
				}else if(this.type == 20){
					
				}else if(this.type == 30){
					this.getHotelList(reqInfo,1,(res) => {callback && callback(res)});
				}else if(this.type == 40){
					this.getSportList(reqInfo,1,(res) => {callback && callback(res)});
				}
			},
			getPullUp(callback) {
				let reqInfo = {};
				reqInfo.keyWord = this.keyword;
				reqInfo.orderBy = this.orderBy;
				reqInfo.pageNum = this.pageNum = ++this.pageNum;
				reqInfo.loading = 1;
				reqInfo.where = this.where;
				
				if(this.type === 10){
					this.getLineList(reqInfo,2,(res) => {callback && callback(res)});
				}else if(this.type === 20){
					
				}else if(this.type === 30){
					this.getHotelList(reqInfo,2,(res) => {callback && callback(res)});
				}else if(this.type === 40){
					this.getSportList(reqInfo,2,(res) => {callback && callback(res)});
				}
				
			},
			// 搜索按钮
			onSearch() {
				this.getPullDown();
			},
			// 详情返回监听
			eventBack(e) {
				this.lists = [];
				if(e.tabid === 1){
					this.orderBy = e.value;
				}else if(e.tabid === 4){
					this.where.sStarlevel = e.value;
				}
				this.getPullDown();
			},
			// 搜索子组件数据返回
			eventSearchBack(val) {
				this.keyword = val;
			},
		},
		mounted() {
			this.getPullDown();
		},
		created() {},
	}
</script>

<style scoped>
	.content {
		height: 600px;
	}
</style>