<template>
	<aby-page>
		<aby-header title="我的店铺" slot="header"></aby-header>
		<div class="mui-content" slot="content">
			<div class="qrcard" id="barcodeinfo">
				<div class="head">
					<img :src="cpUserInfo.cpBasic.cpLogo"/>
					<p class="mui-ellipsis fontBlack">{{cpUserInfo.userName}}</p>
					<p class="mui-ellipsis">{{cpUserInfo.cpBasic.cpName}}</p>
				</div>
				<div class="qrcode">
					<img :src="barcode" >
					<img v-show="!barcode" src="../../static/images/ico/ico-code.png"/>
					<h5>扫一扫，查看店铺产品</h5>
				</div>
			</div>
			<div class="share">
				<h5 class="mui-content-padded h5title"><span>分享到社交平台</span></h5>
				<div class="divPanel" ex="qq" @click="onShare(shareinfo, 'qq', 'qq', interInfo)">
					<aby-icon-color type="qq" id="qqFriend"></aby-icon-color>
					<!--<span>qq好友</span>-->
				</div>
				<div class="divPanel" channelid="qzone" ex="qzone"  @click="onShare(shareinfo, 'qzone', 'qzone', interInfo)">
					<aby-icon-color type="qqspace" id="qqSpace"></aby-icon-color>
					<!--<span>qq空间</span>-->
				</div>
				<div class="divPanel" ex="WXSceneSession" @click="onShare(shareinfo, 'WXSceneSession', 'weixin', interInfo)">
					<aby-icon-color type="wechat" ></aby-icon-color>
					<!--<span>微信好友</span>-->
				</div>
				<div class="divPanel" channelid='weixin' ex="WXSceneTimeline" @click="onShare(shareinfo, 'WXSceneTimeline', 'weixin', interInfo)">
					<aby-icon-color type="firends" ></aby-icon-color>
					<!--<span>朋友圈</span>-->
				</div>
			</div>
		</div>
		
	</aby-page>
</template>

<script>
	export default {
		components: {
		},
		data() {
			return {
				cpUserInfo:this.$store.state.cpUserInfo,
				barcode:'',//二维码图片
				shareInfo: {},
				interInfo: ''
			}
		},
		methods:{
			get_myCode(){
				let reqInfo = {};
				reqInfo.cpId = this.cpUserInfo.cpId;
				reqInfo.cpBtype = this.cpUserInfo.cpBasic.cpBtype;
				this.$abyApi.User.get_myCode(reqInfo, (res)=>{
					this.barcode = res.shopInfo.barcode;
					//分享的数据
					this.shareinfo = res.shopInfo.shareInfo;
					
				});
				this.$abyApi.General.updateSerivces();
			},
			onShare(shareinfo, shareId, channelid, interInfo){
				console.log('shareinfo:'+JSON.stringify(shareinfo))
				this.$abyApi.General.downLoadFile(shareinfo.shareImg, 'myCode.JPG', (file)=>{
					console.log('第一层file：'+file)
					this.$abyApi.Image.compressImage(file, file, true, 1, (res)=>{
						//发送分享
						if(shareId == 'WXSceneSession' || shareId == 'qq') {
							this.$abyApi.General.shareAction(channelid, shareId, true, shareinfo.shareUrl, file, shareinfo.shareTitle, shareinfo.shareDesc, interInfo);
						}
						if(shareId == 'WXSceneTimeline' || shareId == 'qzone') {
							this.$abyApi.General.shareAction(channelid, shareId, true, shareinfo.shareUrl, file, shareinfo.shareDesc, shareinfo.shareTitle, interInfo);
						}
						if(shareId == 'sinaweibo') {
							this.$abyApi.General.shareAction('sinaweibo', 'sinaweibo', false, shareinfo.shareUrl, file, shareinfo.shareTitle, shareinfo.shareDesc, interInfo);
						}
					})
				})
			},
		},
		mounted() {
			this.get_myCode()
		},
	}
</script>
<style scoped>
	.mui-table-view-cell:after {
		left: 0px;
		background-color: #c8c7cc;
	}
	.mui-content{
		background-color: #08C7B5;
		padding: 18% 25px 55% 25px;
		height: 100%;
		width: 100%;
	}
.qrcard {
	border-radius: 4px;
	margin: 10% 25px 20px 25px;
	background-color: #FFFFFF;
}

.qrcode {
	padding-top: 30px;
	padding-bottom: 1px;
	text-align: center;
}
.qrcode h5{
	font-size: 12px;
}
.qrcode h5:last-child{
	margin-bottom: 30px;
}
.head
{
	position: relative;
	padding: 32px 20px 20px;
}
.head img
{
	width: 60px;
	height: 60px;
	float: left;
	position: absolute;
	margin-top: 1px;
	top: -30px;
	left: 50%;
	transform: translate(-50%, 0);
	-ms-transform: translate(-50%, 0);
    -webkit-transform: translate(-50%, 0);
    -o-transform: translate(-50%, 0);
    -moz-transform: translate(-50%, 0);
	border-radius: 50%;
}
.head p
{
    margin: 0px;
    float: left;
    display: block;
    width: 100%;
    text-align: center;
    
}
.share {
	margin: 15px 0px 0px 0px;
	padding: 0px 15px 0px 15px;
	width: 100%;
	text-align: center;
	position:fixed;
	height:100px; 
	left:0px; 
	bottom:0px; 
}

.qrcode img {
	width: 65%;
}

.h5title
{
	margin-bottom: 15px;
	margin-left: 15px;
	color: #FFFFFF;
}

/*底部分享*/

.divPanel {
	width: 25%;
	text-align: center;
	float: left;
	font-size: 11px;
	color: #FFFFFF;
}

.divPanel img {
	width: 28px;
}

.divPanel span {
	display: block;
}
svg:not(:root){
	width: 35px;
	height: 35px;
}
</style>