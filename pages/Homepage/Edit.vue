<template>
	<div class="editBox">
		<aby-header :title="title" slot="header">
			<aby-fonts slot="right" class="aby-mui-bar" @click.native="onFinish(htmlId)" className="mui-pull-right" title="完成"></aby-fonts>
		</aby-header>
		<div class="mui-content" slot="content">
			<div v-if="htmlId == 'cpRoute' || htmlId == 'cpBizScope'" class="aby-edit-choose">
				<div class="mui-input-group" id="checkBox"></div>
				<div @click="addLabel(title)" type="button" class="mui-btn-block btnBlue btnFixed" id="add">手动新增</div>
			</div>
			<div v-else class="">
				<textarea name="" v-model="textMsg"></textarea>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				title: this.$route.params.title,
				textMsg: this.$route.params.textMsg,
				htmlId: this.$route.params.htmlId,
				cpBtype: this.$route.params.cpBtype,
				value: [],
				valId: '',
				basicInfo: {}
			}
		},
		methods: {
			init() {
				if(this.htmlId == 'cpBizScope' || this.htmlId == 'cpRoute') {
					this.getRoute(this.textMsg, this.cpBtype);
				};
			},
			fCheckInto(val) {
				var reg = /^[\u0391-\uFFE5A-Za-z]+$/;
				if(reg.test(val)) {
					return true
				} else {
					return false
				}
			},
			isNull(data) {
				if(data && data != '' && data != 0) {
					return data;
				} else {
					return '未设置';
				}
			},
			fCheckTel(val) {
				var reg = /^0\d{2,3}-\d{7,8}(-\d{1,6})?$/;
				if(reg.test(val)) {
					return true
				} else {
					return false
				}
			},
			onFinish(htmlId) {
				this.basicInfo.files = [];
				this.basicInfo.cpId = this.$store.state.cpUserInfo.cpId;
				switch(htmlId) {
					case 'cpAddress'://地址
						this.basicInfo.cpAddress = this.textMsg;
						this.setBasicInfo();
						break;
					case 'cpHeadName'://联系人
						if(this.fCheckInto(this.textMsg)) {
							this.basicInfo.cpHeadName = this.textMsg;
							this.setBasicInfo();
						} else {
							this.$tool.toast("联系人只能输入中文或者英文！")
							return
						};
						break;
					case 'cpHeadPhone': //手机
						if(!this.isNull(this.textMsg)) {
							this.$tool.toast("数据不能为空！")
							return
						}
						this.basicInfo.cpHeadPhone = this.$abyApi.Crypto.EnCrypt(this.textMsg);
						this.setBasicInfo();
						break;
					case 'cpTel': //企业固定电话
						if(this.fCheckTel(this.textMsg)) {
							this.basicInfo.cpTel = this.$abyApi.Crypto.EnCrypt(this.textMsg);
							this.setBasicInfo();
						} else {
							this.$tool.toast("电话号码格式错误！")
							return
						};
						break;
					case 'cpIntro'://公司介绍
						this.basicInfo.cpIntro = this.textMsg;
						this.setBasicInfo();
						break;
					case 'cpBizScope': //业务范围
						this.basicInfo.cpBizScope = [];
						this.value = [];
						let allBox = document.getElementById('checkBox').getElementsByTagName('input');
						for(let i = 0; i < allBox.length; i++) {
							if(allBox[i].checked == true) {
								this.value.push(allBox[i].parentNode.getElementsByTagName('label')[0].innerHTML);
								this.basicInfo.cpBizScope.push(allBox[i].parentNode.getElementsByTagName('label')[0].innerHTML);
								this.valId = allBox[i].value;
							}
						}
						this.setBasicInfo();
						break;
					case 'cpRoute': //主营路线
						this.basicInfo.cpRoute = [];
						let allBoxRoute = document.getElementById('checkBox').getElementsByTagName('input');
						for(let i = 0; i < allBoxRoute.length; i++) {
							if(allBoxRoute[i].checked == true) {
								this.value.push(allBoxRoute[i].parentNode.getElementsByTagName('label')[0].innerHTML);
								this.basicInfo.cpRoute.push(allBoxRoute[i].parentNode.getElementsByTagName('label')[0].innerHTML);
								this.valId = allBoxRoute[i].value;
							}
						}
						this.setBasicInfo();
						break;
					case 'cpCorpName':
						this.basicInfo.cpCorpName = this.textMsg;
						this.setBasicInfo();
						break;
					default:
						if(this.isNull(this.textMsg)) {
							this.$tool.toast("数据不能为空！")
							return;
						}
						setBasicInfo();
						break;
				};

			},
			setBasicInfo() {
				this.$abyApi.User.setBasicInfo(this.basicInfo, (res) => {
					this.$tool.toast("提交成功");
					this.$router.back();
				}, (err) => {
					this.$tool.toast(err);
				})
			},
			getRoute(val, cpBtype) {
				let info = {
					cpBtype: cpBtype,
					tagType: 10
				};
				this.$abyApi.User.getBasicType(info, (res) => {
					let list = res.tagList;
					for(let i = 0; i < list.length; i++) {
						let checked = '';
						for(let x = 0; x < val.length; x++) {
							if(list[i] == val[x]) {
								checked = 'checked';
							}
						}
						document.getElementById('checkBox').innerHTML += '<div class="mui-input-row mui-checkbox"><label>' + list[i] + '</label><input name="checkbox1" value="' + i + '" type="checkbox" ' + checked + '></div>';
					}
				})
			},
			addLabel(title) {
				this.$tool.prompt({
					inputPlaceholder: '请输入要添加的属性'
				}, '添加' + title, (e) => {
					if(e.value != '') {
						let div = document.createElement('div');
						div.className = 'mui-input-row mui-checkbox';
						div.innerHTML = '<label>' + e.value + '</label><input name="checkbox1" value="' + e.value + '" type="checkbox" checked>';
						document.getElementById('checkBox').appendChild(div);
					}
				});
			}
		},
		mounted() {
			this.init();
		},
	}
</script>

<style scoped>
	.editBox{
		margin-top: 45px;
	}
	textarea {
		margin: 10px 5%;
		width: 90%;
		min-height: 200px;
		font-size: 14px;
		overflow: scroll;
	}
	
	.btnFixed {
		position: fixed;
		bottom: 0px;
		margin-bottom: 0px;
		text-align: center;
		line-height: 10px;
		border-radius: 0px;
	}
	
	.btnBlue {
		color: #FFFFFF;
		background-color: #08C7B5;
		border: none;
		height: 45px;
	}
	
	.mui-input-group {
		margin-bottom: 45px;
	}
	
</style>