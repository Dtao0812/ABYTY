<template>
	<aby-page>
		<aby-header title="发布询价" slot="header">
		</aby-header>
		<div class="mui-content" slot="content">
			<mt-popup v-model="popupVisible" position="bottom">
				<aby-picker @onConfirm="onSelectPicker" id="selectType" :list="typeList"></aby-picker>
			</mt-popup>
			<mt-popup v-model="popupTrafficType" position="bottom">
				<aby-picker @onConfirm="onSelectPicker" id="trafficType" :list="trafficTypeList"></aby-picker>
			</mt-popup>
			<mt-popup v-model="popupHStarlevel" position="bottom">
				<aby-picker @onConfirm="onSelectPicker" id="hStarlevel" :list="HStarlevelList"></aby-picker>
			</mt-popup>
			<mt-popup v-model="popupTicketType" position="bottom">
				<aby-picker @onConfirm="onSelectPicker" id="ticketType" :list="ticketTypeList"></aby-picker>
			</mt-popup>
			<mt-popup v-model="popupPbBranched" position="bottom">
				<aby-picker @onConfirm="onSelectPicker" id="pbBranched" :list="pbBranchedList"></aby-picker>
			</mt-popup>
			<mt-popup v-model="popupPbLanguges" position="bottom">
				<aby-picker @onConfirm="onSelectPicker" id="pbLanguges" :list="pbLangugesList"></aby-picker>
			</mt-popup>
			<mt-popup v-model="popupSex" position="bottom">
				<aby-picker @onConfirm="onSelectPicker" id="sex" :list="sexList"></aby-picker>
			</mt-popup>
			<aby-date-picker ref="datePicker"></aby-date-picker>
			<ul class="mui-table-view">
				<li class="mui-table-view-cell">
					<aby-field @click.native="popupVisible=!popupVisible" modelId="publishInfo.selectTypeName" :modelVal="publishInfo.selectTypeName" placeholder="请选择采购类型" className="aby-input-default" type="text" disabled="disabled">
						<label class="inLabel" slot="label">采购类型</label>
						<span slot="allowRight"><i class="mint-cell-allow-right"></i></span>
					</aby-field>
				</li>
			</ul>
			<div class="space"></div>
			<!--线路、机票、机+酒-->
			<ul class="mui-table-view" v-if="publishInfo.selectType==10||publishInfo.selectType==30||publishInfo.selectType==40">
				<li class="mui-table-view-cell">
					<aby-field modelId="publishInfo.fromCity" className="aby-input-default" placeholder="请输入出发地" type="text">
						<label class="inLabel" slot="label">出发地</label>
					</aby-field>
				</li>
				<li class="mui-table-view-cell">
					<aby-field modelId="publishInfo.goCity" className="aby-input-default" placeholder="请输入目的地" type="text">
						<label class="inLabel" slot="label">目的地</label>
					</aby-field>
				</li>
			</ul>

			<!--酒店-->
			<div class="space"></div>
			<ul class="mui-table-view" v-if="publishInfo.selectType==20">
				<li class="mui-table-view-cell">
					<aby-field modelId="publishInfo.hotelAddress" className="aby-input-default" placeholder="请输入酒店地点" type="text">
						<label class="inLabel" slot="label">酒店地点</label>
					</aby-field>
				</li>
			</ul>

			<!--景点-->
			<div class="space"></div>
			<ul class="mui-table-view" v-if="publishInfo.selectType==50">
				<li class="mui-table-view-cell">
					<aby-field modelId="publishInfo.scenicName" className="aby-input-default" placeholder="请输入景点名称" type="text">
						<label class="inLabel" slot="label">景点名称</label>
					</aby-field>
				</li>
			</ul>
			<!--导游-->
			<div v-if="publishInfo.selectType==60">
				<ul class="mui-table-view">
					<li class="mui-table-view-cell">
						<aby-field modelId="publishInfo.pbTitle" className="aby-input-default" placeholder="请输入采购标题" type="text">
							<label class="inLabel" slot="label">采购标题</label>
						</aby-field>
					</li>
				</ul>
				<ul class="mui-table-view space">
					<li class="mui-table-view-cell">
						<aby-field modelId="publishInfo.pbRoadLine" className="aby-input-default" placeholder="请输入目的地" type="text">
							<label class="inLabel" slot="label">目的地</label>
						</aby-field>
					</li>
					<li class="mui-table-view-cell">
						<aby-field modelId="publishInfo.pbAddress" className="aby-input-default" placeholder="请输入接团地" type="text">
							<label class="inLabel" slot="label">接团地</label>
						</aby-field>
					</li>
				</ul>
			</div>
			<div class="space"></div>
			<!--线路、导游-->
			<ul class="mui-table-view space" v-if="publishInfo.selectType==10||publishInfo.selectType==60">
				<li class="mui-table-view-cell">
					<aby-field className="aby-input-default" @click.native="onSelectDatePicker('publishInfo.fromTime')" :modelVal="publishInfo.fromTime" modelId="publishInfo.fromTime" placeholder="请选择出行时间" type="text" disabled="disabled">
						<label class="inLabel" slot="label">出行时间</label>
						<span slot="allowRight"><i class="mint-cell-allow-right"></i></span>
					</aby-field>
				</li>
				<li class="mui-table-view-cell">
					<aby-field className="aby-input-default" modelId="publishInfo.selectDays" placeholder="请输入出行天数" type="number">
						<label class="inLabel" slot="label">天数</label>
					</aby-field>
				</li>
			</ul>
			<!--机票、机+酒-->
			<div class="space"></div>
			<ul class="mui-table-view" v-if="publishInfo.selectType==30||publishInfo.selectType==40">
				<li class="mui-table-view-cell">
					<aby-field @click.native="popupTicketType=!popupTicketType" modelId="publishInfo.ticketType" :modelVal="publishInfo.ticketType" className="aby-input-default" placeholder="请选择航程类型" type="text" disabled="disabled">
						<label class="inLabel" slot="label">航程类型</label>
						<span slot="allowRight"><i class="mint-cell-allow-right"></i></span>
					</aby-field>
				</li>
				<li class="mui-table-view-cell">
					<aby-field @click.native="onSelectDatePicker('publishInfo.fromTime')" :modelVal="publishInfo.fromTime" modelId="publishInfo.fromTime" className="aby-input-default" placeholder="请选择出发时间" type="text" disabled="disabled">
						<label class="inLabel" slot="label">出发时间</label>
						<span slot="allowRight"><i class="mint-cell-allow-right"></i></span>
					</aby-field>
				</li>
				<li class="mui-table-view-cell" v-if="publishInfo.ticketType == '往返'">
					<aby-field @click.native="onSelectDatePicker('publishInfo.backTime')" :modelVal="publishInfo.backTime" modelId="publishInfo.backTime" className="aby-input-default" placeholder="请选择返程时间" type="text" disabled="disabled">
						<label class="inLabel" slot="label">返程时间</label>
						<span slot="allowRight"><i class="mint-cell-allow-right"></i></span>
					</aby-field>
				</li>
			</ul>
			<div class="space"></div>
			<!--酒店-->
			<div v-if="publishInfo.selectType==20||publishInfo.selectType==40">
				<ul class="mui-table-view">
					<li class="mui-table-view-cell">
						<aby-field @click.native="onSelectDatePicker('publishInfo.liveTime')" :modelVal="publishInfo.liveTime" modelId="publishInfo.liveTime" className="aby-input-default" placeholder="请选择入住时间" type="text" disabled="disabled">
							<label class="inLabel" slot="label">入住时间</label>
							<span slot="allowRight"><i class="mint-cell-allow-right"></i></span>
						</aby-field>
					</li>
					<li class="mui-table-view-cell">
						<aby-field @click.native="onSelectDatePicker('publishInfo.leaveTime')" :modelVal="publishInfo.leaveTime" modelId="publishInfo.leaveTime" className="aby-input-default" placeholder="请输入离店时间" type="text" disabled="disabled">
							<label class="inLabel" slot="label">离店时间</label>
							<span slot="allowRight"><i class="mint-cell-allow-right"></i></span>
						</aby-field>
					</li>
				</ul>
				<div class="mui-input-group">
					<div class="mui-input-row aby-input-row space">
						<label>房间数</label>
						<div class="mui-numbox" data-numbox-step='1' data-numbox-min='0'>
							<button class="mui-btn mui-numbox-btn-minus" type="button" @click="onRedNum(3)">-</button>
							<input class="mui-numbox-input" type="number" v-model="publishInfo.roomNum" />
							<button class="mui-btn mui-numbox-btn-plus" type="button" @click="onAddNum(3)">+</button>
						</div>
					</div>
				</div>
			</div>
			<div class="space"></div>
			<!--景点-->
			<ul class="mui-table-view" v-if="publishInfo.selectType==50">
				<li class="mui-table-view-cell">
					<aby-field @click.native="onSelectDatePicker('publishInfo.playScenicTime')" :modelVal="publishInfo.playScenicTime" modelId="publishInfo.playScenicTime" className="aby-input-default" placeholder="请选择游玩时间" type="text" disabled="disabled">
						<label class="inLabel" slot="label">游玩时间</label>
						<span slot="allowRight"><i class="mint-cell-allow-right"></i></span>
					</aby-field>
				</li>
			</ul>
			<div class="space"></div>
			<!--酒店-->
			<ul class="mui-table-view" v-if="publishInfo.selectType==20">
				<li class="mui-table-view-cell">
					<aby-field modelId="publishInfo.hotelStar" :modelVal="publishInfo.hotelStar" @click.native="popupHStarlevel=!popupHStarlevel" className="aby-input-default" placeholder="请选择酒店标准" type="text" disabled="disabled">
						<label class="inLabel" slot="label">酒店标准</label>
						<span slot="allowRight"><i class="mint-cell-allow-right"></i></span>
					</aby-field>
				</li>
			</ul>
			<div class="space"></div>
			<!--线路、机票、景点、机+酒-->
			<div class="mui-input-group" v-if="publishInfo.selectType!=20&&publishInfo.selectType!=60">
				<div class="mui-input-row aby-input-row">
					<label>成人</label>
					<div class="mui-numbox" data-numbox-step='1' data-numbox-min='0'>
						<button class="mui-btn mui-numbox-btn-minus" type="button" @click="onRedNum(1)">-</button>
						<input class="mui-numbox-input" type="number" v-model="publishInfo.peopleNum" />
						<button class="mui-btn mui-numbox-btn-plus" type="button" @click="onAddNum(1)">+</button>
					</div>
				</div>
				<div class="mui-input-row aby-input-row">
					<label>儿童</label>
					<div class="mui-numbox" data-numbox-step='1' data-numbox-min='0'>
						<button class="mui-btn mui-numbox-btn-minus" type="button" @click="onRedNum(2)">-</button>
						<input class="mui-numbox-input" type="number" v-model="publishInfo.childNum" />
						<button class="mui-btn mui-numbox-btn-plus" type="button" @click="onAddNum(2)">+</button>
					</div>
				</div>
			</div>
			<div class="space"></div>
			<!--线路-->
			<ul class="mui-table-view" v-if="publishInfo.selectType==10">
				<li class="mui-table-view-cell">
					<aby-field className="aby-input-default" @click.native="popupTrafficType=!popupTrafficType" modelId="publishInfo.trafficTypeName" :modelVal="publishInfo.trafficTypeName" placeholder="请选择交通方式" type="text" disabled="disabled">
						<label class="inLabel" slot="label">交通方式</label>
						<span slot="allowRight"><i class="mint-cell-allow-right"></i></span>
					</aby-field>
				</li>
			</ul>
			<div class="space"></div>
			<!--导游-->
			<div v-if="publishInfo.selectType==60">
				<ul class="mui-table-view space">
					<li class="mui-table-view-cell">
						<aby-field className="aby-input-default" placeholder="请填写导服费（元/天）" type="text">
							<label class="inLabel" slot="label">导服费</label>
						</aby-field>
					</li>
					<li class="mui-table-view-cell">
						<aby-field className="aby-input-default" placeholder="请填写定金（元）" type="text">
							<label class="inLabel" slot="label">订金</label>
						</aby-field>
					</li>
				</ul>
				<ul class="mui-table-view space">
					<li class="mui-table-view-cell">
						<aby-field @click.native="popupSex=!popupSex" modelId="publishInfo.pbSex" :modelVal="publishInfo.pbSex" className="aby-input-default" placeholder="不限" type="text" disabled="disabled">
							<label class="inLabel" slot="label">性别</label>
							<span slot="allowRight"><i class="mint-cell-allow-right"></i></span>
						</aby-field>
					</li>
					<li class="mui-table-view-cell">
						<aby-field @click.native="popupPbLanguges=!popupPbLanguges" modelId="publishInfo.pbLanguges" :modelVal="publishInfo.pbLanguges" className="aby-input-default" placeholder="请选择精通语言" type="text" disabled="disabled">
							<label class="inLabel" slot="label">精通语言</label>
							<span slot="allowRight"><i class="mint-cell-allow-right"></i></span>
						</aby-field>
					</li>
					<li class="mui-table-view-cell">
						<aby-field modelId="publishInfo.pbYears" className="aby-input-default" placeholder="请填写从业年限（年）" type="number">
							<label class="inLabel" slot="label">从业年限</label>
						</aby-field>
						<aby-field @click.native="popupPbBranched=!popupPbBranched" modelId="publishInfo.pbBranched" :modelVal="publishInfo.pbBranched" className="aby-input-default" placeholder="请选择业务范围" type="text" disabled="disabled">
							<label class="inLabel" slot="label">业务范围</label>
							<span slot="allowRight"><i class="mint-cell-allow-right"></i></span>
						</aby-field>
					</li>
				</ul>
			</div>
			<div class="space"></div>
			<ul class="mui-table-view">
				<li class="mui-table-view-cell liRefundRemark">
					<aby-field modelId="refundDesc" className="aby-input-area" placeholder="例：需要大巴接送、需要导游等" type="textarea" rows="5">
						<label class="areaLabel" slot="label">备注</label>
						<i slot="allowRight"></i>
					</aby-field>
				</li>
			</ul>
			<!--自动加载默认联系人-->
			<div class="space"></div>
			<ul class="mui-table-view">
				<li class="mui-table-view-cell">
					<aby-field modelId="publishInfo.contactPhone" :modelVal="publishInfo.contactPhone" className="aby-input-default" placeholder="请输入联系电话" type="tel">
						<label class="inLabel" slot="label">联系电话</label>
					</aby-field>
				</li>
			</ul>
			<div class="space"></div>
		</div>
		<aby-button slot="footer" title="发布" class="aby-button-fixed" @click.native="onSelect"></aby-button>
	</aby-page>

</template>

<script>
	export default {
		data() {
			return {
				popupVisible: false,
				typeList: [], //采购类型
				popupTrafficType: false,
				trafficTypeList: [], // 出行方式列表
				popupHStarlevel: false,
				HStarlevelList: [], // 酒店标准列表
				popupTicketType: false,
				ticketTypeList: [], // 航班类型列表
				popupPbBranched: false,
				pbBranchedList: [], // 业务范围列表
				popupPbLanguges: false,
				pbLangugesList: [], // 语言列表
				popupSex: false,
				sexList: [], // 性別列表
				publishInfo: {
					title: '', // 标题
					selectType: 10, // 采购类型数值
					selectTypeName: '线路', // 采购类型名称

					fromCity: '', // 出发地
					goCity: '', // 目的地
					selectDays: '', //行程天数
					fromTime: '', // 出发时间
					backTime: '', // 
					trafficType: '', // 出行方式
					trafficTypeName: '', // 出行方式
					peopleNum: 0, // 成人数量
					childNum: 0, // 儿童数量

					isShowPhone: 0, // 是否显示电话
					contactName: this.$store.state.userName, // 联系人
					contactPhone: this.$store.state.userPhone, // 联系人电话
					pDesc: '', // 附加说明

					ticketType: '', // 机票航程类型 

					hotelAddress: '', // 酒店地址
					liveTime: '', // 入住时间
					leaveTime: '', // 离店时间
					roomNum: 0, // 房间数
					hotelStar: '', // 酒店标准

					scenicName: '', // 景点名称
					playScenicTime: '', // 游玩时间

					pbTitle: '', // 导游招募标题
					pbRoadLine: '', // 目的地
					pbAddress: '', // 接团地点
					pbDateTime: '', // 日期
					pbDayFee: '', // 导服费
					pbDepositFee: '', // 定金
					pbBranched: '', // 业务范围
					pbYears: '', // 从业年数
					pbSex: '', // 性别
					pbLanguges: '', // 语言
				},
			}
		},
		computed: {
			backTime() {
				return this.publishInfo.backTime;
			},
			leaveTime() {
				return this.publishInfo.leaveTime;
			},
		},
		methods: {
			onSelectPicker(e) {
				if(e.id == 'selectType') {
					// 选择采购类型
					this.publishInfo.selectType = e.selected.value;
					this.publishInfo.selectTypeName = e.selected.text;
					this.popupVisible = false;
					this.publishInfo.fromTime = '';
					this.publishInfo.backTime = '';
					if(e.selected.value == 10) {
						// 获得交通方式
						this.$abyApi.Sys.getDict('trafficType', '', (res) => {
							let dlist = []
							for(let i = 0, len = res.dicList.length; i < len; i++) {
								if(i == 0) {
									this.publishInfo.trafficType = res.dicList[i].dicValue;
									this.publishInfo.trafficTypeName = res.dicList[i].dicName;
								}
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
							this.trafficTypeList = slots;
						});
					} else if(e.selected.value == 20) {
						// 获得酒店标准
						this.$abyApi.Sys.getDict('hStarlevel', '', (res) => {
							let dlist = []
							for(let i = 0, len = res.dicList.length; i < len; i++) {
								if(i == 0) this.publishInfo.hotelStar = res.dicList[i].dicName;
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
							this.HStarlevelList = slots;
						});
					} else if(e.selected.value == 30 || e.selected.value == 40) {
						// 获得航班类型
						this.$abyApi.Sys.getDict('ticketType', '', (res) => {
							let dlist = []
							for(let i = 0, len = res.dicList.length; i < len; i++) {
								if(i == 0) {
									this.publishInfo.ticketType = res.dicList[i].dicName;
									this.publishInfo.ticketTypeName = res.dicList[i].dicValue;
								}
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
							this.ticketTypeList = slots;
						});
					} else if(e.selected.value == 60) {
						// 获得业务范围
						this.$abyApi.Sys.getDict('vsBranched', '', (res) => {
							let dlist = []
							for(let i = 0, len = res.dicList.length; i < len; i++) {
								if(i == 0) this.publishInfo.pbBranched = res.dicList[i].dicName;
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
							this.pbBranchedList = slots;
						});
						// 获得语言
						this.$abyApi.Sys.getDict('vsLanguges', '', (res) => {
							let dlist = []
							for(let i = 0, len = res.dicList.length; i < len; i++) {
								if(i == 0) this.publishInfo.pbLanguges = res.dicList[i].dicName;
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
							this.pbLangugesList = slots;
						});
						// 性别
						let dlist2 = [{
							text: '不限',
							value: 2
						}, {
							text: '男',
							value: 1
						}, {
							text: '女',
							value: 0
						}];
						let slots2 = [{
							flex: 1,
							values: dlist2,
							className: 'slot1',
							textAlign: 'center'
						}];
						this.publishInfo.pbSex = '不限';
						this.sexList = slots2;
					}
				} else if(e.id == 'trafficType') {
					// 选择交通方式
					this.publishInfo.trafficType = e.selected.text;
					this.popupTrafficType = false;
				} else if(e.id == 'hStarlevel') {
					// 选择酒店标准
					this.publishInfo.hotelStar = e.selected.text;
					this.popupHStarlevel = false;
				} else if(e.id == 'ticketType') {
					// 选择航班类型
					this.publishInfo.ticketType = e.selected.text;
					this.popupTicketType = false;
				} else if(e.id == 'pbBranched') {
					// 选择业务范围
					this.publishInfo.pbBranched = e.selected.text;
					this.popupPbBranched = false;
				} else if(e.id == 'sex') {
					// 选择性别
					this.publishInfo.pbSex = e.selected.text;
					this.popupSex = false;
				} else if(e.id == 'pbLanguges') {
					// 选择语言
					this.publishInfo.pbLanguges = e.selected.text;
					this.popupPbLanguges = false;
				}
			},
			// 选择时间
			onSelectDatePicker(modelId) {
				this.$refs.datePicker.openPicker(modelId);
			},
			// 发布采购
			onSelect() {
				let reqInfo = {};
				if(!this.$tool.formValidation.phoneVerfication(this.publishInfo.contactPhone)) return this.$toast("请填写正确的手机号");
				reqInfo.selectType = this.publishInfo.selectType;
				reqInfo.contactPhone = this.publishInfo.contactPhone;
				reqInfo.selectDesc = this.publishInfo.pDesc;
				if(this.publishInfo.contactPhone == '') return this.$toast("请输入联系电话");
				if(this.publishInfo.selectType == 10) {
					// 发布线路询价
					if(this.publishInfo.fromCity == '') return this.$toast("出发地不能为空");
					if(this.publishInfo.goCity == '') return this.$toast("目的地不能为空");
					if(this.publishInfo.fromTime == '') return this.$toast("请选择出发时间");
					if(this.publishInfo.selectDays == '') return this.$toast("请输入行程天数");
					if(this.publishInfo.selectDays <= 0) return this.$toast("行程天数不能小于0");
					if(this.publishInfo.peopleNum == '') return this.$toast("请输入成人数量");
					reqInfo.fromCity = this.publishInfo.fromCity;
					reqInfo.goCity = this.publishInfo.goCity;
					reqInfo.fromTime = this.publishInfo.fromTime;
					reqInfo.selectDays = this.publishInfo.selectDays;
					reqInfo.peopleNum = this.publishInfo.peopleNum;
					reqInfo.childNum = this.publishInfo.childNum;
					reqInfo.trafficType = this.publishInfo.trafficType;

				} else if(this.publishInfo.selectType == 20) {
					// 发布酒店询价
					if(this.publishInfo.hotelAddress == '') return this.$toast("请输入酒店地址");
					if(this.publishInfo.liveTime == '') return this.$toast("请选择入住时间");
					if(this.publishInfo.leaveTime == '') return this.$toast("请选择离店时间");
					if(this.publishInfo.roomNum == 0) return this.$toast("请输入预定房间数");
					reqInfo.hotelAddress = this.publishInfo.hotelAddress;
					reqInfo.liveTime = this.publishInfo.liveTime;
					reqInfo.leaveTime = this.publishInfo.leaveTime;
					reqInfo.roomNum = this.publishInfo.roomNum;
					reqInfo.hotelStar = this.publishInfo.hotelStar;

				} else if(this.publishInfo.selectType == 30) {
					// 发布机票询价
					if(this.publishInfo.fromCity == '') return this.$toast("请输入出发地");
					if(this.publishInfo.goCity == '') return this.$toast("请输入目的地");
					if(this.publishInfo.fromTime == '') return this.$toast("请选择出发时间");
					if(this.publishInfo.ticketType == '往返' && this.publishInfo.backTime == '') return this.$toast("请选择返程时间");
					if(this.publishInfo.peopleNum == '') return this.$toast("请输入成人数量");
					if(this.publishInfo.peopleNum <= 0) return this.$toast("成人数量最少要一位");
					if(this.publishInfo.childNum  < 0) return this.$toast("儿童数量不能小于0");
					reqInfo.fromCity = this.publishInfo.fromCity;
					reqInfo.goCity = this.publishInfo.goCity;
					reqInfo.fromTime = this.publishInfo.fromTime;
					reqInfo.backTime = this.publishInfo.backTime;
					reqInfo.peopleNum = this.publishInfo.peopleNum;
					reqInfo.childNum = this.publishInfo.childNum;
					reqInfo.ticketType = this.publishInfo.ticketType;

				} else if(this.publishInfo.selectType == 40) {
					// 发布机+酒
					if(this.publishInfo.fromCity == '') return this.$toast("请输入出发地");
					if(this.publishInfo.goCity == '') return this.$toast("请输入目的地");
					if(this.publishInfo.fromTime == '') return this.$toast("请选择出发时间");
					if(this.publishInfo.ticketType == '往返' && this.publishInfo.backTime == '') return this.$toast("请选择返程时间");
					if(this.publishInfo.peopleNum == '') return this.$toast("请输入成人数量");
					if(this.publishInfo.peopleNum <= 0) return this.$toast("成人数量最少要一位");
					if(this.publishInfo.childNum  < 0) return this.$toast("儿童数量不能小于0");
					if(this.publishInfo.liveTime == '') return this.$toast("请选择入住时间");
					if(this.publishInfo.leaveTime == '') return this.$toast("请选择离店时间");
					if(this.publishInfo.roomNum == 0) return this.$toast("请输入预定房间数");
					reqInfo.fromCity = this.publishInfo.fromCity;
					reqInfo.goCity = this.publishInfo.goCity;
					reqInfo.fromTime = this.publishInfo.fromTime;
					reqInfo.backTime = this.publishInfo.backTime;
					reqInfo.peopleNum = this.publishInfo.peopleNum;
					reqInfo.childNum = this.publishInfo.childNum;
					reqInfo.ticketType = this.publishInfo.ticketType;
					reqInfo.liveTime = this.publishInfo.liveTime;
					reqInfo.leaveTime = this.publishInfo.leaveTime;
					reqInfo.roomNum = this.publishInfo.roomNum;
					reqInfo.hotelStar = this.publishInfo.hotelStar;
				} else if(this.publishInfo.selectType == 50) {
					// 发布景点门票询价
					if(this.publishInfo.scenicName == '') return this.$toast("请输入景点名称");
					if(this.publishInfo.playScenicTime == '') return this.$toast("请输入游玩时间");
					if(this.publishInfo.peopleNum == '') return this.$toast("请输入成人数量");
					if(this.publishInfo.peopleNum <= 0) return this.$toast("成人数量最少要一位");
					if(this.publishInfo.childNum  < 0) return this.$toast("儿童数量不能小于0");
					reqInfo.scenicName = this.publishInfo.scenicName;
					reqInfo.playScenicTime = this.publishInfo.playScenicTime;
					reqInfo.peopleNum = this.publishInfo.peopleNum;
					reqInfo.childNum = this.publishInfo.childNum;
				} else if(this.publishInfo.selectType == 60) {
					// 发布导游询价
					if(this.publishInfo.pbTitle == '') return this.$toast("请填写标题");
					if(this.publishInfo.pbRoadLine == '') return this.$toast("请选择目的地");
					if(this.publishInfo.pbAddress == '') return this.$toast("请选择接团地点");
					if(this.publishInfo.fromTime == '') return this.$toast("请选择日期");
					if(this.publishInfo.selectDays == '') return this.$toast("请填写天数");
					if(this.publishInfo.selectDays <= 0) return this.$toast("天数不能小于0");
					if(this.publishInfo.pbDayFee == '') return this.$toast("请填写导服费");
					if(this.publishInfo.pbDepositFee == '') return this.$toast("请填写定金");
					reqInfo.pbTitle = this.publishInfo.pbTitle;
					reqInfo.pbRoadLine = this.publishInfo.pbRoadLine;
					reqInfo.pbAddress = this.publishInfo.pbAddress;
					reqInfo.pbDateTime = this.publishInfo.fromTime;
					reqInfo.pbDays = this.publishInfo.selectDays;
					reqInfo.pbDayFee = this.publishInfo.pbDayFee;
					reqInfo.pbDepositFee = this.publishInfo.pbDepositFee;
					reqInfo.pbBranched = this.publishInfo.pbBranched;
					reqInfo.pbYears = this.publishInfo.pbYears;
					reqInfo.pbDetail = this.publishInfo.pDesc;
					reqInfo.pbLanguges = this.publishInfo.pbLanguges;
					reqInfo.pbUserName = this.publishInfo.contactName;
					reqInfo.pbTel = this.publishInfo.contactPhone;
				}

				if(this.publishInfo.selectType == 60) {
					this.$abyApi.Select.saveGuidePublish(reqInfo, (res) => {
						this.$toast('发布成功');
						setTimeout(() => {
							this.$router.back();
						}, 1000)
					})
				} else {
					this.$abyApi.Select.savePublish(reqInfo, (res) => {
						this.$toast('发布成功');
						setTimeout(() => {
							this.$router.back();
						}, 1000)
					});
				}
			},
			// 减少
			onRedNum(id) {
				if(id == 1 && this.publishInfo.peopleNum > 0) {
					this.publishInfo.peopleNum = this.publishInfo.peopleNum - 1;
				} else if(id == 2 && this.publishInfo.childNum > 0) {
					this.publishInfo.childNum = this.publishInfo.childNum - 1;
				} else if(id == 3 && this.publishInfo.roomNum > 0) {
					this.publishInfo.roomNum = this.publishInfo.roomNum - 1;
				}
			},
			// 增加
			onAddNum(id) {
				if(id == 1) {
					this.publishInfo.peopleNum = this.publishInfo.peopleNum + 1;
				} else if(id == 2) {
					this.publishInfo.childNum = this.publishInfo.childNum + 1;
				} else if(id == 3) {
					this.publishInfo.roomNum = this.publishInfo.roomNum + 1;
				}
			}
		},
		mounted() {
			// 获得采购类型
			let dlist2 = [{
				text: '线路',
				value: 10
			}, {
				text: '酒店',
				value: 20
			}, {
				text: '机票',
				value: 30
			}, {
				text: '机+酒',
				value: 40
			}, {
				text: '景点门票',
				value: 50
			}, {
				text: '导游',
				value: 60
			}];
			let slots2 = [{
				flex: 1,
				values: dlist2,
				className: 'slot1',
				textAlign: 'center'
			}];
			this.typeList = slots2;

			// 获得交通方式
			this.$abyApi.Sys.getDict('trafficType', '', (res) => {
				let dlist = []
				for(let i = 0, len = res.dicList.length; i < len; i++) {
					if(i == 0) {
						this.publishInfo.trafficType = res.dicList[i].dicValue;
						this.publishInfo.trafficTypeName = res.dicList[i].dicName;
					}
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
				this.trafficTypeList = slots;
			});
		},
		watch:{
			backTime(val){
				if(val != '' && this.publishInfo.fromTime != ''){
					if(this.$tool.abyDateFun.compareDate(this.publishInfo.fromTime,val)){
						this.$toast("返程时间不能小于出发时间");
						this.publishInfo.backTime = '';
					}
				}
			},
			liveTime(val){
				if(val != '' && this.publishInfo.leaveTime != ''){
					if(this.$tool.abyDateFun.compareDate(this.publishInfo.leaveTime,val)){
						this.$toast("离店时间不能小于入住时间");
						this.publishInfo.backTime = '';
					}
				}
			}
		}
	}
</script>

<style scoped>
	.mui-content {
		padding: 10px 0px 50px 0px;
	}
	
	.mui-input-group label {
		font-size: 14px;
		color: #999999;
		line-height: 18px;
	}
	
	.mui-input-group input {
		font-size: 16px;
	}
	
	.mui-numbox {
		float: left;
	}
	
	.mui-input-row label {
		padding-left: 23px!important;
		width: 95px;
	}
	
	.mui-input-row {
		height: 60px!important;
		line-height: 60px;
		padding-top: 10px;
	}
	
	.aby-navigate-right:after {
		content: '\e583';
		font-family: Muiicons;
		font-size: inherit;
		right: 15px;
		position: absolute;
		top: 25%;
		display: inline-block;
		color: #DDDDDD;
		-webkit-font-smoothing: antialiased;
	}
	/*为了解决底部按钮不固定问题*/
	.mui-content {
		position: fixed;
		top: 0px;
		left: 0;
		bottom: 41px;
		padding-top: 55px;
		/*距离底部的距离为底部盒子的高度，自己也可以设置*/
		overflow-y: scroll;
		width: 100%;
		height: auto;
		-webkit-overflow-scrolling: touch;
		/*这句是为了滑动更顺畅*/
	}
</style>