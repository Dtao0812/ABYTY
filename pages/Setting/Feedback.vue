<template>
	<aby-page>
		<aby-header title="意见反馈" slot="header"></aby-header>
		<div class="mui-content" slot="content">
			<mt-field placeholder="请输入您遇到的问题和宝贵建议（500字以内）" v-model="adviceDesc" class="contact" type="textarea" rows="5"></mt-field>
			<div class="space"></div>
			<mt-field class="contact" placeholder="请输入您的联系方式（选填，便于我们联系您）" v-model="contactPhone" type="tel"></mt-field>
			<aby-button class="aby-button-blue" title="提交" @click.native="subFeed"></aby-button>
		</div>
	</aby-page>
</template>

<script>
	export default {
		data() {
			return {
				adviceDesc: '',
				contactPhone: '',
			}
		},
		methods: {
			// 提交
			subFeed(){
				if(this.adviceDesc == '')return this.$toast("请输入您的意见！");
				let reqInfo = {};
				reqInfo.adviceDesc = this.adviceDesc;
				reqInfo.contactPhone = this.contactPhone;
				this.$abyApi.Sys.setFeedContent(reqInfo,(res)=>{
					this.$toast("意见已反馈成功，我们会尽快回复！");
					setTimeout(()=>{
						this.$router.back();
					},1500);
				});
			}
		},
		mounted() {},
	}
</script>

<style scoped>
	.mui-content {
		padding: 10px;
	}
	
	.aby-button-blue {
		margin-top: 50px;
	}
</style>