<template>
	<div>
		<div class="divSure">
			<span class="btnSure" @click="onConfirm">确定</span>
		</div>
		<picker :slots="list" @change="onValuesChange" value-key="text">	
		</picker>
	</div>
</template>

<script>
	import { Picker } from 'mint-ui'
	
	export default {
		components: {
			Picker
		},
		props: ['list','id'],
		data() {
			return {
				selected:''
			}
		},
		methods: {
			onValuesChange(picker, values) {
				this.selected = values[0];
			},
			onConfirm(){
				let backInfo = {};
				backInfo.id = this.id;
				backInfo.selected = this.selected;
				this.$emit('onConfirm',backInfo);
			}
		},
		mounted() {
		},
		watch: {
			list(val){
				if(val.length>0){
					this.selected = val[0].values[0];
				}
			}
		}
	}
</script>

<style scoped>
	.divSure{
		border-bottom: 1px solid #F0F0F0;
		position: relative;
		height: 45px;
	}
	.btnSure{
		position: absolute;
		right: 10px;
		top: 10px;
		background-color: #08C7B5;
		padding: 3px 10px;
		border-radius: 4px;
		color: #FFFFFF;
		font-size: 12px;
	}
</style>