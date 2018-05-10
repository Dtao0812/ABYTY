<template>
	<mt-datetime-picker ref="picker" type="date" v-model="pickerValue" :start-date="startDate" :end-date="endDate" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" @confirm="handleConfirm">
	</mt-datetime-picker>
</template>

<script>
	export default {
		data() {
			return {
				pickerValue: '',
				modelId: '',
				startDate:new Date(new Date().getTime()+24*60*60*1000),
				endDate:new Date(new Date().getFullYear() + 1, 11, 31)
			};
		},
		methods: {
			openPicker(modelId) {
				this.$refs.picker.open();
				this.modelId = modelId;
			},
			handleConfirm() {
				let val = this.pickerValue;
				if(!val)val = new Date(new Date().getTime()+24*60*60*1000);
				val = this.$tool.abyDateFun.getFormatDate(val);
				let list = this.modelId.split('.');
				if(list.length == 1) {
					this.$parent[this.modelId] = val;
					this.$parent.$parent[this.modelId] = this.pickerValue;
				} else if(list.length == 2) {
					if(this.$parent[list[0]]) this.$parent[list[0]][list[1]] = val;
					if(this.$parent.$parent[list[0]]) this.$parent.$parent[list[0]][list[1]] = val;
				} else if(list.length == 3) {
					if(this.$parent[list[0]]) this.$parent[list[0]][list[1]][list[2]] = val;
					if(this.$parent.$parent[list[0]]) this.$parent.$parent[list[0]][list[1]][list[2]] = val;
				}
			}
		},
		mounted() {
		},

	};
</script>

<style scoped>
	.page-datetime-wrapper {
		padding: 0 20px;
		top: 50%;
		position: absolute;
		width: 100%;
		-webkit-transform: translateY(-50%);
		transform: translateY(-50%);
	}
	
	.page-datetime-wrapper button:not(last-child) {
		margin-bottom: 20px;
	}
</style>