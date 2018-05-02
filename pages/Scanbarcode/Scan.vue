<template>
	<div style="background-color: rgba(0,0,0,.8);margin: 0px;height: 100%;">
		<div id="bcid">
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			<p class="tip">...载入中...</p>
		</div>
		<footer>
			<div class="fbt" id="btnBack">取消</div>
		</footer>
	</div>
</template>

<script>
	export default {
		data() {
			return {}
		},
		methods: {
			
		},
		mounted() {},
	}
</script>

<style scoped>
	#bcid {
		width: 100%;
		position: absolute;
		top: 0px;
		bottom: 44px;
		text-align: center;
	}
	
	.tip {
		color: #FFFFFF;
		font-weight: bold;
		text-shadow: 0px -1px #103E5C;
	}
	
	footer {
		width: 100%;
		height: 44px;
		position: absolute;
		bottom: 0px;
		line-height: 44px;
		text-align: center;
		color: #FFF;
	}
	
	.fbt {
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0);
		float: left;
	}
	
	.fbtline {
		width: 2%;
		height: 100%;
		background-color: #000000;
		float: left;
		text-align: center;
	}
	
	.fbt:active {
		-webkit-box-shadow: inset 0 3px 5px rgba(0, 0, 0, 1);
		box-shadow: inset 0 3px 5px rgba(0, 0, 0, 1);
	}
</style>