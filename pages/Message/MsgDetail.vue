<template>
	<aby-page>
		<aby-header title="详情" slot="header"></aby-header>
		<div class="mui-content" slot="content" v-if="data!=''">
			<div class="divtitle">
				{{data.msgTitle}}
			</div>
			<div class="divcontent">
				<p><label>消息类型</label>{{data.msgTypeName}}</p>
				<p><label>时间</label>{{data.publishTime|filterConvertDate}}</p>
				<p><label>详情</label>{{data.msgContent}}</p>
			</div>
		</div>
	
	</aby-page>
	
</template>

<script>
	export default {
		components: {},
		props: [],
		data() {
			return {
				data:this.$router.params.data||'',
			}
		},
		methods: {
		},
		mounted() {
		},
		watch: {
		}
	}
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