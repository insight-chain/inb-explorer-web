<template>
    <div class="blockListWrap">
        <div class="content">
             <div class="title">
                <div>
                    <img src="../../assets/mobileImg/home/newtranstion.svg" alt="" style="width:.4rem;height:.28rem">
                    <span>最新交易</span>
                </div>
            </div>
            <div class="newBlock-list">
                <div class="newBlock-list-title">
                    <div>交易哈希</div>
                        <div>所在区块</div>
                        <div>时间</div>
                        <div>源地址</div>
                        <div>目标地址</div>
                        <div>数量</div>
                        <div>消耗NET</div>
                        <div>交易类型</div>
                        <div>状态</div> 
                    </div>
                <div class="newBlock-list-title datalist" v-for="(item, index) in transactionData" :key="index">
                        <div @click='toHash(item.hash)'>{{item.hash}}</div>
                        <div @click="toBlockNum(item.block)">{{item.block}}</div>
                        <div>{{item.timestamp}}</div>
                        <div @click='toAccount(item.from)'>{{item.from}}</div>
                        <div @click='toAccount(item.to)'>{{item.to}}</div>
                        <div>{{item.amount+' INB'}}</div>
                        <div>{{hexToInt(item.bindwith)}}</div>
                        <div>{{transactionLei(item.typeInt)}}</div>
                        <div>成功</div>        
                </div>  
            </div>
            <page @changepage="changePage" :total="total"  style="margin-top:.4rem"></page>
             <loadingMobile v-show = "showLoading"></loadingMobile>
        </div>
    </div>
</template>
<script>
    function preDev(e){
        e.preventDefault();
    } 
import {transactionLei,hexToInt} from '../../utils/utils'
import page from "../../components/mobile/common/page"
import loadingMobile from "../../components/mobile/common/loadingMobile"
import { mapState,mapMutations } from 'vuex';
export default {
    data(){
        return{
            transactionData:[],
            total:0
        }
    },
     computed:{
         ...mapState(['showLoading']),   
    },
    components:{
        //Pagination
        page,
        loadingMobile
    },
    methods:{
        transactionLei,//原因
        hexToInt,
         ...mapMutations(['SHOW_LOADING','HIDE_LOADING']),
        watchblockData(){
             if(this.transactionData.length == 0){
                this.SHOW_LOADING();
                this.stop()
             }
        },
        stop(){
            document.body.addEventListener('touchmove',  preDev, {passive: false})
        },
        move(){
            document.body.removeEventListener('touchmove', preDev, {passive: false})
        },
        getRequest(){
            setTimeout(()=>{
                var i=0
                var handler = setInterval(()=>{
                this.getTransactionData()
                i++
                if(i == 20){
                    clearInterval(handler)
                }
                },5000)
            },1000)
        },
        getTransactionData(page){
             this.$axios.get('/transactions',{
                 params:{
                     page:page,
                     limit:10
                 }
             }).then((res=>{
                  if(res.status==200){
                    this.HIDE_LOADING()
                    this.move()
                      this.total=res.data.totalCount;
                      this.transactionData=res.data.items
                  }
             })).catch((error)=>{
                 return error
             })
        },
        toBlockNum(blockid,block){
            this.$router.push({
               path:'/BlockDetailsMobile',
               query:{
                    blockNum:block,
                    blockid:blockid
               }
           })
        },
        toMore(){
          this.$router.push({path:'/blockListMobile'})  
        },
        // 跳转区块
        toBlockNum(block){
            this.$router.push({
               path:'/blockDetailsMobile',
               query:{
                    blockNum:block
               }
           })
        },
        // 跳转hash
        toHash(hash){
            this.$router.push({
                path:'/transactionHashMobile',
                query:{
                    transactionHash: hash   
                }
            })
        },
        // 跳转账户地址
        toAccount(account){
            this.$router.push({
                path:'/AccountMobile',
                query:{
                    sourceAccount:account
                }
            })
        },
        changePage(page){
           this.getTransactionData(page)
           //alert(page)
        }
    },
    created(){
        this.getTransactionData(1)
        this.getRequest()
        this.watchblockData()
    }
}
</script>
<style lang="less" scoped>
    .blockListWrap{
        background: #F4F6FA;
        padding:.46rem .46rem;
        .content{
            background: #fff;
            border-radius: 0 0 .1rem .1rem;         
            .title{
                display: flex;
                background: #fff;
                justify-content: space-between;
                padding:.28rem .28rem 0;
                border-radius:.1rem .1rem 0 0;
                >div{
                    display: flex;
                    align-items: center;
                    border-bottom:1px solid #396EA0;
                    padding-bottom: 0.28rem;
                    width: 100%;
                }
                span{
                    font-size: 0.3rem;
                    color: #396EA0;
                    font-weight: bold;
                    margin-left: .2rem;
                }
            }
            .newBlock-list{
                width:100%;
                overflow:auto;
                background: #fff;
                -ms-overflow-style: none;                     // IE 10+
                overflow: -moz-scrollbars-none;               // Firefox
                &::-webkit-scrollbar { width: 0 !important }  // chrome 和Safari
                .newBlock-list-title{
                    margin-top:0.05rem; 
                    display:flex;
                    justify-content: space-between;
                    >div{
                        padding:.32rem  .28rem .24rem .28rem;
                        flex-shrink:0;
                        width:1.25rem;
                        height:.3rem;
                        line-height:.3rem;
                        font-size: 0.28rem;
                        color: #396EA0;
                        font-weight: bold;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                    div:nth-child(3){
                    width: 3rem;
                    }
                    div:nth-child(1),:nth-child(2){
                        color:#396ea0;
                    }
                    div:nth-child(2),:nth-child(3){
                        text-align: center;
                    }
                    div:nth-child(4),:nth-child(5){
                        width:2.8rem;
                        color:#396ea0;
                    }
                    div:nth-child(6){
                    width: 1.5rem;
                    }
                }
                .datalist{
                    >div{
                        padding:.24rem .28rem .16rem .28rem;
                        border-bottom: 1px solid #f4f7f9;
                        color: #000;
                        font-weight: normal;
                    }  
                }
            }
        }
        // #page{
        //     margin-bottom:.5rem;
        //     padding:0 .46rem;
        // }
        // #page /deep/ .van-pagination{
        //     width: 100%;
            
        // }
        //  #page /deep/ .van-pagination .van-pagination__item {
        //      display: flex;
        //      justify-content: center;
        //      align-items: center;
        //      font-size: 32px;
        //      padding:.4rem;
        //      border: 1px solid #f5f5f5;
        //      margin-right:0.12rem;
        //  }
    
    }
</style>
