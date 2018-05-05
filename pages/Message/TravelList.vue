<template>
	<aby-page>
		<aby-header title="旅游咨询" slot="header"></aby-header>
		<div class="mui-content" slot="content">
			<div class="timepanel">
				<span class="time">5分钟前</span>
			</div>		
			<div class="mui-card space">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<div class="cardface">
							<img class="bookface" src="../../static/images/example/card.jpg" />
							<p class="tipTitle aby-list-title-2">咨询标题咨询标题咨询标题咨询标题咨询标题咨询标题</p>
						</div>
					</div>
					<div class="carditem">
						<p class="itemtitle mui-ellipsis-2">标题标题标题标题标题标题标题标题标题标题标题标题标题标题</p>
						<img class="itemimg" src="../../static/images/example/card.jpg" />
					</div>
					<div class="carditem">
						<p class="itemtitle mui-ellipsis-2">标题标题标题标题标题标题标题标题标题标题标题标题标题标题</p>
						<img class="itemimg" src="../../static/images/example/card.jpg" />
					</div>
				</div>
			</div>
		</div>
	</aby-page>
</template>

<script>
</script>

<style scoped>
	.cardface {
		position: relative;
	}
	
	.bookface {
		width: 100%;
		vertical-align: bottom;
	}
	
	.tipTitle {
		position: absolute;
		padding: 5px 10px;
		background-color: rgba(0, 0, 0, .6);
		width: 100%;
		color: #FFFFFF!important;
		font-weight: 400!important;
		height: 50px;
		margin-top: -50px;
	}
	
	.carditem {
		padding: 5px 0px;
		margin-top: 10px;
		margin-left: 10px;
		margin-right: 10px;
		position: relative;
		border-bottom: 1px solid #F0F0F0;
	}
	
	.mui-card-content-inner{
		padding-bottom: 0px!important;
		padding: 10px;
	}
	
	.itemtitle {
		padding-right: 70px;
		color: #232323;
	}
	
	.itemimg {
		width: 50px;
		height: 50px;
		position: absolute;
		right: 0px;
		top: 0px;
	}
	.timepanel{
		text-align: center;
		padding: 15px 0px 0px 0px;
	}
	
	.time {
		background-color: rgba(0,0,0,.3);
		color: #FFFFFF;
		padding: 3px 5px;
		border-radius: 3px;
	}
	
	.mui-card {
		margin: 10px!important;
		border-radius: 4px;
		-webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, 0);
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0);
	}
</style>