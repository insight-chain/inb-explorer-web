<template>
    <div class='body newBlock'>
        <div class="newBlock-list-title">
             <div>区块高度</div>
             <div>区块奖励</div>
             <div>交易数量</div>
             <div>块大小(Byte)</div>
             <div>哈希地址</div>
             <div>时间</div>
        </div>
        <div class="newBlock-list-title" v-for="(item, index) in blockData" :key="index">
            <div @click='toBlockNum(item.id,item.num)'>{{item.num}}</div>
            <div>6.34 INB</div>
            <div>{{item.txCount}}</div>
            <div>{{item.size}}</div>
            <div>{{item.hash}}</div>
            <div>{{item.timestamp}}</div>           
        </div>  
        <div class="gengduo" @click='toLatestBlock'>查看更多 &gt;</div> 
    </div>
</template>

<script>
import { formatDateTime } from '../../utils/utils.js'
export default {
    created() {
        this.getBlockdata()
        this.getRequest()
    },
    data() {
        return {
            blockData:'',
        }
    },
    methods: {
        formatDateTime,
        // 每五秒请求一次数据
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
        toLatestBlock(){
           this.$router.push('/LatestBlock') 
        },
        getBlockdata(){
             this.$axios.get('/blocks').then((res=>{
                  if(res.status==200){
                      console.log(res)
                      this.blockData=res.data.items
                  }
             })).catch((error)=>{
                 return error
             })
        },
        toBlockNum(blockid,block){
            this.$router.push({
               path:'/BlockDetails',
               query:{
                    blockNum:block,
                    blockid:blockid
               }
           })
        }
    },
}
</script>

<style lang="less" scoped>
.newBlock{
    background-color:#fff;
    padding:20px 30px;
    box-sizing:border-box;
    margin-bottom:50px;
    .newBlock-list-title{
        height:40px;
        display:flex;
        align-items:center;
        border-bottom:1px  solid #f6f7f9;
        >div{
            text-align:center;
            font-size:14px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
        }
        div:nth-child(1){
            width:10%;
            color:#396ea0;
        }
        div:nth-child(2){
            width:15%;
        }
        div:nth-child(3){
            width:10%;
        }
        div:nth-child(4){
            width:15%;
        }
        div:nth-child(5){
            width:30%;
        }
        div:nth-child(6){
            width:20%;
        }
        div:nth-child(1):hover{
            cursor:pointer; 
        }
    }
    .newBlock-list-title:nth-child(1){
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
