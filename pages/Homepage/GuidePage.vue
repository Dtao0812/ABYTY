<template>
	<div class="guidePage">
		<aby-header title="他的名片" slot="header">
			<aby-fonts slot="right" class="aby-mui-bar" @click.native="" className="mui-pull-right" title="更多"></aby-fonts>
		</aby-header>
		<div class="mui-content">
			<div class="mui-scroll">
				<div class="top">
					<img class="bookface" id="bookface" :src="list.aac502">
					<span class="zan" @click="">
						<span></span>
						<span><img src="" alt="" />{{list.praiseCnt}}</span>
					</span>
					<div class="divPic">
						<div class="userPhoto lf">
							<img class="imgPic" :src="list.aac007">
							<span><img src="" alt="" /></span>
							<p class="marbot0">评价(0)</p>
						</div>
						<div class="userMsg lf">
							<p class="marbot0">
								{{list.aac005}}<span>专业导游</span>
							</p>
							<p class="marbot0">{{list.aac004|isSex}}&nbsp;{{list.aac215|countAge}}岁&nbsp;{{list.aac204}}</p>
						</div>
						<div class="userCount rt">
							<p class="marbot0">浏览({{list.readCnt}})&nbsp;分享({{list.shareCnt}})</p>
						</div>
					</div>
					<div class="divMsg">
						<p class="spanname mui-ellipsis"></p>
						<span class="msg mark">
								
						</span>
					</div>
				</div>
				<div>
					<div class="title">
						TA的名片信息
					</div>
					<ul class="mui-table-view">
						<li class="mui-table-view-cell liLeftTitle">
							<a>
								<label>个人标签</label>
								<div class="panelTip">
									<span v-for="li in list.vsTags">{{li}}</span>
								</div>
							</a>
						</li>
						<li class="mui-table-view-cell liLeftTitle">
							<a>
								<label>从业年数</label>
								<div class="rightText">{{list.vsJobYears|filterNull}}</div>
							</a>
						</li>
						<li class="mui-table-view-cell liLeftTitle">
							<a>
								<label>技术等级</label>
								<div class="rightText">{{list.vsSkillLevel|filterNull}}</div>
							</a>
						</li>
						<li class="mui-table-view-cell liLeftTitle">
							<a>
								<label>服务费用</label>
								<div class="rightText">{{list.vsServFee|filterNull}}</div>
							</a>
						</li>
					</ul>
				</div>
			</div>
			<div class="btnBottom">
				<div class="chatboxes">
					<aby-icon class="mui-icon-btn" type="chat"></aby-icon>在线联系
				</div>
				<div class="phone" @click="$tool.dialTelToApp(list.aac002)">
					<aby-icon class="mui-icon-btn" type="call"></aby-icon>电话联系
				</div>
			</div>
		</div>
		
	</div>
</template>

<script>
	export default {
		components: {
			
		},
		data() {
			return {
				pbId: this.$route.params.pbId,
				list: ''
			}
		},
		methods: {
			getPageInfo(){
				let reqInfo = {};
				reqInfo.loading = 1;
				reqInfo.aac001 = this.pbId;
				this.$abyApi.User.getGuiderInfo(reqInfo, (res)=>{
					res.userinfo.aac002 = this.$abyApi.Crypto.DeCrypt(res.userinfo.aac002)
					this.list = res.userinfo;
				})
			},
			setImgSize(){//设置横幅图片3：2
				var imgArr = document.getElementById("bookface");
				imgArr.style.height = 2*document.body.clientWidth / 3 + "px";
			},
			clickZan(){//点赞
				
			}
		},
		mounted() {
			this.getPageInfo();
			this.setImgSize();
		},
		created() {}
	}
</script>

<style scoped>
/*body,html,.mui-content {
    background-color: #efeff4!important;
}*/
.lf{
	float: left;
}
.rt{
	float: right;
}
.title{
	clear: both;
	padding: 8px 10px;
	font-size: 14px;
	color: #000;
	font-weight: bold;
}
.marbot0{
	margin-bottom: 0;
	color: #101010;
	font-size: 12px;
}
.mui-icon-btn{
	margin-right: 3px;
	vertical-align: middle;
}
.mui-scroll{
	margin-bottom: 60px;
}
.divPic{
	background-color: #fff;
	height: 52px;
}
.userMsg{
	padding-top: 10px;
	margin-left: 1%;
}
.userMsg p span{
	background-color: #ff9800;
	color: #fff;
	padding: 3px;
    border-radius: 3px;
    margin-left: 2%;
}
.userCount{
	height: 100%;
	line-height: 52px;
	margin-right: 10px;
}
.userCount p{
	color: #aaa;
}
/*封面*/
.bookface {
	width: 100%;
	height: 240px;
	vertical-align: bottom;
	text-align: center;
	/*margin: 0 -100%;*/
}
/*标签*/

.panelTip span {
	font-size: 13px;
	padding: 2px 12px;
	background-color: #aaa;
	color: #fff;
	border-radius: 15px;
	margin-bottom: 3px;
	display: inline-block;
	margin-right: 3px;
}


/*用户头像*/

.userPhoto {
	width: 77px;
	position: relative;
	margin-left: 15px;
	margin-right: auto;
	margin-top: -26px;
	text-align: center;
}

.imgPic {
	width: 52px;
	height: 52px;
	border-radius: 50%;
	overflow: hidden;
}

/*用户头像及用户名部分*/

.userInfo {
	text-align: center;
	position: absolute;
	top: 60px;
	width: 40%;
	margin-left: 30%;
}

.spanname {
	font-size: 17px;
	margin-top: 0px;
	margin-bottom: 0px;
	font-family: 黑体;
	color: #FFFFFF;
	text-shadow: 0px 1px 1px #000;
	font-weight: 500;
}


/*信息row样式*/

.liLeftTitle label {
	display: inline-block;
	width: 30%;
	color: #888888;
	vertical-align: top;
	line-height: 32px;
}

.liLeftTitle div,
.liLeftTitle input {
	display: inline-block;
	width: 70%;
	word-wrap: break-word;
	word-break: break-all;
	white-space: pre-line;
}
.rightText{
	line-height: 32px;
}
.btnBottom {
	/*position: fixed;*/
	width: 100%;
	height: 45px;
	background: #fff;
	/*bottom: 0px;*/
	color: #08C7B5;
	text-align: center;
	font-size: 12px;
	line-height: 14px;
	border: none;
	z-index: 20;
}

.btnBottom .phone {
	width: 50%;
	float: right;
	font-size: 16px;
	height: 45px;
	background: #fff;
	line-height: 45px;
}

.btnBottom .chatboxes {
	width: 50%;
	float: left;
	font-size: 16px;
	line-height: 45px;
	background-color: #fff;
	border-right: 1px solid #ddd;
}

/*点赞*/
.zan{
	display: inline-block;
    height: 25px;
    width: 48px;
    position: absolute;
    right: 10px;
    margin-top: -35px;
    border-radius: 20px;
}
.zan span:first-child{
	background: #000;
    border-radius: 15px;
    height: 25px;
    width: 48px;
    position: absolute;
    left: 0;
    opacity: 0.5;
}
.zan span:last-child{
	position: absolute;
    left: 0;
    height: 25px;
    width: 48px;
     text-align: center;
    color: #fff;
}
</style>