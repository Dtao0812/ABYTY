import Vue from 'vue'
import store from '../../vuex/store'
import router from '../../router'

var plusFun = function() {
	plus.screen.lockOrientation("portrait-primary"); //禁止横屏显示
	
	//是Android端
	if(Vue.$tool.browser.versions.android) {
		window.localStorage.setItem('osType', 1);
		store.commit('setStateInfo', {
			title: 'osType',
			value: 1
		})
	}
	//是ios端
	if(Vue.$tool.browser.versions.ios) {
		window.localStorage.setItem('osType', 2);
		store.commit('setStateInfo', {
			title: 'osType',
			value: 2
		})
	}

	/*设备id*/
	window.localStorage.setItem('deviceid', plus.push.getClientInfo().clientid);
	store.commit('setStateInfo', {
		title: 'deviceid',
		value: plus.push.getClientInfo().clientid
	})

	/*版本号*/
	plus.runtime.getProperty(plus.runtime.appid, function(wgtinfo) {
		window.localStorage.setItem('version', wgtinfo.version);
		store.commit('setStateInfo', {
			title: 'version',
			value: wgtinfo.version
		})
	});

	// android返回键监听
	var androidBackFirst = null;
	plus.key.addEventListener('backbutton', function() {
		var index = ['index', 'home', 'purchase', 'order', 'message', 'my'];
		if(Vue.$tool.isInAarry(index, store.state.tabActive)) {
			console.log(1)
			// 判断是否首页框架
			if(!androidBackFirst) {
				androidBackFirst = new Date().getTime(); //记录第一次按下回退键的时间
				Vue.$toast('再按一次退出应用'); //给出提示
				setTimeout(function() { //1s中后清除
					androidBackFirst = null;
				}, 1000);
			} else {
				//如果两次按下的时间小于1s，就退出app
				if(new Date().getTime() - androidBackFirst < 1000) plus.runtime.quit();
			}
		} else {
			Vue.$router.back();
		}
	}, false);

	//推送通知栏点击事件(app关闭时)
	plus.push.addEventListener("click", function(msg) {
		if(msg.payload.msgType) {
			var jsonStr = JSON.stringify(msg.payload.params);
			var jsonObj = JSON.parse(jsonStr);
			if(msg.payload.msgType == "msgcenter") {
				Vue.$abyApi.Sys.getMsgList();
			}else if(msg.payload.msgType == 'select') {
				// 询价
				Vue.$router.push({
					name:'purchase'
				});
			}else if(msg.payload.msgType == 'system') {
				// 系统消息
				this.$abyDb.Msg.init((res)=>{
					this.$abyApi.Sys.getMsgList();
					this.$abyApi.Sys.getMsgNum();
				});
			}else if(msg.payload.msgType == 'hotel_order') {
				// 订单消息
				this.$abyApi.Order.getNum('buyer');
				if(this.$store.state.cpBtype != 10)this.$abyApi.Order.getNum('seller');
			}
		}
	}, false);

	//推送消息接收 (app打开时)
	plus.push.addEventListener("receive", function(msg) {
		if(msg.payload.msgType) {
			var jsonStr = JSON.stringify(msg.payload.params);
			var jsonObj = JSON.parse(jsonStr);
			if(msg.payload.msgType == 'msgcenter') {
				Vue.$abyApi.Sys.getMsgList();
			}else if(msg.payload.msgType == 'select') {
				// 询价
			}else if(msg.payload.msgType == 'system') {
				// 系统消息
				this.$abyDb.Msg.init((res)=>{
					this.$abyApi.Sys.getMsgList();
					this.$abyApi.Sys.getMsgNum();
				});
			}else if(msg.payload.msgType == 'hotel_order') {
				// 订单消息
				this.$abyApi.Order.getNum('buyer');
				if(this.$store.state.cpBtype != 10)this.$abyApi.Order.getNum('seller');
			}
		}
	});
	
	//监听后台切到前台
	document.addEventListener("resume", function() {
		Vue.$abyApi.User.autoLogin((res)=>{
			// 初始化数据库和融云服务器
			Vue.$abyDb.Im.init((res) => {
				Vue.$abyApi.Chat.getNotReadMsg();
				// 初始化融云
				Vue.$abyApi.Chat.init();
				// 接受融云消息
				Vue.$abyApi.Chat.setReceiveMsgListener();
			});
			// 初始化系统消息
			Vue.$abyDb.Msg.init((res)=>{
				Vue.$abyApi.Sys.getMsgList();
				Vue.$abyApi.Sys.getMsgNum();
			})
			// 初始化订单消息
			if(Vue.$store.state.cpBtype != 10)Vue.$abyApi.Order.getNum('seller');
			Vue.$abyApi.Order.getNum('buyer');
		});
	}, false);
};

if(window.plus) {
	plusFun();
} else { // 兼容老版本的plusready事件
	document.addEventListener('plusready', function() {
		plusFun();
	}, false);
}