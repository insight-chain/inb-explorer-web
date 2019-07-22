<template>
    <div class='body newTransaction'>
        <div class="newTransaction-list-title">
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
        <div class="newTransaction-list-title" v-for="(item, index) in transactionData" :key="index">
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
        <div class="gengduo" @click='toLatestTransaction'>查看更多 &gt;</div> 
    </div>
</template>

<script>
import {transactionLei,hexToInt} from '../../utils/utils.js'
export default {
    created() {
        this.getTransactionData()
        this.getRequest()
    },
    data() {
        return {
            transactionData:''
        }
    },
    methods: {
        transactionLei,
        hexToInt,
        // 每五秒请求一次数据
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
        // 跳转区块
        toBlockNum(block){
            this.$router.push({
               path:'/BlockDetails',
               query:{
                    blockNum:block
               }
           })
        },
        // 跳转hash
        toHash(hash){
            this.$router.push({
                path:'/TransactionHash',
                query:{
                    transactionHash: hash   
                }
            })
        },
        // 跳转账户
        toAccount(account){
            this.$router.push({
                path:'/Account',
                query:{
                    sourceAccount:account
                }
            })
        },
        // 跳转更多区块
        toLatestTransaction(){
           this.$router.push('/LatestTransaction')
        },
        //  请求页面数据
        getTransactionData(){
            this.$axios.get('/transactions').then((res=>{
                  if(res.status==200){
                    //   console.log(res)
                      this.transactionData=res.data.items
                  }
            })).catch((error)=>{
                 return error
             })
        }
    },
}
</script>

<style lang="less" scoped>
.newTransaction{
    background-color:#fff;
    padding:20px 30px;
    box-sizing:border-box;
    margin-bottom:50px;
    .newTransaction-list-title{
        height:40px;
        display:flex;
        align-items:center;
        border-bottom:1px  solid #f6f7f9;
        >div{
            height:50px;
            line-height:50px;
            text-align:center;
            font-size:14px;
            width:18%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
        }
        div:nth-child(1){
            width:15%;
            color:#396ea0;
        }
        div:nth-child(2){
            width:7%;
            color:#396ea0;
        }
        div:nth-child(3){
            width:14%;
        }
        div:nth-child(4){
            width:15%;
            color:#396ea0;
            padding:0  15px;
            box-sizing: border-box;
        }
        div:nth-child(5){
            width:15%;
            color:#396ea0;
            padding:0  15px;
            box-sizing: border-box;
        }
        div:nth-child(6){
            width:8%;
        }
        div:nth-child(7){
            width:12%;
        }
        div:nth-child(8){
            width:8%;
        }
        div:nth-child(9){
            width:6%;
        }
        div:nth-child(1):hover{
            cursor:pointer; 
        }
        div:nth-child(2):hover{
            cursor:pointer; 
        }
        div:nth-child(4):hover{
            cursor:pointer; 
        }
        div:nth-child(5):hover{
            cursor:pointer; 
        }       
    }
    .newTransaction-list-title:nth-child(1){
        border-bottom:2px  solid #9CB6CF;
        >div{
           color:#396ea0;
           font-weight:700;
        }
    }
    .gengduo{
        height:40px;
        line-height:40px;
        background-color:#DAE7F3;
        color:#4C8BC6;
        text-align:center;
        margin-top:30px;
        border-radius:5px;
    }
    .gengduo:hover{
        cursor:pointer; 
    }
}
</style>
