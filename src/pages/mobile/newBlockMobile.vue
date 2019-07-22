<template>
    <div class="blockWrap">
        <div class="title">
            <div style="width:100%;">
                <div>
                    <img src="../../assets/mobileImg/home/newBlock.svg" alt="" style="width:.4rem;height:.28rem;">
                    <span>最新区块</span>
                </div>
                <div class="more" @click="toBlockMore" > 
                    <span >查看全部</span>
                    <img src="../../assets/mobileImg/home/more.svg" alt="" style="height:.28rem;margin-left:0.1rem;" >
                </div> 
            </div>
        </div>
        <div class="newBlock-list">
            <div class="newBlock-list-title">
                <div>区块高度</div>
                <div>收益</div>
                <div>大小(Byte)</div>
                <div>区块哈希</div>
                <div>时间</div>  
            </div>
            <div class="newBlock-list-title datalist" v-for="(item, index) in blockData" :key="index">
                <div style="color:#396EA0" @click='toBlockNum(item.id,item.num)'>{{item.num}}</div>
                <div>6.34 INB</div>
                <div>{{item.size}}</div>
                <div>{{item.hash}}</div>
                <div>{{item.timestamp}}</div>           
            </div>
        </div>
        <loadingMobile v-show = "showLoading"></loadingMobile>
    </div>
</template>
<script>
    function preDev(e){
        e.preventDefault();
    } 
import axios from "axios"
import loadingMobile from "../../components/mobile/common/loadingMobile"
import { mapState,mapMutations } from 'vuex';
export default {
    data(){
        return{
            blockData:[]
        }
    },
    computed:{
         ...mapState(['showLoading']),

    },
    components:{
        loadingMobile
    },
    methods:{
         ...mapMutations(['SHOW_LOADING','HIDE_LOADING']),
         watchblockData(){
             if(this.blockData.length == 0){
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
                this.getBlockdata()
                i++
                if(i == 20){
                    clearInterval(handler)
                }
                },5000)
            },1000)
        },
        getBlockdata(){
             this.$axios.get('/blocks').then((res=>{
                  if(res.status==200){
                     this.HIDE_LOADING()
                     this.move()
                      this.blockData=res.data.items.filter((item,index)=>{
                          return index < 6;
                          
                      })
                  }
             })).catch((error)=>{
                 return error;
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
        toBlockMore(){
          this.$router.push({path:'/blockListMobile'})  
        }
    },
    created(){
        this.getBlockdata()
        this.getRequest();
        this.watchblockData()
    }
}
</script>
<style lang="less" scoped>
    .blockWrap{
        padding:.46rem .46rem;
        .title{
            display: flex;
            background: #fff;
            justify-content: space-between;
            padding:.28rem .28rem 0;
            border-radius: .1rem .1rem 0 0;
            >div{
                border-bottom:0.01rem solid #396EA0;
                padding-bottom: 0.28rem;
                display: flex;
                align-items: center;
                justify-content: space-between;
                >div{
                    display: flex;
                    align-items: center;
                }
            }
           span{
               font-size:0.3rem;
               margin-left:.2rem;
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
                    padding:.32rem  .2rem .24rem .28rem;
                    flex-shrink:0;
                    width:1.25rem;
                    font-size: 0.28rem;
                    color: #396EA0;
                    font-weight: bold;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                }
                div:nth-child(2){
                    width: 1.2rem;
                    text-align: center;
                   
                }
                div:nth-child(3){
                    width: 1.55rem;
                    text-align: center;
                }
                div:nth-child(4){
                    width:2.8rem;
                   
                }
                div:nth-child(5){
                    width:3.2rem;
                }
            }
            .datalist{
                >div{
                    padding:.24rem .2rem .18rem .28rem;
                     color: #000;
                     font-weight: normal;
                     border-bottom: 1px solid #f4f7f9;
                }  
            }
            .datalist div:nth-child(7){
                border-bottom: none;
            }
        }
    }
</style>
