import Vue from 'vue'
import Router from 'vue-router'
import store from '../vuex/store'

Vue.use(Router)

// 自定义页面
import Page from '../components/Page/Default.vue'
import IndexPage from '../components/Page/Index.vue'
//入口页面
import Home from '../pages/Home/Home.vue'
import Purchase from '../pages/Purchase/Purchase.vue'
import Order from '../pages/Order/Order.vue'
import Message from '../pages/Message/Message.vue'
import My from '../pages/My/My.vue'
//设置
import Setting from '../pages/Setting/Setting.vue'
import SetPassword from '../pages/Setting/SetPassword.vue'
import Feedback from '../pages/Setting/Feedback.vue'
//产品
import Project from '../pages/Project/Index.vue'
//景点门票
import Sport from '../pages/Sport/Index.vue'
//酒店
import Hotel from '../pages/Hotel/Index.vue'
import HotelSearch from '../pages/Hotel/Search.vue'
//导游
import Guide from '../pages/Guide/Index.vue'
//注册登录
import Login from '../pages/Login/Login.vue'
import RegisterOne from '../pages/Register/RegisterOne.vue'
import RegisterTwo from '../pages/Register/RegisterTwo.vue'
import RegisterThree from '../pages/Register/RegisterThree.vue'
//说明页面
import PicExample from '../pages/Example/PicExample.vue'
import PicWhy from '../pages/Example/PicWhy.vue'
import PicRegisteragre from '../pages/Example/PicRegisteragre.vue'
import PicAuditType from '../pages/Example/PicAuditType.vue'
import PicAbout from '../pages/Example/PicAbout.vue'
import CityList from '../pages/Example/CityList.vue'
//采购
import PurchaseDetails from '../pages/Purchase/PurchaseDetails.vue'
import PurchasePublish from '../pages/Purchase/PurchasePublish.vue'
//订单
import OrderList from '../pages/Order/OrderList.vue'
import OrderDetails from '../pages/Order/OrderDetails.vue'
import AgrList from '../pages/Order/AgrList.vue'
import AgrDetail from '../pages/Order/AgrDetail.vue'
//退款
import RefundApply from '../pages/Refund/RefundApply.vue'
import RefundDetail from '../pages/Refund/RefundDetail.vue'
//搜索
import Search from '../pages/Search/Search.vue'
import SearchResult from '../pages/Search/Result.vue'
import SearchIndex from '../pages/Search/Index.vue'
import SearchIndexResult from '../pages/Search/IndexResult.vue'
//WebView
import WebView from '../pages/WebView/WebView.vue'

//店铺二维码
import MyCode from '../pages/My/MyCode.vue'
//子账号管理
import AccountList from '../pages/My/AccountList.vue'
//修改账户
import AccountAlter from '../pages/My/AccountAlter'
//新增子账号
import AccountAdd from '../pages/My/AccountAdd'
//账号详情
import AccountDetail from '../pages/My/AccountDetail'
//我的询价
import MyPurchase from '../pages/My/MyPurchase'
//我的询价详情
import MyPurchaseDetails from '../pages/My/MyPurchaseDetails'
//我的收藏
import MyCollection from '../pages/My/MyCollection'
//我的产品库
import MyProduct from '../pages/My/MyProduct'
//我的质保金
import MyGold from '../pages/My/MyGold.vue'

//店铺主页
import HomePage from '../pages/HomePage/HomePage.vue'
//个人资料编辑页面
import Edit from '../pages/Homepage/Edit.vue'
//消息中心
import MsgSystem from '../pages/Message/MsgSystem.vue'
import MsgDetail from '../pages/Message/MsgDetail.vue'
//聊天
import Chat from '../pages/Chat/Chat.vue'
//支付
import PayWay from '../pages/Pay/PayWay.vue'
import PayGold from '../pages/Pay/PayGold.vue'

const router = new Router({
	routes: [
	    {
			path: '/',
			component: IndexPage,
			redirect:{ name: 'home' },
			children: [
				{ name: 'home',path: '/home',component: (resolve) => require(['../pages/Home/Home.vue'], resolve) },
				{ name: 'purchase',path: '/purchase',component: Purchase },
				{ name: 'order',path: '/order',component: Order },
				{ name: 'message',path: '/message',component: Message },
				{ name: 'my',path: '/my',component: My }
			]
		},
		
		{ name: 'project',path: '/project',component: Project },
		
		{ name: 'login',path: '/login',component: Login },
		{ name: 'registerOne',path: '/registerOne',component: RegisterOne },
		{ name: 'registerTwo',path: '/registerTwo',component: RegisterTwo },
		{ name: 'registerThree',path: '/registerThree',component: RegisterThree },
		
		{ name: 'picExample',path: '/picExample',component: PicExample },
		{ name: 'picWhy',path: '/picWhy',component: PicWhy },
		{ name: 'picRegisteragre',path: '/picRegisteragre',component: PicRegisteragre },
		{ name: 'picAuditType',path: '/picAuditType',component: PicAuditType },
		{ name: 'picAbout',path: '/picAbout',component: PicAbout },
		{ name: 'cityList',path: '/cityList',component: CityList },
		
		{ name: 'purchaseDetails',path: '/purchaseDetails',component: PurchaseDetails },
		{ name: 'purchasePublish',path: '/purchasePublish',component: PurchasePublish },
		
		{ name: 'orderList',path: '/OrderList',component: OrderList },
		{ name: 'orderDetails',path: '/OrderDetails',component: OrderDetails },
		{ name: 'agrList',path: '/AgrList',component: AgrList },
		{ name: 'agrDetail',path: '/AgrDetail',component: AgrDetail },
		
		{ name: 'refundApply',path: '/RefundApply',component: RefundApply },
		{ name: 'refundDetail',path: '/RefundDetail',component: RefundDetail },
		
		{ name: 'setting',path: '/setting',component: Setting },
		{ name: 'setPassword',path: '/setPassword',component: SetPassword },
		{ name: 'feedback',path: '/Feedback',component: Feedback },
		// 我的
		{ name: 'myCode',path: '/myCode', component: MyCode},
		{ name: 'accountList',path: '/accountList', component: AccountList},
		{ name: 'accountAlter',path: '/accountAlter', component: AccountAlter},
		{ name: 'accountAdd',path: '/accountAdd', component: AccountAdd},
		{ name: 'accountDetail',path: '/accountDetail', component: AccountDetail},
		{ name: 'myPurchase',path: '/myPurchase', component: MyPurchase},
		{ name: 'myPurchaseDetails',path: '/myPurchaseDetails', component: MyPurchaseDetails},
		{ name: 'myCollection',path: '/myCollection', component: MyCollection},
		{ name: 'myProduct',path: '/myProduct', component: MyProduct},
		{ name: 'myGold',path: '/MyGold', component: MyGold},
		{ name: 'edit',path: '/edit', component: Edit},
		// 搜索
		{ name: 'search',path: '/search',component: Search },
		{ name: 'searchResult',path: '/searchResult',component: SearchResult },
		{ name: 'searchIndex',path: '/searchIndex',component: SearchIndex },
		{ name: 'searchIndexResult',path: '/searchIndexResult',component: SearchIndexResult },
		// 酒店
		{ name: 'hotel',path: '/hotel',component: Hotel },
		{ name: 'hotelSearch',path: '/hotelSearch',component: HotelSearch },
		
		{ name: 'sport',path: '/sport',component: Sport },
		
		{ name: 'guide',path: '/guide',component: Guide },
		
		{ name: 'webView',path: '/webView',component: WebView },
		
		{ name: 'homePage',path: '/HomePage',component: HomePage },
		
		{ name: 'msgSystem',path: '/MsgSystem',component: MsgSystem },
		{ name: 'msgDetail',path: '/MsgDetail',component: MsgDetail },
		
		//聊天
		{ name: 'chat',path: '/Chat',component: Chat },
		//支付
		{ name: 'payWay',path: '/PayWay',component: PayWay },
		{ name: 'payGold',path: '/PayGold',component: PayGold },
	]
})

router.beforeEach((to, from, next) => {
	/*判断页面是否需要缓存*/
	//缓存页面
	const keepAliveAarrt = 
		[
		 	'home','purchase','order','message','my',
		 	'orderList','orderDetails','searchIndexResult','searchResult',
		 	'agrList','chat','purchaseDetails','payWay'
        ]; 
	const fromKeepAlive = Vue.$tool.isInAarry(keepAliveAarrt, from.name);
	const toKeepAlive = Vue.$tool.isInAarry(keepAliveAarrt, to.name);
	if(fromKeepAlive && toKeepAlive) {
		from.meta.noKeepAlive = false
		to.meta.noKeepAlive = false
	} else if(fromKeepAlive && !toKeepAlive) {
		from.meta.noKeepAlive = false
		to.meta.noKeepAlive = true
	}else if(!fromKeepAlive && toKeepAlive){
		from.meta.noKeepAlive = true
		to.meta.noKeepAlive = false
	}else{
		from.meta.noKeepAlive = true
		to.meta.noKeepAlive = true
	}
	
	/*判断调页面切换效果*/
	let routeLength = store.state.routeChain.length;
    if (routeLength === 0) {
        store.commit('setPageDirection', 'fade');
        if (to.path === from.path && to.path === '/') {
            //当直接打开根路由的时候
            store.commit('addRouteChain', to);
        } else {
            //直接打开非根路由的时候其实生成了两个路径，from其实就是根路由
            store.commit('addRouteChain', from);
            store.commit('addRouteChain', to);
        }
    } else if (routeLength === 1) {
    	store.commit('popRouteChain');
        store.commit('setPageDirection', 'slide-right');
        store.commit('addRouteChain', to);
    } else {
        let lastBeforeRoute = store.state.routeChain[routeLength-2];
        if (lastBeforeRoute.path === to.path) {
            store.commit('popRouteChain');
            store.commit('setPageDirection', 'slide-left');
        } else {
            store.commit('addRouteChain', to);
            store.commit('setPageDirection', 'slide-right');
        }
    }
    
    store.commit('setStateInfo',{title:'tabActive',value:to.name});
	/*判断是否有权限访问*/
	const userNotAuth = [
		'index', 'home', 'purchase',
		'login','registerOne','registerTwo','registerThree','setPassword',
		'picExample','picWhy','picRegisteragre','picAuditType',
	];//不需要验证的页面
	
	if(!Vue.$tool.isInAarry(userNotAuth, to.name)){
		// 判断是否登录
		if(!store.state.loginState){
			store.commit('delRouteChain', from);
			next({ name: 'login' })
		}else if(store.state.cpBasic === '' || store.state.cpBasic.cpAuditState !== '1'){
			store.commit('delRouteChain', from);
			next({ name: 'picAuditType' })
		}else{
			setTimeout(function(){next()},50);
		}
	}else{
		// 延迟跳转
		setTimeout(function(){next()},50);
	}
})

export default router