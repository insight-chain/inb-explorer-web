<template>
    <div class="block">
        <div class="header">
            <div class="body header-box">
                <div class='bann'>
                   <div class="bann-top">
                        <a href="/"></a>
                        <a href="http://www.insightchain.io" target="_Blank">官网</a>
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
                    <div class="input-sou">
                        <input  v-model='inputContent' type="text" placeholder="区块高度、交易哈希、账号地址">
                        <div @click='getInquire'>
                            <div>
                                <img src="../../assets/images/list/sousuo.svg" alt="" width='100%'>
                            </div>
                        </div>
                        <div class="dabi" @click="dialogVisible = true">获取测试INB</div>
                    </div>        
                </div>          
            </div>
        </div>
        <keep-alive>
            <router-view class='position-div'></router-view>
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
import Footer from '../../components/common/footer'
import {  Dropdown,DropdownMenu,DropdownItem,Dialog,Button} from 'element-ui'
export default {
    components:{
        Footer,
        Dropdown,
        DropdownMenu,
        DropdownItem,
        Dialog,
        Button
    },
    data() {
        return {
            inputContent:'',
            dialogVisible:false,   //获取inb填写地址栏弹窗
            input:'',                //账户地址
            tiaozhuantishi:false,    //是否跳转哈希页面的弹窗
            hash:'',        //获取inb生成的哈希
            zhezhao:true,     //是否遮罩
        }
    },
    created() {
       console.log(this.$route.params) 
    },
    methods: {
        handleCommand(command) {
            if(command=='zh-CN'){
                this.$refs.Language.innerText='简体中文' 
            }else{
                this.$refs.Language.innerText='Engish'  
            }
            this.$i18n.locale=command
            console.log(this.$i18n.locale)
        },
        getNetwork(command){
            console.log(command)
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
                console.log(this.inputContent)
                    this.$router.push({
                        path:'/TransactionHash',
                        query:{
                            transactionHash: this.inputContent   
                        }
                    })
                    this.$router.go(0)  
            }else if(accountReg.test(this.inputContent)){
                    this.$router.push({
                        path:'/Account',
                            query:{
                            sourceAccount:this.inputContent
                        }
                    })
                    this.$router.go(0)  
            }else if(blockReg.test(this.inputContent)){
                    this.$axios.get('/block/search',{
                         params:{
                             blockNumber:this.inputContent
                         }
                    }).then(res=>{
                        console.log('enen',res)
                            this.$router.push({
                                path:'/BlockDetails',
                                query:{
                                    blockNum:this.inputContent,
                                    blockid:res.data.id
                                }
                            })
                            this.$router.go(0) 
                    }) 
                }else{
                    this.$message('请输入正确的格式')
                }
        },
        // 关闭弹窗
        guanbi(){
            const accountReg = /^[a-zA-Z0-9]{40,42}$/;
            if(accountReg.test(this.input)){
                console.log(this.input)
                this.$axios.get('/transaction/send',{
                        params:{
                            toAddress:this.input
                        }
                    }).then((res=>{
                    this.zhezhao=false
                    if(res.data){
                        console.log(res.data)
                        this.hash=res.data
                        this.tiaozhuantishi=true
                    }
                    }))
            }else{
                this.$message('请输入正确的地址')
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
    }
}
</script>

<style lang="less" scoped>
.block{
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
.header{
    width:100%;
    height:180px;
    background:url('../../assets/images/list/b_logo.svg') no-repeat;
    background-size:100%;
    .header-box{
        display:flex;
        align-items:center;
        .bann{
            width:100%;
            height:180px;
            .bann-top{
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
                    background:url('../../assets/images/home/logo.svg') no-repeat;
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
                    justify-content: center;
                    >div{
                        margin-right:5px;
                    }
                }
                span:nth-child(2){
                    margin-left:auto;
                }
                span:nth-child(3){
                    margin-left:20px;
                }
            } 
            .input-sou{
               height:50px;
               width:800px;
               margin:20px auto;
               display:flex;
               align-items:center;
               background:#fff; 
               border-radius:5px;
               position:relative;
                input{
                   width:90%;
                   height:100%;
                   border:none;
                   border-radius:5px;
                   padding-left:10px;
                   outline:none;
                   font-size:16px;
                }
                >div{
                   width:10%;
                   height:30px;
                   background:#fff; 
                   border-left:1px  solid #ccc;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    div{
                        width:16px;
                        height:16px;
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
}
.el-dropdown{
    margin-left:20px;
    .el-dropdown-link {
        cursor: pointer;
        color: #409EFF;
        margin-left:auto;
        width:100px;
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
.el-dropdown:nth-child(4){
    margin-left:20px;
}
</style>
