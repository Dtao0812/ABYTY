import Vue from 'vue'
import store from '../../vuex/store'
import router from '../../router'

var plusFun = function(){
	//是Android端
	if(Vue.$tool.browser.versions.android){
		window.localStorage.setItem('osType',1);
		store.commit('setStateInfo',{title:'osType',value:1})
	} 
	//是ios端
	if(Vue.$tool.browser.versions.ios){ 
		window.localStorage.setItem('osType',2);
		store.commit('setStateInfo',{title:'osType',value:2})
	}

	/*设备id*/
	window.localStorage.setItem('deviceid',plus.push.getClientInfo().clientid);
	store.commit('setStateInfo',{title:'deviceid',value:plus.push.getClientInfo().clientid})

	/*版本号*/
	plus.runtime.getProperty(plus.runtime.appid, function(wgtinfo) {
		window.localStorage.setItem('version',wgtinfo.version);
		store.commit('setStateInfo',{title:'version',value:wgtinfo.version})
	});
	
	var AVCaptureDevice = plus.ios.importClass("AVCaptureDevice");
	var Status = AVCaptureDevice.authorizationStatusForMediaType("vide");
	if(3 != Status) {
		Vue.$tool.confirm('请在【设置->隐私->相机】中设置允许使用相机', (e)=> {
			Vue.$router.back();
		});
	}
	
	// android返回键监听
	var androidBackFirst = null;
	plus.key.addEventListener("backbutton", function() {
		var index = ['index', 'home', 'purchase', 'order','message', 'my'];
		if(Vue.$tool.isInAarry(index, store.state.tabActive)){
			// 判断是否首页框架
			if(!androidBackFirst){
				androidBackFirst = new Date().getTime();//记录第一次按下回退键的时间
		        Vue.$toast('再按一次退出应用');//给出提示
		        setTimeout(function() {//1s中后清除
		            androidBackFirst = null;
		        }, 1000);
			}else{
				//如果两次按下的时间小于1s，就退出app
				if(new Date().getTime() - androidBackFirst < 1000)plus.runtime.quit();
			}
		}else{
			 router.back();
		}
	});
};

if(window.plus) {
	plusFun();
} else { // 兼容老版本的plusready事件
	document.addEventListener('plusready', function() {
		plusFun();
	}, false);
}
