<template>
	<div>
		<nav class="mui-bar mui-bar-tab">
			<router-link v-for="(tabData,index) in tabDatas" :key="index" :class="tabData.isActive ? 'mui-tab-item mui-active' : 'mui-tab-item'" :to=tabData.toUrl @click.native="onTabBar(index)">
				<span :class="tabData.isActive ? tabData.icon : tabData.actIcon"><span class="mui-badge" v-if="tabData.badgeNum!==0">{{ tabData.badgeNum }}</span></span>
				<span class="mui-tab-label">{{ tabData.name }}</span>
			</router-link>
		</nav>
	</div>
</template>

<script>
	export default {
		computed: {
			// 订单
			orderNum(){
				return this.$store.state.orderNum;
			},
			// 消息中心消息
			messageNum() {
				return this.$store.state.messageNum;
			},
		},
		data() {
			return {
				tabDatas: [{
						name: "首页",
						isActive: true,
						icon: "mui-icon aby-icon-home-selected",
						actIcon: "mui-icon aby-icon-home",
						toUrl: "home",
						badgeNum: 0
					},
					{
						name: "询价",
						isActive: false,
						icon: "mui-icon aby-icon-purchase-selected",
						toUrl: "purchase",
						actIcon: "mui-icon aby-icon-purchase",
						badgeNum: 0
					},
					{
						name: "订单",
						isActive: false,
						icon: "mui-icon aby-icon-order-selected",
						toUrl: "order",
						actIcon: "mui-icon aby-icon-order",
						badgeNum: 0
					},
					{
						name: "消息",
						isActive: false,
						icon: "mui-icon aby-icon-msg-selected",
						toUrl: "message",
						actIcon: "mui-icon aby-icon-msg",
						badgeNum: 0
					},
					{
						name: "我的",
						isActive: false,
						icon: "mui-icon aby-icon-my-selected",
						toUrl: "my",
						actIcon: "mui-icon aby-icon-my",
						badgeNum: 0
					}
				]
			}
		},
		methods: {
			onTabBar(key) {
				this.tabDatas.forEach((value, index) => {
					this.tabDatas[index].isActive = index === key ? true : false;
				})
			},
			eventPageShow(urlName) {
				this.tabDatas.forEach((value, index) => {
					this.tabDatas[index].isActive = urlName === value.toUrl ? true : false;
				})
			},
		},
		mounted() {
		},
		watch: {
			messageNum(val) {
				this.tabDatas[3].badgeNum = val;
			},
			orderNum(val){
				this.tabDatas[2].badgeNum = val;
			},
			
		},
	}
</script>

<style scoped>
	.mui-icon {
		right: 0px!important;
	}
</style>