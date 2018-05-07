import Vue from 'vue'

//判断是否存在数组中
let isInAarry = function(arr, obj) {
	let i = arr.length;
	while(i--) {
		if(arr[i] === obj) {
			return true;
		}
	}
	return false;
};

let pad = function(num, n) {
	var len = num.toString().length;
	while(len < n) {
		num = "0" + num;
		len++;
	}
	return num;
};

//判断浏览器内核方法
let browser = {
	versions: function() {
		let u = navigator.userAgent,
			app = navigator.appVersion;
		return { //移动终端浏览器版本信息 
			trident: u.indexOf('Trident') > -1, //IE内核
			presto: u.indexOf('Presto') > -1, //opera内核
			webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
			gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
			mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
			ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
			android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
			iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
			iPad: u.indexOf('iPad') > -1, //是否iPad
			webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
		};
	}(),
	language: (navigator.browserLanguage || navigator.language).toLowerCase()
};
//
let formValidation = {
	/**
	 * 手机号码合法性验证
	 * @author liuwenjn
	 **/
	phoneVerfication: function(id) {
		let reg = /^13[0-9]{1}[0-9]{8}$|15[0-9]{1}[0-9]{8}$|18[0-9]{1}[0-9]{8}$|17[0-9]{1}[0-9]{8}$|14[0-9]{1}[0-9]{8}$|16[0-9]{1}[0-9]{8}$|19[0-9]{1}[0-9]{8}/;
		if(!reg.test(id)) {
			return false;
		}
		return true;
	}
};
//验证码倒计时
let wait = 60;
let disableWait = function(obj) {
	if(wait == 0) {
		obj.removeAttribute("disabled");
		obj.value = "获取验证码";
		wait = 60;
	} else {
		obj.setAttribute("disabled", true);
		obj.value = "重新发送(" + wait + ")";
		wait--;
		setTimeout(function() {
			disableWait(obj)
		}, 1000)
	}
};

// 选择拍照，视频文件函数（app）
let btnArray = [{
	title: "拍照"
}, {
	title: "从相册选择"
}];
let getPhoto = function(successCallback, errorCallback) {
	plus.nativeUI.actionSheet({
		title: "选择图片",
		cancel: "取消",
		buttons: btnArray
	}, function(e) {
		let index = e.index;
		switch(index) {
			case 0:
				break;
			case 1:
				let cmr = plus.camera.getCamera();
				cmr.captureImage(function(path) {
					successCallback("file://" + plus.io.convertLocalFileSystemURL(path));
				}, function(err) {
					errorCallback('拍照失败');
				}, {
					filename: "_doc/camera/"
				});
				break;
			case 2:
				plus.gallery.pick(function(path) {
					if(path.substr(path.length - 3) != 'gif' && path.substr(path.length - 3) != 'GIF') {
						successCallback(path);
					} else {
						errorCallback('不支持gif格式的图片！');
					}
				}, function(err) {
					errorCallback('选择照片失败');
				}, {
					filename: "_doc/camera/"
				});
				break;
		}
	});
};

/**
 * 倒计时方法 
 */
//这个函数是为了适应格式 比如：01分01秒;
let p = function(n) {
	return n < 10 ? '0' + n : n;
};
let countdown = function(endDate, divId) {
	//定义当前时间
	let startTime = new Date();
	//定义结束时间
	let endDates = endDate.replace(/\-/g, '\/');
	let endTime = new Date(endDates);

	//算出中间差并且已毫秒数返回; 除以1000将毫秒数转化成秒数方便运算；
	let countDown = (endTime.getTime() - startTime.getTime()) / 1000;

	//获取天数 1天 = 24小时  1小时= 60分 1分 = 60秒
	let oDay = parseInt(countDown / (24 * 60 * 60));

	//获取小时数 
	let oHours = parseInt(countDown / (60 * 60) % 24);

	//获取分钟数
	let oMinutes = parseInt(countDown / 60 % 60);

	//获取秒数
	let oSeconds = parseInt(countDown % 60);

	//下面就是插入到页面事先准备容器即可;
	let html = '';
	if(oDay > 0) {
		html = p(oDay) + "天" + p(oHours) + ":" + p(oMinutes) + ":" + p(oSeconds);
	} else {
		html = p(oHours) + ":" + p(oMinutes) + ":" + p(oSeconds);
	}
	if(document.getElementById(divId)) {
		if(oDay) {
			document.getElementById(divId).innerHTML = html;
		} else {
			document.getElementById(divId).className = 'time fontGray';
			document.getElementById(divId).innerHTML = '已结束';
		}
	} else {
		return;
	}

	//当时间为0的时候标记结束;
	if(countDown < 0) {
		document.getElementById(divId).className = 'time fontGray';
		document.getElementById(divId).innerHTML = '已结束';
	} else {
		setTimeout(function() {
			countdown(endDate, divId);
		}, 1000);
	}

};

// 拨打电话(app)
let dialTelToApp = function(phone) {
	plus.device.dial(phone, false);
};

/******************************      toast       *****************************/
let toast = function(title, pos) {
	Vue.$toast(title);
};

/******************************      loading       *****************************/
// 显示
let loading = function(title) {
	Vue.$indicator.open(title);
};
// 隐藏
let loadingClose = function() {
	Vue.$indicator.close();
};

/******************************      MessageBox       *****************************/
// alert
let alert = function(message, callbacl, title) {
	title = title || '呱啦啦提示';
	Vue.$messagebox.alert(message, title).then(action => {
		callbacl && callbacl(action)
	});
};
// confirm
let confirm = function(message, callbacl, title) {
	title = title || '呱啦啦提示';
	Vue.$messagebox.confirm(message, title).then(action => {
		callbacl && callbacl(action)
	});
};
//prompt
let prompt = function(title, callbacl) {
	title = title || '呱啦啦提示';
	Vue.$messagebox.prompt(title).then(({
		value,
		action
	}) => {
		if(action == 1){
			callbacl && callbacl({
				value,
				action
			})
		}
	});
};

/******************************      缓存模块       *****************************/
let localStorage = {
	set(title, val) {
		window.localStorage.setItem(title, val);
	},
	get(title) {
		let info = window.localStorage.getItem(title);
		if(info) return JSON.parse(info);
		return [];
	},
	remove(title) {
		window.localStorage.removeItem(title);
	},
	// 保存搜索记录
	setSearch(id,val) {
		let localStorageList = this.get(id+'_searchList');
		if(!localStorageList) localStorageList = [];
		let isAdd = true;
		for(let i = 0, len = localStorageList.length; i < len; i++) {
			if(localStorageList[i] == val) isAdd = false;
		}
		if(isAdd) localStorageList.push(val);

		this.set(id+'_searchList', JSON.stringify(localStorageList));
	},
	// 获得搜索记录
	getSearch(id) {
		return this.get(id+'_searchList');
	},
	// 清空搜索记录
	clearSerch(id) {
		this.remove(id+'_searchList');
	}

};

// 获得当前时间
let getNowFormatDate = function() {
	var date = new Date();
	var seperator1 = "-";
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	if(month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if(strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	var currentdate = year + seperator1 + month + seperator1 + strDate;
	return currentdate;
};

// 时间格式化
let getFormatDate = function(datetime) {
	var year = datetime.getFullYear();
	var month = datetime.getMonth() + 1; //js从0开始取 
	var date = datetime.getDate();
	var hour = datetime.getHours();
	var minutes = datetime.getMinutes();
	var second = datetime.getSeconds();

	if(month < 10) {
		month = "0" + month;
	}
	if(date < 10) {
		date = "0" + date;
	}

	return year + "-" + month + "-" + date;
};

//计算年龄
let countAge = function(datetime){
	var r   =   datetime.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);     
    if(r == null) return false;     
    var d = new Date(r[1], r[3]-1, r[4]);     
    if(d.getFullYear() == r[1]&&(d.getMonth() + 1) == r[3]&&d.getDate() == r[4]){   
        var Y = new Date().getFullYear();   
        return Y-r[1];   
    }  
};

//拷贝内容
let copyContent = function(e){
	
};

export default {
	isInAarry,
	browser,
	disableWait,
	toast,
	loading,
	loadingClose,
	alert,
	confirm,
	prompt,
	getPhoto,
	dialTelToApp,
	formValidation,
	countdown,
	pad,
	localStorage,
	getNowFormatDate,
	getFormatDate,
	copyContent
}