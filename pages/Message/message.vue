<template>
	<div>
		<aby-header title="消息">
			<div slot="back"></div>
		</aby-header>
		<div class="content">
			<ul class="mui-table-view space">
				<li class="mui-table-view-cell mui-media" v-if="messageList.msgNum != 0" @click="toMsgList">
					<a>
						<img class="mui-media-object mui-pull-left" src="../../static/images/ico/ico_msgsys_3x.png">
						<span class="mui-badge mui-badge-danger">{{messageList.msgNum}}</span>
						<div class="mui-media-body">
							系统消息
							<p class='mui-ellipsis'></p>
						</div>
					</a>
				</li>
				<li class="mui-table-view-cell mui-media" v-if="messageList.travelNum!=0" @click="toTravelList">
					<a>
						<img class="mui-media-object mui-pull-left" src="../../static/images/ico/msg_interactMsg.png">
						<span class="mui-badge mui-badge-danger">{{messageList.travelNum}}</span>
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
					this.$abyDb.Im.get((res)=>{
						if(res){
							let info = res.value;
							info.msgList = [];
							info.noReadNum = 0;
							info.sendUser = JSON.parse(info.content.extra);
							let isAdd = true;
							for(let i=0;i<list.length;i++){
								if(list[i].targetId == info.targetId){
									isAdd = false;
									if(!info.isRead)list[i].noReadNum = list[i].noReadNum + 1;
									list[i].msgList.push(info);
								}
							}
							if(isAdd){
								list.push(info);
							}
						}
					});
					this.chatList = list;
				})
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
			this.getChatList();
			this.$parent.eventPageShow(this.$route.name);
		},
		activated() {
			this.init();
			// 底部导航栏
			this.$parent.eventPageShow(this.$route.name);
		},
		watch:{
		}
	}
</script>
<style scoped>
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