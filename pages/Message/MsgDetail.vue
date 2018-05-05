<template>
	<aby-page>
		<aby-header title="详情" slot="header"></aby-header>
		<div class="mui-content" slot="content">
			<div class="divtitle">
				呱啦啦新版本推出啦！
			</div>
			<div class="divcontent">
				<p><label>消息类型</label>系统消息</p>
				<p><label>时间</label>2018-05-05 11:31</p>
				<p><label>详情</label>呱啦啦新版本app推出啦，大家赶紧登录appstore下载吧，新版内容酷炫，功能优化，等等等。。</p>
			</div>
		</div>
	
	</aby-page>
	
</template>

<script>
</script>

<style scoped>
	.divtitle{
		background-color: #FFFFFF;
		padding: 20px 15px 15px 15px;
		text-align: center;
		margin-top: 10px;
		font-size: 16px;
		border-bottom: 1px solid #F0F0F0;
	}
	.divcontent{
		background-color: #FFFFFF;
		padding: 15px;
	}
	.divcontent p{
		padding-left: 80px;
		color: #232323;
	}
	.divcontent label{
		position: absolute;
		left: 15px;
		color: #AAAAAA;
	}
</style>