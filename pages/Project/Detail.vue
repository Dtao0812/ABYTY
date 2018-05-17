<template>
	<aby-page>
		<aby-header title="产品详情" slot="header">
		</aby-header>
		<div class="mui-content" slot="content">
			<div class="bookface" :style="{backgroundImage: 'url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526377038625&di=51aa6cb04ee67b2167ebc1cc4e27e233&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F9f510fb30f2442a7d3d81cb8db43ad4bd01302dc.jpg)'}">
				<div class="bootip">
					<div class="mui-ellipsis">南京出发</div>
					<div class="mui-ellipsis">编号:L-5097023149</div>
				</div>
			</div>
			<div class="proInfo">
				<div class="price">
					<small>￥</small>1220<small>起/人</small>
					<!--如果是特价显示-->
					<span class="sale">优惠促销</span>
					<span class="priceold aby-font-gray">价格 <o>￥2000</o></span>
				</div>
				<aby-icon type="share" class="share aby-font-gray"></aby-icon>
				<h4 class="title">【最美湘西】张家界、芙蓉镇、凤凰古镇专线5日游</h4>
				<p class="num aby-font-gray">浏览（202）| 收藏（28）</p>
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
			<aby-tab :list="tabList" slot="tab" class="space">
				<div v-for="(li,i) in tabList" :key="i" :slot="li.id">
				</div>
			</aby-tab>
			<div class="days space">
				<div class="linetitle">行程安排</div>
				<div class="space">
					<div class="daytitle">
						<span>第1天</span>
						<p>张家界-自由活动</p>
					</div>
					<div class="daycontent">
						<p class="dayfood">
							<aby-icon type="dayfood" class="aby-font-blue"></aby-icon>
							<b>餐饮</b>不含
						</p>
						<p class="dayfood">
							<aby-icon type="dayhotel" class="aby-font-blue"></aby-icon>
							<b>住宿</b>不含
						</p>
						<p class="aby-font-Black">个赴张家界集合，（湖南导游会在您出发的前一天20点以前与您取得联系），有指定接站人员接待入住酒店，开启最美湘西之旅。</p>
					</div>
				</div>
				<div class="space">
					<div class="daytitle">
						<span>第2天</span>
						<p>张家界-自由活动</p>
					</div>
					<div class="daycontent">
						<p class="dayfood">
							<aby-icon type="dayfood" class="aby-font-blue"></aby-icon>
							<b>餐饮</b>不含
						</p>
						<p class="dayfood">
							<aby-icon type="dayhotel" class="aby-font-blue"></aby-icon>
							<b>住宿</b>不含
						</p>
						<p class="aby-font-Black">个赴张家界集合，（湖南导游会在您出发的前一天20点以前与您取得联系），有指定接站人员接待入住酒店，开启最美湘西之旅。</p>
					</div>
				</div>
			</div>
			<div class="fee space">
				<div class="linetitle">费用说明</div>
				<p>收费包括</p>
				<p>必消套餐：236元／人</p>
				<p>门票：所列景点门票</p>
				<p>餐费：4早7正餐</p>
			</div>
			<div class="careful space">
				<div class="linetitle">预定须知</div>
				<p>预定时需确认身份证号码、湖南境内张家界、凤凰景区门票均为实名制预约购票。一旦确认我社将网上系统预约购票，预定需要提前3个工作日。</p>
			</div>
			<div class="careful space">
				<div class="linetitle">注意事项</div>
				<p>注意事项具体内容注意事项具体内容注意事项具体内容注意事项具体内容注意事项具体内容注意事项具体内容注意事项具体内容</p>
			</div>
			<div class="careful space">
				<div class="linetitle">签证须知</div>
				<p>无</p>
			</div>
		</div>
		<div slot="footer" class="footer">
			<div class="btnsmall">
				<aby-icon type="prochat" class="aby-font-blue"></aby-icon>
				<p>聊天</p>
			</div>
			<div class="btnsmall">
				<aby-icon type="proshop"></aby-icon>
				<p>主页</p>
			</div>
			<div class="btnsmall">
				<aby-icon type="procollection"></aby-icon>
				<p>收藏</p>
			</div>
			<div class="btnbig aby-button-blue">立即预订</div>
		</div>
	</aby-page>
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
						title: '5日行程',
						type: 'day',
						data: '',
					},
					{
						id: 1,
						title: '费用说明',
						type: 'fee',
						data: '',
					},
					{
						id: 3,
						title: '须知',
						type: 'careful',
						data: '',
					},
				],
			}
		},
		methods: {

		},
		mounted() {},
	}
</script>

<style scoped>
	.mui-content {
		position: fixed;
		top: 0px;
		left: 0;
		bottom: 30px;
		padding-top: 45px;
		/*距离底部的距离为底部盒子的高度，自己也可以设置*/
		overflow-y: scroll;
		width: 100%;
		height: auto;
		-webkit-overflow-scrolling: touch;
		/*这句是为了滑动更顺畅*/
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
	/*灰色蒙版文字介绍*/
	
	.bootip {
		color: #FFFFFF;
		font-size: 12px;
		background: rgba(0, 0, 0, .6);
		position: absolute;
		bottom: 0px;
		left: 0px;
		width: 100%;
		height: 25px;
		line-height: 23px;
	}
	
	.bootip div {
		display: inline-block;
		padding-top: 2px;
	}
	
	.bootip div:first-child {
		width: 55%;
		padding-left: 10px;
	}
	
	.bootip div:last-child {
		width: 43%;
		text-align: right;
		padding-right: 10px;
	}
	/*产品信息*/
	
	.proInfo,
	.shopInfo,
	.days,
	.fee,
	.careful {
		background-color: #FFFFFF;
		padding: 15px;
	}
	
	.price {
		color: #FF9800;
		font-size: 22px;
	}
	
	.sale {
		font-size: 10px;
		padding: 0px 1px;
		border-radius: 2px;
		border: 1px solid #FF9800;
	}
	
	.priceold {
		font-size: 12px;
		display: block;
	}
	
	.priceold o {
		text-decoration: line-through;
	}
	/*标题*/
	
	.title {
		font-weight: 500;
		text-indent: -.5em;
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
	/*行程详情总标题*/
	
	.linetitle {
		border-left: 3px solid #08C7B5;
		padding-left: 10px;
		margin-bottom: 15px;
	}
	/*每一天标题*/
	
	.daytitle {
		background-color: #08C7B5;
		color: #FFFFFF;
		padding: 10px;
		font-size: 14px;
		border-top-left-radius: 4px;
		border-top-right-radius: 4px;
	}
	
	.daytitle span {
		margin-right: 10px;
		font-weight: 600;
		position: absolute;
	}
	
	.daytitle p {
		color: #FFFFFF;
		padding-left: 55px;
		margin-bottom: 0px;
	}
	
	.daycontent {
		padding: 10px;
		border: 1px solid #F0F0F0;
		border-top: none;
		border-bottom-left-radius: 4px;
		border-bottom-right-radius: 4px;
		text-align: justify;
	}
	
	.dayfood {
		color: #232323;
	}
	
	.dayfood .mui-icon {
		font-size: 13px;
	}
	
	.dayfood b {
		margin-right: 10px;
	}
	/*费用说明*/
	
	.fee p,.careful p {
		margin-bottom: 0px;
		color: #666666;
		text-align: justify;
	}
	/*底部固定操作区域*/
	.footer{
		background: #FFFFFF;
		position: fixed;
		height: 50px;
		bottom: 0px;
		left: 0px;
		width: 100%;
		text-align: center;
	}
	.footer .btnsmall{
		width: 16.6vw;
		height: 100%;
		float: left;
		padding-top: 5px;
		border-top: 1px solid #F0F0F0;
		color: #AAAAAA;
	}
	.btnsmall{
		color: #AAAAAA;
	}
	.footer .btnsmall p{
		margin-bottom: 0px;
		font-size: 12px;
		margin-top: -3px;
	}
	.footer .btnbig{
		width: 50.2vw;
		float: left;
		height: 100%;
		border-radius: 0px;
		color: #FFFFFF;
		line-height: 50px;
	}
</style>