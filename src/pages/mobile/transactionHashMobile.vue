<template>
    <div class="detailWrap">
        <div class="detailContent">
            <div class="detailTitle">
                <div>
                    <div class="left">
                        <!-- 换交易Icon -->
                        <img  src="../../assets/mobileImg/home/hash.svg" alt="" >
                        <p><span>交易哈希</span><!-- <i>{{hash}}</i> --></p>
                    </div>
                    <p class="hash">{{hash}}</p>
                </div>
             
            </div>
            <div class="detailLi"  v-show='isData'>
                <ul>
                    <li>
                        <p>源地址</p>
                        <h3>{{hashData.from}}</h3>
                    </li>
                    <li>
                        <p>目标地址</p>
                        <h3>{{hashData.to}}</h3>
                    </li>
                    <li>
                        <p>数量</p>
                        <h3>{{takeFour(hashData.amount)+' INB'}}</h3>
                    </li>
                    <li>
                        <p>消耗NET</p>
                        <h3>{{hexToInt(hashData.bindwith)}}</h3>
                    </li>
                    <li>
                        <p>所在区块</p>
                        <h3>{{hashData.block}}</h3>
                    </li>
                      <li>
                        <p>交易状态</p>
                        <h3>成功</h3>
                    </li>
                      <li>
                        <p>交易类型</p>
                        <h3>{{transactionLei(hashData.typeInt)}}</h3>
                    </li>
                      <li>
                        <p>交易时间</p>
                        <h3>{{hashData.timestamp}}</h3>
                    </li>
                     <!--  <li>
                        <p>数据</p>
                        <h3>{{hashData.input == "" ? '暂无数据' : 'hashData.input'}}</h3>
                    </li> -->
                </ul>
            </div>
        </div>
        <div class="body noData" v-show='isNoData'>
            <div>
                <img src="../../assets/images/list/nodata.svg" alt="">
            </div>
            <p>暂无数据</p>
        </div>
          <loadingMobile v-show = "showLoading"></loadingMobile>
    </div> 
</template>
<script>
    function preDev(e){
        e.preventDefault();
    } 
import {transactionLei,hexToInt,takeFour} from '@/utils/utils'
import loadingMobile from "../../components/mobile/common/loadingMobile"
import { mapState,mapMutations } from 'vuex';
export default {
    data(){
        return{
            isNoData:false,       //控制页面与暂无数据
            isData:true,
            hash:"",  //接收的参数
            hashData:'',     //渲染页面的数据
        }
    },
    computed:{
         ...mapState(['showLoading']),   
    },
        components:{
        loadingMobile
    },
    methods:{
        hexToInt,
        transactionLei,
        takeFour,
         ...mapMutations(['SHOW_LOADING','HIDE_LOADING']),
        getHash(){
             this.SHOW_LOADING()
             this.stop()
            this.$axios.get('/transaction/search',{
                params:{
                     hash:this.hash
                }
            }).then((res)=>{
                 this.HIDE_LOADING()
                 this.move()
                if(!res){
                    this.isData=false
                }
                if(res.status==200){
                    // console.log('区块信息',res.data)
                    this.hashData=res.data
                   
                }else{
                    this.isData=false
                    this.isNoData=false
                }
            }).catch((error)=>{
                return error
            })
        },
        stop(){
            document.body.addEventListener('touchmove',  preDev, {passive: false})
        },
        move(){
            document.body.removeEventListener('touchmove', preDev, {passive: false})
        },
    },
    created(){
        this.hash = this.$route.query.transactionHash;
        this.getHash()
    }
}
</script>
<style lang="less" scoped>
    .detailWrap{
        width:100%;
        background: #F4F6FA;
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
                    .hash{
                        width: 100%;
                        word-break: break-all;
                  
                        margin-top:0.1rem;
                    }
                }
                .left{
                    display: flex; 
                    word-break: break-all;
                    width: 100%;;                 
                    img{
                        width:.6rem;
                        height:.29rem;
                        margin-top: 0.07rem;
                    }
                }
                p{
                    font-size: 0.3rem;
                    margin-left: .2rem;
                    line-height: 0.45rem;
                    color: #000;
                    width:8rem;
                    display: flex;
                    span{
                        font-size: 0.3rem; 
                        display: inline-block;
                        width: 5rem; 
                        margin-left: -.1rem;  
                        color: #396EA0; 
                        font-weight: bold;           
                    }
                  /*   i{
                        font-style:normal;
                        word-break: break-all;
                        display: inline-block;
                        margin-left: -.2rem;
                    } */
                }
            }
            .detailLi ul{
                 background: #fff;
                 border-radius:0 0 .1rem .1rem;
             }
            .detailLi ul li{
                padding: .22rem 0.28rem 0.08rem .28rem;
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
            .detailLi ul li:nth-child(1) h3{
                width: 100%;
                word-wrap: break-word;   
            }
            .detailLi ul li:last-child{
                 padding-bottom: 0.25rem;
            }
            .detailLi ul li:nth-child(2) h3,:last-child h3{
                width: 100%;
                word-wrap: break-word;   
            }
            .detailLi ul li:nth-child(5) h3{
                width: 100%; 
                word-wrap: break-word;
            }
        }
    }
</style>
