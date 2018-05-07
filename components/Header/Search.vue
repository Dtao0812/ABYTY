<template>
	<h1 class="mui-title">
		<div class="mint-search">
			<div class="mint-searchbar">
				<div class="mint-searchbar-inner">
					<form>
						<aby-icon type="search" class="aby-font-gray"></aby-icon>
						<input type="search" id="search" :placeholder="inputPlaceholder" v-model="searchValue" :disabled="inputDisabled" class="mint-searchbar-core">
					</form>
					
				</div> 
			</div> 
		</div>
	</h1>
</template>

<script>
	export default {
		props: ['placeholder', 'disabled'],
		data() {
			return {
				inputPlaceholder: this.placeholder || '请输入关键字搜索',
				inputDisabled: this.disabled || false,
				searchValue: ''
			}
		},
		methods: {
			
		},
		mounted() {
			document.getElementById("search").addEventListener('keydown', function(e) {
				if(e.keyCode == 13) {
					e.preventDefault();
					this.searchValue();
				}
			}, false);
		},
		watch: {
			placeholder(val){
				this.inputPlaceholder = val;
			},
			searchValue(val) {
				this.searchValue = val;
				this.inputPlaceholder = val;
				this.$emit("eventSearch", val);
			}
		}
	}
</script>

<style scoped>
	.aby-search {
		position: absolute !important;
		top: 11px !important;
		left: 10px !important;
	}
	
	.mint-searchbar input {
		border-radius: 12px;
		background-color: rgba(255, 255, 255, 0);
		text-align: left;
		font-size: 14px;
		color: #BBBBBB;
	}
	
	input[type=search] {
		padding: 10px 15px 10px 5px;
	}
	
	.mint-searchbar,
	.mint-searchbar-inner {
		background-color: #F0F0F0;
	}
	
	.mint-searchbar {
		padding: 2px 10px;
		margin-top: 6px;
		border-radius: 15px;
	}
	
	.mint-searchbar-inner span {
		color: #BBBBBB;
		font-size: 20px;
		vertical-align: middle;
	}
</style>