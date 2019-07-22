<template>
    <div>
        <div class="block-card body">
            <div class="block_title">
                  <ul>
                      <li>
                        <img src="../../assets/images/home/newBlock.svg" alt="">
                        <span>所有交易</span>
                      </li>
                      <li>共有</li>
                      <li>{{zongshu}}</li>
                      <li>条数据</li>
                  </ul>
            </div>
            <div class="card-content" v-if='isNoData'>
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
                    <div @click="toBlock(item.id,item.block)">{{item.block}}</div>
                    <div>{{item.timestamp}}</div>
                    <div @click='toAccount(item.from)'>{{item.from}}</div>
                    <div @click='toAccount(item.to)'>{{item.to}}</div>
                    <div>{{item.amount+' INB'}}</div>
                    <div>{{hexToInt(item.bindwith)}}</div>
                    <div>{{transactionLei(item.typeInt)}}</div>
                    <div>成功</div>
                </div>
            </div>
                <pagination
                v-if='isNoData'
                background
                layout="prev, pager, next"
                :page-size="20"
                @prev-click='prevData'
                @next-click='nextData'
                @current-change="handleCurrentChange"
                :total="zongshu"
                >
                </pagination>
            <div class="body noData" v-else>
                <div>
                    <img src="../../assets/images/list/nodata.svg" alt="">
                </div>
                <p>暂无数据</p>
            </div>
        </div>
    </div>
</template>

<script>
import {transactionLei,hexToInt} from '../../utils/utils.js'
import { pagination } from 'element-ui';
export default {
    data() {
        return {
            TopBotImg:false,
            isNoData:true,        //控制有无数据
            transactionData:'',   //页面数据
            page:1,
            zongshu:0,    //总条数   

        }
    },
    components:{
        pagination
    },
    activated() {
         this.getTransactionData()
    },
    created() {
        this.getTransactionData()
        this.getRequest()
    },
    methods: {
        hexToInt,
        transactionLei,
        // 定时器
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
        toBlock(blockid,block){
           this.$router.push({
               path:'/BlockDetails',
               query:{
                    blockNum:block,
                    blockid:blockid
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
        // 点击上一页
        prevData(){
            --this.page
            this.getTransactionData()

        },
        // 点击下一页
        nextData(){
            ++this.page
            this.getTransactionData()
        },
        // 点击其中某一页
        handleCurrentChange(val){
            this.page=val
            this.getTransactionData()
        },
        // 请求数据
        getTransactionData(){
            // console.log('请求数据')
             this.$axios.get('/transactions',{
                 params:{
                     page:this.page
                 }
             }).then((res)=>{
                 console.log(res)
                 if(res.status==200){
                     this.zongshu=res.data.totalCount
                     this.transactionData=res.data.items
                 }else{
                     this.isDada=false
                 }
             })
        }
    }
}
</script>

<style lang="less" scoped>
    .block-card{
        margin:50px auto;
        margin-bottom:30px;
        background-color:#fff;
        padding-bottom:30px;
        .block_title{
            height:60px;
            background-color:#F3F4F7;
            padding:0 30px;
            ul{
                display:flex;
                width:100%;
                height:100%;
                box-sizing:border-box;
                li{
                    display:flex;
                    align-items:center;
                    img{
                        width:24px;
                        height:18px;
                    }
                    span{
                        margin-left:10px;
                        color:#396ea0;
                    }
                }
                li:nth-child(2){
                    margin-left:auto;
                }
                li:nth-child(3){
                    margin-left:5px;
                    color:#396ea0;
                }
                li:nth-child(4){
                    margin-left:5px;
                }
            }
        }
        .card-content{
            background-color:#fff;
            padding:0 30px;
            padding-bottom:30px;
            margin-top:10px;
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
                div{
                    color:#396ea0;
                    font-weight:700;
                }
            }
        }
        .el-pagination{
            padding:0 30px;
        }
    }
.noData{
    height:400px;
    background-color:#fff;
    overflow:hidden;
    div{
        width:240px;
        height:240px;
        margin:30px  auto;
    }
    p{
        text-align:center;
    }
}
</style>
