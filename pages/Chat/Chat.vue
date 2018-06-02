<template>
	<aby-page ref="page">
		<aby-header slot="header">
			<div class="mui-title" slot="title" v-if="userInfo != ''">
				<h1>{{userInfo.userName}}</h1>
				<h6 class="mui-ellipsis">{{userInfo.cpBasic.cpName}}</h6>
			</div>
			<aby-icon class="mui-icon mui-pull-right icon-chatsetting" @click.native="toHomePage" slot="right" type="chatsetting"></aby-icon>
		</aby-header>
		<div class="mui-content" slot="content" ref="content" id="content" @click="onContent">
			<div id='msglist' ref="msglist" v-if="msgList.length>0" @scroll="paperScroll">
				<div class="msg-item" v-for="(li,i) in msgList" :key="i" :class="li.messageDirection == 1 ? 'msg-item-self' : ''">
					<img class="msg-user-img msg-user mui-icon selfHead" :src="li.sendUser.userFace" alt="" />
					<div v-if="li.content.messageName=='TextMessage'" class="msg-content">
						<div class="msg-content-inner" v-if="li.content.messageName=='TextMessage'" v-html="$abyApi.Chat.emojiToHTML(li.content.content)">
						</div>
						<div class="msg-content-arrow"></div>
					</div>
					<div v-else class="msg-content msg-img">
						<div class="msg-content-inner" v-if="li.content.messageName=='ImageMessage'">
							<img :src="'data:image/png;base64,'+li.content.content" id="imgMessage" :data-preview-src="li.content.imageUri" data-preview-group="1">
						</div>
						<div class="msg-content-arrow"></div>
					</div>
					<span class="mui-spinner sendStatus"></span>
					<div class="mui-item-clear"></div>
				</div>
			</div>
		</div>
		<div slot="footer">
			<footer ref="footer">
				<div class="footer-center">
					<textarea v-model="msgtext" id="msgtext" @focus="focus" type="text" class='input-text'></textarea>
				</div>
				<label class="footer-right">
					<aby-icon class="mui-icon icon-face" :type="faceIcon" @click.native="onFace"></aby-icon>
					<aby-icon class="mui-icon icon-plus" type="chatplus" @click.native="onMore" v-show="msgtext==''"></aby-icon>
					<aby-icon class="mui-icon icon-send aby-font-blue" type="chatsend" @click.native="onSend" v-show="msgtext!=''"></aby-icon>
				</label>
			</footer>
			<div class="tool_panel" v-show="isShowFace" v-html="faceArr" @click="onFaceTip($event)"></div>
			<div class="tool_else_panel" v-show="isShowMore">
				<div class="btnPanel">
					<aby-icon class="mui-icon" type="chatpic" @click.native="onCamera"></aby-icon>
					<p>图片</p>
				</div>
			</div>
		</div>
	</aby-page>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				isShowFace: false, //是否显示表情
				faceIcon: 'chatface', //表情图标
				isShowMore: false, //是否显示更多按钮
				faceArr: [],
				msgtext: '', //消息内容
				userId: '', //用户ID
				userInfo: '', //用户信息
				msgList: [], //消息列表
				scrollTop:0,
				pageType:'activated'
			}
		},
		computed: {
			chatList() {
				return this.$store.state.chatList;
			},
		},
		methods: {
			init() {
				this.$refs.page.showLoading();
				this.userId = this.$route.params.userId;
				this.userInfo = [];
				this.msgList = [];
				this.msgtext = '';
				this.faceIcon = 'chatface';
				this.$refs.footer.className = '';
				this.isShowFace = false;
				this.isShowMore = false;
				
				this.getUserInfo();
				this.getChatLog();
			},
			paperScroll() {
			},
			// 表情转换
			toFaceHtml(data) {
				return this.$abyApi.Chat.emojiToHTML(data);
			},
			// 点击表情按钮
			onFace() {
				if(this.isShowFace) {
					this.faceIcon = 'chatface';
					this.$refs.footer.className = '';
					this.isShowFace = false;
					this.isShowMore = false;
				} else {
					this.faceIcon = 'chatkeyboard';
					this.$refs.footer.className = 'editFooter';
					this.isShowFace = true;
					this.isShowMore = false;
				}
			},
			// 点击更多按钮
			onMore() {
				if(this.isShowMore) {
					this.$refs.footer.className = '';
					this.isShowFace = false;
					this.isShowMore = false;
				} else {
					this.$refs.footer.className = 'editFooter';
					this.isShowFace = false;
					this.isShowMore = true;
				}
			},
			// 表情选择
			onFaceTip(e) {
				let emoji = e.target.parentNode.getAttribute("name")||e.target.parentNode.parentNode.getAttribute("name");
				if(emoji){
					emoji = this.$abyApi.Chat.htmlToEmoji(emoji);
					this.msgtext = this.msgtext + emoji;
				}
			},
			// 输入框获得焦点
			focus() {
				this.$refs.footer.className = '';
				this.isShowFace = false;
				this.isShowMore = false;
			},
			// 点击相机
			onCamera() {
				this.$tool.getPhoto((file) => {
					this.$tool.loading('正在提交...');
					this.$refs.footer.className = '';
					this.isShowFace = false;
					this.isShowMore = false;
					this.$abyApi.Chat.uploadFile(file, (res) => {
						this.$tool.loadingClose();
						let imgMsg = this.$abyApi.Chat.imgToRongIm(res.imageInfo.base64, res.imageInfo.imageUri);
						this.RongImSend(imgMsg);
					},(err)=>{
						this.$tool.loadingClose();
					})
				});
			},
			// 点击发送按钮
			onSend() {
				let txtMsg = this.msgtext.replace(new RegExp('\n', 'gm'), '<br/>');
				let sendMsg = this.$abyApi.Chat.textToRongIm(txtMsg);
				sendMsg.sendLoading = 'sending';
				this.RongImSend(sendMsg);
				this.msgtext = '';
				document.getElementById('msgtext').focus();
			},
			// 发送消息
			RongImSend(msg) {
				msg.targetUser = this.userInfo;
				this.$abyApi.Chat.sendMessage(this.userId, msg, (res) => {
					res.sendUser = JSON.parse(res.content.extra);
					this.msgList = this.msgList.concat(res);
				});
			},
			// 获得用户信息
			getUserInfo() {
				let reqInfo = {
					userId: this.userId
				};
				this.$abyApi.User.getBasciInfo(reqInfo, (res) => {
					this.$refs.page.closeLoading();
					this.userInfo = res.cpUserInfo;
				});
			},
			// 获得聊天记录
			getChatLog() {
				let list = [];
				this.$abyDb.Im.getAll((res) => {
					if(res) {
						res.forEach((v)=>{
							let isAdd = false;
							let info = v;
							info.sendUser = JSON.parse(info.content.extra);
							// 如果发送者不是本人，并且发送者为当前用户
							if(info.senderUserId != this.$store.state.userId && info.senderUserId == this.userId){
								isAdd = true;
							}
							// 发送人是本人，接收者是当前用户
							if(info.targetId == this.userId && info.senderUserId == this.$store.state.userId) {
								isAdd = true;
							}
							if(isAdd){
								list.push(info);
								// 更新已读状态
								this.$abyDb.Im.updateIsRead(info.messageUId);
							}
						})
					}
				});
				this.msgList = list;
			},
			// 查看对方主页
			toHomePage() {
				if(this.fromName == 'homePage'){
					this.$router.back()
				}else{
					this.$router.push({
						name: "homePage",
						params: {
							userId: this.userId,
							cpId: this.userInfo.cpBasic.cpId
						}
					});
				}
			},
			// 点击消息内容
			onContent(){
				this.faceIcon = 'chatface';
				this.$refs.footer.className = '';
				this.isShowFace = false;
				this.isShowMore = false;
			},
		},
		mounted() {
			// 初始化融云
			this.$abyApi.Chat.init();
			// 获取表情列表
			let emijiArrr = this.$abyApi.Chat.getEmojis();
			var emojiArrHtml = "";
			for(var i in emijiArrr) {
				emojiArrHtml = emojiArrHtml + emijiArrr[i].innerHTML;
			}
			this.faceArr = emojiArrHtml;
		},
		beforeRouteEnter(to, from, next) {
			if(to.params.userId){
				next(vm => {
					vm.init()
				})
			}else{
				next()
			}
		},
		updated(){
			let obj = document.getElementById('msglist');
			if(obj)obj.scrollTop = obj.scrollHeight;
		},
		watch: {
			chatList(val){
				if(val.length>0 && this.pageType == 'activated'){
					let isAdd = true;
					this.msgList.forEach((v,i)=>{
						val.forEach((x)=>{
							if(v.messageUId == x)isAdd = false;
						})
					});
					if(isAdd){
						this.$abyDb.Im.get((res) => {
							if(res) {
								let info = res.value;
								info.sendUser = JSON.parse(info.content.extra);
								if(info.messageUId == val) {
									this.msgList = this.msgList.concat(info);
									// 更新已读状态
									this.$abyDb.Im.updateIsRead(info.messageUId);
								}
							}
						});
					}
				}
			}
		},
		activated() {
			this.pageType = 'activated';
		},
		deactivated() {
			this.pageType = 'deactivated';
		},
	}
</script>

<style scoped>
	html,
	body {
		height: 100%;
		margin: 0px;
		padding: 0px;
		overflow: hidden;
		-webkit-touch-callout: none;
		-webkit-user-select: none;
	}
	
	.mui-title {
		line-height: 30px;
	}
	
	.business {
		display: inline-block;
		right: 40px;
		left: 40px;
		overflow: hidden;
		width: auto;
		margin: 27px 0 0 0;
		text-overflow: ellipsis;
		margin-left: -22px;
	}
	
	.icon-face,
	.icon-plus,
	.icon-send {
		font-size: 37px;
		margin-top: -4px;
	}
	.icon-face,
	.icon-plus{
		color: #707070!important;
	}
	.icon-send {
		font-weight: 500;
	}
	
	.icon-chatsetting {
		font-size: 22px;
		color: #707070;
		position: absolute;
		right: 10px;
		top: 0px;
	}
	
	.btnPanel{
		width: 24%;
		text-align: center;
		float: left;
		padding: 10px;
	}
	.btnPanel .mui-icon{
		border: 1px solid #DDDDDD;
		background-color: #FFFFFF;
		padding: 10px;
		border-radius: 8px;
		margin-bottom: 5px;
		color: #707070;
	}
	.btnPanel p{
		font-size: 12px;
	}
	
	footer {
		position: fixed;
		width: 100%;
		height: 50px;
		min-height: 50px;
		border-top: solid 1px #F0F0F0;
		left: 0px;
		bottom: 0px;
		overflow: hidden;
		padding: 0px 90px 0 10px;
		background-color: #fafafa;
	}
	
	.footer-right {
		position: absolute;
		width: 90px;
		height: 50px;
		right: 0px;
		bottom: 0px;
		text-align: center;
		vertical-align: middle;
		line-height: 100%;
		padding: 12px 5px;
		display: inline-block;
	}
	
	.footer-center {
		height: 100%;
		padding: 8px 0px;
	}
	
	.footer-center [class*=input] {
		width: 100%;
		height: 100%;
		border-radius: 5px;
	}
	
	.footer-center .input-text {
		background: #F0F0F0;
		border: solid 1px #F0F0F0;
		padding: 10px !important;
		font-size: 14px !important;
		line-height: 12px !important;
		font-family: verdana !important;
		overflow: hidden;
		border-radius: 15px;
	}
	
	.footer-center .input-sound {
		background-color: #eee;
	}
	
	.mui-content {
		height: 100%;
		padding: 0px 0px 50px 0px;
		overflow: auto;
	}
	
	#msglist {
		height: 100%;
		overflow: auto;
		-webkit-overflow-scrolling: touch;
	}
	
	.msg-item {
		padding: 8px;
		clear: both;
	}
	
	.msg-item .mui-item-clear {
		clear: both;
	}
	
	.msg-item .msg-user {
		width: 38px;
		height: 38px;
		border: solid 1px #d3d3d3;
		display: inline-block;
		background: #fff;
		border-radius: 3px;
		vertical-align: top;
		text-align: center;
		float: left;
		padding: 3px;
		color: #ddd;
	}
	
	.msg-item .msg-user-img {
		width: 38px;
		height: 38px;
		display: inline-block;
		border-radius: 3px;
		vertical-align: top;
		text-align: center;
		float: left;
		color: #ddd;
	}
	
	.msg-item .msg-content {
		display: inline-block;
		border-radius: 5px;
		border: solid 1px #d3d3d3;
		background-color: #FFFFFF;
		color: #333;
		padding: 8px;
		vertical-align: top;
		font-size: 15px;
		position: relative;
		margin: 0px 8px;
		max-width: 75%;
		min-width: 35px;
		float: left;
	}
	.msg-img{
		padding: 0px!important;
		background-color: #F0F0F0!important;
		border: none!important;	
	}
	.msg-img img{
		border-radius: 5px;
	}
	
	.msg-item .msg-content .msg-content-inner {
		overflow-x: hidden;
	}
	
	.msg-item .msg-content .msg-content-arrow {
		position: absolute;
		border: solid 1px #d3d3d3;
		border-right: none;
		border-top: none;
		background-color: #FFFFFF;
		width: 10px;
		height: 10px;
		left: -5px;
		top: 12px;
		-webkit-transform: rotateZ(45deg);
		transform: rotateZ(45deg);
	}
	.msg-item .msg-img .msg-content-arrow {
		background-color: rgba(255,255,255,0)!important;
		border: none!important;	
	}
	.msg-item-self .msg-user,
	.msg-item-self .msg-content {
		float: right;
	}

	.msg-item-self .msg-content .msg-content-arrow {
		left: auto;
		right: -5px;
		-webkit-transform: rotateZ(225deg);
		transform: rotateZ(225deg);
	}
	.msg-item-self .msg-img .msg-content-arrow {
		background-color: rgba(255,255,255,0)!important;
		border: none!important;	
	}
	.msg-item-self .msg-content,
	.msg-item-self .msg-content .msg-content-arrow {
		background-color: #08C7B5;
		color: #fff;
		border-color: #06A899;
	}
	
	footer .mui-icon {
		color: #000;
	}
	
	footer .mui-icon:active {
		color: #007AFF !important;
	}
	
	footer .mui-icon-paperplane:before {
		content: "发送";
	}
	
	footer .mui-icon-paperplane {
		font-size: 16px;
		word-break: keep-all;
		line-height: 100%;
		padding-top: 6px;
		color: rgba(0, 135, 250, 1);
	}
	
	.tool_else_panel,
	.tool_panel {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 2px;
		width: 100%;
		height: 150px;
		overflow-y: scroll;
	    background-color: #efeff4;
	}
	
	.editFooter {
		bottom: 150px!important;
		position: fixed!important;
	}
	.mui-title h1{
		font-size: 16px;
	}
</style>