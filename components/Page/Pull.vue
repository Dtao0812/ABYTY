<template>
	<div class="page" :class="page=='index'?'pt-45':''">
		<slot name="header"></slot>
		<slot name="navbar">
			<div style="padding-top: 45px;"></div>
		</slot>
		<slot name="btntop">
			<aby-icon type="top" class="aby-button-top" @click.native="goTop" v-show="btnTopShow"></aby-icon>
		</slot>
		<div class="mui-content">
			<div class="page-loadmore">
				<div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }" @scroll="paperScroll" id="wrapper">
					<slot name="explain"></slot>
					<slot name="loading">
						<div v-if="isLoading">
							<aby-loading></aby-loading>
						</div>
					</slot>
					<mt-loadmore ref="loadmore" :top-method="loadTop" :autoFill="loading" @translate-change="translateChange" @top-status-change="handleTopChange" :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded">
						<div id="loadDiv">
							<slot name="loadlist"></slot>
							<br style="clear:both" />
						</div>
					</mt-loadmore>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['title', 'page'],
		components: {},
		data() {
			return {
				pageId: '',
				list: [],
				isLoading: true,
				// 下拉
				topStatus: '',
				wrapperHeight: 0,
				translate: 0,
				moveTranslate: 0,
				loading: false,
				// 下拉
				allLoaded: false,
				bottomStatus: '',
				wrapperHeight: 0,

				noContent: false,
				scrollTop: 0,
				isDeactivated: false,
				//显示返回顶部按钮
				btnTopShow: false,
			};
		},

		methods: {
			handleBottomChange(status) {
				this.bottomStatus = status;
			},
			paperScroll() {
				let tpScrollTop = document.getElementById('wrapper').scrollTop;
				if(tpScrollTop > 200) {
					this.btnTopShow = true;
				} else {
					this.btnTopShow = false;
				}
				this.scrollTop = tpScrollTop;
				this.$parent.scroll(tpScrollTop);
				if(this.$parent.$refs.navbar) {
					this.$parent.$refs.navbar.scroll(tpScrollTop);
				}
			},
			handleTopChange(status) {
				this.moveTranslate = 1;
				this.topStatus = status;
			},
			translateChange(translate) {
				const translateNum = +translate;
				this.translate = translateNum.toFixed(2);
				this.moveTranslate = (1 + translateNum / 70).toFixed(2);
			},
			// 下拉
			loadTop() {
				setTimeout(() => {
					this.$parent.getPullDown((ret) => {
						if(ret == 0) this.noContent = true;
						this.$refs.loadmore.onTopLoaded();
					});
				}, 2500);
			},
			// 上推
			loadBottom() {
				setTimeout(() => {
					this.$parent.getPullUp((ret) => {
						if(ret.length == 0) {
							this.$tool.toast('没有更多内容了');
						}
						this.allLoaded = false;
						this.$refs.loadmore.onBottomLoaded();
					});
				}, 1500);
			},
			// 显示加载动画
			showLoading() {
				this.isLoading = true;
			},
			// 关闭加载动画
			closeLoading() {
				this.isLoading = false;
			},
			// 禁止上推
			disableLoadBottom() {
				setTimeout(() => {
					this.allLoaded = true;
				}, 1500)
			},
			//返回顶部
			goTop() {
				document.getElementById('wrapper').scrollTop = 0;
			},
		},
		mounted() {
			this.wrapperHeight = document.documentElement.clientHeight;
			document.getElementById('wrapper').scrollTop = 0;
			document.getElementById("loadDiv").style.minHeight = document.documentElement.clientHeight;
		},
		activated() {
			document.getElementById('wrapper').scrollTop = this.$parent.scrollTop;
		},
		deactivated() {},
	};
</script>

<style scoped>
	.line-button {
		height: 80px;
	}
</style>