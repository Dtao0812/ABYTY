// 引入框架
import Vue from 'vue'
import axios from 'axios'
import store from '../../vuex/store'

// 引入自定义
import cryptoJS from '../lib/crypt/crypto-js.js'

/******************************      公共函数       *****************************/
// 加密函数
const authKey = '@WSXvfr4^YHN,ki8';
const authVi = '!QAZCDE#5tgbmju7';
// 融云key
const RongIMKey = '6tnym1brnxe97';
// 服务器地址
//const AbyUrl = 'http://114.215.202.155/';
const AbyUrl = 'http://www.ai-by.com/';

// axios配置
axios.defaults.baseURL = AbyUrl + 'aby/';
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';

// 拦截器 - 请求前
axios.interceptors.request.use(function(response) {
	if(response.data.loading !== 1) Vue.$tool.loading(response.data.loadTitle || '加载中...');

	// 对响应数据做点什么
	response.data.osType = store.state.osType;
	response.data.deviceId = store.state.deviceId;
	response.data.version = store.state.version;
	response.data.user_token = store.state.user_token;
	response.data = 'data=' + JSON.stringify(response.data);
	return response;
});
// 拦截器 - 请求后
axios.interceptors.response.use(function(response) {
	Vue.$tool.loadingClose();

	return response;
}, function(err) {
	console.log(err)
	Vue.$tool.loadingClose();
	Vue.$tool.toast('连接超时');
});

/******************************      Server 请求方法       *****************************/

const Server = {
	// 通用请求服务器接口
	getDataFromServer(apiName, data, successCallback, errorCallback) {
		axios.post(apiName, data)
			.then(res => {
				if(res.status === 200 || res.status === 304) {
					if(res.data.errorcode === 0) {
						successCallback && successCallback(res.data);
					} else {
						if(data.loading != 1) Vue.$tool.toast(res.data.msg);
						errorCallback && errorCallback(res.data.msg);
					}
				} else {
					Vue.$tool.toast('连接超时！')
					errorCallback && errorCallback('连接超时！');
				}
			})
			.catch(err => {
				console.log(err)
				errorCallback && errorCallback(err);
			})
	},
	// 上传文件接口（手机app）
	UploadFileByApp(apiName, files, data, sucesscallback, errorcallback, uploadingcallback) {
		let apiUrl = AbyUrl + 'aby/' + apiName;
		let task = plus.uploader.createUpload(apiUrl, {
				method: "POST"
			},
			function(t, status) { //上传完成 
				if(status == 200) {
					let rtndata = JSON.parse(t.responseText);
					if(rtndata.errorcode == 0) {
						sucesscallback && sucesscallback(rtndata);
					} else {
						errorcallback && errorcallback(rtndata.msg);
					}
				} else {
					Vue.$tool.toast('上传文件失败' + status)
					errorcallback && errorcallback('上传文件失败' + status);
				}
			}
		);
		task.addData("data", JSON.stringify(data, null, 4));
		for(let i = 0; i < files.length; i++) {
			let f = files[i];
			task.addFile(f.path, {
				key: f.name
			});
		}
		task.addEventListener("statechanged", function(upload, num) {
			uploadingcallback && uploadingcallback(upload.uploadedSize, upload.totalSize);
		}, false);
		try{
			task.start();
		}catch(e){
			console.log(e)
		}
	},
	// 获得java支付接口
	getDataFromServerPayment(apiName, data, successCallback, errorCallback) {
		let instance = axios.create({
			baseURL: AbyUrl + 'stOrderWebApi/',
			timeout: 1000,
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			}
		});
		data.osType = store.state.osType;
		data.deviceId = store.state.deviceId;
		data.version = store.state.version;
		data.user_token = store.state.user_token;
		// 拦截器 - 请求前
		instance.interceptors.request.use(function(response) {
			if(JSON.parse(response.data).loading != 1) Vue.$tool.loading(response.data.loadTitle || '加载中...');

			// 对响应数据做点什么
			return response;
		});
		// 拦截器 - 请求后
		instance.interceptors.response.use(function(response) {
			Vue.$tool.loadingClose();
			return response;
		}, function(err) {
			console.log(err)
			Vue.$tool.loadingClose();
			Vue.$tool.toast('连接超时');
		});
		instance.post(apiName, JSON.stringify(data))
			.then(res => {
				if(res.status === 200 || res.status === 304) {
					if(res.data.errorcode == 0) {
						successCallback && successCallback(res.data);
					} else {
						Vue.$tool.toast(res.data.msg);
						errorCallback && errorCallback(res.data.msg);
					}
				} else {
					Vue.$tool.toast('连接超时！')
					errorCallback && errorCallback('连接超时！');
				}
			})
			.catch(err => {
				console.log(err)
				errorCallback && errorCallback(err);
			})
	},
};

/******************************      Image 图片模块       *****************************/
const Image = {
	compressImage(src, dst, overwrite, quality, sucessCallback, errorCallBack){
		plus.zip.compressImage({
				src: src,
				dst: dst,
				overwrite: overwrite,
				quality: quality
			},
			function(e) {
				sucessCallback && sucessCallback(e);
			},
			function(error) {
				errorCallBack && errorCallBack(false);
			});
	}
}

/******************************      General 通用模块       *****************************/

const General = {
	showMenu: false,
	mode: 'main-move',
	menu: null,
	shares: null,
	/*获取banner图
	 *pageType: //页面类型  1.app首页   2.线路首页   3.酒店首页   4.景点首页
	 */
	getBanner(pageType, successCallback, errorCallback) {
		let requestData = {
			act: 'CPD100',
			pageType: pageType,
			loading: 1,
		};
		Server.getDataFromServer('cpDict', requestData, successCallback, errorCallback);
	},
	downLoadFile(webUrl, localFilename, sucesscallback, errorcallback){
		let dtask = plus.downloader.createDownload(webUrl, {
			filename: '_doc/download/' + localFilename
		}, function(d, status) {
			//下载完成
			if(status == 200) {
				sucesscallback(d.filename);
			} else {
				sucesscallback('_www/logo.png');
			}
		});
		dtask.start();
	},
	shareAction(id, ex, bhref, href, thumburl, sharehrefTitle, sharehrefDes, shareInfo){
		var s = null;
		if(!id || !(s = shares[id])) {
			return;
		}
		if(s.authenticated) {
			General.shareMessage(s, ex, bhref, href, thumburl, sharehrefTitle, sharehrefDes, shareInfo);
		} else {
			s.authorize(function() {
				General.shareMessage(s, ex, bhref, href, thumburl, sharehrefTitle, sharehrefDes, shareInfo);
			}, function(e) {
				Vue.$toast("认证授权失败");
			});
		}
	},
	shareMessage(s, ex, bhref, href, thumburl, sharehrefTitle, sharehrefDes, shareInfo){
		let msg = {
			content: '呱啦啦同业-专业同业平台',
			extra: {
				scene: ex
			}
		};
		if(bhref) {
			msg.href = href;
			if(sharehrefTitle) {
				msg.title = sharehrefTitle;
			}
			if(sharehrefDes) {
				msg.content = sharehrefDes;
			}
			msg.thumbs = [thumburl];
			msg.pictures = [thumburl];
		} else {
			if(sharehrefDes) {
				msg.content = sharehrefDes + href;
			}
			msg.pictures = [thumburl];
		}
		s.send(msg, function() {
			Vue.$toast("分享到\"" + s.description + "\"成功");
		}, function(e) {
			Vue.$toast("分享到\"" + s.description + "\"失败");
		});
	},
};

/******************************      Crypto 加密模块       *****************************/

const Crypto = {
	//加密函数
	EnCrypt(data) {
		let key = cryptoJS.CryptoJS.enc.Latin1.parse(authKey);
		let iv = cryptoJS.CryptoJS.enc.Latin1.parse(authVi);
		let encrypted = cryptoJS.CryptoJS.AES.encrypt(data, key, {
			iv: iv,
			mode: cryptoJS.CryptoJS.mode.CBC,
			padding: cryptoJS.CryptoJS.pad.ZeroPadding
		});
		return encrypted.toString();
	},
	//解密函数
	DeCrypt(enCryptdata) {
		let key = cryptoJS.CryptoJS.enc.Latin1.parse(authKey);
		let iv = cryptoJS.CryptoJS.enc.Latin1.parse(authVi);
		let decrypted = cryptoJS.CryptoJS.AES.decrypt(enCryptdata, key, {
			iv: iv,
			padding: cryptoJS.CryptoJS.pad.ZeroPadding
		});
		return decrypted.toString(cryptoJS.CryptoJS.enc.Utf8);
	},
	// md5
	MD5(data) {
		return cryptoJS.CryptoJS.MD5(data).toString();
	}
}

/******************************      Sys 系统参数       *****************************/

const Sys = {
	getDict(dicType, dicPValue, successCallback, errorCallback) {
		let requestData = {
			loading: 1,
			act: 'S0004',
			dicType: dicType,
			dicPValue: dicPValue
		};
		Server.getDataFromServer('sysdict', requestData, successCallback, errorCallback);
	},
	// 获得消息列表
	getMsgList(msgType, successCallback, errorCallback) {
		let requestData = {
			loading: 1,
			act: 'CPG001',
			msgType: msgType,
		};
		Server.getDataFromServer('cpMsgCenter', requestData, (rtn) => {
			if(rtn.msgList.length > 0) {
				// 保存本地消息
				for(let i = 0, len = rtn.msgList.length; i < len; i++) {
					Vue.$abyDb.Msg.insert(rtn.msgList[i]);
				}
				Sys.getMsgNum();
			}
			successCallback && successCallback(rtn)
		}, errorCallback);
	},
	// 获得消息数
	getMsgNum() {
		Vue.$abyDb.Msg.get((res) => {
			if(res && res.value.isRead == 0) {
				let info = {}
				info.title = res.value.msgType;
				info.value = res.value.msgId;
				store.commit("setMsgNum", info);
			}
		}, (e) => {
			console.log(e)
		})
	},
	// 获取本地消息列表
	getMsgListLoad(successCallback, errorCallback) {
		let list = [];
		Vue.$abyDb.Msg.get((res) => {
			if(res) {
				list.push(res.value);
			}
		}, (e) => {
			console.log(e)
			errorCallback && errorCallback(e)
		})
		successCallback && successCallback(list);
	},
	// 意见反馈
	setFeedContent(requestInfo, successCallback, errorCallback) {
		let requestData = {
			act: 'CPAD0000',
			adviceInfo: requestInfo,
		};
		Server.getDataFromServer('cpUser', requestData, successCallback, errorCallback);
	},
	// 开屏广告
	getAdvInfo(requestInfo, successCallback, errorCallback) {
		let requestData = {
			loading: 1,
			act: 'CPI102',
		};
		Server.getDataFromServer('cpIndex', requestData, successCallback, errorCallback);
	},
};

/******************************      Pay 支付模块       *****************************/
const Pay = {
	// 支付保证金
	payDeposit(requestInfo, successCallback, errorCallback) {
		if(requestInfo.channelid != 'alipay' && requestInfo.channelid != 'wxpay') {
			Vue.$toast("不支持此支付方式");
			return;
		}
		let requestData = {
			act: 'P0002',
			cpId: store.state.cpId,
			payType: requestInfo.payType,
			orderInfo: requestInfo.orderInfo
		};
		Server.getDataFromServer('cpPayment', requestData, successCallback, errorCallback);
	},
};

/******************************      User 用户模块       *****************************/

const User = {
	// 登录 - 帐号密码
	doLogin(requestInfo, successCallback, errorCallback) {
		let requestData = {
			loading: requestInfo.loading,
			act: 'CPU001',
			loginId: requestInfo.loginId,
			loginPwd: requestInfo.loginPwd
		};
		Server.getDataFromServer('cpUser', requestData, function(rtn) {
			store.commit('setUserInfo', rtn);
			successCallback && successCallback(rtn);
		}, errorCallback);
	},
	// 登录 - 自动登录（user_token）
	autoLogin(successCallback, errorCallback) {
		let requestData = {
			act: 'CPU002',
			loading: 1,
		};
		Server.getDataFromServer('cpUser', requestData, function(rtn) {
			store.commit('setUserInfo', rtn);
			window.localStorage.setItem('user_token',rtn.user_token);
			successCallback && successCallback(rtn);
		}, function(err) {
			store.commit('clearState');
			errorCallback && errorCallback(err)
		});
	},
	// 获取验证码
	getVerificationCode(requestInfo, successCallback, errorCallback) {
		let requestData = {
			loading: requestInfo.loading,
			act: 'CPU000',
			userPhone: requestInfo.userPhone,
			smsType: requestInfo.smsType
		};
		Server.getDataFromServer('cpUser', requestData, successCallback, errorCallback);
	},
	// 修改登录密码
	setLoginPwd(requestInfo, successCallback, errorCallback) {
		let requestData = {
			loading: requestInfo.loading,
			act: 'CPU004',
			loginId: requestInfo.loginId,
			loginPwd: requestInfo.loginPwd,
			verifyCode: requestInfo.verifyCode
		};
		Server.getDataFromServer('cpUser', requestData, successCallback, errorCallback);
	},
	// 简单注册
	setRegister(requestInfo, successCallback, errorCallback) {
		let requestData = {
			loading: requestInfo.loading,
			act: 'CPU080',
			cpUserInfo: {
				userPhone: requestInfo.userPhone,
				userPassword: requestInfo.userPassword
			}
		};
		Server.getDataFromServer('cpUser', requestData, (rtn) => {
			successCallback && successCallback(rtn);
		}, errorCallback);
	},
	// 提交认证
	setUserUploadCred(requestInfo, callBack) {
		let requestData = {
			loading: requestInfo.loading,
			act: 'CPU081',
			osType : store.state.osType,
			deviceId : store.state.deviceId||'xxxx',
			version : store.state.version,
			user_token : store.state.user_token,
			cpBasic: {
				cpId: requestInfo.cpBasic.cpId,
				cpBtype: requestInfo.cpBasic.cpBtype,
				cpName: requestInfo.cpBasic.cpName,
				cpChartered: requestInfo.cpBasic.cpChartered,
				cpCorpName: requestInfo.cpBasic.cpCorpName,
				cpCorpID: requestInfo.cpBasic.cpCorpID
			}
		};
		let files = [];
		for(let i = 0; i < requestInfo.files.length; i++) {
			if(requestInfo.files[i].src.substr(0, 4) != "http") {
				files.push({
					name: requestInfo.files[i].id,
					path: requestInfo.files[i].src
				});
			}
		}
		//执行提交任务
		Server.UploadFileByApp('cpUser', files, requestData, function(responeData) {
			callBack && callBack(true);
		}, function(err) {
			Vue.$tool.toast(err)
			callBack && callBack(false);
		});
	},
	// 获得保证金状态
	getDepositType(requestInfo, successCallback, errorCallback) {
		let requestData = {
			loading: requestInfo.loading,
			act: 'CPU010',
			userId: requestInfo.userId,
		};
		Server.getDataFromServer('cpUser', requestData, successCallback, errorCallback)
	},
	// 扫描二维码
	doScanBarcode(requestInfo, successCallback, errorCallback) {
		let requestData = {
			loading: requestInfo.loading,
			act: 'CPU007',
			barcodeValue: requestInfo.barcodeValue,
		};
		Server.getDataFromServer('cpUser', requestData, successCallback, errorCallback)
	},
	//获取店铺二维码信息
	get_myCode(requestInfo, successCallback, errorCallback) {
		let requestData = {
			loading: requestInfo.loading,
			act: 'CPU701',
			cpId: requestInfo.cpId,
			cpBtype: requestInfo.cpBtype
		};
		Server.getDataFromServer('cpUser', requestData, successCallback, errorCallback)
	},
	//企业 - 帐号列表（全部）
	getAccounList(requestInfo, successCallback, errorCallback) {
		let requestData = {
			loading: requestInfo.loading,
			act: 'CPU200'
		};
		Server.getDataFromServer('cpUser', requestData, successCallback, errorCallback)
	},
	//企业 - 子账号（停用，删除）
	disableAccount(requestInfo, successCallback, errorCallback) {
		let requestData = {
			loading: requestInfo.loading,
			act: 'CPU203',
			userId: requestInfo.userId,
			userStatus: requestInfo.userStatus
		};
		Server.getDataFromServer('cpUser', requestData, successCallback, errorCallback)
	},
	//企业 - 子账号（详情）
	getAccountInfo(requestInfo, successCallback, errorCallback) {
		let requestData = {
			loading: requestInfo.loading,
			act: 'CPU202',
			userId: requestInfo.userId
		};
		Server.getDataFromServer('cpUser', requestData, successCallback, errorCallback)
	},
	//企业 - 子账号（管理）
	setAccounInfo(requestInfo, successCallback, errorCallback) {
		let requestData = {
			loading: requestInfo.loading,
			act: 'CPU201',
			verifyCode: requestInfo.verifyCode,
			cpUserInfo: {
				userId: requestInfo.userId,
				userPhone: requestInfo.userPhone,
				userPassword: requestInfo.userPassword,
				userName: requestInfo.userName,
				userPost: requestInfo.userPost
			}
		};
		Server.getDataFromServer('cpUser', requestData, successCallback, errorCallback)
	},
	//短信验证码
	getVerificationCode(requestInfo, successCallback, errorCallback) {
		let requestData = {
			loading: requestInfo.loading,
			act: 'CPU000',
			userPhone: requestInfo.userPhone,
			smsType: requestInfo.smsType
		};
		Server.getDataFromServer('cpUser', requestData, successCallback, errorCallback)
	},
	// 企业 - 个人主页
	getBasciInfo(requestInfo, successCallback, errorCallback) {
		let requestData = {
			loading: requestInfo.loading,
			act: 'CPU106',
			userId: requestInfo.userId
		};
		Server.getDataFromServer('cpUser', requestData, successCallback, errorCallback)
	},
	//企业 - 详情（其他企业，没有法人）
	getBasicNotLegal(requestInfo, successCallback, errorCallback) {
		let requestData = {
			loading: requestInfo.loading,
			act: 'CPU103',
			cpId: requestInfo.cpId
		};
		Server.getDataFromServer('cpUser', requestData, successCallback, errorCallback)
	},
	//企业 - 员工列表
	getBasicStaffList(requestInfo, successCallback, errorCallback) {
		let requestData = {
			loading: requestInfo.loading,
			act: 'CPU104',
			cpId: requestInfo.cpId
		};
		Server.getDataFromServer('cpUser', requestData, successCallback, errorCallback)
	},
	//个人 - 更新名片
	setMyInfo(requestInfo, callBack) {
		let requestData = {
			act: 'CPU300',
			osType: store.state.osType,
			deviceId: store.state.deviceId,
			version: store.state.version,
			user_token: store.state.user_token,
			cpUserInfo: {
				userCuteName: requestInfo.userCuteName,
				userPost: requestInfo.userPost,
				userName: requestInfo.userName
			}
		};
		let files = [];
		for(let i = 0; i < requestInfo.files.length; i++) {
			if(requestInfo.files[i].src.substr(0, 4) != "http") {
				files.push({
					name: requestInfo.files[i].id,
					path: requestInfo.files[i].src
				});
			}
		}
		//执行提交任务
		Server.UploadFileByApp('cpUser', files, requestData, function(responeData) {
			callBack && callBack(true);
		}, function(err) {
			callBack && callBack(false);
		});
	},
	//企业 - 更新数据（我的）
	setBasicInfo(requestInfo, callBack) {
		let requestData = {
			act: 'CPU204',
			osType: store.state.osType,
			deviceId: store.state.deviceId,
			version: store.state.version,
			user_token: store.state.user_token,
			cpBasic: {
				cpId: requestInfo.cpId,
				cpMidBrand: requestInfo.cpMidBrand,
				cpStype: requestInfo.cpStype,
				cpAddress: requestInfo.cpAddress,
				cpIntro: requestInfo.cpIntro,
				cpTel: requestInfo.cpTel,
				cpHeadName: requestInfo.cpHeadName,
				cpHeadPhone: requestInfo.cpHeadPhone,
				cpBizScope: requestInfo.cpBizScope,
				cpRoute: requestInfo.cpRoute,
				weixin: requestInfo.weixin
			}
		};
		let files = [];
		for(let i = 0; i < requestInfo.files.length; i++) {
			if(requestInfo.files[i].src.substr(0, 4) != "http") {
				files.push({
					name: requestInfo.files[i].id,
					path: requestInfo.files[i].src
				});
			}
		}
		//执行提交任务
		Server.UploadFileByApp('cpUser', files, requestData, function(responeData) {
			callBack && callBack(true);
		}, function(err) {
			callBack && callBack(false);
		});
	},
	//导游 - 名片（个人）
	getGuiderInfo(requestInfo, successCallback, errorCallback) {
		let requestData = {
			loading: requestInfo.loading,
			act: '11008',
			aac001: requestInfo.aac001
		};
		Server.getDataFromServer('user', requestData, successCallback, errorCallback)
	}
};

/******************************      Project 产品模块      *****************************/
const Project = {
	/**获取推荐的线路列表 
	 * recomType：   quality.精选线路   care.可能感兴趣   special.特价    around.周边
	 * where:  筛选条件对象
	 */
	getRecomLineList(requestInfo, successCallback, errorCallback) {
		let requestData = {
			loading: requestInfo.loading,
			act: 'CPI001',
			recomType: requestInfo.recomType,
			where: requestInfo.where,
			pageNum: requestInfo.pageNum
		};
		Server.getDataFromServer('cpIndex', requestData, successCallback, errorCallback);
	},
	//根据关键字和条件查询线路列表
	getLineListByKeyWord(requestInfo, successCallback, errorCallback) {
		let requestData = {
			loading: requestInfo.loading,
			act: 'CPG100',
			keyWord: requestInfo.keyWord,
			where: requestInfo.where,
			pageNum: requestInfo.pageNum,
			orderBy: requestInfo.orderBy
		};
		Server.getDataFromServer('cpGoods', requestData, successCallback, errorCallback);
	},
	/*根据关键字获取检索类型
	 *keyWord: 关键字
	 *searchType: 搜索类型   空.全部（首页搜索，按照返回服务器可搜索的内容分类）  10-线路、20-供应商 30-酒店 40-景点、99-导游
	 */
	getSearchTypeByKeyWord(requestInfo, successCallback, errorCallback) {
		let requestData = {
			loading: requestInfo.loading,
			act: 'CPI007',
			keyWord: requestInfo.keyWord,
			searchType: requestInfo.searchType
		};
		Server.getDataFromServer('cpIndex', requestData, successCallback, errorCallback);
	},
	/**获取推荐的线路列表 
	 * recomType：   quality.精选线路   care.可能感兴趣   special.特价    around.周边
	 * where:  筛选条件对象
	 */
	getRecomLineList(requestInfo, successCallback, errorCallback) {
		let requestData = {
			loading: requestInfo.loading,
			act: 'CPI001',
			recomType: requestInfo.recomType,
			where: requestInfo.where,
			pageNum: requestInfo.pageNum
		};
		Server.getDataFromServer('cpIndex', requestData, successCallback, errorCallback);
	},
	//产品 - 我的列表
	getMyPro(requestInfo, where, successCallback, errorCallback) {
		let requestData = {
			loading: requestInfo.loading,
			act: 'CPG201',
			pageNum: requestInfo.pageNum,
			where: where
		};
		Server.getDataFromServer('cpGoods', requestData, successCallback, errorCallback);
	},
	//产品 - 上架、下架
	setProState(requestInfo, successCallback, errorCallback) {
		let requestData = {
			loading: requestInfo.loading,
			act: 'CPR106',
			proId: requestInfo.proId,
			proState: requestInfo.proState
		};
		Server.getDataFromServer('cpProduct', requestData, successCallback, errorCallback);
	},
	//产品 - 删除
	delPro(requestInfo, successCallback, errorCallback) {
		let requestData = {
			loading: requestInfo.loading,
			act: 'CPR107',
			proId: requestInfo.proId
		};
		Server.getDataFromServer('cpProduct', requestData, successCallback, errorCallback);
	},
	//产品 - 列表 （个人主页）
	getMyProList(requestInfo, successCallback, errorCallback) {
		let requestData = {
			loading: requestInfo.loading,
			act: 'CPG200',
			pageNum: requestInfo.pageNum,
			where: requestInfo.where,
			keyWord: requestInfo.keyWord,
			cpId: requestInfo.cpId,
		};
		Server.getDataFromServer('cpGoods', requestData, successCallback, errorCallback);
	},
	//产品 - 收藏、取消收藏
	getProCollection(requestInfo,successCallback, errorCallback){
		let requestData = {
			act: 'CPR201',
			proId: requestInfo.proId,
			collectState: requestInfo.collectState,
		};
		Server.getDataFromServer('cpProduct', requestData, successCallback, errorCallback);
	},
	//景点 - 收藏、取消收藏
	setScenicCollection(requestInfo, collectState,successCallback, errorCallback){
		let requestData = {
			act: 'CPMT801',
			sId: requestInfo.sId,
			collectState:requestInfo.collectState
		};
		Server.getDataFromServer('cpTicket', requestData, successCallback, errorCallback);
	},
	setHotelCollection(requestInfo, collectState,successCallback, errorCallback){
		let requestData = {
			act: 'CPMH801',
			hId: requestInfo.hId,
			collectState:requestInfo.collectState
		};
		Server.getDataFromServer('cpHotel', requestData, successCallback, errorCallback);
	}
};

/******************************      Supplier 供应商模块      *****************************/
const Supplier = {
	// 根据关键字查询
	getSupplierListByKeyWord(requestInfo, successCallback, errorCallback) {
		let requestData = {
			loading: requestInfo.loading,
			act: 'CPUT999',
			keyWord: requestInfo.keyWord,
			pageNum: requestInfo.pageNum,
			orderBy: requestInfo.orderBy,
			where: requestInfo.where,
		};
		Server.getDataFromServer('cpUser', requestData, successCallback, errorCallback);
	},
	// 优质供应商
	getGoodsLocalList(requestInfo, successCallback, errorCallback) {
		let requestData = {
			loading: requestInfo.loading,
			act: 'CPI002',
			pageNum: requestInfo.pageNum,
		};
		Server.getDataFromServer('cpIndex', requestData, successCallback, errorCallback);
	},
	// 优质机票供应商
	getPlaneList(requestInfo, successCallback, errorCallback) {
		let requestData = {
			loading: requestInfo.loading,
			act: 'CPI009',
			pageNum: requestInfo.pageNum,
		};
		Server.getDataFromServer('cpIndex', requestData, successCallback, errorCallback);
	},
};

/******************************      Hotel 酒店模块      *****************************/
const Hotel = {
	// 根据关键字查询
	getHotelListByKeyWord(requestInfo, successCallback, errorCallback) {
		let requestData = {
			loading: requestInfo.loading,
			act: 'CPG101',
			keyWord: requestInfo.keyWord,
			where: requestInfo.where,
			pageNum: requestInfo.pageNum,
			orderBy: requestInfo.orderBy
		};
		Server.getDataFromServer('cpGoods', requestData, successCallback, errorCallback);
	},
	/**获取推荐的酒店列表 
	 * recomType：   quality.精选线路   care.可能感兴趣   special.特价    around.周边
	 * where:  筛选条件对象
	 */
	getRecomHotelList(requestInfo, successCallback, errorCallback) {
		let requestData = {
			loading: requestInfo.loading,
			act: 'CPI004',
			recomType: requestInfo.recomType,
			where: requestInfo.where,
			pageNum: requestInfo.pageNum,
		};
		Server.getDataFromServer('cpIndex', requestData, successCallback, errorCallback);
	},
	// 获取酒店详情
	getDetail(requestInfo, successCallback, errorCallback) {
		var requestData = {
			loading: requestInfo.loading,
			act: 'CPMH101',
			hId: requestInfo.hId
		};
		Server.getDataFromServer('cpHotel', requestData, successCallback, errorCallback);
	}
};

/******************************      Sport 景点模块      *****************************/
const Sport = {
	// 根据关键字查询景点
	getSportsListByKeyWord(requestInfo, successCallback, errorCallback) {
		let requestData = {
			loading: requestInfo.loading,
			act: 'CPG102',
			keyWord: requestInfo.keyWord,
			where: requestInfo.where,
			pageNum: requestInfo.pageNum,
			orderBy: requestInfo.orderBy
		};
		Server.getDataFromServer('cpGoods', requestData, successCallback, errorCallback);
	},
	/**获取推荐的景点列表 
	 * recomType：   quality.精选线路   care.可能感兴趣   special.特价    around.周边
	 * where:  筛选条件对象
	 */
	getRecomScenicList(requestInfo, successCallback, errorCallback) {
		let requestData = {
			loading: requestInfo.loading,
			act: 'CPI005',
			recomType: requestInfo.recomType,
			where: requestInfo.where,
			pageNum: requestInfo.pageNum,
		};
		Server.getDataFromServer('cpIndex', requestData, successCallback, errorCallback);
	},
	// 获取详情
	getDetail(requestInfo, successCallback, errorCallback) {
		var requestData = {
			loading: requestInfo.loading,
			act: 'CPMT101',
			sId: requestInfo.sId
		};
		Server.getDataFromServer('cpTicket', requestData, successCallback, errorCallback);
	}
};

/******************************      Guide 导游模块      *****************************/
const Guide = {
	// 查询导游
	getGuiderList(requestInfo, successCallback, errorCallback) {
		let requestData = {
			loading: requestInfo.loading,
			act: '19778',
			pageIndex: requestInfo.pageIndex,
			where: requestInfo.where
		};
		Server.getDataFromServer('user', requestData, successCallback, errorCallback);
	}
};

/******************************      Select 采购模块      *****************************/
const Select = {
	// 询价列表
	getPublishList(requestInfo, successCallback, errorCallback) {
		let requestData = {
			loading: requestInfo.loading,
			act: 'CPS204',
			pageNum: requestInfo.pageNum,
			isAll: "1",
			isPrice: requestInfo.isPrice,
			selectType: requestInfo.selectType,
			where: requestInfo.where,
		};
		Server.getDataFromServer('cpSelect', requestData, successCallback, errorCallback);
	},
	// 获取询价详情
	getPublishDetail(requestInfo, successCallback, errorCallback) {
		let requestData = {
			loading: requestInfo.loading,
			act: 'CPS105',
			selectId: requestInfo.selectId
		};
		Server.getDataFromServer('cpSelect', requestData, successCallback, errorCallback);
	},
	//组团社 - 获取采购列表
	getMyPublishList(requestInfo, successCallback, errorCallback) {
		var requestData = {
			loading: requestInfo.loading,
			act: 'CPS102',
			selectState: requestInfo.selectState,
			pageNum: requestInfo.pageNum
		};
		Server.getDataFromServer('cpSelect', requestData, successCallback, errorCallback);
	},
	//删除询价
	delPublish(selectId, successCallback, errorCallback) {
		var requestData = {
			act: 'CPS104',
			selectId: selectId
		};
		Server.getDataFromServer('cpSelect', requestData, successCallback, errorCallback);
	},
	//关闭询价
	closePublish(selectId, successCallback, errorCallback) {
		var requestData = {
			act: 'CPS103',
			selectId: selectId,
			tabUserList: '',
			confirmUserList: ''
		};
		Server.getDataFromServer('cpSelect', requestData, successCallback, errorCallback);
	},
	// 发布询价
	savePublish(requestInfo, successCallback, errorCallback) {
		let requestData = {
			loading: requestInfo.loading,
			act: 'CPS100',
			cpSelect: requestInfo
		};
		Server.getDataFromServer('cpSelect', requestData, successCallback, errorCallback);
	},
	// 发布导游询价
	saveGuidePublish(requestInfo, successCallback, errorCallback) {
		let requestData = {
			loading: requestInfo.loading,
			act: 'PBTY001',
			pbBasic: requestInfo
		};
		Server.getDataFromServer('publish', requestData, successCallback, errorCallback);
	},
};

/******************************      Order 订单模块      *****************************/
const Order = {
	// 获得订单数量
	getNum(requestInfo, successCallback, errorCallback) {
		let requestData = {
			loading: 1,
			params: requestInfo
		};
		Server.getDataFromServerPayment('storder/ORDER008.action', requestData, (res) => {
			let info = {};
			info.title = requestInfo;
			info.value = res.data.hasPayNum + res.data.refundingOrderNum + res.data.waitConfirmLineNum + res.data.waitConfirmNum + res.data.waitConfrimDisNum + res.data.waitPayNum;
			store.commit("setOrderNum", info);
			successCallback && successCallback(res)
		}, errorCallback);
	},
	// 获得收到的协议列表
	getCollAgrList(requestInfo, successCallback, errorCallback) {
		let requestData = {
			params: {
				userId: store.state.userId,
				pageNum: requestInfo.pageNum,
			}
		};
		Server.getDataFromServerPayment('distributor/CD004.action', requestData, successCallback, errorCallback);
	},
	// 获得发出的协议列表
	getOutAgrList(requestInfo, successCallback, errorCallback) {
		let requestData = {
			params: {
				userId: store.state.userId,
				pageNum: requestInfo.pageNum,
			}
		};
		Server.getDataFromServerPayment('distributor/CD003.action', requestData, successCallback, errorCallback);
	},
	// 获得订单列表
	getList(requestInfo, successCallback, errorCallback) {
		let requestData = {
			pageNum: requestInfo.pageNum,
			keyWord: requestInfo.keyWord,
			where: requestInfo.where,
		};
		Server.getDataFromServerPayment('storder/ORDER001.action', requestData, successCallback, errorCallback);
	},
	// 确认订单
	confirmOrder(requestInfo, successCallback, errorCallback) {
		let requestData = {
			params: requestInfo.orderId,
		};
		Server.getDataFromServerPayment('storder/confirmOrder.action', requestData, successCallback, errorCallback);
	},
	// 取消订单
	cancelOrder(requestInfo, successCallback, errorCallback) {
		let requestData = {
			params: requestInfo.orderId,
		};
		Server.getDataFromServerPayment('storder/ORDER003.action', requestData, successCallback, errorCallback);
	},
	// 删除订单
	deleteOrder(requestInfo, successCallback, errorCallback) {
		let requestData = {
			params: requestInfo.orderId,
		};
		Server.getDataFromServerPayment('storder/ORDER007.action', requestData, successCallback, errorCallback);
	},
	// 修改价格
	editPrice(requestInfo, successCallback, errorCallback) {
		let requestData = {
			orderId: requestInfo.orderId,
		};
		Server.getDataFromServerPayment('storder/ORDER005.action', requestData, successCallback, errorCallback);
	},
	// 获得订单详情
	getOrderDetail(requestInfo, successCallback, errorCallback) {
		let requestData = {
			params: requestInfo.orderId,
		};
		Server.getDataFromServerPayment('storder/ORDER002.action', requestData, successCallback, errorCallback);
	},
	// 获取手续费
	getServiceFee(requestInfo, successCallback, errorCallback) {
		let requestData = {
			params: {
				payment: requestInfo.payment,
				identityType: requestInfo.identityType,
			}
		};
		Server.getDataFromServerPayment('storder/ORDER102.action', requestData, successCallback, errorCallback);
	},
	// 申请退款
	applyRefund(requestInfo, successCallback, errorCallback) {
		let requestData = {
			params: {
				orderId: requestInfo.orderId,
				refundPayment: requestInfo.refundPayment,
				refundReason: requestInfo.refundReason,
			}
		};
		Server.getDataFromServerPayment('storder/ORDER009.action', requestData, successCallback, errorCallback);
	},
	// 取消申请退款
	cancelApply(requestInfo, successCallback, errorCallback) {
		let requestData = {
			params: {
				orderId: requestInfo.orderId,
			}
		};
		Server.getDataFromServerPayment('storder/ORDER100.action', requestData, successCallback, errorCallback);
	},
	// 同意退款
	agreeRefund(requestInfo, successCallback, errorCallback) {
		let requestData = {
			params: {
				orderId: requestInfo.orderId,
			}
		};
		Server.getDataFromServerPayment('storder/orderRefund.action', requestData, successCallback, errorCallback);
	},
	// 拒绝退款
	refuceRefund(requestInfo, successCallback, errorCallback) {
		let requestData = {
			params: {
				orderId: requestInfo.orderId,
				refuceReason: requestInfo.refuceReason,
			}
		};
		Server.getDataFromServerPayment('storder/ORDER101.action', requestData, successCallback, errorCallback);
	},
	// 获得协议详情
	getAgreementDetail(requestInfo, successCallback, errorCallback) {
		let requestData = {
			params: requestInfo
		};
		Server.getDataFromServerPayment('distributor/CD002.action', requestData, successCallback, errorCallback);
	},
	// 确认协议
	confirmAgreementById(requestInfo, successCallback, errorCallback) {
		let requestData = {
			params: {
				id: requestInfo.id,
				isInvoice: requestInfo.isSelectInvoice, // 是否开票
				invoiceName: requestInfo.invoiceName,
				invoiceNumer: requestInfo.invoiceNumer,
				invoiceContent: requestInfo.invoiceContent,
				updataTime: requestInfo.updataTime,
			}
		};
		Server.getDataFromServerPayment('distributor/CD006.action', requestData, successCallback, errorCallback);
	},
	// 修改价格
	editPrice(requestInfo, successCallback, errorCallback) {
		let requestData = {
			params: {
				orderId: requestInfo.orderId,
				payment: requestInfo.payment,
			}
		};
		Server.getDataFromServerPayment('storder/ORDER005.action', requestData, successCallback, errorCallback);
	},
	// 添加备注
	addIntro(requestInfo, successCallback, errorCallback) {
		let requestData = {
			params: {
				orderId: requestInfo.orderId,
				sellerNote: requestInfo.sellerNote,
			}
		};
		Server.getDataFromServerPayment('storder/ORDER006.action', requestData, successCallback, errorCallback);
	},
	// 确认完成订单
	transactionCompletion(requestInfo, successCallback, errorCallback) {
		let requestData = {
			params: {
				id: requestInfo.id,
			}
		};
		Server.getDataFromServerPayment('stpay/paytoseller.action', requestData, successCallback, errorCallback);
	},
};

/******************************      Chat 聊天模块      *****************************/
const Chat = {
	// 初始化融云聊天
	init(callBack) {
		RongIMLib.RongIMClient.init(RongIMKey, RongIMLib.WebSQLDataProvider); //初始化融云
		//连接服务器
		this.connect({
			successCallBack: function(proMsg) {
				callBack && callBack(proMsg);
			},
			errorCallBack: function(errorMsg) {
				Vue.$tool.toast(errorMsg);
			}
		});
		//设置链接状态监听器
		RongIMLib.RongIMClient.setConnectionStatusListener({
			onChanged: function(status) {
				switch(status) {
					//链接成功
					case RongIMLib.ConnectionStatus.CONNECTED:
						store.commit('setStateInfo', {
							title: 'isConnectChat',
							value: true
						});
						break;
						//正在链接
					case RongIMLib.ConnectionStatus.CONNECTING:
						store.commit('setStateInfo', {
							title: 'isConnectChat',
							value: false
						});
						break;
						//重新链接
					case RongIMLib.ConnectionStatus.DISCONNECTED:
						store.commit('setStateInfo', {
							title: 'isConnectChat',
							value: false
						});
						break;
						//其他设备登陆
					case RongIMLib.ConnectionStatus.KICKED_OFFLINE_BY_OTHER_CLIENT:
						console.log('其他设备登陆')
						store.commit('setStateInfo', {
							title: 'isConnectChat',
							value: false
						});
						break;
						//域名不正确
					case RongIMLib.ConnectionStatus.DOMAIN_INCORRECT:
						store.commit('setStateInfo', {
							title: 'isConnectChat',
							value: false
						});
						break;
						//网络不可用
					case RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE:
						store.commit('setStateInfo', {
							title: 'isConnectChat',
							value: false
						});
						break;
				}
			}
		});
	},
	// 连接融云服务器
	connect(callBack) {
		if(store.state.isConnect) return;
		RongIMLib.RongIMClient.connect(store.state.chat_token, {
			onSuccess: function(userId) {
				store.commit('setStateInfo', {
					title: 'isConnectChat',
					value: true
				});
				callBack.successCallBack(userId);
			},
			onTokenIncorrect: function() {
				store.commit('setStateInfo', {
					title: 'isConnectChat',
					value: false
				});
				callBack.errorCallBack("链接聊天服务器出错，token无效");
			},
			onError: function(errorCode) {
				store.commit('setStateInfo', {
					title: 'isConnectChat',
					value: false
				});
				var info = '';
				switch(errorCode) {
					case RongIMLib.ErrorCode.TIMEOUT:
						info = '超时';
						break;
					case RongIMLib.ErrorCode.UNKNOWN_ERROR:
						info = '未知错误';
						break;
					case RongIMLib.ErrorCode.UNACCEPTABLE_PaROTOCOL_VERSION:
						info = '不可接受的协议版本';
						break;
					case RongIMLib.ErrorCode.IDENTIFIER_REJECTED:
						info = 'appkey不正确';
						break;
					case RongIMLib.ErrorCode.SERVER_UNAVAILABLE:
						info = '服务器不可用';
						break;
				}
				callBack.errorCallBack(errorCode);
			}
		});
	},
	// 消息监听器
	setReceiveMsgListener(callBack) {
		RongIMLib.RongIMClient.setOnReceiveMessageListener({
			// 接收到的消息
			onReceived: function(message) {
				if(message.content.messageName == "ImageMessage" || message.content.messageName == "TextMessage") {
					message.sendUser = JSON.parse(message.content.extra);
					message.isRead = false;
					Chat.setImLog(message, message.targetId);

					callBack && callBack(message);
				}
				// 判断消息类型
				switch(message.messageType) {
					case RongIMLib.RongIMClient.MessageType.TextMessage:
						//message接受到的消息（包含发送的信息，也可以在extra中添加要传递的值，如：时间等）
						break;
					case RongIMLib.RongIMClient.MessageType.ImageMessage:
						break;
					case RongIMLib.RongIMClient.MessageType.DiscussionNotificationMessage:
						break;
					case RongIMLib.RongIMClient.MessageType.LocationMessage:
						break;
					case RongIMLib.RongIMClient.MessageType.RichContentMessage:
						break;
					case RongIMLib.RongIMClient.MessageType.DiscussionNotificationMessage:
						break;
					case RongIMLib.RongIMClient.MessageType.InformationNotificationMessage:
						break;
					case RongIMLib.RongIMClient.MessageType.ContactNotificationMessage:
						break;
					case RongIMLib.RongIMClient.MessageType.ProfileNotificationMessage:
						break;
					case RongIMLib.RongIMClient.MessageType.CommandNotificationMessage:
						break;
					case RongIMLib.RongIMClient.MessageType.CommandMessage:
						break;
					case RongIMLib.RongIMClient.MessageType.UnknownMessage:
						break;
					default:
						// 自定义消息
				}
			}

		});
	},
	/*
	 * 发送消息 
	 * targetId 对方userId
	 * messageContent 消息内容
	 */
	sendMessage(targetId, messageContent, successCallBack, errorCallBack) {
		messageContent.extra = JSON.stringify({
			userId: store.state.cpUserInfo.userId,
			userName: store.state.cpUserInfo.userName,
			cpId: store.state.cpUserInfo.cpBasic.cpId,
			cpName: store.state.cpUserInfo.cpBasic.cpName,
			userFace: store.state.cpUserInfo.cpBasic.cpLogo,
		});
		RongIMLib.RongIMClient.getInstance().sendMessage(RongIMLib.ConversationType.PRIVATE, targetId, messageContent, {
			// 发送消息成功
			onSuccess: function(message) {
				message.isRead = true;
				Chat.setImLog(message);
				//message 为发送的消息对象并且包含服务器返回的消息唯一Id和发送消息时间戳
				successCallBack && successCallBack(message);
			},
			onError: function(errorCode, message) {
				var info = '';
				switch(errorCode) {
					case RongIMLib.ErrorCode.TIMEOUT:
						info = '超时';
						break;
					case RongIMLib.ErrorCode.UNKNOWN_ERROR:
						info = '未知错误';
						break;
					case RongIMLib.ErrorCode.REJECTED_BY_BLACKLIST:
						info = '在黑名单中，无法向对方发送消息';
						break;
					case RongIMLib.ErrorCode.NOT_IN_DISCUSSION:
						info = '不在讨论组中';
						break;
					case RongIMLib.ErrorCode.NOT_IN_GROUP:
						info = '不在群组中';
						break;
					case RongIMLib.ErrorCode.NOT_IN_CHATROOM:
						info = '不在聊天室中';
						break;
					default:
						info = "发送失败，未知错误：" + errorCode;
						break;
				}
				Vue.$tool.toast(info);
				errorCallBack && errorCallBack(info);
			}
		});
	},
	// 上传文件
	uploadFile(file, successCallback, errorCallback) {
		let requestData = {
			act: 'IM2000',
			osType : store.state.osType,
			deviceId : store.state.deviceId,
			version : store.state.version,
			user_token : store.state.user_token,
		};
		let files = [];
		files.push({
			name: "chat",
			path: file,
		});
		Server.UploadFileByApp("cpIM", files, requestData, successCallback, errorCallback);
	},
	// 获得表情库
	getEmojis() {
		return RongIMLib.RongIMEmoji.emojis;
	},
	// 表情转换html
	emojiToHTML(emoji) {
		return RongIMLib.RongIMEmoji.emojiToHTML(emoji);
	},
	// html转换表情
	htmlToEmoji(emoji) {
		return RongIMLib.RongIMEmoji.symbolToEmoji(emoji);
	},
	// 消息内容转换
	textToRongIm(text) {
		return RongIMLib.TextMessage.obtain(text);
	},
	// 图片转内容
	imgToRongIm(img) {
		return RongIMLib.ImageMessage.obtain(img);
	},
	// 本地缓存聊天记录
	setImLog(msg, userId) {
		Vue.$abyDb.Im.insert(msg);
		this.getNotReadMsg();
	},
	//　获得本地缓存聊天记录
	getImLog(userId) {
		let log = window.localStorage.getItem('im_userId_' + userId);
		if(log) {
			return JSON.parse(log);
		}
		return [];
	},
	// 获得未读消息数 
	getNotReadMsg() {
		Vue.$abyDb.Im.get((res) => {
			if(res && !res.value.isRead) {
				let info = {}
				info.title = 'chatNum';
				info.value = res.value.messageUId;
				store.commit("setChatNum", info);
			}
		}, (e) => {
			console.log(e)
		})
	},
};

/******************************      All 多接口统一获取      *****************************/
const All = {
	// 获得首页精选模块
	getGoods(requestInfo, successCallback, errorCallback) {
		let lineInfo = {};
		lineInfo.act = 'CPI001';
		lineInfo.loading = 1;
		lineInfo.pageNum = requestInfo.pageNum;
		lineInfo.recomType = 'quality';

		let hotelInfo = {};
		hotelInfo.act = 'CPI004';
		hotelInfo.loading = 1;
		hotelInfo.pageNum = requestInfo.pageNum;
		hotelInfo.recomType = 'quality';

		let sportInfo = {};
		sportInfo.act = 'CPI005';
		sportInfo.loading = 1;
		sportInfo.pageNum = requestInfo.pageNum;
		sportInfo.recomType = 'quality';

		axios.all([
				axios.post('cpIndex', lineInfo),
				axios.post('cpIndex', hotelInfo),
				axios.post('cpIndex', sportInfo),
			])
			.then(axios.spread((line, hotel, sport) => {
				if((line.status === 200 || line.status === 304) && (sport.status === 200 || sport.status === 304) && (hotel.status === 200 || hotel.status === 304)) {
					if(line.data.errorcode !== 0) {
						Vue.$tool.toast(line.data.msg);
						errorCallback && errorCallback(false);
					} else if(sport.data.errorcode !== 0) {
						Vue.$tool.toast(sport.data.msg);
						errorCallback && errorCallback(false);
					} else if(hotel.data.errorcode !== 0) {
						Vue.$tool.toast(hotel.data.msg);
						errorCallback && errorCallback(false);
					} else {
						let data = {};
						data.lineList = line.data.proList;
						data.hotelList = hotel.data.hotelList;
						data.sportList = sport.data.scenicList;

						successCallback && successCallback(data);
					}
				} else {
					Vue.$tool.toast('连接超时！')
					errorCallback && errorCallback('连接超时！');
				}
			}))
			.catch(err => {
				console.log(err)
				errorCallback && errorCallback(err);
			})

	},

	// 获得收藏列表
	getCollections(requestInfo, successCallback, errorCallback) {
		let lineInfo = {};
		lineInfo.act = 'CPR110';
		lineInfo.loading = 1;
		lineInfo.pageNum = requestInfo.pageNum;
		lineInfo.keyWord = requestInfo.keyWord;

		let hotelInfo = {};
		hotelInfo.loading = 1;
		hotelInfo.act = 'CPMH106';
		hotelInfo.pageNum = requestInfo.pageNum;
		hotelInfo.keyWord = requestInfo.keyWord;

		let sportInfo = {};
		sportInfo.act = 'CPMT104';
		sportInfo.loading = 1;
		sportInfo.pageNum = requestInfo.pageNum;
		sportInfo.keyWord = requestInfo.keyWord;

		axios.all([
				axios.post('cpProduct', lineInfo),
				axios.post('cpHotel', hotelInfo),
				axios.post('cpTicket', sportInfo),
			])
			.then(axios.spread((line, hotel, sport) => {
				if((line.status === 200 || line.status === 304) && (sport.status === 200 || sport.status === 304) && (hotel.status === 200 || hotel.status === 304)) {
					if(line.data.errorcode !== 0) {
						Vue.$tool.toast(line.data.msg);
						errorCallback && errorCallback(false);
					} else if(sport.data.errorcode !== 0) {
						Vue.$tool.toast(sport.data.msg);
						errorCallback && errorCallback(false);
					} else if(hotel.data.errorcode !== 0) {
						Vue.$tool.toast(hotel.data.msg);
						errorCallback && errorCallback(false);
					} else {
						let data = {};
						data.lineList = line.data.proList;
						data.hotelList = hotel.data.hotelList;
						data.sportList = sport.data.scenicList;

						successCallback && successCallback(data);
					}
				} else {
					Vue.$tool.toast('连接超时！')
					errorCallback && errorCallback('连接超时！');
				}
			}))
			.catch(err => {
				console.log(err)
				errorCallback && errorCallback(err);
			})

	}
}

export default {
	Server,
	User,
	Crypto,
	Sys,
	Project,
	Sport,
	Guide,
	General,
	Hotel,
	All,
	Select,
	Order,
	Supplier,
	Chat,
	Pay
}