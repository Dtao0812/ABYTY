<template>
	<span class="mui-icon" :class="iconClass"></span>
</template>

<script>
	export default {
		props: ['className','type'],
		data() {
			return {
				iconClass:'',
			}
		},
		methods: {
			showIcon(val){
				switch(val){
					case 'add':this.iconClass = 'mui-icon-plusempty ' + this.className;break;
					//店铺小图标
					case 'shop':this.iconClass = 'aby-icon-shop ' + this.className;break;
					//所在地
					case 'location':this.iconClass = 'aby-icon-location ' + this.className;break;
					//倒计时时钟
					case 'clock':this.iconClass = 'aby-icon-clock ' + this.className;break;
					//联系卖家-在线消息
					case 'message':this.iconClass = 'aby-icon-message ' + this.className;break;
											
					//询价类型图标-----------------------------------------------------------------------------
					//线路
					case 'line':this.iconClass = 'aby-icon-line ' + this.className;break;
					//导游
					case 'guide':this.iconClass = 'aby-icon-guide ' + this.className;break;
					//酒店
					case 'hotel':this.iconClass = 'aby-icon-hotel ' + this.className;break;
					//机票
					case 'pticket':this.iconClass = 'aby-icon-pticket ' + this.className;break;
					//景点门票
					case 'sticket':this.iconClass = 'aby-icon-sticket ' + this.className;break;
					//机+酒
					case 'planhotel':this.iconClass = 'aby-icon-planhotel ' + this.className;break;
					//app底部5个菜单---------------------------------------------------------------------------
					//首页
					case 'home':this.iconClass = 'aby-icon-home ' + this.className;break;
					//首页选中
					case 'home-selected':this.iconClass = 'aby-icon-home-selected ' + this.className;break;
					//消息
					case 'msg':this.iconClass = 'aby-icon-msg ' + this.className;break;
					//消息选中
					case 'msg-selected':this.iconClass = 'aby-icon-msg-selected ' + this.className;break;
					//询价
					case 'purchase':this.iconClass = 'aby-icon-purchase ' + this.className;break;
					//询价选中
					case 'purchase-selected':this.iconClass = 'aby-icon-purchase-selected ' + this.className;break;
					//订单
					case 'order':this.iconClass = 'aby-icon-order ' + this.className;break;
					//订单选中
					case 'order-selected':this.iconClass = 'aby-icon-order-selected ' + this.className;break;
					//我的
					case 'my':this.iconClass = 'aby-icon-my ' + this.className;break;
					//我的选中
					case 'my-selected':this.iconClass = 'aby-icon-my-selected ' + this.className;break;
					//我的------------------------------------------------------------------------------------
					//我的产品库
					case 'icon-myproduct':this.iconClass = 'aby-icon-myproduct ' + this.className;break;
					//我的询价
					case 'myinquiry':this.iconClass = 'aby-icon-myinquiry ' + this.className;break;
					//我的收藏
					case 'mycollection':this.iconClass = 'aby-icon-mycollection ' + this.className;break;
					//我的质保金
					case 'mygold':this.iconClass = 'aby-icon-mygold ' + this.className;break;
					//店铺二维码
					case 'mycode':this.iconClass = 'aby-icon-mycode ' + this.className;break;
					//子账号管理
					case 'account ':this.iconClass = 'aby-icon-account ' + this.className;break;
					//联系客服
					case 'service':this.iconClass = 'aby-icon-service ' + this.className;break;
					//地接角标
					case 'roleground':this.iconClass = 'aby-icon-roleground ' + this.className;break;
					//组团角标
					case 'roletravel':this.iconClass = 'aby-icon-roletravel ' + this.className;break;
					//酒店角标
					case 'rolehotel':this.iconClass = 'aby-icon-rolehotel ' + this.className;break;
					//机票角标
					case 'roleplane':this.iconClass = 'aby-icon-roleplane ' + this.className;break;
					//景点门票角标
					case 'rolespot':this.iconClass = 'aby-icon-rolespot ' + this.className;break;
					//head部分按钮图标--------------------------------------------------------------------------
					//设置
					case 'setting':this.iconClass = 'aby-icon-setting ' + this.className;break;
					//加号
					case 'plus':this.iconClass = 'aby-icon-plus ' + this.className;break;
					//搜索
					case 'search':this.iconClass = 'aby-icon-search ' + this.className;break;
					//扫码
					case 'scan':this.iconClass = 'aby-icon-scan ' + this.className;break;
					//发布采购
					case 'publishpurchase':this.iconClass = 'aby-icon-publishpurchase ' + this.className;break;
					//向下三角-实心
					case 'arrowdown':this.iconClass = 'aby-icon-arrowdown ' + this.className;break;
					//客服
					case 'hservice':this.iconClass = 'aby-icon-hservice ' + this.className;break;
					//刷新
					case 'refresh':this.iconClass = 'aby-icon-refresh ' + this.className;break;
					//清空、关闭
					case 'clear':this.iconClass = 'aby-icon-clear ' + this.className;break;
					//订单-----------------------------------------------------------------------------------
					
					//全部订单
					case 'orderall':this.iconClass = 'aby-icon-orderall ' + this.className;break;
					//待确认
					case 'orderconfirm':this.iconClass = 'aby-icon-orderconfirm ' + this.className;break;
					//待付款
					case 'orderpay':this.iconClass = 'aby-icon-orderpay ' + this.className;break;
					//待出行
					case 'ordertrip':this.iconClass = 'aby-icon-ordertrip ' + this.className;break;
					//待完成
					case 'orderfinish':this.iconClass = 'aby-icon-orderfinish ' + this.className;break;
					//待评价
					case 'orderevaluate':this.iconClass = 'aby-icon-orderevaluate ' + this.className;break;
					//退款
					case 'orderrefund':this.iconClass = 'aby-icon-orderrefund ' + this.className;break;
					//协议
					case 'orderagreement':this.iconClass = 'aby-icon-orderagreement ' + this.className;break;
					//我的协议
					case 'myagreement':this.iconClass = 'aby-icon-myagreement ' + this.className;break;
					//订单状态跟踪------------------------------------------------------------------------------
					//订单状态
					case 'circle':this.iconClass = 'aby-icon-circle ' + this.className;break;
					//订单状态-当前状态
					case 'circleselected':this.iconClass = 'aby-icon-circleselected ' + this.className;break;
					//聊天------------------------------------------------------------------------------------
					//表情
					case 'chatface':this.iconClass = 'aby-icon-chatface ' + this.className;break;
					//键盘
					case 'chatkeyboard':this.iconClass = 'aby-icon-chatkeyboard ' + this.className;break;
					//加号
					case 'chatplus':this.iconClass = 'aby-icon-chatplus ' + this.className;break;
					//相机
					case 'chatcamera':this.iconClass = 'aby-icon-chatcamera ' + this.className;break;
					//照片
					case 'chatpic':this.iconClass = 'aby-icon-chatpic ' + this.className;break;
					//聊天设置
					case 'chatsetting':this.iconClass = 'aby-icon-chatsetting ' + this.className;break;
					//发送
					case 'chatsend':this.iconClass = 'aby-icon-send ' + this.className;break;
					//注册、登录-------------------------------------------------------------------------------
					//姓名
					case 'name':this.iconClass = 'aby-icon-name ' + this.className;break;
					//姓名-白
					case 'namewhite':this.iconClass = 'aby-icon-namewhite ' + this.className;break;
					//账号
					case 'loginid':this.iconClass = 'aby-icon-loginid ' + this.className;break;
					//账号-白
					case 'loginidwhite':this.iconClass = 'aby-icon-loginidwhite ' + this.className;break;
					//身份证-白
					case 'IDwhite':this.iconClass = 'aby-icon-IDwhite ' + this.className;break;
					//密码
					case 'pwd':this.iconClass = 'aby-icon-pwd ' + this.className;break;
					//密码-白
					case 'pwdwhite':this.iconClass = 'aby-icon-pwdwhite ' + this.className;break;
					//验证码
					case 'vcode':this.iconClass = 'aby-icon-vcode ' + this.className;break;
					//验证码-白
					case 'vcodewhit':this.iconClass = 'aby-icon-vcodewhit ' + this.className;break;
					//企业名称
					case 'business':this.iconClass = 'aby-icon-business ' + this.className;break;
					//企业名称-白
					case 'businesswhite':this.iconClass = 'aby-icon-businesswhite ' + this.className;break;
					//职位
					case 'job':this.iconClass = 'aby-icon-job ' + this.className;break;
					//营业执照-白
					case 'licensewhite':this.iconClass = 'aby-icon-licensewhite ' + this.className;break;
					//酒店搜索页------------------------------------------------------------------------------
					//入住酒店所在城市
					case 'hotelcity':this.iconClass = 'aby-icon-hotelcity ' + this.className;break;
					//当前所在位置
					case 'nowlocation':this.iconClass = 'aby-icon-nowlocation ' + this.className;break;
					//分享----------------------------------------------------------------------------------
					//朋友圈
					case 'firends':this.iconClass = 'aby-icon-firends ' + this.className;break;
					//微信
					case 'wechat':this.iconClass = 'aby-icon-wechat ' + this.className;break;
					//qq空间
					case 'qqspace':this.iconClass = 'aby-icon-qqspace ' + this.className;break;
					//qq
					case 'qq':this.iconClass = 'aby-icon-qq ' + this.className;break;
					//操作按钮-------------------------------------------------------------------------------
					//减号按钮-灰
					case 'btnminus':this.iconClass = 'aby-icon-btnminus ' + this.className;break;
					//减号按钮-湖蓝
					case 'btnminus-blue':this.iconClass = 'aby-icon-btnminus-blue ' + this.className;break;
					//加号按钮-灰
					case 'btnplus':this.iconClass = 'aby-icon-btnplus ' + this.className;break;
					//加号按钮-湖蓝
					case 'btnplus-blue':this.iconClass = 'aby-icon-btnplus-blue ' + this.className;break;
					//复选框-未选中
					case 'checkbox':this.iconClass = 'aby-icon-checkbox ' + this.className;break;
					//复选框-已选中
					case 'checkbox-checked ':this.iconClass = 'aby-icon-checkbox-checked ' + this.className;break;
					//箭头-左
					case 'arrowleft':this.iconClass = 'aby-icon-arrowleft ' + this.className;break;
					//箭头-右
					case 'arrowrigh':this.iconClass = 'aby-icon-arrowrigh ' + this.className;break;
					//抢单-闪电
					case 'rob':this.iconClass = 'aby-icon-rob ' + this.className;break;
					//电话联系
					case 'call':this.iconClass = 'aby-icon-call ' + this.className;break;
					//在线联系
					case 'chat':this.iconClass = 'aby-icon-chat ' + this.className;break;
					//编辑修改按钮
					case 'edit':this.iconClass = 'aby-icon-edit ' + this.className;break;
					//启用按钮
					case 'enable':this.iconClass = 'aby-icon-enable ' + this.className;break;
					//启用按钮
					case 'forbidden':this.iconClass = 'aby-icon-forbidden ' + this.className;break;
					//在线联系-圈型
					case 'chat-circle':this.iconClass = 'aby-icon-chat-circle ' + this.className;break;
					//电话联系-圈型
					case 'call-circle':this.iconClass = 'aby-icon-call-circle ' + this.className;break;
					//删除-垃圾桶
					case 'delete':this.iconClass = 'aby-icon-delete ' + this.className;break;
					//筛选
					case 'screen':this.iconClass = 'aby-icon-screen ' + this.className;break;
					//系统消息
					case 'msgsystem':this.iconClass = 'aby-icon-msgsystem ' + this.className;break;
					//订单消息
					case 'msgorder':this.iconClass = 'aby-icon-msgorder ' + this.className;break;
					//互动消息
					case 'interaction':this.iconClass = 'aby-icon-interaction ' + this.className;break;
					//时钟
					case 'clock':this.iconClass = 'aby-icon-clock ' + this.className;break;
					//hot
					case 'hot':this.iconClass = 'aby-icon-hot ' + this.className;break;
					//分享
					case 'share':this.iconClass = 'aby-icon-share ' + this.className;break;
					//产品详情部分---------------------------------------------------------------------------
					//餐饮
					case 'dayfood':this.iconClass = 'aby-icon-dayfood ' + this.className;break;
					//住宿
					case 'dayhotel':this.iconClass = 'aby-icon-dayhotel ' + this.className;break;
					//聊天
					case 'prochat':this.iconClass = 'aby-icon-prochat ' + this.className;break;
					//收藏
					case 'procollection':this.iconClass = 'aby-icon-procollection ' + this.className;break;
					//查看主页
					case 'proshop':this.iconClass = 'aby-icon-proshop ' + this.className;break;
					
					default: this.iconClass = this.classname;
				}
			},
		},
		mounted() {
			this.showIcon(this.type);
		},
		watch:{
			type(val){
				this.showIcon(val);
			}
		}
	}
</script>

<style>
</style>