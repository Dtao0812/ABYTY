<template>
	<aby-page>
		<aby-header title="系统通知" slot="header"></aby-header>
		<div class="mui-content" slot="content">
			<div class="mui-card space">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<h5>
							<aby-icon class="mui-icon icon-order" type="msgorder"></aby-icon>
							收到新协议<span class="time">09:55</span>
						</h5>
						<h4>收到新协议《华东五市出行合同》</h4>
						<p>南京牛气冲天旅行社</p>
					</div>
				</div>
			</div>
			<div class="mui-card space">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<h5>
							<aby-icon class="mui-icon icon-sys" type="msgsystem"></aby-icon>
							供应商推荐<span class="time">09:55</span>
						</h5>
						<h4 class="mui-ellipsis">猜您对以下供应商感兴趣</h4>
						<p class="mui-ellipsis">南京牛气冲天旅行社，南京在路上旅行社有限公司</p>
					</div>
				</div>
			</div>
		</div>
	</aby-page>
</template>

<script>
</script>

<style scoped>
	.time {
		margin-left: 20px;
	}
	.icon-order,.icon-sys{
		font-size: 20px;
		position: absolute;
		left: 10px;
		margin-top: 2px;
	}
	.icon-sys {
		color: #FF9800;		
	}
	.icon-order {
		color: #52B2E5;
	}
	
	.mui-card {
		-webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, 0);
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0);
	}
	
	.mui-card-content-inner {
		padding: 10px;
	}
	
	.mui-card-content-inner h5,
	.mui-card-content-inner h4,
	.mui-card-content-inner p {
		padding-left: 25px;
	}
	
	.mui-card-content-inner h5 {
		line-height: 24px;
		vertical-align: middle;
		color: #AAAAAA;
	}
	
	.mui-card-content-inner h4 {
		font-size: 14px;
		font-weight: 500;
	}
	
	.mui-card-content-inner p {
		font-size: 12px;
		color: #AAAAAA;
		padding-bottom: 0px;
		margin-bottom: 0px;
	}
</style>