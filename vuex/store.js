import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
	count: 1,
	pageDirection: 'fade',
	routeChain: [],
	tabActive:'',
	
	sysNum:0,//系统消息
	chatNum:0,//聊天消息
	chatList:[],//聊天id
	
	
	abyTel:'025-68132329',//客服电话
	
	osType: window.localStorage.getItem('osType')?window.localStorage.getItem('osType'):'',
	deviceId: window.localStorage.getItem('deviceId')?window.localStorage.getItem('deviceId'):'',
	version: window.localStorage.getItem('version')?window.localStorage.getItem('version'):'',
	
	chat_token:'',//聊天token
	isConnectChat:'',//是否连接聊天服务器
	isConnectDb:false,//是否连接本地数据库
	
	loginState: window.localStorage.getItem('user_token')?true:false,//登录状态
	user_token: window.localStorage.getItem('user_token')?window.localStorage.getItem('user_token'):'',//用户token
	/*用户基本信息*/
	cpUserInfo: '',userId: '',userName: '',userType: '',userPhone: '',
	/*企业基本信息*/
	cpBasic:'',cpId: '',cpBtype: '',
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
		state.chat_token = info.chat_token;
		state.cpUserInfo = info.cpUserInfo;
		state.userId = info.cpUserInfo.userId;
		state.userName = info.cpUserInfo.userName;
		state.userType = info.cpUserInfo.userType;
		state.userPhone = Vue.$abyApi.Crypto.DeCrypt(info.cpUserInfo.userPhone);
		state.cpId = info.cpUserInfo.cpId;
		state.cpBasic = info.cpUserInfo.cpBasic;
		state.cpBtype = info.cpUserInfo.cpBasic.cpBtype;
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
	},
	// 删除聊天未读消息
	delChatNum(state,info){
		let newList = [];
		for(let i=0;i<state.chatList.length;i++){
			if(state.chatList[i] != info.value){
				newList.push(state.chatList[i]);
			}
		}
		state.chatList = newList;
		state[info.title] = state.chatList.length;
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