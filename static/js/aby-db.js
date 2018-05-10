import store from '../../vuex/store'

let ImDb;
const Im = {
	// 初始化
	init(callback) {
		if(!store.state.isConnectDb) {
			var request = window.indexedDB.open('db_im_userId:' + store.state.userId, 1); // 打开数据库
			request.onsuccess = function(e) { // 监听连接数据库成功时执行
				ImDb = e.target.result;
				callback && callback(true)
			}
			request.onerror = function(e) { // 监听连接数据库失败时执行
				console.log('连接数据库失败');
			}
			request.onupgradeneeded = function(event) {
				ImDb = request.result; //获得数据库实例对象
				if(!ImDb.objectStoreNames.contains("im")) { //判断对象存储空间名称是否已经存在
					var objectStore = ImDb.createObjectStore("im", {
						keyPath: "messageUId"
					});
					objectStore.createIndex("targetId", "targetId", {
						unique: false
					});
					objectStore.createIndex("isRead", "isRead", {
						unique: false
					});
				}
			}
		}
	},
	// 查询数据
	get(successCallback, errorCallback) {
		Im.init((res)=>{
			var transaction = ImDb.transaction('im', 'readwrite');
			var objStore = transaction.objectStore('im');
			var request = objStore.openCursor();
			request.onsuccess = function(e) {
				var cursor = e.target.result;
	            if(cursor){
	            	cursor.continue();//遍历了存储对象中的所有内容
	            }
	            successCallback && successCallback(cursor);
			};
			request.onerror = function(e) {
				errorCallback && errorCallback(e);
			};
		})
	},
	// 插入数据
	insert(data, successCallback, errorCallback) {
		Im.init((res)=>{
			//使用事务
			var transaction = ImDb.transaction('im', 'readwrite');
			// 当事务中的所有操作请求都被处理完成时触发
			transaction.oncomplete = function(event) {};
			// 当事务中出现错误时触发，默认的处理方式为回滚事务；
			transaction.onerror = function(event) {};
			// 当事务被终止时触发
			transaction.onabort = function(event) {};
			// 从事务中获得相关的对象存储空间对象
			var objStore = transaction.objectStore('im');
			var request = objStore.add(data);
			request.onsuccess = function(e) {
				successCallback && successCallback(true);
			};
			request.onerror = function(e) {
				errorCallback && errorCallback(false);
			};
		});
	},
	// 修改已读状态
	updateIsRead(targetId,successCallback, errorCallback) {
		Im.init((res)=>{
			var transaction = ImDb.transaction('im', 'readwrite');
			transaction.oncomplete = function(event) {};
			transaction.onerror = function(event) {};
			transaction.onabort = function(event) {};
			var objStore = transaction.objectStore('im');
			var target = objStore.index('targetId');
			var request = target.openCursor(IDBKeyRange.lowerBound(targetId));
			request.onsuccess = function(e) {
				var cursor = this.result;
	            if(cursor){
	            	var val = cursor.value;
	            	if(val.targetId == targetId){
						val.isRead = true;
						cursor.update(val);
						//修改消息数
						let info = {}
						info.title = 'chatNum';
						info.value = val.messageUId;
						store.commit("removeChatNum",info);
					
						successCallback && successCallback(cursor);
					}
	            	cursor.continue();//遍历了存储对象中的所有内容
	            }
			}
		});
	},
	// 删除数据
	remove(userId, successCallback, errorCallback) {
		Im.init((res)=>{
			var transaction = ImDb.transaction('im', 'readwrite');
			transaction.oncomplete = function(event) {};
			transaction.onerror = function(event) {};
			transaction.onabort = function(event) {};
			var objStore = transaction.objectStore('im');
			var request = objStore.delete(userId);
			request.onsuccess = function(e) {
				successCallback && successCallback(true);
			};
			request.onerror = function(e) {
				errorCallback && errorCallback(false);
			};
		});
	},
};

let MsgDb;
const Msg = {
	// 初始化
	init(callback) {
		if(!store.state.isConnectDb) {
			var request = window.indexedDB.open('db_msg_userId:' + store.state.userId, 1); // 打开数据库
			request.onsuccess = function(e) { // 监听连接数据库成功时执行
				ImDb = e.target.result;
				callback && callback(true)
			}
			request.onerror = function(e) { // 监听连接数据库失败时执行
				console.log('连接数据库失败');
			}
			request.onupgradeneeded = function(event) {
				ImDb = request.result; //获得数据库实例对象
				if(!ImDb.objectStoreNames.contains("msg")) { //判断对象存储空间名称是否已经存在
					var objectStore = ImDb.createObjectStore("msg", {
						keyPath: "msgId"
					});
					objectStore.createIndex("msgId", "msgId", {
						unique: false
					});
					objectStore.createIndex("msgType", "msgType", {
						unique: false
					});
					objectStore.createIndex("isRead", "isRead", {
						unique: false
					});
				}
			}
		}
	},
	// 查询数据
	get(successCallback, errorCallback) {
		Msg.init((res)=>{
			var transaction = ImDb.transaction('msg', 'readwrite');
			var objStore = transaction.objectStore('msg');
			var request = objStore.openCursor();
			request.onsuccess = function(e) {
				var cursor = e.target.result;
	            if(cursor){
	            	cursor.continue();//遍历了存储对象中的所有内容
	            }
	            successCallback && successCallback(cursor);
			};
			request.onerror = function(e) {
				errorCallback && errorCallback(e);
			};
		})
	},
	// 插入数据
	insert(data, successCallback, errorCallback) {
		Msg.init((res)=>{
			//使用事务
			var transaction = ImDb.transaction('msg', 'readwrite');
			// 当事务中的所有操作请求都被处理完成时触发
			transaction.oncomplete = function(event) {};
			// 当事务中出现错误时触发，默认的处理方式为回滚事务；
			transaction.onerror = function(event) {};
			// 当事务被终止时触发
			transaction.onabort = function(event) {};
			// 从事务中获得相关的对象存储空间对象
			var objStore = transaction.objectStore('msg');
			var request = objStore.add(data);
			request.onsuccess = function(e) {
				successCallback && successCallback(true);
			};
			request.onerror = function(e) {
				errorCallback && errorCallback(false);
			};
		});
	},
	// 修改已读状态
	updateIsRead(data,successCallback, errorCallback) {
		Msg.init((res)=>{
			var transaction = ImDb.transaction('msg', 'readwrite');
			transaction.oncomplete = function(event) {};
			transaction.onerror = function(event) {};
			transaction.onabort = function(event) {};
			var objStore = transaction.objectStore('msg');
			var target = objStore.index('msgId');
			var request = target.openCursor(IDBKeyRange.lowerBound(data.value));
			request.onsuccess = function(e) {
				var cursor = this.result;
	            if(cursor){
	            	var val = cursor.value;
	            	if(val.msgId == data.value){
						val.isRead = true;
						cursor.update(val);
						//修改消息数
						let info = {}
						info.title = data.title;
						info.value = val.msgId;
						store.commit("removeMsgNum",info);
					
						successCallback && successCallback(cursor);
					}
	            	cursor.continue();//遍历了存储对象中的所有内容
	            }
			}
		});
		
	},
	// 删除数据
	remove(userId, successCallback, errorCallback) {
		this.init();
		var transaction = ImDb.transaction('msg', 'readwrite');
		transaction.oncomplete = function(event) {};
		transaction.onerror = function(event) {};
		transaction.onabort = function(event) {};
		var objStore = transaction.objectStore('msg');
		var request = objStore.delete(userId);
		request.onsuccess = function(e) {
			successCallback && successCallback(true);
		};
		request.onerror = function(e) {
			errorCallback && errorCallback(false);
		};
	},
};

export default {
	Im,Msg
}