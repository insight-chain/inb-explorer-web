<template>
    <div class="detailWrap">
        <div class="detailContent">
            <div class="detailTitle">
                <div>
                    <div class="left">
                        <img  src="../../assets/mobileImg/home/account.svg" alt="" >
                        <p><span>地址</span></p>
                    </div>
                     <p class="account">{{account}}</p>
                </div>            
            </div>
            <div class="detailLi">
                <ul>
                    <li>
                        <p>INB余额</p>
                        <h3>{{accountData.balance > 0 ? accountData.balance + 'INB' : '0'}}</h3>
                    </li>
                    <li>
                        <p>可使用NET</p>
                        <h3>{{accountData.bandwidth}}</h3>
                    </li>
                    <li>
                        <p>可抵押INB</p>
                        <h3>{{accountData.mortgagte+' INB'}}</h3>
                    </li>
                </ul>
            </div>
        </div>

        <div class="content">
             <div class="title">
                <div>
                    <img src="../../assets/mobileImg/home/newtranstion.svg" alt="" style="width:.4rem;height:.28rem">
                    <span>包含交易</span>
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
                <div class="newBlock-list-title datalist" v-for="(item, index) in blockListData" :key="index">
                    <div @click='toHash(item.hash)' style="color:#396EA0">{{item.hash}}</div>
                    <div @click="toBlockNum(item.blockNum)" style="color:#396EA0">{{item.blockNum}}</div>
                    <div>{{item.timestamp}}</div>
                    <div @click='toAccount(item.from)' style="color:#396EA0">{{item.from}}</div>
                    <div @click='toAccount(item.to)' style="color:#396EA0">{{item.to}}</div>
                    <div>{{item.amount+' INB'}}</div>
                    <div>{{hexToInt(item.bindwith)}}</div>
                    <div>{{transactionLei(item.type)}}</div>
                    <div>成功</div>          
                </div>
            </div>
            <div class="page">
                 <page @changepage="changePage" :total="total" v-if="this.total >= 8"></page>  
            </div>
           
        </div>
         <loadingMobile v-show = "showLoading"></loadingMobile>
    </div> 
</template>
<script>
import {transactionLei,hexToInt} from '../../utils/utils'
import page from "../../components/mobile/common/page"
import loadingMobile from "../../components/mobile/common/loadingMobile"
import { mapState,mapMutations } from 'vuex';
export default {
    data(){
        return{
            account:"", //接收的账户
            accountData:'',
            blockListData:[],
            total:0
        }
    },
    components:{
        page,
        loadingMobile
    },
    computed:{
         ...mapState(['showLoading']),   
    },
    methods:{
        transactionLei,
        hexToInt,
         ...mapMutations(['SHOW_LOADING','HIDE_LOADING']),
        changePage(page){
           this.getaccountPageData(page)
           alert(page)
        },
        getAccountData(){
            this.SHOW_LOADING()
            this.$axios.get('/account/search',{
                params:{
                     address:this.account,
                }
            }).then((res)=>{
                if(!res){
                    this.isData=false
                }
                if(res.status==200){
                    // console.log('区块信息',res.data)
                     this.HIDE_LOADING()
                    this.accountData=res.data
                    this.getBlockPageData()
                }else{
                    this.isData=false
                }
            }).catch((error)=>{
                return error
            })
        },
        getBlockPageData(page){
            // this.getAccountData()
            this.$axios.get('/account/transfersOut',{
                params:{
                    page:this.page,
                    address:this.account,
                    limit:8
                }
            }).then((res)=>{
                if(res.status==200){
                    console.log(res)
                    this.total=res.data.totalCount
                    this.blockListData=res.data.items
                }else{
                    this.isNoData=false
                }
            })
        },
        // 跳转哈希页面
        toHash(hash){
            this.$router.push({
                path:'/transactionHashMobile',
                query:{
                   transactionHash:hash
                }
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
        // 跳转账户
        toAccount(account){          
             this.$router.push({
                path:'/accountMobile',
                query:{
                    sourceAccount:account
                }
            }) 
        },
    },
    created(){
        this.account = this.$route.query.sourceAccount;
        this.getAccountData()
    }
}
</script>
<style lang="less" scoped>
    .detailWrap{
        width:100%;
        background: #F4F6FA;
        //overflow: auto;
        .detailContent{
             padding:.46rem .46rem;
            .detailTitle{
                background: #fff;
                padding:.28rem .28rem 0;
                border-radius: .1rem .1rem 0 0;
                >div{
                    border-bottom:1px solid #396EA0;
                    padding-bottom: 0.2rem;
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    flex-direction: column;
                    .account{
                        width: 100%;
                        word-break: break-all;
                        margin-left:-0.02rem;
                        margin-top:0.1rem;
                    }
                }
                .left{
                    display: flex;
                    width: 100%;;                 
                    img{
                        width:.6rem;
                        height:.29rem;
                        margin-top: 0.05rem;
                    }
                }
                p{
                    font-size: 0.3rem;
                    margin-left: .2rem;
                    color: #000;
                    line-height: 0.4rem;
                    width:8rem;
                    display: flex;
                    span{
                        font-size: 0.3rem; 
                        display: inline-block;
                        color: #396EA0;
                        font-weight: bold;
                        margin-left: -.1rem;
                        width:1.5rem;         
                    }
                  /*   i{
                        font-style: normal;
                        word-break: break-all;
                    }  */
                }
            }
            .detailLi ul{
                 background: #fff;
                 border-radius:0 0 .1rem .1rem;
             }
            .detailLi ul li{
                padding: .22rem 0.28rem 0.08rem .28rem;
            }
            .detailLi ul li:nth-child(5){
                padding-bottom: 0.25rem;
            }
            .detailLi ul li p{
                font-size: 0.28rem;
                color: #444546;
                font-weight: bold;
            }
            .detailLi ul li h3{
                font-weight: normal;
                font-size: 0.28rem;
                color: #999999;
                margin-top: 0.15rem;
            }
            .detailLi ul li:last-child{
                 padding-bottom: 0.25rem;
            }
            .detailLi ul li:nth-child(5) h3{
                width: 100%; 
                word-wrap: break-word;
            }
        }
        .content{
            padding:.1rem .46rem .46rem;
            background: #F4F6FA;
            
            .title{
                display: flex;
                justify-content: space-between;
                background: #fff;
                padding:.28rem .28rem 0;
                border-radius: .1rem .1rem 0 0;
                >div{
                    border-bottom:1px solid #396EA0;
                    padding-bottom: 0.28rem;
                    width: 100%;
                    display: flex;
                    align-items: center;
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
                overflow:auto;
                background: #fff;
                -ms-overflow-style: none;                     // IE 10+
                overflow: -moz-scrollbars-none;               // Firefox
                &::-webkit-scrollbar { width: 0 !important }  // chrome 和Safari
                .newBlock-list-title{
                    margin-top:0.05px; 
                    display:flex;
                    justify-content: space-between;
                    >div{
                        padding:.32rem  .2rem .24rem .28rem;
                        flex-shrink:0;
                        width:1.25rem;
                        height: .3rem;
                        line-height:.3rem;
                        font-size: 0.28rem;
                        color: #396EA0;
                        font-weight: bold;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        overflow: hidden;
                    }
                    div:nth-child(2),:nth-child(3){
                        text-align: center;
                    }
                    div:nth-child(3){
                        width:2.9rem;
                    }
                    div:nth-child(4){
                        width:2.8rem
                    }
                    div:nth-child(5){
                        width:2.8rem;
                    }
                }
                .datalist{
                    >div{
                        padding:.24rem .2rem .16rem .28rem;
                        color: #000;
                        font-weight: normal;
                        border-bottom: 1px solid #f4f7f9;
                    }
                }
               
            }
            .page{
                background: red;
                padding-top:0.3rem;
                background: #fff;
                 border-radius:0 0 .1rem .1rem;
            }
        }
    }
</style>
