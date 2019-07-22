<template>
    <div>
        <div class="block-card body">
            <div class="block_title">
                  <ul>
                      <li>
                        <img src="../../assets/images/home/newBlock.svg" alt="">
                        <span>区块:</span>
                      </li>
                      <li ref="blockNum">{{blocbData.num}}</li>
                      <li @click='onblock'>
                         <img src="../../assets/images/list/Previous_page.svg" alt="">
                         <span>上一区块</span>
                      </li>
                      <li @click='underblock'>
                         <span>下一区块</span>
                         <img src="../../assets/images/list/Next_page.svg" alt="">
                      </li>
                  </ul>
            </div>
            <div class="card-content" v-if='isNoData'>
                <ul>
                    <li>
                        <span>区块高度</span>
                        <span>{{blocbData.num}}</span>
                    </li>
                    <li>
                        <span>区块大小</span>
                        <span>{{blocbData.size+' Bytes'}}</span>
                    </li>
                    <li>
                        <span>区块奖励</span>
                        <span>6.34 INB</span>
                    </li>
                    <li>
                        <span>生成时间</span>
                        <span>{{blocbData.timestamp}}</span>
                    </li>
                    <li>
                        <span>区块哈希</span>
                        <span>{{blocbData.hash}}</span>
                    </li>
                    <li>
                        <span>上一区块哈希</span>
                        <span>{{blocbData.parentHash}}</span>
                    </li>
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
                <span>交易信息</span>
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
                <div>{{item.block}}</div>
                <div>{{item.timestamp}}</div>
                <div @click='toAccount(item.from)'>{{item.from}}</div>
                <div @click='toAccount(item.to)'>{{item.to}}</div>
                <div>{{item.amount+' INB'}}</div>
                <div>{{hexToInt(item.bindwith)}}</div>
                <div>{{transactionLei(item.typeInt)}}</div>
                <div>成功</div>
            </div>
        </div>
        <div class="body page" v-if='isNoData' ref="pagebox">
            <pagination
            background
            layout="prev, pager, next"
            :total="total"
            :page-size="20"
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
export default {
    data() {
        return {
            TopBotImg:true,
            isNoData:true,
            blocbData:'',  //渲染页面的数据
            blockNum:'', // 路由传过来的区块信息
            page:1,
            pageSize:20,
            total:0,
            blockListData:'',  //包含交易数据
            blockID:'', 
        }
    },
    components:{
        pagination
    },
    mounted() {
        // this.$refs.pagebox.style.display='none'
    },
    activated() {
        this.blockID=this.$route.query.blockid
        this.blockNum=this.$route.query.blockNum
        if(this.blockNum||this.blockNum==0){
            this.getBlockData()
        }
    },
    created() {
        // this.getRequest()
    },
    methods: {
        hexToInt,
        transactionLei,
        // 每五秒请求一次数据
        // getRequest(){
        //     setTimeout(()=>{
        //         var i=0
        //         var handler = setInterval(()=>{
        //         this.getBlockData()
        //         i++
        //         if(i == 20){
        //         clearInterval(handler)
        //             }
        //         },5000)
        //     },1000)
        // },
        // 原始数据的展开与收起
        lookData(){
            if(this.TopBotImg){
                this.$refs.RawData.style.display='block'
                this.TopBotImg=false
            }else{
                this.$refs.RawData.style.display='none'
                this.TopBotImg=true                
            }
        },
        // 跳转哈希页面
        toHash(hash){
            this.$router.push({
                path:'/TransactionHash',
                query:{
                   transactionHash:hash
                }
            })
        },
        // 跳转区块
        toBlock(block){
           this.$router.push({
               path:'/BlockDetails',
               query:{
                    blockNum:block
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
        // 上一个区块
        onblock(){
            this.blockNum = Number(this.$refs.blockNum.innerText)-1
            if(this.blockNum<0){
                this.$message('已经到了第一个啦')
                this.blockNum=0
            }else{
                this.getBlockData()
            }
            // this.getBlockData()
        },
        //下一个区块
        underblock(){
            this.blockNum = Number(this.$refs.blockNum.innerText)+1
            this.getBlockData()
        },
        // 点击上一页
        prevData(){
            --this.page
            this.getBlockData()
        },
        // 点击下一页
        nextData(){
            ++this.page
            this.getBlockData()
        },
        // 点击其中某一页
        handleCurrentChange(val){
            this.page=val
            this.getBlockData()
        },
        // 请求区块信息
        getBlockData(){
            // console.log()
            if(this.blockNum<0){
                return
            }
            this.$axios.get('/block/search',{
                params:{
                    blockNumber:this.blockNum
                }
            }).then((res)=>{
                if(!res){
                    this.isData=false
                }
                if(res.status==200){
                    // console.log('区块信息',res.data)
                    this.blocbData=res.data
                    this.blockID=res.data.id
                    this.getBlockPageData()
                }else{
                    this.isData=false
                }
            }).catch((error)=>{
                return error
            })
        },
        getBlockPageData(){
            // this.getBlockData()
            this.$axios.get('/transactions',{
                params:{
                    page:this.page,
                    block:this.blockID
                }
            }).then((res)=>{
                if(res.status==200){
                    console.log(res)
                    if(res.data.totalCount<20){
                        this.$refs.pagebox.style.display='none'
                        this.$refs.baohan.style.marginBottom='50px'
                    }else{
                        this.$refs.pagebox.style.display='block'
                    }
                    this.total=res.data.totalCount
                    this.blockListData=res.data.items
                }else{
                    this.isNoData=false
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
                    }
                }
                li:nth-child(2){
                    margin-left:20px;
                }
                li:nth-child(3){
                    margin-left:auto;
                    span{
                        color:#396ea0;
                    }
                }
                li:nth-child(3):hover{
                    cursor:pointer; 
                }
                li:nth-child(4):hover{
                    cursor:pointer; 
                }
                li:nth-child(4){
                    margin-left:20px;
                    span{
                        margin-right:10px;
                        color:#396ea0;
                    }
                }
            }
        }
        .card-content{
            background-color:#fff;
            padding:0 30px;
            padding-bottom:30px;
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
                li:nth-child(5){
                    span:nth-child(2){
                        // color:#396ea0;
                    }
                    span:nth-child(2):hover{
                        // cursor:pointer; 
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
                }
            }
        }
    }
    .baohanjiaoyi{
        background-color:#fff;
        padding:20px 30px;
        box-sizing:border-box;
        margin-bottom:50px;
        .baohanjiaoyi-list-title{
            height:40px;
            display:flex;
            align-items:center;
            border-bottom:1px  solid #f6f7f9;
            >div{
                height:40px;
                line-height:40px;
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
                // color:#396ea0;
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
            // div:nth-child(2):hover{
            //     cursor:pointer; 
            // }
            div:nth-child(4):hover{
                cursor:pointer; 
            }
            div:nth-child(5):hover{
                cursor:pointer; 
            } 
        }
        .baohanjiaoyi-list-title:nth-child(1){
            >div{
                color:#396ea0;
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
