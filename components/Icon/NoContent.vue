<template>
	<div class="nocontent">
		<img src="../../static/images/bg/bt_noContent.png"/>
		<p>小呱没有找到相关内容喔~</p>
	</div>
</template>

<script>
	export default {
		props: [],
		data() {
			return {
			}
		},
		methods: {
		},
		mounted() {
		},
		watch:{
		}
	}
</script>

<style scoped>
	.nocontent{
		text-align: center;
		padding: 20px 10px;
	}
	.nocontent img{
		width: 80px;
	}
	.nocontent p{
		padding-bottom: 0px;
		margin-bottom: 0px;
	}
</style>