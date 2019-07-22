<template>
    <div class="blockWrap">
        <div class="title">
            <div style="width:100%;">
                <div>
                    <img src="../../assets/mobileImg/home/newtranstion.svg" alt="" style="width:.4rem;height:.28rem">
                    <span>最新交易</span>
                </div>
                    <div class="more" @click="toMore" > 
                        <span> 查看全部</span>
                        <img src="../../assets/mobileImg/home/more.svg" alt="" style="height:.28rem;margin-left:0.1rem;"> 
                    </div>
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
                <div @click="toHash(item.hash)" style="cursor:pointer">{{item.hash}}</div>
                <div @click="toBlockNum(item.block)">{{item.block}}</div>
                <div>{{item.timestamp}}</div>
                <div @click="toAccount(item.from)">{{item.from}}</div>
                <div @click='toAccount(item.to)'>{{item.to}}</div>
                <div>{{item.amount+' INB'}}</div>
                <div>{{hexToInt(item.bindwith)}}</div>
                <div>{{transactionLei(item.typeInt)}}</div>
                <div>成功</div>        
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios"
import {transactionLei,hexToInt} from '../../utils/utils'
export default {
    data(){
        return{
            transactionData:[]
        }
    },
    methods:{
        transactionLei,//原因
        hexToInt,
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
        getTransactionData(){
            this.$axios.get('/transactions').then((res=>{
                  if(res.status==200){
                    //   console.log(res)
                      this.transactionData=res.data.items.filter((item,index)=>{
                          return index < 6
                      })
                  }
            })).catch((error)=>{
                 return error
             })
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
        toMore(){
            this.$router.push({path:'/transactionListMobile'})  
        }
    },
    created(){
        this.getTransactionData()
        this.getRequest()
    }
}
</script>
<style lang="less" scoped>
    .blockWrap{
        padding:.15rem .46rem .46rem;
        .title{
            background: #fff;
            display: flex;
            justify-content: space-between;
            padding:.28rem .28rem 0;
            border-radius: .1rem .1rem 0 0;
            >div{
                display: flex;
                border-bottom:1px solid #396EA0;
                align-items: center;
                padding-bottom: 0.28rem;
                width: 100%;
                justify-content: space-between;
                >div{
                    display: flex;
                    align-items: center;
                }
            }
            span{
                font-size: 0.3rem;
                margin-left: .2rem;
                color: #396EA0;
                font-weight: bold;
             }
        }
        .newBlock-list{
            width:100%;
            background: #fff;
            overflow:auto;
            border-radius: 0 0 .1rem .1rem;
            -ms-overflow-style: none;                     // IE 10+
            overflow: -moz-scrollbars-none;               // Firefox
            &::-webkit-scrollbar { width: 0 !important }  // chrome 和Safari
            .newBlock-list-title{
                display:flex;
                justify-content: space-between;
                >div{
                    padding:.32rem  .28rem .24rem .28rem;
                    flex-shrink:0;
                    width:1.25rem;
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
                    cursor: pointer;
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
                div:nth-child(6),:nth-child(7),:nth-child(8){
                   text-align: center;
                }
            }
            .datalist{
                >div{
                    padding:.24rem .28rem .18rem .28rem;
                     color: #000;
                     font-weight: normal;
                     border-bottom:1px solid #f4f7f9;
                     cursor: pointer;
                }  
            }
            .datalist div:nth-child(7){
                border-bottom: none;
            }
        }
    }
</style>
