<template>
    <div class="header_container">

		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{ path: '/manage' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
		</el-breadcrumb>
		
		<el-dropdown @command="handleCommand" menu-align='start'>
  			<span class="el-dropdown-link avator" >
   			 欢迎{{username}}<i class="el-icon-arrow-down el-icon--right"></i>
 			 </span>
  			<el-dropdown-menu slot="dropdown">
   		 		<el-dropdown-item command="home">首页</el-dropdown-item>
    			<el-dropdown-item command="exit">退出</el-dropdown-item>
    		</el-dropdown-menu>
		</el-dropdown>
    </div>
</template>

<script>
import userlistVue from '../page/userlist.vue';
import myStore from '@/components/store';	
    export default {
    	data(){
    		return {
    			username:"123"
    		}
    	},
    	created(){
    		
    	},
    	computed: {
    		
    	},
		methods: {
			handleCommand(command) {
				if(command=='exit'){
					sessionStorage.removeItem("userName");
					this.$router.push("/");
				}
				if(command=="home"){
					this.$router.push("/manage");
				} 
			}
		},
		beforeMount:function(){
			// 挂载数据到 DOM之前会调用
			this.username=sessionStorage.getItem("userName");
		},
	}
</script>

<style lang="less">
	@import '../style/mixin';
	.header_container{
		background-color: #EFF2F7;
		height: 60px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 20px;
	}
	.avator{
		.wh(36px, 36px);
		border-radius: 50%;
		margin-right: 37px;
	}
	.el-dropdown-menu__item{
        text-align: center;
    }
</style>
