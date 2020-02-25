<template>
   <div class="fillcontain">
        <head-top></head-top>
      
        <div class="table_container">
            <el-table
                :default-sort = "{prop: 'id', order: 'escending'}"
                 :data="tableData"
                 style="width: 100%">
                 <el-table-column
                    sortable
                   prop="id"
                   label="id"
                   width="180">
                 </el-table-column>
                 <el-table-column
                   prop="productName"
                   label="商品名称"
                   width="180">
                 </el-table-column>
                 <el-table-column
                   prop="infor"
                   label="商品信息"
                   width="180">
                 </el-table-column>
                 <el-table-column
                   prop="account"
                   label="商品数量"
                   width="180">
                 </el-table-column>
                 <el-table-column
                   prop="points"
                   label="商品积分"
                   width="180">
                 </el-table-column>
                 <el-table-column prop="image" label="图片" width="180" >
                 <!-- 图片的显示 -->
                     <template   slot-scope="scope">            
                        <img :src="scope.row.image"  min-width="300" height="80" />
                    </template>         
                </el-table-column>
                 <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="Pagination">
                 <el-pagination
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="currentPage"
                   :page-sizes="[5, 10, 15, 20]"
                   :page-size="limit"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="count">
                 </el-pagination>
            </div>
                <el-dialog
                  title="修改商品"
                  :visible.sync="dialogVisible"
                  width="50%">
                    <el-form :model="selectTable">
                        <el-form-item label="商品名称" prop="productName">
				        		<el-input v-model="selectTable.productName"></el-input>
				        </el-form-item>	
                        <el-form-item label="描述信息" prop="infor">
				        		<el-input v-model="selectTable.infor"></el-input>
				        </el-form-item>	
                        <el-form-item label="商品数量" prop="account">
				        		<el-input v-model.number="selectTable.account" maxLength="11"></el-input>
				        </el-form-item>	
                        <el-form-item label="商品积分" prop="points">
				        		<el-input v-model.number="selectTable.points" maxLength="11"></el-input>
				        </el-form-item>	
                        <el-form-item label="" prop="points">     		         
                                <img :src="selectTable.image"  min-width="500" height="200" />
                        </el-form-item>	
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                      <el-button @click="dialogVisible = false">取 消</el-button>
                      <el-button type="primary" @click="updateProduct">确 定</el-button>
                    </div>
                </el-dialog>
        
        </div>
        
    </div>
    
</template>

<script>
import headTop from '../components/headTop'
import axios from 'axios'
export default {
    data(){
        return {
            tableData: [],
            currentPage: 1,
            limit: 20,
            count:0,
            selectTable: {},
            dialogVisible: false
        }
    },
    components: {
    		headTop,
    },
    created(){
        this.getCount();
        this.getData();
            
    },
    methods: {
        //获取表格数据
        async getData(){
            this.tableData=[];
            var s = '?page='+this.currentPage+'&limit='+this.limit;
			  axios.get('http://127.0.0.1:8080/getProductPage'+s)
			  .then(res=>{
					  if(res.data.code==0){
						  var list = res.data.data;
                          list.forEach(item => {
                              this.tableData.push(item);
                          });  
					  }else{
						  
					  }
			  },error=>{
					
			  });
        },
        //获取总数
        async getCount(){
            axios.get('http://127.0.0.1:8080/getProductCount')
			.then(res=>{
				    if(res.data.code==0){
                        this.count=res.data.data;
				    }else{
				     
				    }
			  },error=>{
					
			  });
        },
        async updateProduct(){
            this.dialogVisible=false;
            var param=new FormData();
            param.append('id', this.selectTable.id);
            param.append('productName', this.selectTable.productName);
            param.append('infor', this.selectTable.infor);
            param.append('account', this.selectTable.account);
            param.append('points', this.selectTable.points);
            param.append('image', this.selectTable.image);
            console.log(param);
            let config = {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }
            // 4.3，然后通过下面的方式把内容通过axios来传到后台
            axios.post('http://127.0.0.1:8080/updateProduct', param, config)
            .then(res=>{
                if(res.data.code==0){
                    alert("上传成功");
                    this.selectTable={};
                    this.getData();
                }else{
                    alert("上传失败");
                }
            },
                error=>{
            
                }
            )
            this.selectTable={};
            this.getData();
        },
        handleSizeChange(val) {
            this.limit=val;
            this.getData();
        },
        handleCurrentChange(val) {
            this.currentPage=val;
            this.getData();
        },
        handleEdit(index, row) {
            this.selectTable = row;
            this.dialogVisible = true;
        },
        handleDelete(index, row) {
             var s ="?id="+row.id;
			  axios.get('http://127.0.0.1:8080/deleteProduct'+s)
			  .then(res=>{
					  if(res.data.status==0){
                          alert("删除成功");
                          this.getData();
					  }else{
						  
					  }
			  },error=>{
					alert("删除失败");
			  });
        }
    }
 
 }
</script>

<style lang="less">
	@import '../style/mixin';
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
    .table_container{
        padding: 20px;
    }
    .Pagination{
        display: flex;
        justify-content: flex-start;
        margin-top: 8px;
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
</style>