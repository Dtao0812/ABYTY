<template>
	<aby-page>
		<aby-header title="Ta的名片" slot="header"></aby-header>
		<div class="mui-content guidepage" slot="content">
			<div class="panelTop">
				<div class="face" :style="'background-image:url('+list.aac502+')'">
					<!--<img id="bookface" :src="list.aac502"/>-->
				</div>
				<div class="info">
					<img class="photo" :src="list.aac007" />
					<p class="name">{{list.aac005}}</p>
					<p class="city"><aby-icon type="nowlocation"></aby-icon>{{list.aac204}}</p>
					<aby-icon-color type="chat-circle" class="btnMsg"></aby-icon-color>
					<aby-icon-color @click.native="$tool.dialTelToApp(list.aac002)" type="call-circle" class="btnCall"></aby-icon-color>
				</div>
			</div>
			<div class="spaceTitle">
				<h4>TA的名片信息</h4>
			</div>
			<div class="panelContent">
				<mt-cell title="个人标签">
					<span v-for="li in list.vsTags"><i class="tip">{{li}}</i></span>
				</mt-cell>
				<mt-cell title="语言">
					<span>{{list.vsLanguges | filterListToString}}</span>
				</mt-cell>
				<mt-cell title="从业时间" class="space">
					<span>{{list.vsJobYears||'未设置'}}年</span>
				</mt-cell>
				<mt-cell title="业务范围">
					<span>{{list.vsBranched | filterListToString}}</span>
				</mt-cell>
				<mt-cell title="职业性质">
					<span>{{list.vsJobType||'未设置'}}</span>
				</mt-cell>
				<mt-cell title="技术等级">
					<span>{{list.vsSkillLevel||'未设置'}}</span>
				</mt-cell>
				<div class="space"></div>
				<mt-cell title="熟悉线路">
					<span>{{list.vsRoadLines||'未设置'}}</span>
				</mt-cell>
				<mt-cell title="服务费用">
					<span>{{list.vsServFee || '未设置'}}元/天</span>
				</mt-cell>
				<mt-cell title="自我介绍" class="space">
					<span>{{list.vsIntroSelf || '未设置'}}</span>
				</mt-cell>
				<div class="spaceTitle" >
					<h4>TA和游客的精彩瞬间</h4>
				</div>
				<div class="imglist">
					<!--图片为空的时候显示-->
					<div v-if="list.vsLeadPics == ''">
						<p >Ta很懒，没有添加精彩瞬间~</p>
					</div>
					<div v-else v-for="li in list.vsLeadPics">
						<p>{{li.imgDesc}}</p>
						<img :src="li.imgUrl" />
					</div>
					
					<!--<img src="../../static/images/example/ID.jpg" />-->
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
				pbId: this.$route.params.pbId,
				list: ''
			}
		},
		methods: {
			getPageInfo(){
				let reqInfo = {};
				reqInfo.loading = 1;
				reqInfo.aac001 = this.pbId;
				this.$abyApi.User.getGuiderInfo(reqInfo, (res)=>{
					console.log('导游信息：'+JSON.stringify(res));
					res.userinfo.aac002 = this.$abyApi.Crypto.DeCrypt(res.userinfo.aac002)
					this.list = res.userinfo;
				})
			},
			setImgSize(){//设置横幅图片3：2
				var imgArr = document.getElementById("bookface");
				imgArr.style.height = 2*document.body.clientWidth / 3 + "px";
			},
			clickZan(){//点赞
				
			}
		},
		mounted() {
			this.getPageInfo();
			this.setImgSize();
		},
		created() {}
	}
</script>

<style scoped>
	.panelTop {}
	
	.face {
		width: 100vw;
		height: 43.75vw !important;
		/*background-image: url(../../static/images/example/card.jpg);*/
		background-size: 100%;
		background-position: center;
	}
	.face img{
		width: 100%;
	}
	.info {
		width: 100vw;
		height: 60px;
		background-color: #FFFFFF;
		padding: 10px 15px;
	}
	
	.info p {
		padding: 0px 0px 0px 65px;
		margin: 0px;
	}
	
	.info .name {
		color: #232323;
		font-size: 15px;
	}
	
	.info .city {
		font-size: 12px;
	}
	
	.info .mui-icon {
		font-size: 13px;
		margin-left: -2px;
		margin-right: 1px;
	}
	
	.photo {
		border-radius: 50%;
		border: 3px solid #FFFFFF;
		width: 60px;
		height: 60px;
		position: absolute;
		left: 10px;
		margin-top: -25px;
	}
	
	.spaceTitle h4 {
		padding: 10px 10px;
		font-size: 15px;
	}
	
	.imglist {
		background-color: #FFFFFF;
		padding: 10px;
		margin-bottom: 30px;
	}
	
	.imglist img {
		width: 100%;
		vertical-align: bottom;
		margin-bottom: 10px;
	}
	
	.mint-cell {
		border-bottom: 1px solid #F0F0F0;
	}

	.tip{
		background: #F0F0F0;
		font-size: 12px;
		padding: 3px 8px;
		border-radius: 15px;
		margin-left: 3px;
	}
	.btnMsg,.btnCall{
		position: absolute;
		margin-top: -40px;
		right: 10px;
		width: 35px;
		height: 35px;
	}
	.btnCall{
		right: 60px;
	}
</style>