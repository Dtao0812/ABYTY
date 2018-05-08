<template>
	<div class="mui-input-row mui-search aby-header-screen" :class="fixed?'aby-top-fixed':''">
		<div class="mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
			<!--公共的-->
			<span class="mui-control-item" v-for="(item,index) in tabs" :key="index">
				<span class="mui-control-item" @click="onWhereType(index)">
					{{item.title}} <aby-icon type="arrowdown"></aby-icon>
				</span>
				<mt-popup v-model="item.isPopup" position="top" popup-transition="popup-fade" :ref="'a'+index">
					<ul class="mui-table-view">
						<li class="mui-table-view-cell" v-for="(li,i) in item.list" :key="i" @click="onSelectWhere(li,index,item.tabid)" :class="item.title===li.text?'li-active':''">{{li.text}}</li>
					</ul>
				</mt-popup>
			</span>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['fixed', 'type', 'noSearch'],
		data() {
			return {
				tabs: [{
					tabid: 1,
					title: '综合排序',
					isPopup: false,
					list: [{
						text: '综合排序',
						value: 1
					}, {
						text: '价格从高到低',
						value: 2
					}, {
						text: '价格从低到高',
						value: 3
					}, {
						text: '人气从高到低',
						value: 4
					}]
				}, ],
				popupVisible: false,
			}
		},
		methods: {
			// 选择条件监听
			onSelectWhere(selected, key, id) {
				this.tabs[key].title = selected.text;
				this.tabs[key].isPopup = false;
				selected.tabid = id;
				this.$emit("eventScreen", selected);
			},
			// 条件类型点击监听
			onWhereType(key) {
				this.tabs[key].isPopup = !this.tabs[key].isPopup;
				if(this.fixed || this.noSearch) {
					this.$refs.a0[key].$el.classList.add("mint-popup-top-2");
				} else {
					this.$refs.a0[key].$el.classList.remove("mint-popup-top-2");
				}
				console.log(this.tabs[key].isPopup)
			}
		},
		mounted() {
			switch(parseInt(this.type)) {
				case 10:
					break;
				case 20:
					// 供应商
					this.tabs = this.tabs.concat({
						tabid: 2,
						title: '星级',
						isPopup: false,
						list: []
					}, {
						title: '品牌',
						isPopup: false,
						list: []
					});
					break;
				case 30:
					// 酒店
					this.$abyApi.Sys.getDict('hStarlevel', '', (res) => {
						let dlist = []
						for(let i = 0, len = res.dicList.length; i < len; i++) {
							let info = {};
							info.text = res.dicList[i].dicName;
							info.value = res.dicList[i].dicValue;
							dlist.push(info);
						}
						this.tabs = this.tabs.concat({
							tabid: 2,
							title: '星级',
							isPopup: false,
							list: dlist
						});
					});
					this.$abyApi.Sys.getDict('hBrand', '', (res) => {
						let dlist = []
						for(let i = 0, len = res.dicList.length; i < len; i++) {
							let info = {};
							info.text = res.dicList[i].dicName;
							info.value = res.dicList[i].dicValue;
							dlist.push(info);
						}
						this.tabs = this.tabs.concat({
							tabid: 3,
							title: '品牌',
							isPopup: false,
							list: dlist
						});
					});
					break;
				case 40:
					// 景点
					this.$abyApi.Sys.getDict('sStarlevel', '', (res) => {
						let dlist = []
						for(let i = 0, len = res.dicList.length; i < len; i++) {
							let info = {};
							info.text = res.dicList[i].dicName;
							info.value = res.dicList[i].dicValue;
							dlist.push(info);
						}
						this.tabs = this.tabs.concat({
							tabid: 4,
							title: '景区级别',
							isPopup: false,
							list: dlist
						});
					})
					break;
				case 99:
					// 导游
					break;
			}
		},
		watch: {
			fixed(val) {
				this.isFixed = val;
			}
		}
	}
</script>

<style scoped>
	.mui-slider-indicator {
		background-color: #FFFFFF;
		border-bottom: 1px solid #F0F0F0;
		font-size: 14px;
	}
	
	.mint-popup-top {
		top: 120px;
	}
	
	.mint-popup-top-2 {
		top: 80px
	}
	
	.mint-popup {
		width: 100%;
	}
	
	.li-active {
		color: #08C7B5;
	}
	
	.mui-slider-indicator .mui-icon {
		font-size: 10px;
		border: none;
		width: 12px;
	}
</style>