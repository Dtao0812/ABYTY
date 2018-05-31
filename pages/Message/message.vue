<template>
	<div>
		<aby-header title="消息">
			<div slot="back"></div>
		</aby-header>
		<div class="content">
			<ul class="mui-table-view space">
				<li class="mui-table-view-cell mui-media" @click="toMsgList">
					<a>
						<img class="mui-media-object mui-pull-left" src="../../static/images/ico/ico_msgsys_3x.png">
						<span class="mui-badge mui-badge-danger" v-show="messageList.msgNum != 0">{{messageList.msgNum}}</span>
						<div class="mui-media-body">
							系统消息
							<p class='mui-ellipsis'></p>
						</div>
					</a>
				</li>
				<li class="mui-table-view-cell mui-media" @click="toTravelList">
					<a>
						<img class="mui-media-object mui-pull-left" src="../../static/images/ico/msg_interactMsg.png">
						<span class="mui-badge mui-badge-danger" v-show="messageList.travelNum != 0">{{messageList.travelNum}}</span>
						<div class="mui-media-body">
							旅游咨询
							<p class='mui-ellipsis'></p>
						</div>
					</a>
				</li>
			</ul>
			<aby-list :list="chatList"></aby-list>
		</div>
	</div>
</template>

<script>
	import AbyList from '../../components/List/Chat.vue'
	export default {
		components: {
			AbyList
		},
		data() {
			return {
				chatList:[],//聊天列表
				dbChatList:[],//聊天列表
			}
		},
		computed: {
			// 系统消息
			messageList() {
				let info = {};
				info.msgNum = 0;
				info.travelNum = 0;
				this.$store.state.messageList.forEach((v,i)=>{
					if(v.id == 'travel'){
						info.travelNum = v.num;
					}else{
						info.msgNum = info.msgNum + v.num;
					}
				});
				return info;
			},
		},
		methods:{
			init(){
				this.getChatList();
			},
			// 获得聊天列表
			getChatList(){
				let list = [];
				this.$abyDb.Im.init((res)=>{
					this.$abyDb.Im.getAll((res)=>{
						res.forEach((v)=>{
							let msgValue = v;
							let info = {
								targetId: msgValue.targetId,//接收者ID
								senderUserId: msgValue.senderUserId,//发送者ID
								sendUser: {},//发送者数据
								isRead: msgValue.isRead,//是否已读
								noReadNum:0,//未读数量
							};
							//最后一条消息内容
							if(msgValue.content.messageName=='ImageMessage'){
								info.content = '[图片]';
							}else{
								info.content = this.$abyApi.Chat.emojiToHTML(msgValue.content.content);
							}
							let isAdd = true;
							if(info.senderUserId == this.$store.state.userId){
								// 如果是本人发出的消息，显示对方头像
								info.sendUser = {
									cpId : msgValue.content.targetUser.cpBasic.cpId,
									cpName : msgValue.content.targetUser.cpBasic.cpName,
									userFace : msgValue.content.targetUser.userFace,
									userId : msgValue.content.targetUser.userId,
									userName : msgValue.content.targetUser.userName,
								};
							}else{
								info.sendUser = msgValue.sendUser;
							}
							for(let i=0;i<list.length;i++){
								if(list[i].targetId == info.targetId){
									isAdd = false;
									list[i].content = info.content;//始终显示最后一条聊天
									if(!info.isRead)list[i].noReadNum = list[i].noReadNum + 1;
								}
							}
							if(isAdd)list.push(info);
						});
					});
				});
				this.dbChatList = list;
			},
			// 消息列表
			toMsgList(){
				this.$router.push({
					name:"msgList"
				})
			},
			// 旅游咨询列表
			toTravelList(){
				this.$router.push({
					name:"travelList"
				})
			}
		},
		mounted() {
			this.init();
			this.$parent.eventPageShow(this.$route.name);
		},
		activated() {
			this.init();
			// 底部导航栏
			this.$parent.eventPageShow(this.$route.name);
		},
		watch:{
			dbChatList(val){
				if(val.length>0&&(JSON.stringify(val)!=JSON.stringify(this.chatList))){
					this.chatList = val;
				}
			}
		}
	}
</script>
<style scoped>
	.content{
		height: 100%;
		background-color: #F0F0F0;
	}
	.mui-badge {
		right: auto!important;
		left: 45px;
		top: 25%!important;
	}
	
	.mui-table-view-cell {
		padding: 13px 15px;
	}
	.mui-table-view .mui-media-object{
		width: 45px;
		height: 45px;
		max-width: 45px;
		border-radius: 4px;
	}
	.mui-media-body{
		padding-top: 2px;
		font-size: 16px;
	}
</style>