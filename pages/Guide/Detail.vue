<template>
	<aby-page>
		<aby-header title="Ta的名片" slot="header"></aby-header>
		<div class="mui-content guidepage" slot="content">
			<div class="panelTop">
				<div class="face"></div>
				<div class="info">
					<img class="photo" src="../../static/images/logo/logo_fang.png" />
					<p class="name">李小白</p>
					<p class="city"><aby-icon type="nowlocation"></aby-icon>南京市</p>
					<aby-icon-color type="chat-circle" class="btnMsg"></aby-icon-color>
					<aby-icon-color type="call-circle" class="btnCall"></aby-icon-color>
				</div>
			</div>
			<div class="spaceTitle">
				<h4>TA的名片信息</h4>
			</div>
			<div class="panelContent">
				<mt-cell title="个人标签">
					<span><i class="tip">旅行</i></span>
				</mt-cell>
				<mt-cell title="语言">
					<span>中文</span>
				</mt-cell>
				<mt-cell title="从业时间" class="space">
					<span>2年</span>
				</mt-cell>
				<mt-cell title="业务范围">
					<span>全陪、地陪、景点讲解</span>
				</mt-cell>
				<mt-cell title="职业性质">
					<span>兼职导游</span>
				</mt-cell>
				<mt-cell title="技术等级">
					<span>初级导游</span>
				</mt-cell>
				<div class="space"></div>
				<mt-cell title="熟悉线路">
					<span>南京、上海</span>
				</mt-cell>
				<mt-cell title="服务费用">
					<span>200元/天</span>
				</mt-cell>
				<mt-cell title="自我介绍" class="space">
					<span>200元/天</span>
				</mt-cell>
				<div class="spaceTitle">
					<h4>TA和游客的精彩瞬间</h4>
				</div>
				<div class="imglist">
					<!--图片为空的时候显示-->
					<p>Ta很懒，没有添加精彩瞬间~</p>
					<img src="../../static/images/example/ID.jpg" />
					<img src="../../static/images/example/ID.jpg" />
				</div>
			</div>
		</div>
	</aby-page>
</template>

<script>
</script>

<style scoped>
	.panelTop {}
	
	.face {
		width: 100vw;
		height: 43.75vw !important;
		background-image: url(../../static/images/example/card.jpg);
		background-size: 100%;
		background-position: center;
	}
	
	.info {
		width: 100vw;
		height: 60px;
		background-color: #FFFFFF;
		padding: 10px 15px;
	}
	
	.info p {
		padding: 0px 0px 0px 65px;
		margin: 0px;
	}
	
	.info .name {
		color: #232323;
		font-size: 15px;
	}
	
	.info .city {
		font-size: 12px;
	}
	
	.info .mui-icon {
		font-size: 13px;
		margin-left: -2px;
		margin-right: 1px;
	}
	
	.photo {
		border-radius: 50%;
		border: 3px solid #FFFFFF;
		width: 60px;
		height: 60px;
		position: absolute;
		left: 10px;
		margin-top: -25px;
	}
	
	.spaceTitle h4 {
		padding: 10px 10px;
		font-size: 15px;
	}
	
	.imglist {
		background-color: #FFFFFF;
		padding: 10px;
		margin-bottom: 30px;
	}
	
	.imglist img {
		width: 100%;
		vertical-align: bottom;
		margin-bottom: 10px;
	}
	
	.mint-cell {
		border-bottom: 1px solid #F0F0F0;
	}

	.tip{
		background: #F0F0F0;
		font-size: 12px;
		padding: 3px 8px;
		border-radius: 15px;
	}
	.btnMsg,.btnCall{
		position: absolute;
		margin-top: -40px;
		right: 10px;
		width: 35px;
		height: 35px;
	}
	.btnCall{
		right: 60px;
	}
</style>