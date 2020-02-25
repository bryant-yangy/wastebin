<template>
   <div class="fillcontain">
        <head-top></head-top>
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
                   prop="createDate"
                   label="创建日期"
                   width="180">
                 </el-table-column>
                 <el-table-column
                   prop="username"
                   label="用户名"
                   width="180">
                 </el-table-column>
                 <el-table-column
                   prop="name"
                   label="姓名"
                   width="180">
                 </el-table-column>
                 <el-table-column
                   prop="points"
                   label="商品积分"
                   width="180">
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
    </div>
    
</template>

<script>
 import headTop from '../components/headTop'
import axios from 'axios'
 export default {
     data(){
          return {
            tableData: [{"id":1001,"createDate":"2020-02-24 04:06:40","username":"zhangsan","password":null,"hasFace":null,"points":0,"phone":null,"name":null},{"id":1002,"createDate":"2020-02-24 04:06:41","username":"lisi","password":null,"hasFace":null,"points":0,"phone":null,"name":null},{"id":1003,"createDate":"2020-02-24 04:06:41","username":"wangwu","password":null,"hasFace":null,"points":0,"phone":null,"name":null}],
            currentPage: 1,
            limit: 20,
            count:0,
            
        }
     },
     created(){
        this.getCount();
        this.getData();
            
    },
     components: {
    		headTop,
    },
    methods:{
        async getData(){
            this.tableData=[];
            var s = '?page='+this.currentPage+'&limit='+this.limit;
			  axios.get('http://127.0.0.1:8080/getUserPage'+s)
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
        async getCount(){
            
            axios.get('http://127.0.0.1:8080/getUserCount')
			.then(res=>{
				    if(res.data.code==0){
                        this.count=res.data.data;
				    }else{
                        
				    }
			  },error=>{
					
			  });
        },
         handleSizeChange(val) {
            this.limit=val;
            this.getData();
        },
        handleCurrentChange(val) {
            this.currentPage=val;
            this.getData();
        },
    }
 
 }
</script>

<style lang="less">
	@import '../style/mixin';
    
</style>