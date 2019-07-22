<template>
    <div>
        <div class="block-card body">
            <div class="block_title">
                  <ul>
                      <li>
                        <img src="../../assets/images/list/jiaoyi_haxi.svg" alt="">
                        <span>交易哈希:</span>
                      </li>
                      <li>{{hashData.hash}}</li>
                  </ul>
            </div>
            <div class="card-content" v-show='isData'>
                <ul>
                    <li>
                        <span>源地址</span>
                        <span @click='toAccount(hashData.from)'>{{hashData.from}}</span>
                    </li>
                    <li>
                        <span>目标地址</span>
                        <span>{{hashData.to}}</span>
                    </li>
                    <li>
                        <span>数量</span>
                        <span>{{takeFour(hashData.amount)+' INB'}}</span>
                    </li>
                    <li>
                        <span>消耗NET</span>
                        <span>{{hexToInt(hashData.bindwith)}}</span>
                    </li>
                    <li>
                        <span>所在区块</span>
                        <span>{{hashData.block}}</span>
                    </li>
                    <li>
                        <span>交易状态</span>
                        <span>成功</span>
                    </li>
                    <li>
                        <span>交易类型</span>
                        <span>{{transactionLei(hashData.typeInt)}}</span>
                    </li>
                    <li>
                        <span>交易时间</span>
                        <span>{{hashData.timestamp}}</span>
                    </li>
                    <li>
                        <span>数据</span>
                        <span>{{hashData.input}}</span>
                    </li>
                </ul>
                <!--<div class="getRawData" @click='lookData'>
                    <span>查看原始数据</span>
                    <img v-if="TopBotImg" src="../../assets/images/list/Expand.svg" alt="">
                    <img v-else src="../../assets/images/list/Collapse.svg" alt="">
                </div>-->
                <!--<div class="RawData" ref="RawData">
                    <div>
                        <pre>
                        </pre>                    
                    </div>
                </div>-->
            </div>
        </div>
        <!--<div class="Including body" v-if='isNoData'>
            <ul>
                <li>
                <img src="../../assets/images/list/caozuo.svg" alt="">
                <span>内含操作</span>
                </li>
            </ul>
            <Tabs v-model="activeName">
                <TabPane label="转移资产" name="first">
                    <ul class='caozuolist'>
                        <li>
                            <span>区块高度</span>
                            <span>1234567</span>
                        </li>
                        <li>
                            <span>交易状态</span>
                            <span>188 Byte</span>
                        </li>
                        <li>
                            <span>交易费用</span>
                            <span>8 INB</span>
                        </li>
                    </ul>                   
                </TabPane>
                <TabPane label="调用合约" name="second">
                    <ul class='caozuolist'>
                        <li>
                            <span>合约高度</span>
                            <span>1234567</span>
                        </li>
                        <li>
                            <span>合约</span>
                            <span>188 Byte</span>
                        </li>
                        <li>
                            <span>合约</span>
                            <span>8 INB</span>
                        </li>
                    </ul>                
                </TabPane>
                <TabPane label="发行资产" name="third">
                    <ul class='caozuolist'>
                        <li>
                            <span>发型高度</span>
                            <span>1234567</span>
                        </li>
                        <li>
                            <span>发型</span>
                            <span>188 Byte</span>
                        </li>
                        <li>
                            <span>发型</span>
                            <span>8 INB</span>
                        </li>
                    </ul>                
                </TabPane>
                <TabPane label="创建账户" name="fourth">
                    <ul class='caozuolist'>
                        <li>
                            <span>账户高度</span>
                            <span>1234567</span>
                        </li>
                        <li>
                            <span>账户状态</span>
                            <span>188 Byte</span>
                        </li>
                        <li>
                            <span>账户费用</span>
                            <span>8 INB</span>
                        </li>
                    </ul>                
                </TabPane>
            </Tabs>            
        </div>-->
        <div class="body noData" v-show='isNoData'>
            <div>
                <img src="../../assets/images/list/nodata.svg" alt="">
            </div>
            <p>暂无数据</p>
        </div>
    </div>
</template>

<script>
// import { Tabs,TabPane } from 'element-ui';
import {hexToInt,transactionLei,takeFour} from '../../utils/utils.js'
export default {
    data() {
        return {
            TopBotImg:true,  //控制原始数据的展开与收起
            activeName: 'first',  //tab切换的默认显示
            isNoData:false,       //控制页面与暂无数据
            isData:true,
            hash:"",  //接收的参数
            hashData:'',     //渲染页面的数据
        }
    },
    components:{
        // Tabs,
        // TabPane
    },
    activated() {
        this.hash=this.$route.query.transactionHash
        this.getHash()
    },
    created() {
        // this.getRequest()
    },
    methods: {
        hexToInt,
        transactionLei,
        takeFour,
        // // 每五秒请求一次数据
        // getRequest(){
        //     setTimeout(()=>{
        //         var i=0
        //         var handler = setInterval(()=>{
        //         this.getHash()
        //         i++
        //         if(i == 20){
        //         clearInterval(handler)
        //             }
        //         },5000)
        //     },1000)
        // },
        // 控制原始数据展开与收起
        lookData(){
            if(this.TopBotImg){
                this.$refs.RawData.style.display='block'
                this.TopBotImg=false
            }else{
                this.$refs.RawData.style.display='none'
                this.TopBotImg=true                
            }
        },
        // 跳转账户传递参数
        toAccount(account){
            this.$router.push({
                path:'/Account',
                query:{
                    sourceAccount:account
                }
            })
        },
        // 请求数据
        getHash(){
            this.$axios.get('/transaction/search',{
                   params:{
                       hash:this.hash
                   }
                }).then((res)=>{
                if(!res){
                    this.isData=false
                }
                if(res.status==200){
                    console.log('haxi',res.data)
                    this.hashData=res.data
                }else{
                    this.isData=false
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
        margin-bottom:0;
        .block_title{
            height:60px;
            background-color:#fff;
            padding:0 30px;
            padding-bottom:0px;
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
            padding-bottom:30px;
            margin-bottom:50px;
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
                li:nth-child(1){
                    span:nth-child(2){
                        color:#396ea0;
                    }
                    span:nth-child(2):hover{
                        cursor:pointer; 
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
        display:none;
        background-color:#fff;
        padding:0 30px;
        box-sizing:border-box;
        margin-bottom:50px;
        ul{
            display:flex;
            width:100%;
            height:60px;
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
                    margin-left:5px;
                }
            }
        }
        .caozuolist{
            display:block;
            width:100%;
            height:120px;
            padding-top:10px;
            margin-bottom:30px;
            border:none;
            li{
                height:40px;
                line-height:40px;
                display:flex;
                align-items:center;
            span:nth-child(1){
                width:10%;
                }
            }
        }            
    }
/deep/.el-tabs{
    .el-tabs__header{
      background-color:#f3f4f7;
      margin-top:10px;
      .is-active{
          color:#396ea0;
      }
      div:hover{
          color:#396ea0;
      }
      .el-tabs__active-bar{
          background-color:#396ea0;
      }
    }
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
