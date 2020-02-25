<template>
   <div class="fillcontain">
        <head-top></head-top>
        <el-table
                :default-sort = "[{prop: 'id', order: 'escending'},{prop:'date', order: 'escending'}]"
                 :data="tableData"
                 style="width: 100%">
                 <el-table-column
                    sortable
                   prop="id"
                   label="id"
                   width="180">
                 </el-table-column>
                 <el-table-column
                    sortable
                   prop="date"
                   label="创建日期"
                   width="180">
                 </el-table-column>
                 <el-table-column
                   prop="userName"
                   label="用户名"
                   width="180">
                 </el-table-column>
                 <el-table-column
                   prop="productName"
                   label="商品名称"
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
            tableData: [],
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
			  axios.get('http://127.0.0.1:8080/getIdentPage'+s)
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
            axios.get('http://127.0.0.1:8080/getIdentCount')
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