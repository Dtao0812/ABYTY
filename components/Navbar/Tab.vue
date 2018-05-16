<template>
	<div id="">
		<mt-navbar class="mint-navbar" :class="pageType==='order'?'mui-bar mui-bar-nav':''" v-model="selected">
			<mt-tab-item class="mint-tab-item" v-for="(li,i) in tabList" :key="i" :id="i" @click.native="onTabTitle(li)">{{li.title}}</mt-tab-item>
		</mt-navbar>

		<mt-tab-container v-model="selected">
			<mt-tab-container-item v-for="(li,i) in tabList" :key="i" :id="i">
				<slot :name="li.id"></slot>
				{{li.isHide}}
			</mt-tab-container-item>
		</mt-tab-container>

	</div>
</template>

<script>
	export default {
		components: {},
		props: ['list', 'datas', 'page','actSelect'],
		data() {
			return {
				tabList: this.list,
				selected: parseInt(this.actSelect)||0,
				pageType: this.page
			}
		},
		methods: {
			// 选项卡头部点击
			onTabTitle(e) {
				this.$emit("eventTabBack", e);
			}
		},
		mounted() {
		},
		watch:{
			actSelect(val){
				this.selected = val;
			},
			list(val){
				this.tabList = val;
			}
		}
	}
</script>

<style scoped>
	.mint-navbar {
		background-color: #fff;
		display: flex;
		text-align: center;
	}
	
	.mint-navbar .mint-tab-item.is-selected {
		border-bottom: 1px solid #08C7B5;
		color: #08C7B5;
		margin-bottom: 1px;
	}
	
	.mint-navbar .mint-tab-item {
		padding: 10px 0;
		font-size: 14px;
	}
	
	.mint-tab-item {
		display: block;
		-webkit-box-flex: 1;
		-ms-flex: 1;
		flex: 1;
		text-decoration: none;
	}
</style>