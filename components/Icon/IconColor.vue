<template>
	<svg class="icon" aria-hidden="true">
		<use :xlink:href="iconClass"></use>
	</svg>
</template>

<script>
	export default {
		components: {},
		props: ['type'],
		data() {
			return {
				iconClass: '',
			}
		},
		methods: {
			icon(type) {
				switch(type) {
					//询价类型图标-----------------------------------------------------------------------------
					case 'line':
						this.iconClass = '#icon-xianlu';
						break;
						//导游
					case 'guide':
						this.iconClass = '#icon-aby-icon-guide';
						break;
						//酒店
					case 'hotel':
						this.iconClass = '#icon-jiudian';
						break;
						//机票
					case 'pticket':
						this.iconClass = '#icon-jipiao';
						break;
						//景点门票
					case 'sticket':
						this.iconClass = '#icon-menpiao';
						break;
						//机+酒
					case 'planhotel':
						this.iconClass = '#icon-jijiu';
						break;
						//app底部5个菜单---------------------------------------------------------------------------
						//首页
					case 'home':
						this.iconClass = '#icon-zhuye';
						break;
						//首页选中
					case 'home-selected':
						this.iconClass = '#icon-shouyexuanzhong';
						break;
						//消息
					case 'msg':
						this.iconClass = '#icon-zaixianfuwu-xian';
						break;
						//消息选中
					case 'msg-selected':
						this.iconClass = '#icon-zaixianfuwu-mian';
						break;
						//询价
					case 'purchase':
						this.iconClass = '#icon-xunjia';
						break;
						//询价选中
					case 'purchase-selected':
						this.iconClass = '#icon-xunjia-xuanzhong';
						break;
						//订单
					case 'order':
						this.iconClass = '#icon-dingdan-xian';
						break;
						//订单选中
					case 'order-selected':
						this.iconClass = '#icon-dingdan-mian';
						break;
						//我的
					case 'my':
						this.iconClass = '#icon-wode-xian';
						break;
						//我的选中
					case 'my-selected':
						this.iconClass = '#icon-wode-mian';
						break;
						//我的------------------------------------------------------------------------------------
						//我的产品库
					case 'myproduct':
						this.iconClass = '#icon-wodechanpinkugai';
						break;
						//我的询价
					case 'myinquiry':
						this.iconClass = '#icon-wodexunjiagai';
						break;
						//我的收藏
					case 'mycollection':
						this.iconClass = '#icon-wodeshoucanggai';
						break;
						//我的质保金
					case 'mygold':
						this.iconClass = '#icon-wodezhibaojingai';
						break;
						//店铺二维码
					case 'mycode':
						this.iconClass = '#icon-dianpuerweimagai';
						break;
						//子账号管理
					case 'account':
						this.iconClass = '#icon-zizhanghaoguanligai';
						break;
						//联系客服
					case 'service':
						this.iconClass = '#icon-lianxikefugai';
						break;
						//地接角标
					case 'roleground':
						this.iconClass = '#icon-dijieshe';
						break;
						//组团角标
					case 'roletravel':
						this.iconClass = '#icon-zutuanshe';
						break;
						//酒店角标
					case 'rolehotel':
						this.iconClass = '#icon-jiudian1';
						break;
						//机票角标
					case 'roleplane':
						this.iconClass = '#icon-jipiao1'
						break;
						//景点门票角标
					case 'rolespot':
						this.iconClass = '#icon-jingdianmenpiao';
						break;
						//head部分按钮图标--------------------------------------------------------------------------
						//设置
					case 'setting':
						this.iconClass = '#icon-shezhi';
						break;
						//加号
					case 'plus':
						this.iconClass = '#icon-guifanjiahao';
						break;
						//搜索
					case 'search':
						this.iconClass = '#icon-sousuo';
						break;
						//扫码
					case 'scan':
						this.iconClass = '#icon-saoyisao';
						break;
						//发布采购
					case 'publishpurchase':
						this.iconClass = '#icon-fabucaigou';
						break;
						//向下三角-实心
					case 'arrowdown':
						this.iconClass = '#icon-xiangxia-';
						break;
						//客服
					case 'hservice':
						this.iconClass = '#icon-kefu';
						break;
						//刷新
					case 'refresh':
						this.iconClass = '#icon-huanyipi';
						break;
						//清空、关闭
					case 'clear':
						this.iconClass = '#icon-guanbi';
						break;
						//订单-----------------------------------------------------------------------------------

						//全部订单
					case 'orderall':
						this.iconClass = '#icon-quanbudingdan';
						break;
						//待确认
					case 'orderconfirm':
						this.iconClass = '#icon-daiqueren';
						break;
						//待付款
					case 'orderpay':
						this.iconClass = '#icon-daifukuan';
						break;
						//待出行
					case 'ordertrip':
						this.iconClass = '#icon-daichuhang';
						break;
						//待完成
					case 'orderfinish':
						this.iconClass = '#icon-daiwancheng';
						break;
						//待评价
					case 'orderevaluate':
						this.iconClass = '#icon-daipingjia';
						break;
						//退款
					case 'orderrefund':
						this.iconClass = '#icon-tuikuan';
						break;
						//协议
					case 'orderagreement':
						this.iconClass = '#icon-xieyiwenjian';
						break;
						//我的协议
					case 'myagreement':
						this.iconClass = '#icon-xieyi';
						break;
						//订单状态跟踪------------------------------------------------------------------------------
						//订单状态
					case 'circle':
						this.iconClass = '#icon-dingdangenzong';
						break;
						//订单状态-当前状态
					case 'circleselected':
						this.iconClass = '#icon-dingdangenzong1';
						break;
						//聊天------------------------------------------------------------------------------------
						//表情
					case 'chatface':
						this.iconClass = '#icon-liaotianbiaoqing';
						break;
						//键盘
					case 'chatkeyboard':
						this.iconClass = '#icon-jianpan';
						break;
						//加号
					case 'chatplus':
						this.iconClass = '#icon-liaotianjiahao';
						break;
						//相机
					case 'chatcamera':
						this.iconClass = '#icon-xiangji';
						break;
						//照片
					case 'chatpic':
						this.iconClass = '#icon-tupian';
						break;
						//聊天设置
					case 'chatsetting':
						this.iconClass = '#icon-liaotianyoushangjiao';
						break;
						//发送
					case 'chatsend':
						this.iconClass = '#icon-fasong1';
						break;
						//注册、登录-------------------------------------------------------------------------------
						//姓名
					case 'name':
						this.iconClass = '#icon-zengjiazizhanghaoxingming';
						break;
						//姓名-白
					case 'namewhite':
						this.iconClass = '#icon-xingming';
						break;
						//账号
					case 'loginid':
						this.iconClass = '#icon-zengjiazizhanghaoshoujihao';
						break;
						//账号-白
					case 'loginidwhite':
						this.iconClass = '#icon-shoujihao';
						break;
						//身份证-白
					case 'IDwhite':
						this.iconClass = '#icon-shenfenzheng';
						break;
						//密码
					case 'pwd':
						this.iconClass = '#icon-zengjiazizhanghaomima';
						break;
						//密码-白
					case 'pwdwhite':
						this.iconClass = '#icon-mima';
						break;
						//验证码
					case 'vcode':
						this.iconClass = '#icon-zengjiazizhanghaoyanzhengma';
						break;
						//验证码-白
					case 'vcodewhit':
						this.iconClass = '#icon-yanzhengma';
						break;
						//企业名称
					case 'business':
						this.iconClass = '#icon-gongsi';
						break;
						//企业名称-白
					case 'businesswhite':
						this.iconClass = '#icon-qiyemingcheng';
						break;
						//职位
					case 'job':
						this.iconClass = '#icon-zengjiazizhanghaozhiwei';
						break;
						//营业执照-白
					case 'licensewhite':
						this.iconClass = '#icon-yingyezhizhao';
						break;
						//酒店搜索页------------------------------------------------------------------------------
						//入住酒店所在城市
					case 'hotelcity':
						this.iconClass = '#icon-jiudiandangqianchengshi';
						break;
						//当前所在位置
					case 'nowlocation':
						this.iconClass = '#icon-dingwei';
						break;
						//分享----------------------------------------------------------------------------------
						//朋友圈
					case 'firends':
						this.iconClass = '#icon-pengyouquan';
						break;
						//微信
					case 'wechat':
						this.iconClass = '#icon-weixin';
						break;
						//qq空间
					case 'qqspace':
						this.iconClass = '#icon-qqkongjian';
						break;
						//qq
					case 'qq':
						this.iconClass = '#icon-QQ';
						break;
						//操作按钮-------------------------------------------------------------------------------
						//减号按钮-灰
					case 'btnminus':
						this.iconClass = '#icon-xuanzejianhaobukedian';
						break;
						//减号按钮-湖蓝
					case 'btnminus-blue':
						this.iconClass = '#icon-xuanzejianhaokedian';
						break;
						//加号按钮-灰
					case 'btnplus':
						this.iconClass = '#icon-xuanzejiahaobukedian';
						break;
						//加号按钮-湖蓝
					case 'btnplus-blue':
						this.iconClass = '#icon-xuanzejiahaokedian';
						break;
						//复选框-未选中
					case 'checkbox':
						this.iconClass = '#icon-weigouxuan';
						break;
						//复选框-已选中
					case 'checkbox-checked':
						this.iconClass = '#icon-gouxuan';
						break;
						//箭头-左
					case 'arrowleft':
						this.iconClass = '#icon-xiangzuojiantou';
						break;
						//箭头-右
					case 'arrowrigh':
						this.iconClass = '#icon-xiangyoujiantou';
						break;
						//抢单-闪电
					case 'rob':
						this.iconClass = '#icon-qiangdan';
						break;
						//电话联系
					case 'call':
						this.iconClass = '#icon-dianhualianxi';
						break;
						//在线联系
					case 'chat':
						this.iconClass = '#icon-zaixianlianxi';
						break;
						//编辑修改按钮
					case 'edit':
						this.iconClass = '#icon-xiugai';
						break;
						//启用按钮
					case 'enable':
						this.iconClass = '#icon-qiyong';
						break;
						//禁用按钮
					case 'forbidden':
						this.iconClass = '#icon-tingyong';
						break;
						//在线联系-圈型
					case 'chat-circle':
						this.iconClass = '#icon-xinxi';
						break;
						//电话联系-圈型
					case 'call-circle':
						this.iconClass = '#icon-dianhua';
						break;
						//删除-垃圾桶
					case 'delete':
						this.iconClass = '#icon-shanchu';
						break;
						//筛选
					case 'screen':
						this.iconClass = '#icon-shaixuan';
						break;
						//系统消息
					case 'msgsystem':
						this.iconClass = '#icon-shezhifuben';
						break;
						//订单消息
					case 'msgorder':
						this.iconClass = '#icon-wodedingdan';
						break;
						//互动消息
					case 'interaction':
						this.iconClass = '#icon-hudong';
						break;
						//时钟
					case 'clock':
						this.iconClass = '#icon-shizhong';
						break;	

					default:
						this.iconClass = this.classname;
				}
			}
		},
		mounted() {
			this.icon(this.type)
		},
		watch: {
			type(val) {
				this.icon(val)
			}
		}
	}
</script>

<style>

</style>