<template>
  <div class="login_page fillcontain">
    <el-form ref="loginForm" :model="form" :rules="rules" label-width="80px" class="form_contianer login-box">
      <h3 class="login-title">欢迎登录</h3>
      <el-form-item label="账号" prop="username">
        <el-input type="text" placeholder="请输入账号" v-model="form.username"/>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" placeholder="请输入密码" v-model="form.password"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" v-on:click="onSubmit('loginForm')">登录</el-button>
      </el-form-item>
    </el-form>

    <el-dialog
      title="温馨提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <span>{{errmessage}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'

import myStore from '@/components/store';

  export default {
    name: "Login",
    data() {
      return {
        form: {
          username: '',
          password: ''
		},
		errmessage:'请输入账号和密码',

        // 表单验证，需要在 el-form-item 元素中增加 prop 属性
        rules: {
          username: [
            {required: true, message: '账号不可为空', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '密码不可为空', trigger: 'blur'}
          ]
        },

        // 对话框显示和隐藏
        dialogVisible: false
      }
    },
    methods: {
      onSubmit(formName) {
        // 为表单绑定验证功能
        this.$refs[formName].validate((valid) => {
          if (valid) {
			  var s = '?username='+this.form.username+'&password='+this.form.password;
			  axios.get('http://127.0.0.1:8080/admin/login'+s)
			  .then(res=>{
					  if(res.data.status==0){
						  myStore.name=res.data.data.adminName;
						  myStore.id=res.data.data.id;
						  sessionStorage.setItem("userName",res.data.data.adminName);
						  this.$router.push("/manage");
						  return true;
					  }else{
						  this.errmessage=res.data.data;
						  this.dialogVisible = true;
            			  return false;
					  }
			  },error=>{
					this.dialogVisible = true;
            		return false;
			  });
            // 使用 vue-router 路由到指定页面 this.$router.push("/manage");
          } else {
            this.dialogVisible = true;
            return false;
          }
        });
      }
    }
  }
</script>

<style lang="less"scoped>
@import '../style/mixin';
.login_page{
		background-color: #324057;
	}
  .login-box {
    border: 1px solid #DCDFE6;
    width: 350px;
    margin: 180px auto;
    padding: 35px 35px 15px 35px;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    box-shadow: 0 0 25px #909399;
  }

  .login-title {
    text-align: center;
    margin: 0 auto 40px auto;
    color: #303133;
  }
 .form_contianer{
		.wh(320px, 210px);
		.ctp(320px, 210px);
		padding: 25px;
		border-radius: 5px;
		text-align: center;
		background-color: #fff;
		.submit_btn{
			width: 100%;
			font-size: 16px;
		}
	}
	
</style>