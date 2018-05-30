<template>
	<div class="contacts">
		<!--联系人信息-->
		<ul class="mui-table-view mui-table-view-chevron" style="margin-top: 1px;">
			<li class="mui-table-view-cell mui-media" v-for="li in list">
				<img class="mui-media-object mui-pull-left" :src="li.userFace">
				<div class="mui-media-body mui-ellipsis">
					{{li.userName}}
					<p class='mui-ellipsis userPost'>{{li.userPost}}</p>
					<div class="divContact">
						<aby-icon-color class="icocall" type="call-circle" @click.native="onTel(li.userPhone)"></aby-icon-color>
						<aby-icon-color class="icochat" type="chat-circle" @click.native="toChatDetail(li.userId)"></aby-icon-color>
					</div>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		components: {},
		name: 'contract',
		props: ['list'],
		data() {
			return {
				tabList: this.list,
			}
		},
		methods: {
			// 拨打电话
			onTel(phone){
				let tel = this.$abyApi.Crypto.DeCrypt(phone);
				this.$tool.dialTelToApp(tel);
			},
			// 聊天
			toChatDetail(userId){
				this.$router.push({
					name: 'chat',
					params: {
						userId: userId
					}
				})
			}
		},
		mounted() {
			
		},
		watch: {  
		    list(val){
		    	this.list = val;
		    }  
		}
	}
</script>

<style scoped>
	.divContact {
		width: 100px;
		position: absolute;
		right: 0px;
		margin-top: -40px;
		padding-right: 15px;
		text-align: right;
	}
	.divContact i{
		margin-left: 5px;
		font-size: 30px;
	}
	.mui-media-body{
		padding-right: 35px;
		font-size: 16px;
	}
	.mui-media-body p{
		font-size: 12px;
	}
	.icocall,.icochat{
		width: 32px;
		height: 32px;
		margin-left: 10px;
		margin-top: 3px;
	}
	.userPost{
		min-height: 23px;
	}
	
</style>