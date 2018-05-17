<template>
	<aby-page>
		<aby-header title="酒店详情" slot="header">
		</aby-header>
		<div class="mui-content" slot="content">
			<div class="bookface" :style="{backgroundImage: 'url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526377038625&di=51aa6cb04ee67b2167ebc1cc4e27e233&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F9f510fb30f2442a7d3d81cb8db43ad4bd01302dc.jpg)'}">
				<div class="picnum aby-font-white">
					<aby-icon type="chatpic"></aby-icon>
					<span>8张</span>
				</div>
				<aby-icon type="procollection" class="btncollection"></aby-icon>
			</div>
			<div class="proInfo">
				<aby-icon type="share" class="share aby-font-gray"></aby-icon>
				<h4 class="title">北京合美汇通国际酒店</h4>
				<div class="hotelLevel aby-font-gray">
					<span class="level">四星/高档</span>
					<span class="renovation">2010年装修</span>
				</div>
				<p class="num aby-font-gray">浏览（202）| 收藏（28）</p>
			</div>
			<div class="facilities">
				设施：
				<aby-icon type="hotelfood" class="aby-font-gray"></aby-icon>
				<aby-icon type="hotelpark" class="aby-font-gray"></aby-icon>
				<aby-icon type="hotelhotwater" class="aby-font-gray"></aby-icon>
			</div>
			<div class="address">
				地址：朝阳区双桥路3号合美大厦(紧邻地铁八通线双桥站)
			</div>
			<div class="shopInfo space">
				<img class="imglogo" src="../../static/images/logo/logo_fang.png" />
				<p class="mui-ellipsis aby-font-Black">张家界大峡谷国际旅行社有限公司</p>
				<p class="imgstate">
					<img src="../../static/images/ico/ico_ID_3x.png" />
					<img src="../../static/images/ico/ico_license_3x.png" />
					<img src="../../static/images/ico/ico_gold_3x.png" />
					<img src="../../static/images/ico/ico_bond_3x.png" />
					<span class="btnShop">查看主页</span>
				</p>
			</div>
			<ul class="mui-table-view space">
				<li class="mui-table-view-cell mui-collapse">
					<a class="mui-navigate-right roompanel" href="#" @click="onCollapse($event)">
						<img class="imgroom" src="../../static/images/bg/eg1.jpg" />
						<h4 class="aby-list-title roomtitle">豪华大床</h4>
						<p class="roomInfo mui-ellipsis">1人入住 | 单人床</p>
						<p class="roomInfo mui-ellipsis">34㎡ | 楼层11-12</p>
						<span class="roomPrice aby-list-price"><small>￥</small>128<small>起</small></span>
					</a>
					<div class="mui-collapse-content">
						<h4 class="aby-list-title feetitle">[商务大床房]</h4>
						<p>不含早 单人床</p>
						<p>附加说明：无</p>
						<div class="feePrice aby-list-price">
							<small>￥</small>128
							<span class="feeOPrice">￥200</span>
						</div>
						<aby-button size="small" title="预订" class="aby-input-button-blue btnbook"></aby-button>
					</div>
				</li>
				<li class="mui-table-view-cell mui-collapse">
					<a class="mui-navigate-right roompanel" href="#" @click="onCollapse($event)">
						<img class="imgroom" src="../../static/images/bg/eg1.jpg" />
						<h4 class="aby-list-title roomtitle">豪华大床</h4>
						<p class="roomInfo mui-ellipsis">1人入住 | 单人床</p>
						<p class="roomInfo mui-ellipsis">34㎡ | 楼层11-12</p>
						<span class="roomPrice aby-list-price"><small>￥</small>128<small>起</small></span>
					</a>
					<div class="mui-collapse-content">
						<h4 class="aby-list-title feetitle">[商务大床房]</h4>
						<p>不含早 单人床</p>
						<p>附加说明：无</p>
						<div class="feePrice aby-list-price">
							<small>￥</small>128
							<span class="feeOPrice">￥200</span>
						</div>
						<aby-button size="small" title="预订" class="aby-input-button-blue btnbook"></aby-button>
					</div>
				</li>
			</ul>
			<div class="info space">
				<div class="linetitle">服务项目</div>
				<p>酒店提供叫早服务，叫车服务，早餐打包服务，订餐服务，行李寄存等</p>
			</div>
			<div class="info space">
				<div class="linetitle">酒店介绍</div>
				<p>酒店（准五）于2012年开业，集客房，餐饮，会议为一体商务旅游休闲酒店。拥有150间豪华客房，6间大小会议厅，容纳800人餐厅</p>
			</div>
		</div>
	</aby-page>
</template>

<script>
	export default {
		methods: {
			// 选项卡头部点击
			onCollapse(e) {
				var obj = e.target.parentElement;
				if(obj.tagName=="A"){
					obj=obj.parentElement;
				}
				//判断是否展开
				if(obj.className.match(RegExp('(\\s|^)mui-active(\\s|$)'))) {
					var cn = obj.className.replace("mui-active", "");
					obj.setAttribute("class", cn);
				} else {
					obj.className= obj.className.replace(/(^\s*)|(\s*$)/g, "")+' mui-active';
				}
			},
		},
		mounted() {},
		watch: {}
	}
</script>

<style scoped>
	.mui-content{
		padding-bottom: 50px;
	}
	/*封面*/
	
	.bookface {
		width: 100vw;
		height: 66.67vw !important;
		background-position: center;
		background-repeat: no-repeat;
		background-size: 100%;
		position: relative;
	}
	/*照片数量*/
	
	.picnum {
		position: absolute;
		text-align: right;
		font-size: 13px;
		padding: 5px 15px;
		bottom: 0px;
		left: 0px;
	}
	
	.picnum .mui-icon {
		font-size: 20px;
		vertical-align: top;
	}
	/*收藏*/
	.btncollection{
		background-color: #FFFFFF;
		padding: 10px;
		border-radius: 50%;
		color: #AAAAAA;
		position: absolute;
		right: 10px;
		bottom: -12px;
		-webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, .1);
		box-shadow: 0 1px 2px rgba(0, 0, 0, .1);
	}
	/*产品信息*/
	
	.proInfo,
	.facilities,
	.address,
	.shopInfo,.info {
		background-color: #FFFFFF;
		padding: 15px;
	}
	/*标题*/
	
	.title {
		font-weight: 500;
		font-size: 15px;
		line-height: 20px;
		margin-right: 45px;
	}
	/*浏览量*/
	
	.num {
		font-size: 12px;
		margin-bottom: 0px;
	}
	/*分享*/
	
	.share {
		font-size: 18px;
		position: absolute;
		right: 13px;
		margin-top: 2px;
		padding: 5px;
	}
	/*设施*/
	
	.facilities {
		font-size: 13px;
		margin-top: 1px;
		padding-right: 80px;
	}
	
	.hotelLevel {
		font-size: 13px;
	}
	
	.hotelLevel .level,
	.hotelLevel .renovation {
		margin-right: 5px;
	}
	
	.facilities .mui-icon {
		font-size: 18px;
	}
	/*地址*/
	
	.address {
		font-size: 13px;
		margin-top: 1px;
	}
	/*供应商*/
	
	.shopInfo p {
		padding-left: 55px;
		margin-bottom: 0px;
		margin-top: 2px;
		padding-right: 60px;
	}
	
	.imglogo {
		width: 45px;
		height: 45px;
		border-radius: 4px;
		position: absolute;
	}
	
	.imgstate img {
		height: 15px;
		margin-right: 3px;
	}
	
	.btnShop {
		border: 1px solid #08C7B5;
		color: #08C7B5;
		font-size: 12px;
		padding: 0px 5px;
		border-radius: 20px;
		position: absolute;
		right: 15px;
		margin-top: -13px;
	}
	/*房型*/
	.roompanel{
		height: 66.7px;
	}
	.imgroom {
		width: 100px;
		height: 66.7px;
		position: absolute;
		left: 0px;
		top: 0px;
	}
	
	.roomtitle {
		padding: 0px 20px 0px 96px!important;
		margin-top: -5px;
		margin-bottom: 1px;
	}
	
	.roomInfo {
		padding-left: 96px;
		padding-right: 80px;
		margin: 0px!important;
		font-size: 12px;
		line-height: 18px;
	}
	.roomPrice{
		position: absolute;
		right: 33px;
		top: 23px;
	}
	/*房型价格标题*/
	.mui-collapse-content p{
		font-size: 12px;
		line-height: 16px;
		margin-right: 110px;
	}
	.feetitle{
		font-size: 13px!important;
		margin: 0px 0px 2px 0px;
		margin-right: 110px;
	}
	.feePrice{
		position: absolute;
		text-align: center!important;
		right: 70px;
		top: 20px;
	}
	.feeOPrice{
		font-size: 12px;
		text-decoration: line-through;
		display: block;
		color: #AAAAAA;
		padding: 0px;
		margin: 0px;
		line-height: 13px;
	}
	/*预订*/
	.btnbook{
		height: 25px;
		border-radius: 4px!important;
		font-size: 13px;
		position: absolute;
		right: 10px;
		top: 25px;
	}
	.linetitle {
		border-left: 3px solid #08C7B5;
		padding-left: 10px;
		margin-bottom: 15px;
	}
	.info p {
		margin-bottom: 0px;
		color: #666666;
		text-align: justify;
	}
</style>