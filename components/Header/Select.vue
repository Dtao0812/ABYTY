<template>
	<div class="headerSelect">
		<h1 class="mui-title" @click="isPopup=!isPopup">{{headerTitle}}<span class="mui-icon aby-icon-arrowdown"></span></h1>
		
		<mt-popup v-model="isPopup" position="top" popup-transition="popup-fade">
			<ul class="mui-table-view">
			    <li class="mui-table-view-cell" v-for="(li,i) in list" :key="i" :class="headerTitle==li.title?'li-active':''" @click="onSelectWhere(li)">{{li.title}}</li>
			</ul>
		</mt-popup>
	</div>

</template>

<script>
	export default {
		props: ['title','selectList'],
		data() {
			return {
				headerTitle:this.title||'',
				list:this.selectList||[],
				isPopup:false,
			}
		},
		methods: {
			// 条件选择
			onSelectWhere(selected){
				this.headerTitle = selected.title;
				this.isPopup = !this.isPopup;
				this.$emit("eventSelectBack",selected);
			}
		},
		mounted() {},
	}
</script>

<style scoped>
	.mui-title .aby-icon-arrowdown {
		font-size: 12px;
		margin-left: 5px!important;
		color: #707070;
	}
	
	.mui-popover {
		width: 100%;
		border-radius: 0px;
		left: 0px;
		top: 45px;
		min-height: 270px;
		background-color: #FFFFFF;
		-webkit-box-shadow: 0 8px 15px rgba(0, 0, 0, .1);
		box-shadow: 0 8px 15px rgba(0, 0, 0, .1);
	}
	
	.mui-popover .mui-table-view {
		border-radius: 0px;
		background-color: #FFFFFF;
		text-align: center;
	}
	
	.mui-table-view-cell:after {
		left: 0px;
	}
	
	.mui-bar-nav {
		z-index: 999;
	}
	.mui-table-view-cell {
	    padding: 0;
	    font-size: 15px;
	}
	.mint-popup {
	    width: 100%;
	    top: 40px;
	}
	.li-active{
		color: #08C7B5;
	}
</style>