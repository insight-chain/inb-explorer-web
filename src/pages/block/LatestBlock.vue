<template>
    <div>
        <div class="block-card body">
            <div class="block_title">
                  <ul>
                      <li>
                        <img src="../../assets/images/home/newBlock.svg" alt="">
                        <span>所有区块</span>
                      </li>
                      <li>共有</li>
                      <li>{{total}}</li>
                      <li>条数据</li>
                  </ul>
            </div>
            <div class="card-content" v-if='isNoData'>
                <div class="newBlock-list-title">
                    <div>区块高度</div>
                    <div>区块奖励</div>
                    <div>交易数量</div>
                    <div>块大小(Byte)</div>
                    <div>哈希地址</div>
                    <div>时间</div>
                </div>
                <div class="newBlock-list-title" v-for="(item, index) in blockListData" :key="index">
                    <div @click='toBlockNum(item.id,item.num)'>{{item.num}}</div>
                    <div>6.34 INB</div>
                    <div>{{item.txCount}}</div>
                    <div>{{item.size}}</div>
                    <div>{{item.hash}}</div>
                    <div>{{item.num=='0'?'2019-06-30 02:28:09':item.timestamp}}</div> 
                </div>
            </div>
            <pagination
            v-if='isNoData'
            background
            layout="prev, pager, next"
            :total="total"
            :page-size="20"
            @prev-click='prevData'
            @next-click='nextData'
            @current-change="handleCurrentChange"
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
import { pagination } from 'element-ui';
export default {
    components:{
        pagination
    },
    data() {
        return {
            TopBotImg:false,
            isNoData:true,
            blockListData:'',   //页面数据
            page:1,  //第几页
            pageSize:20, //每页多少条
            total:0,  //总共多少条
            totalPages:''
        }
    },
    created() {
         this.getBlockData()
         this.getRequest()
    },
    methods: {
        // 每五秒请求一次数据
        getRequest(){
            setTimeout(()=>{
                var i=0
                var handler = setInterval(()=>{
                this.getBlockData()
                i++
                if(i == 20){
                clearInterval(handler)
                    }
                },5000)
            },1000)
        },
        // 跳转到区块详情
        toBlockNum(blockid,block){
            this.$router.push({
               path:'/BlockDetails',
               query:{
                    blockNum:block,
                    blockid:blockid
               }
           })
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
        getBlockData(){
            this.$axios.get('/blocks',{
                params:{
                    page:this.page
                }
            }).then((res)=>{
                console.log(res)
                if(res.status==200){
                    this.total=res.data.totalCount
                    this.totalPages=res.data.totalPages
                    this.blockListData=res.data.items
                }else{
                    this.isData=false
                }
            }).catch((error)=>{
                 return error
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
                    }
                }
            }
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
