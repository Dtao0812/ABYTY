<template>
	<ul class="mui-table-view" v-if="list.length>0">
		<aby-no-content v-if="noContent"></aby-no-content>
		<li class="mui-table-view-cell mui-media" v-for="(li,i) in list" :key="i" @click="toHomePage(li)">
			<a>
				<img class="faceTip" src="../../static/images/ico/ico_good.png" />
				<img class="mui-media-object mui-pull-left aby-img-guide" :src="li.cpLogo">
				<div class="mui-media-body aby-list">
					<p class="aby-list-title mui-ellipsis">{{li.cpName}}</p>
					<p class="mui-ellipsis">
						营业范围：{{li.cpRoute}}
					</p>
					<p class="mui-ellipsis">
						<aby-icon type="nowlocation" class="iconowlocation"></aby-icon>{{li.cpCityName}}
					</p>
					<p>
						<img class="aby-gold mui-pull-left" src="../../static/images/ico/ico_bond_3x.png" />
						<span class="look  mui-pull-right"><aby-icon type="hot" class="icohot"></aby-icon>立即查看</span>
					</p>
				</div>
			</a>
		</li>
	</ul>
</template>

<script>
	export default {
		components: {
		},
		props: ['list'],
		data() {
			return {
				noContent:false
			}
		},
		methods:{
			// 公司主页
			toHomePage(li){
				this.$router.push({
					name:"homePage",
					params:{
						cpId:li.cpId
					}
				})
			},
		},
		mounted(){
			
		},
		watch: {  
		    list(val){
		    	this.noContent = val.length == 0;
		    	this.list = val;
		    }  
		}  
	}
</script>

<style scoped>
	.look {
		background-color: #FF605D;
		color: #FFFFFF;
		font-size: 12px;
		padding: 2px 5px;
		border-radius: 5px;
	}
	
	.look .mui-icon {
		font-size: 10px;
	}
	.iconowlocation{
		font-size: 12px;
	}
</style>