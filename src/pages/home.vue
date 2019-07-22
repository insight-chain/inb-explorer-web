<template>
      <div class="home">
            <div class='banner' ref="banner" v-bind:class="{'bannerSize':ismobile}">
                <div class='body banner-box'>
                    <div class='bann'>
                        <a href="/"></a>
                        <a href="http://insightchain.io" target="_Blank">官网</a>
                        <a href="http://file.inbhome.com/inb/INB_technical_whitepaper_v1-CN.pdf" target="_Blank">技术白皮书</a>
                        <a href="https://github.com/insight-chain/inb-go" target="_Blank">GitHub</a>
                        <a href="https://github.com/insight-chain/inb-go/wiki/Getting-Started" target="_Blank">开始使用</a>
                        <a href="https://github.com/insight-chain/inb-go/wiki/JSON-RPC-server" target="_Blank">API文档</a>
                        <Dropdown trigger="click" @command="getNetwork">
                        <span class="el-dropdown-link">
                            <p>INB测试网</p><i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <DropdownMenu slot="dropdown">
                            <DropdownItem command="主网">INB主网</DropdownItem>
                            <DropdownItem command="测试网">INB测试网</DropdownItem>
                        </DropdownMenu>
                        </Dropdown> 

                        <!--<Dropdown trigger="click" @command="handleCommand">
                        <span class="el-dropdown-link">
                            <p ref="Language">简体中文</p><i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <DropdownMenu slot="dropdown">
                            <DropdownItem command="zh-CN">简体中文</DropdownItem>
                            <DropdownItem command="en-US">Engish</DropdownItem>
                        </DropdownMenu>
                        </Dropdown>-->
          
                    </div>
                    <h2>Insight Chain区块浏览器</h2>
                    <div class='getInput'>
                        <input v-model='inputContent' type="text" placeholder="区块高度、交易哈希、账号地址">
                        <div @click='getInquire'>
                              <span></span>
                        </div>
                        <div class="dabi" @click="dialogVisible = true">获取测试INB</div>
                    </div>
                </div>
            </div>
            <div class="body inb-list">
                 <div class='list-top'>
                    <span class='img-left'>
                        <img src="../assets/images/home/Preview.svg" alt="" width='100%'>
                    </span>
                    <span>全网预览</span>
                    <span class='RefreshItems'>刷新时间:</span>
                    <span class='times'>{{formatDateTime(time,'yyyy-MM-dd hh:mm:ss')}}</span>
                 </div>
                 <div class="list-bootom">
                      <div class='bottom-box'>
                          <div @click='getBlockList'>
                            <p>当前区块高度</p>
                            <h2 v-if='previewData'>{{previewData.latestBlockNum}}</h2>
                            <h2 v-else>----</h2>
                          </div>
                          <div @click='getTransList'>
                            <p>当前交易数量</p>
                            <h2 v-if='previewData'>{{previewData.transactionNum}}</h2>
                            <h2 v-else>----</h2>
                          </div>
                          <div>
                            <p>地址注册数量</p>
                            <h2 v-if='previewData'>{{previewData.addressNum}}</h2>
                            <h2 v-else>----</h2>
                          </div>
                          <div>
                            <p>TPS(当前/最大)</p>
                            <span v-if='previewData'>{{previewData.currentTps+'/'}}</span>
                            <span calss='danwei'>3167</span>
                          </div>
                      </div>
                      <div class="params-xian"></div>
                      <div class='bottom-box'>
                          <div @click='getBlockList'>
                            <p>不可逆块高度</p>
                            <h2 v-if='previewData'>{{previewData.irreversibleBlockNum}}</h2>
                            <h2 v-else>----</h2>
                          </div>
                          <div>
                            <p>NET(消耗/上限)</p>
                            <span v-if='previewData'>{{ConversionByte(previewData.currentNetConsumed)}}</span>
                            <span>KB</span>
                            <span>/125</span>
                            <span>MB</span>
                          </div>
                          <div>
                            <p>抵押INB数量</p>
                            <h2 v-if='previewData'>{{fmoney(IsTwoNum(previewData.mortgageNetInb))}}</h2>
                            <h2 v-else>----</h2>
                          </div>
                          <div>
                            <p>INB总供应量</p>
                            <h2 v-if='previewData'>{{fmoney(IsTwoNum(previewData.inbTotalSupply))}}</h2>
                            <h2 v-else>----</h2>
                          </div>
                      </div> 
                 </div>
            </div>
            <div class="body new-table">
                 <div @click='toNewBlock("NewBlock")' v-bind:class="{'Blockactive':isNewBlock}">
                      <span></span>
                      <span>{{tabs[0].name}}</span>
                 </div>
                 <div @click='toNewBlock("NewTransaction")' v-bind:class="{'Transactionactive':isNewTransaction}">
                      <span></span>
                      <span>{{tabs[1].name}}</span>                      
                 </div>
            </div> 
            <keep-alive>
                <component v-bind:is="tabView"></component>
            </keep-alive>
            <Footer></Footer>
            <Dialog
            title="获取测试INB"
            :visible.sync="dialogVisible"
            :modal='zhezhao'
            width="30%">
                <input
                v-model='input'
                type="text"
                maxlength='100%'
                placeholder="请输入您的INB公链地址"
                class='tanchuang'>
                <span slot="footer" class="dialog-footer">
                    <Button type="primary" @click="guanbi"  size="small">立即获取</Button>
                </span>
            </Dialog>

            <Dialog
            title="提示"
            :visible.sync="tiaozhuantishi"
            :modal='zhezhao'
            width="30%">
            <span>获取INB成功，是否查看该交易？</span>
            <span slot="footer" class="dialog-footer">
                <Button @click="quxiao" size="small">取 消</Button>
                <Button type="primary" @click="tiaozhuan" size="small">确 定</Button>
            </span>
            </Dialog>            
      </div>
</template>

<script>
import Footer from '../components/common/footer'
import { Dropdown,DropdownMenu,DropdownItem,Dialog,Button} from 'element-ui'
import NewBlock from '../pages/home/newBlock'
import NewTransaction from '../pages/home/newTransaction'
import {isMobile,ConversionByte,formatDateTime,fmoney,IsTwoNum} from '../utils/utils.js'
export default {
     components:{
        Footer,
        Dropdown,
        DropdownMenu,
        DropdownItem,
        NewBlock,
        NewTransaction,
        Dialog,
        Button
     },
     data() {
        return {
            tabView:'NewBlock',
            tabs: [{name: "最新区块"}, {name: "最新交易"}],
            isNewBlock:true,
            isNewTransaction:false,
            inputContent:'',
            dialogVisible:false,   //获取inb填写地址栏弹窗
            input:'',                //账户地址
            tiaozhuantishi:false,    //是否跳转哈希页面的弹窗
            hash:'',        //获取inb生成的哈希
            ismobile:false, //解决移动端背景图
            zhezhao:true,     //是否遮罩
            previewData:'',  // 全网预览数据
            time:Date.parse(new Date()),
        }
     },
     created() {
        if(isMobile()){
            //  console.log('111')
            this.ismobile=true
        }
        this.getPreviewData()
        this.getRequest()
     },
     methods: {
        isMobile,
        ConversionByte,
        fmoney,
        formatDateTime,
        IsTwoNum,
        // 去往区块列表
        getBlockList(){
            this.$router.push('/LatestBlock')
        },
        getTransList(){
            this.$router.push('/LatestTransaction')
        },
        // 去往交易列表
        // 每五秒请求一次数据
        getRequest(){
            setTimeout(()=>{
                var i=0
                var handler = setInterval(()=>{
                this.time=Date.parse(new Date())
                this.getPreviewData()
                i++
                if(i == 20){
                clearInterval(handler)
                    }
                },5000)
            },1000)
        },
        getPreviewData(){
            this.$axios.get('/block/info').then((res)=>{
                if(res.status==200){
                    this.previewData=res.data
                }
            })
        },
        handleCommand(command) {
            //   this.$refs.Language
            if(command=='zh-CN'){
                this.$refs.Language.innerText='简体中文' 
            }else{
                this.$refs.Language.innerText='English'  
            }
                this.$i18n.locale=command
                // console.log(this.$i18n.locale)
            },
            toNewBlock(tab){
                if(tab=='NewBlock'){
                    this.isNewBlock=true
                    this.isNewTransaction=false
                }else if(tab=='NewTransaction'){
                    this.isNewBlock=false
                    this.isNewTransaction=true                    
                }
                this.tabView = tab
            }, 
        getNetwork(command){
            // console.log(command)
            if(command=='测试网'){
                return
            }else if(command=='主网'){
                this.$message('主网暂未上线，敬请期待')
            }
        },
        getInquire(){
            const accountReg = /^[a-zA-Z0-9]{40,42}$/;
            const hashReg = /^[a-zA-Z0-9]{64,66}$/;
            const blockReg = /^\d{0,6}\b/;
            if(hashReg.test(this.inputContent)){
                    this.$router.push({
                        path:'/TransactionHash',
                        query:{
                            transactionHash: this.inputContent   
                        }
                    })
            }else if(accountReg.test(this.inputContent)){
                    this.$router.push({
                        path:'/Account',
                        query:{
                            sourceAccount:this.inputContent
                        }
                    })
            }else if(blockReg.test(this.inputContent)){
                    this.$axios.get('/block/search',{
                        params:{
                            blockNumber:this.inputContent
                        }
                    }).then(res=>{
                        // console.log('enen',res)
                            this.$router.push({
                                path:'/BlockDetails',
                                query:{
                                    blockNum:this.inputContent,
                                    blockid:res.data.id
                                }
                            })
                    })
            }else{
                this.$message('请输入正确的格式')
            }
        },
            // 关闭弹窗
        guanbi(){
            const accountReg = /^[a-zA-Z0-9]{40,42}$/;
            if(accountReg.test(this.input)){
                this.$axios.get('/transaction/send',{
                    params:{
                        toAddress:this.input
                    }
                }).then((res=>{
                        this.zhezhao=false
                        if(res.data){
                            // console.log(res.data)
                            this.hash=res.data
                            this.tiaozhuantishi=true
                        }else{
                            this.$message('请输入正确的地址')
                        }
                    }))
                }
            },
        tiaozhuan(){
                // 跳转到哈希页面
            this.dialogVisible=false
            this.tiaozhuantishi=false
            this.zhezhao=false
            this.$router.push({
                path:'/TransactionHash',
                query:{
                    transactionHash: this.hash   
                }
            })
            this.$router.go(0)
            this.zhezhao=true
        },
        quxiao(){
            this.dialogVisible=false
            this.tiaozhuantishi=false
            this.zhezhao=false
            this.zhezhao=true
        }     
     },
}
</script>

<style lang="less" scoped>
.bannerSize{
    background-size:auto !important;
}

.home{
    width:100%;
    height:100%;
    background-color:#e6e9ee;
}
.tanchuang{
    width:300px;
    height:40px;
    padding-left:10px;
    outline:none;
    width:100%;
    box-sizing: border-box;
}
.banner{
    width:100%;
    height:300px;
    background-color:#e6e9ee;
    background:url('../assets/images/home/banner.svg') no-repeat;
    background-size:100%;
    .banner-box{
        height:100%;
        .bann{
            width:100%;
            height:60px; 
            display:flex;
            align-items:center;
            a{
                color:#fff;
                display:block;
                width:100px;
                height:30px;
                line-height:30px;
                text-align:center;
            }
            a:nth-child(1){
                display:block;
                width:140px;
                height:50px;
                background:url('../assets/images/home/logo.svg') no-repeat;
                background-size:100%;
            }
            a:nth-child(2){
                margin-left:auto;
            }
            span{
                color:#fff;
                display:flex;
                width:100px;
                height:30px;
                line-height:30px;
                align-items:center;
                >div{
                    margin-right:5px;
                }
            }
            span:nth-child(2){
                margin-left:20px;
            }
            span:nth-child(3){
                margin-left:20px;
            } 
        }
        h2{
            font-size:40px;
            color:#fff;
            text-align:center;
            margin-top:30px;
            font-weight:300;
        }
        .getInput{
            margin:40px auto;
            width:800px;
            height:50px;
            display:flex;
            background-color:#fff;
            align-items:center;
            border-radius:5px;
            position:relative;
            input{
                flex:1;
                height:100%;
                border-radius:10px 0px 0px 10px;
                border:none;
                font-size:16px;
                padding-left:15px;
                box-sizing:border-box;
                border-radius:5px;
                outline:none;
            }
            >div{
                width:80px;
                height:28px;
                display:flex;
                align-items:center;
                justify-content:center;
                box-sizing:border-box;
                border-left:1px solid rgba(113,164,202,0.3);
                border-radius:0px 10px 10px 0px;
                >span{
                    display:block;
                    width:20px;
                    height:20px;
                    background:url('../assets/images/home/input_sou.svg') no-repeat;
                    background-size:100%;
                }
            }
            >div:hover{
                cursor:pointer; 
            }
            .dabi{
            width:120px;
            height:50px;
            background-color:#fff;
            text-align:center;
            line-height:50px;
            border-radius:5px;
            color:#396Ea0;
            position:absolute;
            bottom:0px;
            right:-140px;
        }
        }
    }   
}
.inb-list{
    background-color:#fff;
    padding: 0 20px;
    box-sizing:border-box;
    padding-top:15px;
    margin-top:40px;
    .list-top{
        height:30px;
        display:flex;
        align-items:center;
        span{
            line-height:30px;
            font-size:18px;
            color:#396ea0;
        }
        .img-left{
            width:24px;
            height:24px;
            margin-right:10px;
            margin-left:20px;
        }
        .RefreshItems{
            margin-left:40px;
            color:#AEB7BA;
            font-size:14px;
        }
        .times{
            color:#AEB7BA;
            font-size:14px;
        }
    }
    .list-bootom{
        .params-xian{
            height:1px;
            background-color:#f6f7f9;
            margin:0 20px;
        }
        .bottom-box{
            display:flex;
            justify-content: space-around;
            align-items:center;
            height:80px;
            >div{
                height:60px;
                width:20%;
                text-align:center;
                padding: 0px 30px;
                box-sizing:border-box;
                border-radius: 5px;
                >p{
                    font-size:14px;
                    line-height:30px;
                    color:#AEB7BA;
                }
                >h2{
                    font-size:20px;
                    line-height:30px;
                    font-weight:400;
                }
                >span{
                    font-size:20px;
                }
                >span:nth-child(3){
                    font-size:14px;
                }
                >span:nth-child(5){
                    font-size:14px;
                }
            }
            >div:nth-child(4) span{
                font-size:20px;
            }
            >div:nth-child(1):hover{
                background-color:#f6f7fa;
                cursor:pointer; 
            }
            >div:nth-child(2):hover{
                background-color:#f6f7fa;
                cursor:pointer; 
            }
        }
        .bottom-box:nth-child(3){
            justify-content: space-around;
            border:none;
            >div{
                width:20%;
                padding: 0px 30px;
                box-sizing:border-box;
            }
            >div:nth-child(2):hover{
                cursor:auto !important;
                background-color:#fff;
            }
        }
    }
}
.new-table{
    height:60px;
    display:flex;
    background-color:#F3F4F7;   
    align-items:center;
    padding:0 20px;
    box-sizing:border-box;
    margin-top:50px;
    >div{
        display:flex;
        align-items:center;
        >span{
            color:#ccc;
            font-size:18px;
            margin-left:20px;
        }
        span:nth-child(1){
            width:24px;
            height:18px;
            background:url('../assets/images/home/no_block.svg') no-repeat;
            background-size:24px 18px;
        }
        span:nth-child(2){
            margin-left:10px;
        }
    }
    .Blockactive{
        >span{
            color:#396ea0;
        }
        span:nth-child(1){
            background:url('../assets/images/home/newBlock.svg') no-repeat;
            background-size:24px 18px;
        }       
    }
    .Transactionactive{
        >span{
            color:#396ea0;
        }
        span:nth-child(1){
            background:url('../assets/images/home/newjiaoyi.svg') no-repeat !important;
            background-size:24px 18px !important;
        }        
    }
    >div:nth-child(2){
        margin-left:20px;
        span:nth-child(1){
            background:url('../assets/images/home/no_transtion.svg') no-repeat;
            background-size:24px 18px;
        }
    }
    >div:hover{
       cursor:pointer; 
    }
}
.el-dropdown{
    margin-left:20px;
    .el-dropdown-link {
        cursor: pointer;
        color: #409EFF;
        margin-left:auto;
    }
    .el-icon-arrow-down {
        font-size: 12px;
    }
    .demonstration {
        display: block;
        color: #8492a6;
        font-size: 14px;
        margin-bottom: 20px;
    }
}
.el-dropdown:nth-child(3){
    margin-left:20px;
}
</style>
