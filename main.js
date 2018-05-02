// 引入框架
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store'
require('./index.js')

// 引入第三方
import Moment from 'moment'
import axios from 'axios'
require('./static/lib/RongImLib/RongIMLib-2.3.0.min.js')
require('./static/lib/RongImLib/RongEmoji-2.2.6.min.js')

// 引入框架css
import 'mint-ui/lib/style.css'
import './static/lib/mui/css/mui.min.css'

// 引入自定义css
import './static/css/aby.css'
import './static/css/header.css'
import './static/css/input.css'
import './static/css/cell.css'
import './static/css/order.css'
import './static/css/icon.css'

// 引入自定义js
import AbyTool from './static/js/tool.js'
import AbyApi from './static/js/aby-api.js'
import AbyIcons from './static/js/iconfont.js'
import AbyDb from './static/js/aby-db.js'




// 引入自定义组件
import AbyPage from './components/Page/Default.vue'
import AbyHeader from './components/Header/Default.vue'
import AbyPull from './components/Page/Pull.vue'
import AbyIcon from './components/Icon/Default.vue'
import AbyIconColor from './components/Icon/IconColor.vue'
import AbyFonts from './components/Fonts/Default.vue'
import AbyPicker from './components/Picker/Default.vue'
import AbyDatePicker from './components/Picker/DateTime.vue'
import AbyButton from './components/Button/Default.vue'
import AbyNavbar from './components/Navbar/Default.vue'
import AbyTab from './components/Navbar/Tab.vue'
import AbyField from './components/Field/Default.vue'
import AbyLoading from './components/Loading/Default.vue'

Vue.config.productionTip = false

// 自定义全局组件
Vue.$tool = Vue.prototype.$tool = AbyTool
Vue.$abyApi = Vue.prototype.$abyApi = AbyApi
Vue.$abyDb = Vue.prototype.$abyDb = AbyDb
Vue.component('aby-page', AbyPage)
Vue.component('aby-header', AbyHeader)
Vue.component('aby-picker', AbyPicker)
Vue.component('aby-icon',AbyIcon)
Vue.component('aby-icon-color',AbyIconColor)
Vue.component('aby-fonts',AbyFonts)
Vue.component('aby-button',AbyButton)
Vue.component('aby-navbar',AbyNavbar)
Vue.component('aby-pull',AbyPull)
Vue.component('aby-tab',AbyTab)
Vue.component('aby-field',AbyField)
Vue.component('aby-loading',AbyLoading)
Vue.component('aby-date-picker',AbyDatePicker)

require('./static/js/web.js')
//require('./static/js/app.js')

/*
 * Vue过滤器方法
 * 命名规则：filterFunName
 */
// 将数组转字符串
Vue.filter('filterListToString',function(data){
	let item = '';
	data.forEach((v,i)=>{
		item += v + ',';
	});
	return item === '' ? '未设置' : item.substr(0,item.length-1);
});
// 时间转换为标准时间（YYYY-MM-DD）
Vue.filter('filterConvertDate',function(timestamp){
	var prmdate = new Date(parseInt(timestamp));
	var nowDate = new Date();
	var nTime = new Date(parseInt(timestamp));
	var nYear = nTime.getFullYear();
	var nMonth = nTime.getMonth() + 1;
	var nDate = nTime.getDate();
	var nHour = nTime.getHours();
	var nMinute = nTime.getMinutes();
	var year = (new Date).getFullYear();
	return nYear + '-' + Vue.$tool.pad(nMonth, 2) + '-' + Vue.$tool.pad(nDate, 2);
});
// 计算时间
Vue.filter('filterConvertDateFromNow',function(date){
	Moment.locale('zh-cn');
	return Moment(date, "YYYYMMDD").fromNow();
});

new Vue({
	el: '#app',
	router,
	store,
	components: {App},
	template: '<App/>'
});

