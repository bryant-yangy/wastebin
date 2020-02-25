<template>
   <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            <el-table
                :data="tableData"
                highlight-current-row
                style="width: 100%">
                <el-table-column
                  type="index"
                  width="100">
                </el-table-column>
                <el-table-column
                  property="id"
                  label="id"
                  width="220">
                </el-table-column>
                <el-table-column
                  property="trashName"
                  label="名称"
                  width="220">
                </el-table-column>
                <el-table-column
                  property="points"
                  label="积分">
                </el-table-column>
            </el-table> 
        </div>
    </div>
    
</template>

<script>
 import headTop from '../components/headTop'
import axios from 'axios'

 export default {
     data(){
         return{
            tableData: [],
            currentPage:1,   
            pagesize:1,
         }
     },
     components: {
    		headTop,
    },
    created(){
             this.initData();
    },
    methods: {
        async initData(){
             axios.get('http://127.0.0.1:8080/getTrashList')
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
        handleSizeChange:function(size){   //一页显示多少条
            this.pagesize = size;
        },
        handleCurrentChange:function(currentPage){  //页码更改方法
            this.currentPage = currentPage;
        }
    }    
 
 }
</script>

<style lang="less">
	@import '../style/mixin';
    .table_container{
        padding: 20px;
    }
</style>