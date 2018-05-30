import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
	count: 1,
	pageDirection: 'fade',
	routeChain: [],
	tabActive:'',
	
	//开屏广告
	advState:window.localStorage.getItem('advState'),//是否显示广告
	advImg:window.localStorage.getItem('advImg'),//广告图片
	advTitle:window.localStorage.getItem('advTitle'),//广告标题
	advUrl:window.localStorage.getItem('advUrl'),//广告地址
	advOnTime:window.localStorage.getItem('advOnTime')||'',//点击时间
	
	chatNum:0,//聊天消息数
	chatList:[],//聊天id
	orderNum:0,//订单未读数
	buyer:0,//买家订单
	seller:0,//卖家订单
	messageNum:0,// 消息中心总消息数
	messageList:[
		{ id:'system',num:0,list:[] },//系统消息
		{ id:'select',num:0,list:[] },//采购消息
		{ id:'hotel_order',num:0,list:[] },//订单消息
		{ id:'travel',num:0,list:[] },//旅游咨询消息
	],//消息
	homeMsgType:false,//首页消息状态
	messageType:false,//消息中心状态
	
	abyTel:'025-68132329',//客服电话
	isFirst:window.localStorage.getItem('isFirst')?false:true,//是否第一次加载
	
	osType: window.localStorage.getItem('osType')?window.localStorage.getItem('osType'):'3',
	deviceId: window.localStorage.getItem('deviceId')?window.localStorage.getItem('deviceId'):'000',
	version: window.localStorage.getItem('version')?window.localStorage.getItem('version'):'3.0',
	
	chat_token:'',//聊天token
	isConnectChat:'',//是否连接聊天服务器
	isConnectDb:false,//是否连接本地数据库
	
	loginState: window.localStorage.getItem('user_token')?true:false,//登录状态
	user_token: window.localStorage.getItem('user_token')?window.localStorage.getItem('user_token'):'',//用户token
	/*用户基本信息*/
	cpUserInfo: window.localStorage.getItem('cpUserInfo')?JSON.parse(window.localStorage.getItem('cpUserInfo')):'',
	userId: '',userName: '',userType: '',userPhone: '',
	/*企业基本信息*/
	cpBasic:window.localStorage.getItem('cpUserInfo')?JSON.parse(window.localStorage.getItem('cpUserInfo')).cpBasic:'',
	cpId: '',cpBtype: '',cpAuditState:1,
	/*公司主页*/
	userIdHome:'',cpIdHome:'',
}

// 同步加载
const mutations = {
	addRouteChain(state, route) {
		let isAdd = true;
		state.routeChain.forEach((value,index)=>{
			if(value.name === route.name)isAdd = false;
		});
		if(isAdd)state.routeChain.push(route);
	},
	popRouteChain(state) {
		state.routeChain.pop();
	},
	delRouteChain(state,route){
		state.routeChain.forEach((value,index)=>{
			if(value.name === route.name)state.routeChain.pop(value);
		});
	},
	setPageDirection(state, dir) {
		state.pageDirection = dir;
	},
	// 设置用户信息
	setUserInfo(state, info){
		state.loginState = true;
		state.user_token = info.user_token;
		state.cpUserInfo = info.cpUserInfo;
		state.cpAuditState = info.cpUserInfo.cpBasic.cpAuditState;
		if(state.cpAuditState == 1 || state.cpAuditState == 2){
			state.chat_token = info.chat_token;
			state.userId = info.cpUserInfo.userId;
			state.userName = info.cpUserInfo.userName;
			state.userType = info.cpUserInfo.userType;
			state.userPhone = Vue.$abyApi.Crypto.DeCrypt(info.cpUserInfo.userPhone);
			state.cpId = info.cpUserInfo.cpId;
			state.cpBasic = info.cpUserInfo.cpBasic;
			state.cpBtype = info.cpUserInfo.cpBasic.cpBtype;
		}
		window.localStorage.setItem('user_token',info.user_token);
		window.localStorage.setItem('cpUserInfo',JSON.stringify(info.cpUserInfo));
	},
	// 设置token
	setUserToken(state,token){
		state.user_token = token;
	},
	// 单独设置基本信息
	setStateInfo(state,info){
		state[info.title] = info.value;
	},
	// 清空用户基本信息
	clearState(state){
		window.localStorage.removeItem('user_token');
		state.loginState = false;
		state.user_token = state.chat_token = state.cpUserInfo = 
		state.userId = state.userName = state.userType = state.userPhone = 
		state.cpId = state.cpBasic = state.cpBtype = '';
		state.routeChain = [];
		state.pageDirection = 'fade';
		state.orderNum = state.chatNum = state.buyer = 
		state.seller = state.messageNum = 0;
		state.messageList = [
			{ id:'system',num:0,list:[] },
			{ id:'select',num:0,list:[] },
			{ id:'hotel_order',num:0,list:[] },
			{ id:'travel',num:0,list:[] },
		];
		state.homeMsgType = state.messageType = false;
	},
	// 设置聊天未读消息
	setChatNum(state,info){
		let isadd = true;
		for(let i=0;i<state.chatList.length;i++){
			if(state.chatList[i] == info.value)isadd = false;
		}
		if(isadd){
			state.chatList = state.chatList.concat(info.value);
		}
		state[info.title] = state.chatList.length;
		let messageNum = 0;
		for(let i=0;i<state.messageList.length;i++){
			messageNum += state.messageList[i].num;
		}
		state.messageType = messageNum>0;
		state.messageNum = messageNum + state.chatNum;
	},
	// 删除聊天未读消息
	removeChatNum(state,info){
		let newList = [];
		for(let i=0;i<state.chatList.length;i++){
			if(state.chatList[i] != info.value){
				newList.push(state.chatList[i]);
			}
		}
		state.chatList = newList;
		state[info.title] = state.chatList.length;
		let messageNum = 0;
		for(let i=0;i<state.messageList.length;i++){
			messageNum += state.messageList[i].num;
		}
		state.messageType = messageNum>0;
		state.messageNum = messageNum + state.chatNum;
	},
	setHomePage(state,info){
		state.userIdHome = info.userId;
		state.cpIdHome = info.cpId;
//		state.cpBtypeHome = info.cpBtype;
	},
	//设置订单未读数量
	setOrderNum(state,info){
		state[info.title] = info.value;
		state.orderNum = state.buyer + state.seller;
	},
	// 设置消息数量
	setMsgNum(state,info){
		for(let i=0;i<state.messageList.length;i++){
			let isadd = false;
			if(state.messageList[i].id == info.title)isadd = true;
			for(let x=0;x<state.messageList[i].list.length;x++){
				if(state.messageList[i].list[x] == info.value)isadd = false;
			}
			if(isadd){
				state.messageList[i].list = state.messageList[i].list.concat(info.value);
				state.messageList[i].num = state.messageList[i].list.length;
			}
		}
		let messageNum = 0;
		let homeNum = 0;
		// 首页只计算系统消息、订单消息、询价消息
		for(let i=0;i<state.messageList.length;i++){
			messageNum += state.messageList[i].num;
			if(state.messageList[i].id != 'travel')homeNum += state.messageList[i].num;
		}
		state.messageType = messageNum>0;
		state.homeMsgType = homeNum>0;
		state.messageNum = messageNum + state.chatNum;
	},
	// 删除消息数量
	removeMsgNum(state,info){
		for(let i=0;i<state.messageList.length;i++){
			let isdel = false;
			let newList = [];
			for(let x=0;x<state.messageList[i].list.length;x++){
				if(state.messageList[i].list[x] == info.value){
					isdel = true;
				}else{
					newList.push(state.messageList[i].list[x]);
				}
			}
			if(isdel){
				state.messageList[i].list = newList;
				state.messageList[i].num = state.messageList[i].list.length;
			}
		}
		
		let messageNum = 0;
		let homeNum = 0;
		// 首页只计算系统消息、订单消息、询价消息
		for(let i=0;i<state.messageList.length;i++){
			messageNum += state.messageList[i].num;
			if(state.messageList[i].id != 'travel')homeNum += state.messageList[i].num;
		}
		state.messageType = messageNum>0;
		state.homeMsgType = homeNum>0;
		state.messageNum = messageNum + state.chatNum;
	},
	// 设置开屏广告
	setAdvInfo(state,info){
		state[info.title] = info.value;
	}
}

// 异步加载
const actions = {
	addAction(context) {
		context.commit('add', 10)
	},
	reduceAction({
		commit
	}) {
		commit('reduce')
	}
}

// 计算属性
const getters = {
	count: function(state) {
		return state.count += 100;
	}
}

export default new Vuex.Store({
	state,mutations,getters
})