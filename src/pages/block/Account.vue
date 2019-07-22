<template>
    <div>
        <div class="block-card body">
            <div class="block_title">
                  <ul>
                      <li>
                        <img src="../../assets/images/list/zhanghu.svg" alt="">
                        <span>地址:</span>
                      </li>
                      <li>{{accountData.address}}</li>
                  </ul>
            </div>
            <div class="card-content" v-if='isNoData'>
                <ul>
                    <li>
                        <span>INB余额</span>
                        <span>{{ProcessingBalance(accountData.balance)+' INB'}}</span>
                    </li>
                    <li>
                        <span>可使用NET</span>
                        <span>{{accountData.usableness}}</span>
                    </li>
                    <li>
                        <span>已抵押INB</span>
                        <span>{{accountData.mortgagte+' INB'}}</span>
                    </li>
                    <!--<li>
                        <span>nonce</span>
                        <span>{{accountData.transferFromCount}}</span>
                    </li>
                    <li>
                        <span>账户类型</span>
                        <span>INB</span>
                    </li>-->
                </ul>
                <!--<div class="getRawData" @click='lookData'>
                    <span>查看原始数据</span>
                    <img v-if="TopBotImg" src="../../assets/images/list/Expand.svg" alt="">
                    <img v-else src="../../assets/images/list/Collapse.svg" alt="">
                </div>
                <div class="RawData" ref="RawData">
                    <div>
                        <pre>
                        </pre>                        
                    </div>
                </div>-->
            </div>
        </div>
        <div class="Including body" v-if='isNoData'>
            <ul>
                <li>
                <img src="../../assets/images/home/newjiaoyi.svg" alt="">
                <span>近期交易</span>
                </li>
            </ul>
        </div>
        <div class='body baohanjiaoyi' v-if='isNoData' ref="baohan">
            <div class="baohanjiaoyi-list-title">
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
            <div class="baohanjiaoyi-list-title" v-for="(item, index) in blockListData" :key="index">
                <div @click='toHash(item.hash)'>{{item.hash}}</div>
                <div @click="toBlockNum(item.blockNum)">{{item.blockNum}}</div>
                <div>{{item.timestamp}}</div>
                <div @click='toAccount(item.from)'>{{item.from}}</div>
                <div @click='toAccountS(item.to)'>{{item.to}}</div>
                <div>{{item.amount+' INB'}}</div>
                <div>{{hexToInt(item.bindwith)}}</div>
                <div>{{transactionLei(item.type)}}</div>
                <div>成功</div>
            </div>
        </div>
        <div class="body page" v-if='isNoData' ref="pagebox">
            <pagination
            class='hahah'
            v-if='isNoData'
            background
            layout="prev, pager, next"
            :page-size="20"
            :total="total"
            @prev-click='prevData'
            @next-click='nextData'
            @current-change="handleCurrentChange"
            >
            </pagination>
        </div>
        <div class="body noData" v-else>
            <div>
                <img src="../../assets/images/list/nodata.svg" alt="">
            </div>
            <p>暂无数据</p>
        </div>
    </div>
</template>

<script>
import {transactionLei,hexToInt} from '../../utils/utils.js'
import { pagination } from 'element-ui';
import { formatDateTime,ProcessingBalance} from '../../utils/utils.js'
export default {
    data() {
        return {
            TopBotImg:true, //控制原始数据的展开与收起
            isNoData:true,  //控制页面也暂无数据
            account:"", //接收的账户
            accountData:'',
            page:1,
            pageSize:10,
            total:0,
            blockListData:''
        }
    },
    activated() {
        this.account=this.$route.query.sourceAccount
        this.getAccount()
        // this.getAccountPageData()        
    },
    components:{
        pagination
    },
    created() {
        // this.getRequest()
    },
    methods: {
        hexToInt,
        transactionLei,
        formatDateTime,
        ProcessingBalance,
        // 原始数据展开与收起
        // // 每五秒请求一次数据
        // getRequest(){
        //     setTimeout(()=>{
        //         var i=0
        //         var handler = setInterval(()=>{
        //         this.getAccount()
        //         i++
        //         if(i == 20){
        //         clearInterval(handler)
        //             }
        //         },5000)
        //     },1000)
        // },
        lookData(){
            if(this.TopBotImg){
                this.$refs.RawData.style.display='block'
                this.TopBotImg=false
            }else{
                this.$refs.RawData.style.display='none'
                this.TopBotImg=true                
            }
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
        toAccountS(account){
            console.log(account)
            this.$router.push({
                path:'/Account',
                query:{
                    sourceAccount:account
                }
            })
            this.$router.go(0)
        },
        // 跳转hash
        toHash(hash){
            this.$router.push({
                path:'/TransactionHash',
                query:{
                    transactionHash:hash   
                }
            })
        },
        // 跳转账户
        toAccount(account){
            console.log(account)
            this.$router.push({
                path:'/Account',
                query:{
                    sourceAccount:account
                }
            })
            this.$router.go(0)
        },
        // 请求数据
        getAccount(){
            console.log(this.account)
            this.$axios.get('/account/search',{params:{
                address:this.account
            }}).then((res=>{
                // console.log(res)
                // if(!res){
                //     this.isNoData=false
                // }
                if(res.status==200){
                    console.log(res.data)
                    this.accountData=res.data
                    this.getAccountPageData() 
                }else if(res){
                    this.isNoData=false
                }
            })).catch((error)=>{
                console.log(error)
                // this.isNoData=false
            })
        },
        // 点击上一页
        prevData(){
            --this.page
            this.getAccountPageData()
        },
        // 点击下一页
        nextData(){
            ++this.page
            this.getAccountPageData()
        },
        // 点击其中某一页
        handleCurrentChange(val){
            this.page=val
            this.getAccountPageData()
        },
        getAccountPageData(){
            this.$axios.get('/account/transfersOut',{
                params:{
                    page:this.page,
                    address:this.account
                }
            }).then((res)=>{
                console.log('账号交易',res)
                if(res.status==200){
                    if(res.data.totalCount<20){
                        this.$refs.pagebox.style.display='none'
                        this.$refs.baohan.style.marginBottom='50px'
                    }else{
                        this.$refs.pagebox.style.display='block'
                    }
                    this.total=res.data.totalCount
                    this.blockListData=res.data.items
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
    .block-card{
        margin:50px auto;
        margin-bottom:0px;
        .block_title{
            height:60px;
            background-color:#fff;
            padding:0 30px;
            ul{
                display:flex;
                width:100%;
                height:100%;
                border-bottom:2px  solid  #9CB6CF;
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
                    margin-left:20px;
                }
                li:nth-child(3){
                    margin-left:auto;
                }
                li:nth-child(4){
                    margin-left:20px;
                    span{
                        margin-right:10px;
                    }
                }
            }
        }
        .card-content{
            background-color:#fff;
            padding:0 30px;
            ul{
                display:block;
                width:100%;
                height:100%;
                padding-top:10px;
                li{
                    height:40px;
                    line-height:40px;
                    display:flex;
                    align-items:center;
                    span:nth-child(1){
                        width:15%;
                        color:#999999;
                    }
                }
            }
            .getRawData{
                width:100%;
                margin-top:20px;
                span{
                    color:#396Ea0;
                    margin-right:5px;
                }
                img{
                    width:16px;
                    height:12px;
                }
            }
            .getRawData:hover{
                cursor:pointer; 
            }
            .RawData{
                width:100%;
                display:none;
                div{
                    width:100%;
                    height:200px;
                    margin-top:30px;
                    background-color:#dddddd;
                    overflow:auto;
                    font-size:12px;                    
                }
            }
        }
    }
    .Including{
        height:60px;
        background-color:#fff;
        padding:0 30px;
        box-sizing:border-box;
        ul{
            display:flex;
            width:100%;
            height:100%;
            border-bottom:2px  solid  #9CB6CF;
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
        }
    }
    .baohanjiaoyi{
        background-color:#fff;
        padding:20px 30px;
        box-sizing:border-box;
        .baohanjiaoyi-list-title{
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
        .baohanjiaoyi-list-title:nth-child(1){
            >div{
                color:#396EA0;
                font-weight:700;
            }
        }
    }
.page{
    height:50px;
    background-color:#fff;
    margin-bottom:50px;
    padding-bottom:20px;
    padding:0 30px;
    box-sizing:border-box;
}  
.noData{
    height:400px;
    background-color:#fff;
    margin-bottom:50px;
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