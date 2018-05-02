<template>
	<aby-page class="aby-bg-white">
		<aby-header title="认证" slot="header"></aby-header>
		<div slot="content" class="mui-content aby-bg-white">
			<h5 class="marginSmall"></h5>
			<button id='showTypePicker' class="mui-btn mui-btn-block showPicker mui-navigate-right" type='button' @click="popupVisible=!popupVisible">{{selectTitle}}</button>
			<mt-popup v-model="popupVisible" position="bottom">
				<aby-picker @onConfirm="onSelectPicker" :list="cpBtypeList"></aby-picker>
			</mt-popup>

			<div class="row-button">
				<aby-button title="下一步" @click.native="toNext" class="aby-input-button-blue"></aby-button>
			</div>
			<div class="notes">
				<p class="fontNameTitle">企业类型说明：</p>
				<p>组团社(门店)：<span>收客旅行社。</span></p>
				<p>地接社：<span>具备合法的旅行社接待、服务资质（包含专线、代理商、批发商）。</span></p>
				<p>机票：<span>可提供机票预订服务的机构。</span></p>
				<p>酒店：<span>星级酒店、快捷酒店、宾馆、民宿等可提供酒店预订服务的机构。</span></p>
				<p>门票：<span>景区直销、门票代理和可提供景点门票预订服务的机构。</span></p>
				<p class="grey">如果您有多个业务身份，可以使用不同手机号码分别注册不同业务身份;</p>
			</div>
		</div>
	</aby-page>
</template>

<script>
	export default {
		data() {
			return {
				popupVisible: false,
				cpBtype: '',
				cpBtypeName: '',
				selectTitle: '请选择要注册的企业类型',
				cpBtypeList: []
			}
		},
		methods: {
			onSelectPicker(e) {
				this.selectTitle = this.cpBtypeName = e.selected.text;
				this.cpBtype = e.selected.value;
				this.popupVisible = false;
			},
			toNext() {
				if(this.cpBtype === '') return this.$tool.toast('请选择企业类型');
				this.$tool.confirm('您确认有' + this.cpBtypeName + '经营范围吗?', (res) => {
					this.$router.push({
						name: 'registerThree',
						params: {
							cpBtype: this.cpBtype
						}
					});
				})
			},
		},
		mounted() {
			this.$abyApi.Sys.getDict('cpBtype', '', (res) => {
				let dlist = []
				for(let i=0,len=res.dicList.length;i<len;i++){
					let info = {};
					info.text = res.dicList[i].dicName;
					info.value = res.dicList[i].dicValue;
					dlist.push(info);
				}
				let slots = [{
					flex: 1,
					values: dlist,
					className: 'slot1',
					textAlign: 'center'
				}];
				this.cpBtypeList = slots;
			})
		},
	}
</script>

<style scoped>
	.mui-content {
		padding: 10px 15px;
	}
	/*下拉菜单右侧向下*/
	
	.showPicker {
		border: 1px solid #08C7B5;
		border-radius: 20px;
		height: 40px;
		line-height: 10px;
		font-size: 16px;
	}
	
	.mui-navigate-right:after,
	.mui-push-right:after {
		right: 15px;
		content: '\e581';
	}
	/*注释*/
	
	.notes {
		margin-top: 10px;
		margin-bottom: 10px;
		padding: 5px;
	}
	
	.notes p {
		color: #232323;
		font-size: 13px;
		margin: 5px 0px;
	}
	
	.notes span {
		color: #999999;
	}
	
	.notes .grey {
		font-size: 13px;
		margin-top: 20px;
	}
</style>