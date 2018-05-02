<template>
	<div>
		<aby-header title="" slot="header">
			<div slot="back"></div>
			<header-search slot="hSearch" disabled="true" @click.native="onSearch"></header-search>
			<aby-icon slot="right" class="mui-icon mui-pull-right icon-plus" type="plus" @click.native="popupPlus=!popupPlus"></aby-icon>
		</aby-header>
		<aby-banner pageType="1"></aby-banner>
		<div class="mui-content content">
			<aby-banner pageType="1"></aby-banner>
			<!--菜单部分-->
			<ul class="mui-table-view mui-grid-view mui-grid-9 home-menu">
				<li class="mui-table-view-cell mui-media mui-col-xs-3 mui-col-sm-3">
					<router-link :to="{ name:'project' }">
						<img src="../../static/images/btn/btn_line_3x.png" />
						<div class="mui-media-body">线路</div>
					</router-link>
				</li>
				<li class="mui-table-view-cell mui-media mui-col-xs-3 mui-col-sm-3">
					<router-link :to="{ name:'hotelSearch' }">
						<img src="../../static/images/btn/btn_hotel_3x.png" />
						<div class="mui-media-body">酒店</div>
					</router-link>
				</li>
				<li class="mui-table-view-cell mui-media mui-col-xs-3 mui-col-sm-3">
					<router-link :to="{ name:'sport' }">
						<img src="../../static/images/btn/btn_spot_3x.png" />
						<div class="mui-media-body">景点</div>
					</router-link>
				</li>
				<li class="mui-table-view-cell mui-media mui-col-xs-3 mui-col-sm-3">
					<router-link :to="{ name:'guide' }">
						<img src="../../static/images/btn/btn_guide_3x.png" />
						<div class="mui-media-body">导游</div>
					</router-link>
				</li>
			</ul>
			<!--消息部分-->
			<ul class="mui-table-view aby-sysMsg">
				<li class="mui-table-view-cell mui-media space" @click="toMsgList">
					<img class="mui-media-object mui-pull-left imgMsg" src="../../static/images/ico/ico_msgbar_3x.png">
					<div class="mui-media-body aby-font-Black mui-navigate-right">
						<p class='mui-ellipsis'>· 您有一条新的订单</p>
						<p class='mui-ellipsis'>· 供应商推荐：猜你对以下供应商感兴趣</p>
					</div>
				</li>
			</ul>
			<!--活动模块部分-->
			<div class="module space">
				<table class="table table-bordered table-striped">
					<tbody>
						<tr>
							<td rowspan="2" class="moduleSale">
								<img src="../../static/images/module/module_sale_3x.png" />
							</td>
							<td class="moduleSupplier">
								<img src="../../static/images/module/module_supplier_3x.png" />
							</td>
							<td class="moduleLine">
								<img src="../../static/images/module/module_line_3x.png" />
							</td>
						</tr>
						<tr>
							<td class="moduleHotel">
								<img src="../../static/images/module/module_hotel_3x.png" />
	
							</td>
							<td class="modulePlane">
								<img src="../../static/images/module/module_plane_3x.png" />
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<!--精选产品-->
			<div class="aby-title-center">
				<span></span>精选产品<span></span>
			</div>
			<aby-tab :list="goodsList" page="index" slot="tab">
				<div v-for="(li,i) in goodsList" :key="i" :slot="li.id">
					<list-line v-if="li.type=='line'" :list="li.data"></list-line>
					<list-sport v-if="li.type=='sport'" :list="li.data"></list-sport>
					<list-hotel v-if="li.type=='hotel'" :list="li.data"></list-hotel>
				</div>
			</aby-tab>
			<div class="aby-title-center linebottom" style="padding-bottom: 80px;">
				<span></span>我是有底线的<span></span>
			</div>
		</div>
		<!--弹出框-->
		<mt-popup v-model="popupPlus" popup-transition="popup-fade" class="mint-popup-1">
	      <aby-icon class="mui-icon mui-pull-right icon-plus" type="plus" @click.native="popupPlus=!popupPlus"></aby-icon>
	      <aby-icon class="mui-icon mui-pull-right icon-plus" type="plus" @click.native="popupPlus=!popupPlus"></aby-icon>
	    </mt-popup>
	</div>

</template>

<script>
	import HeaderSearch from '../../components/Header/Search.vue'
	import AbyBanner from '../../components/Swipe/Banner.vue'
	import ListLine from '../../components/List/Line.vue'
	import ListSport from '../../components/List/Sport.vue'
	import ListHotel from '../../components/List/Hotel.vue'

	export default {
		components: {
			AbyBanner,
			HeaderSearch,
			ListLine,
			ListSport,
			ListHotel,
		},
		data() {
			return {
				scrollTop: '',
				popupPlus: false,
				goodsList: [{
						id: 'line',
						title: '精选线路',
						type: 'line',
						data: ''
					},
					{
						id: 'sport',
						title: '精选景点',
						type: 'sport',
						data: ''
					},
					{
						id: 'hotel',
						title: '精选酒店',
						type: 'hotel',
						data: ''
					}
				],
				msgList:[]
			}
		},
		methods: {
			init(){
				if(this.$store.state.userId == '')return;
				// 初始化数据库和融云服务器
				this.$abyDb.Im.init((res)=>{
					this.$abyApi.Chat.getNotReadMsg();
					// 初始化融云
					this.$abyApi.Chat.init();
					// 接受融云消息
					this.$abyApi.Chat.setReceiveMsgListener();
				});
			},
			// 计算滚动条高度
			handleScroll() {
				this.scrollTop = document.getElementById("content").scrollTop;
			},
			// 获取精选内容
			getGoodsList() {
				let reqInfo = {};
				reqInfo.pageNum = 1;
				this.$abyApi.All.getGoods(reqInfo, (res) => {
					this.goodsList[0].data = res.lineList;
					this.goodsList[1].data = res.sportList;
					this.goodsList[2].data = res.hotelList;
				})
			},
			// 搜索框点击
			onSearch() {
				this.$router.replace({
					name: 'searchIndex',
				});
			},
			// 消息通知
			toMsgList() {
				this.$router.push({
					name: 'msgSystem',
				}); 
			},
		},
		mounted() {
			this.init();
			this.$parent.eventPageShow(this.$route.name);
			this.getGoodsList();
		},
		activated() {
			this.init();
			// 底部导航栏
			this.getGoodsList();
			this.$parent.eventPageShow(this.$route.name);
		},
	}
</script>
<style scoped>
	.mui-bar .mui-title {
		left: 10px;
	}
	/*banner下方入口菜单*/
	
	.mui-grid-view.mui-grid-9 {
		border: none;
		background-color: #FFFFFF;
		padding: 0px 4px;
	}
	
	.mui-grid-view.mui-grid-9 .mui-table-view-cell {
		border: none;
	}
	/*首页四份分类入口*/
	
	.home-menu img {
		width: 48px;
	}
	
	.home-menu .mui-media-body {
		font-size: 14px!important;
		margin-top: 5px!important;
	}
	/*居中两边带线大标题*/
	
	.aby-title-center {
		background-color: #FFFFFF;
		text-align: center;
		padding: 15px 10px 10px 10px;
		font-weight: 500;
		font-size: 16px;
		line-height: 23px;
		color: #232323;
	}
	
	.aby-title-center span {
		display: inline-block;
		border-bottom: 1px solid #bbbbbb;
		height: 1px;
		width: 22px;
		margin-bottom: 4px;
	}
	
	.aby-title-center span:first-child {
		margin-right: 6px;
	}
	
	.aby-title-center span:last-child {
		margin-left: 6px;
	}
	/*五模块表格*/
	
	.module {
		background-color: #FFFFFF;
		padding: 8px;
	}
	
	.module img {
		vertical-align: top;
	}
	
	.moduleSale {
		width: 32.0333vw;
	}
	
	.moduleSale img {
		width: 100%;
	}
	
	.module img {
		width: 100%;
	}
	
	.modulePlane,
	.moduleHotel {
		padding-left: 4px;
	}
	
	.moduleSupplier,
	.moduleLine {
		padding-left: 4px;
	}
	
	.modulePlane,
	.moduleHotel {
		padding-top: 2px;
	}
	
	.table-bordered>tbody>tr>th,
	.table-bordered>tfoot>tr>th,
	.table-bordered>thead>tr>td,
	.table-bordered>tbody>tr>td,
	.table-bordered>tfoot>tr>td {
		width: 33%;
	}
	
	.table-bordered img {
		width: 100%;
		vertical-align: bottom;
	}
	/*消息部分图标*/
	
	.imgMsg {
		height: auto!important;
		margin-top: 3px;
	}
	/*底线*/
	
	.linebottom {
		color: #AAAAAA;
		font-size: 12px;
		background-color: #F0F0F0;
	}
	
	.mint-popup-1{
		top: 55px;
		right: 0;
		width: 100px;
	}
	.Router .v-modal{
		background: rgba(0,0,0,0);
	}
</style>