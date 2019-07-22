<template>
    <div class="detailWrap">
        <div class="detailContent">
            <div class="detailTitle">
                <div>
                    <div class="left">
                        <img  src="../../assets/mobileImg/home/newBlock.svg" alt="" >
                        <span>区块 {{blockNum}}</span>
                        <!-- <img style="margin-left:.2rem" src="../../assets/mobileImg/home/copy.svg" alt=""> -->
                    </div>
                    <div class="upDown">
                        <div style="margin-right:.4rem" @click="upBlock">
                            <img  src="../../assets/mobileImg/home/up.svg" alt="">
                        </div>
                        <div @click="downBlock"> 
                            <img src="../../assets/mobileImg/home/down.svg" alt="">
                        </div>
                    </div>  
                </div>
             
            </div>
            <div class="detailLi">
                <ul>
                    <li>
                        <p>区块高度</p>
                        <h3>{{blocbData.num}}</h3>
                    </li>
                    <li>
                        <p>区块大小</p>
                        <h3>{{blocbData.size + 'Bytes'}}</h3>
                    </li>
                    <li>
                        <p>区块奖励</p>
                        <h3>6.34INB</h3>
                    </li>
                    <li>
                        <p>生成时间</p>
                        <h3>{{blocbData.timestamp}}</h3>
                    </li>
                    <li>
                        <p>区块哈希</p>
                        <h3>{{blocbData.hash}}</h3>
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
                    <div>{{item.block}}</div>
                    <div>{{item.timestamp}}</div>
                    <div @click='toAccount(item.from)' style="color:#396EA0">{{item.from}}</div>
                    <div @click='toAccount(item.to)' style="color:#396EA0">{{item.to}}</div>
                    <div>{{item.amount+' INB'}}</div>
                    <div>{{hexToInt(item.bindwith)}}</div>
                    <div>{{transactionLei(item.typeInt)}}</div>
                    <div>成功</div>          
                </div>  
            </div>
        </div>
         <page @changepage="changePage" :total="total" v-if="this.total >= 6"></page>
         <loadingMobile v-show = "showLoading"></loadingMobile>
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
            blockNum:'',
            blockId:'',
            blocbData:{},
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
           this.getBlockPageData(page)
           alert(page)
        },
        getBlockData(){
            // console.log()
            if(this.blockNum<0){
                return
            }
            this.SHOW_LOADING()
            this.stop()
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
                    this.HIDE_LOADING()
                    this.move()
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
        getBlockPageData(page){
            // this.getBlockData()
            this.$axios.get('/transactions',{
                params:{
                    page:this.page,
                    block:this.blockID
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
        stop(){
            document.body.addEventListener('touchmove',  preDev, {passive: false})
        },
        move(){
            document.body.removeEventListener('touchmove', preDev, {passive: false})
        },
        upBlock(){
            this.blockNum = this.blockNum - 1;
            this.getBlockData()
        },
        downBlock(){
            this.blockNum = this.blockNum + 1;
            this.getBlockData()
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
        this.blockNum = this.$route.query.blockNum;
        this.blockId = this.$route.query.id;
        this.getBlockData()
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
                    padding-bottom: 0.28rem;
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }
                .left{
                    display: flex;
                    align-items: center;
                    img{
                        width:.4rem;
                        height:.28rem;
                    }
                }
                span{
                    font-size: 0.3rem;
                    margin-left: .2rem;
                    color: #396EA0;
                    font-weight: bold;
                }
                .upDown{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    >div{
                        width:.28rem;
                        height:.28rem;
                    }
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
            }
            .detailLi ul{
                 background: #fff;
                 border-radius: 0 0 .1rem .1rem;
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
            .detailLi ul li:nth-child(5) h3{
                width: 100%; 
                word-wrap: break-word;
            }
        }
        .content{
            padding:.15rem .46rem .46rem;
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
                border-radius: 0 0 .1rem .1rem;
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
        }
    }
</style>
