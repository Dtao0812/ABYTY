<template>
	<aby-page>
		<aby-header title="意见反馈" slot="header"></aby-header>
		<div class="mui-content" slot="content">
			<mt-field placeholder="请输入您遇到的问题和宝贵建议（500字以内）" class="contact" type="textarea" rows="5"></mt-field>
			<div class="space"></div>
			<mt-field class="contact" placeholder="请输入您的联系方式（选填，便于我们联系您）" type="tel"></mt-field>
			<aby-button class="aby-button-blue" title="提交"></aby-button>
		</div>
	</aby-page>
</template>

<script>
</script>

<style scoped>
	.mui-content {
		padding: 10px;
	}
	
	.aby-button-blue {
		margin-top: 50px;
	}
</style>