<template>
    <div class="blockListWrap">
        <div class="content">
             <div class="title">
                <div>
                    <img src="../../assets/mobileImg/home/newBlock.svg" alt="" style="width:.4rem;height:.28rem">
                    <span style="margin-top:-0.05rem">最新区块</span>
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
            <page @changepage="changePage" :total="total" style="margin-top:.4rem"></page>
            <loadingMobile v-show = "showLoading"></loadingMobile>
        </div>
    </div>
</template>
<script>
    function preDev(e){
        e.preventDefault();
    } 
import page from "../../components/mobile/common/page"
import loadingMobile from "../../components/mobile/common/loadingMobile"
import { mapState,mapMutations } from 'vuex';
export default {
    data(){
        return{
            blockData:[],
            currentPage:1,
            total:0
        }
    },
    computed:{
         ...mapState(['showLoading']),   
    },
    components:{
        //Pagination
        page,
        loadingMobile

    },
    methods:{
        ...mapMutations(['SHOW_LOADING','HIDE_LOADING']),
        watchblockData(){
             if(this.blockData.length == 0){
                this.SHOW_LOADING()
                this.stop()
             }
        },
         getRequest(){
            setTimeout(()=>{
                var i=0
                var handler = setInterval(()=>{
              this.getBlockdata(1);
                i++
                if(i == 20){
                    clearInterval(handler)
                }
                },5000)
            },1000)
        
        },
        getBlockdata(page){
             //this.SHOW_LOADING()
             this.$axios.get('/blocks',{
                 params:{
                     page:page,
                     limit:10
                 }
             }).then((res=>{
                  if(res.status==200){
                      this.HIDE_LOADING()
                      this.move()
                      this.total=res.data.totalCount;
                      this.blockData=res.data.items
                  }
             })).catch((error)=>{
                 return error
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
        stop(){
            document.body.addEventListener('touchmove',  preDev, {passive: false})
        },
        move(){
            document.body.removeEventListener('touchmove', preDev, {passive: false})
        },
        toMore(){
          this.$router.push({path:'/blockListMobile'})  
        },
        changePage(page){
           this.getBlockdata(page)
           //alert(page)
        }
    },
    created(){
        this.getBlockdata(1)
        this.getRequest();
        this.watchblockData()
    }
}
</script>
<style lang="less" scoped>
    .blockListWrap{
        background: #F4F6FA;
        padding:.57rem .46rem;
        //overflow: auto;
        .content{
            background: #fff;
             border-radius: 0 0 .1rem .1rem;
            .title{
                display: flex;
                background: #fff;
                justify-content: space-between;
                padding:.28rem .28rem 0;
                border-radius: .1rem .1rem 0 0;
                >div{
                    display: flex;
                    align-items: center;
                    border-bottom:1px solid #396EA0;
                    padding-bottom: 0.28rem;
                    width: 100%;
                }
                span{
                    font-size: 0.3rem;
                    color: #396EA0;
                    font-weight: bold;
                    margin-left: .2rem;
                }
            }
            .newBlock-list{
                width:100%;
                overflow:auto;
                -ms-overflow-style: none;                     // IE 10+
                overflow: -moz-scrollbars-none;               // Firefox
                &::-webkit-scrollbar { width: 0 !important }  // chrome 和Safari
                .newBlock-list-title{
                    margin-top:0.05rem; 
                    display:flex;
                    justify-content: space-between;
                    >div{
                        padding:.32rem  .2rem .24rem .28rem;
                        flex-shrink:0;
                        width:1.25rem;
                        height:.3rem;
                        line-height:.3rem;
                        font-size: 0.28rem;
                        color: #396EA0;
                        font-weight: bold;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        overflow: hidden;
                    }
                    div:nth-child(3){
                        width: 1.45rem;
                        text-align: center;
                    }
                    div:nth-child(4){
                        width:2.8rem
                    }
                    div:nth-child(5){
                        width:3.2rem;
                    }
                }
                .datalist{
                    >div{
                        padding:.24rem .2rem .16rem .28rem;
                        border-bottom: 1px solid #f4f7f9;
                        color: #000;
                        font-weight: normal;
                    }  
                }
            }
        }   
    }
</style>
