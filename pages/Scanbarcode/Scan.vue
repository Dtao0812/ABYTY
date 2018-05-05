<template>
	<div style="background-color: rgba(0,0,0,.8);margin: 0px;height: 100%;">
		<div id="bcid">
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			<p class="tip">...载入中...</p>
		</div>
		<footer>
			<div class="fbt" id="btnBack" @click="onBack">取消</div>
		</footer>
	</div>
</template>

<script>
	export default {
		data() {
			return {}
		},
		methods: {
			init(){
				plus.navigator.setStatusBarBackground("#000000");

				let AVCaptureDevice = plus.ios.importClass("AVCaptureDevice");
				let Status = AVCaptureDevice.authorizationStatusForMediaType("vide");
				if(3 != Status) {
					this.$tool.alert('请在设置中设置允许使用相机',(e)=> {
						this.onBack();
					});
				}
				// 开始扫描
				this.barCode();
			},
			// 开始扫描
			barCode(){
				let styles = {
					frameColor: "#FFFFFF",
					scanbarColor: "#FFFFFF"
				}; //边框属性，中间线属性，背景色
				scan = new plus.barcode.Barcode('bcid', "", styles);
				scan.onmarked = this.onmarked;
				scan.start({
					conserve: true,
				});
			},
			// 扫描成功
			onmarked(type, result, file) {
				switch(type) {
					case plus.barcode.QR:
						type = "QR";
						break;
				}
				result = result.replace(/\n/g, '');
				
				let reqInfo = {};
				reqInfo.barcodeValue = result;
				this.$abyApi.User.doScanBarcode(reqInfo,(res)=>{
					this.$toast("扫描登录成功！")
					setTimeout(()=>{
						this.onBack();
					},1500);
				})
			},
			// 返回
			onBack(){
				plus.navigator.setStatusBarBackground("#323136");
				this.$router.back();
			}
		},
		mounted() {},
	}
</script>

<style scoped>
	#bcid {
		width: 100%;
		position: absolute;
		top: 0px;
		bottom: 44px;
		text-align: center;
	}
	
	.tip {
		color: #FFFFFF;
		font-weight: bold;
		text-shadow: 0px -1px #103E5C;
	}
	
	footer {
		width: 100%;
		height: 44px;
		position: absolute;
		bottom: 0px;
		line-height: 44px;
		text-align: center;
		color: #FFF;
	}
	
	.fbt {
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0);
		float: left;
	}
	
	.fbtline {
		width: 2%;
		height: 100%;
		background-color: #000000;
		float: left;
		text-align: center;
	}
	
	.fbt:active {
		-webkit-box-shadow: inset 0 3px 5px rgba(0, 0, 0, 1);
		box-shadow: inset 0 3px 5px rgba(0, 0, 0, 1);
	}
</style>