<template>
	<div class="mui-content">
		<div class="adpanel">
			<span class="btnclose">跳过( 6s )</span>
			<img src="../../static/images/bg/ad_example.jpg" />
		</div>
		<div class="logoPanel">
			<img src="../../static/images/logo/logo_txt_3x.png" />
		</div>
	</div>
</template>

<script>
</script>

<style scoped>
	.mui-content{
		background-color: #FFFFFF;
		height: 100%;
	}
	
	.adpanel {
		width: 100%;
	}
	
	.adpanel img {
		width: 100%;
	}
	
	.btnclose {
		position: absolute;
		background-color: rgba(0, 0, 0, .5);
		color: #FFFFFF;
		font-size: 12px;
		padding: 2px 6px;
		right: 10px;
		top: 10px;
		border-radius: 4px;
	}
	
	.logoPanel {
		width: 100%;
		background-color: #FFFFFF;
		text-align: center;
		padding: 25px 10px;
		position: fixed;
		bottom: 0px;
		left: 0px;
	}
	
	.logoPanel img {
		width: 40%;
	}
</style>