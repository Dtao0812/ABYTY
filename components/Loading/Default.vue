<template>
	<div class="aby-loading">
		<!--<mt-spinner type="double-bounce"></mt-spinner>-->
		<img src="../../static/images/load/load_white_jb.gif" />
		<p>拼命加载中...</p>
	</div>
</template>

<script>
</script>

<style scoped>
	.aby-loading{
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		height: 100%;
		width: 100%;
		background-color: #FFFFFF;
		padding-top: 45%;
		padding-left: 0%;
		text-align: center;
		z-index: 4;
	}
	.aby-loading img{
		width: 20%;
	}
	.aby-loading p{
		margin-top: 10px;
	}
</style>