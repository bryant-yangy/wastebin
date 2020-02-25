<template>
   <div >
        <head-top></head-top>
        
     
      <!--展示选中图片的区域-->
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%"
             :src="dialogImageUrl"
             alt="">
      </el-dialog>
        <el-row style="margin-top: 20px;">
  			<el-col :span="12" :offset="4">
		        <el-form :model="formDate" :rules="rules" ref="formDate" label-width="110px" class="demo-formData">
				<el-form-item label="商品名称" prop="productName">
						<el-input v-model="formDate.productName"></el-input>
				</el-form-item>	
                <el-form-item label="描述信息" prop="infor">
						<el-input v-model="formDate.infor"></el-input>
				</el-form-item>	
                <el-form-item label="商品数量" prop="account">
						<el-input v-model.number="formDate.account" maxLength="11"></el-input>
				</el-form-item>	
                <el-form-item label="商品积分" prop="points">
						<el-input v-model.number="formDate.points" maxLength="11"></el-input>
				</el-form-item>	
                <el-form-item label="上传图片">
					<el-upload
                        class="avatar-uploader"
                        ref="upload"
                        action="http://127.0.0.1:8080/productAdd"
                        :show-file-list="false"
                        :on-change="onchange"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeupload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
				</el-form-item>
				<el-form-item class="button_submit">
						<el-button type="primary" @click="submitForm('formData')">立即创建</el-button>
				</el-form-item>	
					
				</el-form>
  			</el-col>
  		</el-row>
    </div>
    
</template>

<script>
 import headTop from '../components/headTop'
import axios from 'axios'
 export default {
    	data(){
    		return {

    			formDate: {
                    productName:'',
                    infor:'',
                    account:'',
                    points:'',
                },
                param: '', // 表单要提交的参数
                imageUrl: '',
		        rules: {
					productName: [
						{ required: true, message: '请输入商品名称', trigger: 'blur' },
					],
					infor: [
						{ required: true, message: '请输入商品信息', trigger: 'blur' }
					],
					account: [
						{ required: true, message: '请输入商品数量' },
						{ type: 'number', message: '商品数量必须是数字' }
                    ],
                    points: [
						{ required: true, message: '请输入商品积分' },
						{ type: 'number', message: '商品必须是数字' }
                    ],
				},
				
    		}
    	},
    	components: {
    		headTop,
    	},
    	mounted(){
            
    	},
    	methods: {
       
            // 2，上传前事件
            beforeupload (file) {
              // 2.1，重新写一个表单上传的方法
                this.param = new FormData()
                this.param.append(`picture`, file) // 把单个图片重命名，存储起来（给后台）
              return false
            },
		    submitForm(formName) {
                this.$refs.formDate.validate((valid) => {
                if (valid) {
                   let _this = this
                        this.$refs.upload.submit()
                        // 4.1，下面append的东西就会到form表单数据的this.param中；
                        if(this.param==''){
                            this.$notify.error({
							    title: '错误',
							    message: '请检查输入是否正确',
							    offset: 100
						    });
                        }
                        this.param.append('productName', this.formDate.productName)
                        this.param.append('infor', this.formDate.infor)
                        this.param.append('account', this.formDate.account)
                        this.param.append('points', this.formDate.points)
                        // 4.2，赋予提交请求头，格式为：'multipart/form-data'（必须！！）
                        let config = {
                          headers: {
                            'Content-Type': 'multipart/form-data'
                          }
                        }
                        // 4.3，然后通过下面的方式把内容通过axios来传到后台
                        axios.post('http://127.0.0.1:8080/productAdd', this.param, config)
                        .then(res=>{
                            if(res.data.code==0){
                                this.formDate.productName='';
                                this.formDate.infor='';
                                this.formDate.account='';
                                this.formDate.points='';
                                this.imageUrl='';
                                this.param='';
                                alert("上传成功");
                            }else{
                                alert("上传失败");
                            }
                        },
                            error=>{
                        
                            }
                        )
                } else {
                    
                    this.$notify.error({
							title: '错误',
							message: '请检查输入是否正确',
							offset: 100
						});
                }
                });
                   
				    
				
                
            },
            
            onchange(file,fileList){
                var _this = this;
                var event = event || window.event;
                var file = event.target.files[0];
                var reader = new FileReader(); 
                //转base64
                reader.onload = function(e) {
                  _this.imageUrl = e.target.result //将图片路径赋值给src
                }
                reader.readAsDataURL(file);
            },
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
            },

		}
    }
</script>
</script>

<style lang="less">
	@import '../style/mixin';
	.button_submit{
		text-align: center;
	}
	.avatar-uploader .el-upload {
	    border: 1px dashed #d9d9d9;
	    border-radius: 6px;
	    cursor: pointer;
	    position: relative;
	    overflow: hidden;
	}
	.avatar-uploader .el-upload:hover {
	    border-color: #20a0ff;
	}
	.avatar-uploader-icon {
	    font-size: 28px;
	    color: #8c939d;
	    width: 120px;
	    height: 120px;
	    line-height: 120px;
	    text-align: center;
	}
	.avatar {
	    width: 120px;
	    height: 120px;
	    display: block;
	}
	.el-table .info-row {
	    background: #c9e5f5;
	}

	.el-table .positive-row {
	    background: #e2f0e4;
	}
    
</style>