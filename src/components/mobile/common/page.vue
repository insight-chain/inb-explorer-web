<template>
    <div id="page">
        <Pagination
            v-model="currentPage" 
            :total-items="total" 
            :show-page-size="4" 
            prev-text="<" style="width:.15rem;"
            next-text=">"
            force-ellipses
            @change="changePage"
            :items-per-page="8"
        />
        </div>
</template>
<script>
import { Pagination } from 'vant';
export default {
    data(){
        return{
            currentPage:1,
        }
    },
    props:['total'],
    components:{
        Pagination
    },
    methods:{
        changePage(page){
            this.$emit('changepage',page);
        }
    }
}
</script>
<style lang="less" scoped>
        #page{
            padding:.0 .46rem .3rem 0;   
        }
        #page /deep/ .van-pagination{
            width: 100%;           
        }
         #page /deep/ .van-pagination .van-pagination__item {
                border-radius: 0.04rem;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 0.32rem;
                padding:.3rem;
                border-radius: 0.04rem;
                color: #000;
                margin-left:.196rem;
         }
        #page /deep/ .van-pagination__item{
              background-color:#f4f6fa;
              min-width: 0;
              width: .5rem;
              height:.5rem;
              border-bottom: none;
          }
        #page /deep/ .van-pagination__prev{
            width: .5rem;
        }
        #page /deep/ .van-pagination__item--active{
              background-color:#396ea0;
              color: #fff !important;
          }
        #page /deep/ .van-pagination__item:active{
              background-color:#f4f6fa;
              
          }
        #page /deep/ .van-hairline{
            position: static;  
         }
         //去掉边框
        #page /deep/ .van-hairline::after{
            border:none;  
         } 
         #page /deep/ .van-pagination__item--disabled{
             opacity: 1;
         }
        
</style>
