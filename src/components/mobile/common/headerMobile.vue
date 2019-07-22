<template>
    <div class="home">
        <div class="logoMenuwrap ">
            <div class="logoMenu ">
                <div class="logo">
                    <img src="../../../assets/mobileImg/home/insightLogo.svg">
                </div>
                <div class="menu" @click="menuShow">
                    <img :src="!menuDetailShow ? require('@/assets/mobileImg/home/menu1.svg') : require('@/assets/mobileImg/home/close1.svg')" style="width:.38rem;height:.30rem">
                </div>
            </div>
        </div>
            <div class="banner">
                <h3>Insight Chain 区块浏览器</h3>
                <div class="search">
                    <input type="text" placeholder="区块高度、交易哈希、账户地址" v-model="inputContent">
                    <div>
                        <div @click="search">
                            <img src="../../../assets/mobileImg/home/search.svg" alt="">    
                        </div>    
                    </div> 
                </div>
                <div class="search getInb" @click="getINB">
                      <span>获取INB</span>
                      <span style="margin-right:.24rem;">
                          <img src="../../../assets/mobileImg/home/getinb.svg" alt="">
                      </span>
                </div>
                <alertMobile v-if="alertShown" @closeAlert="closeAlert"></alertMobile>
                <Popup class="popup" v-model="menuDetailShow" @testClose="testClose"  position="top" @click-overlay="popupHide">
                    <div class="menuDetail">
                        <ul>
                            <li> <a href="http://insightchain.io" target="_Blank">官网</a></li>
                            <li> <a href="https://github.com/insight-chain/inb-go" target="_Blank">GitHub</a></li>
                            <li><a href="https://github.com/insight-chain/inb-go/wiki/Geting-Started" target="_Blank">开始使用</a></li>
                            <li><a href="https://github.com/insight-chain/inb-go/wiki/JSON-RPC-server" target="_Blank">API文档</a></li>
                            <li @click="message">主网</li>
                            <li @click="testNet">测试网</li>
                        </ul>
                    </div>
                </Popup>
                <alertKnowMobile v-if="KnowShow" @closeKnow="closeKnow"></alertKnowMobile> 
                <ToHashAlertMobile v-if="ToHashShow" @HashAlert="HashAlert"></ToHashAlertMobile>
            </div>
       </div>
</template>
<script>
    function preDev(e){
        e.preventDefault();
    }   
import alertMobile from "../common/alertMobile"
import menuDetail from "../common/menuDetail"
import ToHashAlertMobile from "../common/ToHashAlertMobile"
import alertKnowMobile from "../../mobile/common/alertKnowMobile"
import { Popup } from 'vant';
export default {
        data () {
        return {
            inputContent:'',
            alertShown:false,
            menuDetailShow:false,
            ToHashShow:false,
            list: [],
            KnowShow:false
        }
    },
    components:{
        alertMobile,
        menuDetail,
        ToHashAlertMobile,
        alertKnowMobile,
        Popup
    },
    methods:{
        menuShow(){
            if(this.menuDetailShow){
                this.menuDetailShow = false;
                this.move()
               
            }else{
                this.stop()
                this.menuDetailShow = true;  
            }
        },
        message(){
            this.KnowShow = true;
        },
        closeKnow(){
            this.KnowShow = false
        },
        testNet(){
            this.testClose()
        },
        testClose(){
            this.move()
            this.menuDetailShow = false;
            
        },
        popupHide(){
            this.move()
        },
        stop(){
            document.body.addEventListener('touchmove',  preDev, {passive: false})
        },
        move(){
            document.body.removeEventListener('touchmove', preDev, {passive: false})
        },
        getINB(){
            this.alertShown = true
            this.stop()
        },
        closeAlert(flag){
             this.move()
            this.alertShown = false;
           
            if(flag){
                this.ToHashShow = true;
                this.move()
            }else{
                this.ToHashShow = false;
                this.move()
            }
          
        },
        HashAlert(){
            this.ToHashShow  = false;
            this.move()
        },
        search(){
            const accountReg = /^[a-zA-Z0-9]{40,42}$/;
            const hashReg = /^[a-zA-Z0-9]{64,66}$/;
            const blockReg =/^[0-9]*$/;
            //高度
            if(blockReg.test(this.inputContent) && this.inputContent != ""){
                this.$axios.get('/block/search',{
                    params:{
                        blockNumber:this.inputContent
                    }
                }).then(res=>{
                    this.$router.push({
                        path:'/blockDetailsMobile',
                        query:{
                            blockNum:this.inputContent,
                            blockid:res.data.id
                        }
                    })
                })
            }else if(hashReg.test(this.inputContent)){
                this.$router.push({
                    path:'/transactionHashMobile',
                    query:{
                        transactionHash: this.inputContent   
                    }
                })
            }else if(accountReg.test(this.inputContent)){
                this.$router.push({
                    path:'/accountMobile',
                    query:{
                        sourceAccount:this.inputContent
                    }
                })
            }else{
                 this.$router.push({path:'/Mobile404'})
            }   
        }
    },
    mounted(){
       // this.$refs.input.focus()
    }
}
</script>
<style lang="less" scoped>
.home{
    width:100%;
    .logoMenuwrap{
        background:#fff;
        width: 100%;
        height: .94rem;
        position: fixed;
        top:0;
        left:0;
        border-bottom: 2px solid #f4f7f9;
        .logoMenu{
            padding: .14rem .16rem 0 .16rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            z-index: 999;
            .logo{
                width:2.3rem;
                height: .7rem;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
        .banner{
            background: url('../../../assets/mobileImg/home/bg.svg');
            background-size:cover;
            height:4.6rem;
            padding:.13rem .16rem;
            display: flex;
            align-items: center;
            flex-direction: column;
            h3{
               font-size:0.52rem;
               color: #ffffff;
               margin-top:1.3rem;
               margin-bottom: .35rem;
               font-weight: normal;
            }
            .search{
                width:5.8rem;
                height:.8rem;
                border-radius:0.1rem;
                display: flex;
                margin-bottom: .42rem;
                background:#fff;
                display: flex;
                align-items: center;
                input{
                    padding-left:.25rem;
                    font-size: 0.28rem;
                    width:90%;
                    height: 100%;
                    border-radius: 0.1rem;
                    border:none;
                    outline:none;
                     display: inline-block;
                    -moz-box-sizing: border-box;
                    box-sizing: border-box;  
                }
                ::-webkit-input-placeholder{
                   line-height: 100%;
                   font-size: 0.28rem;
                }
                >div{
                    width: 10%;
                    height: .1rem;
                    padding:.13rem .1rem;
                    border-left:1px solid #ccc;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    img{
                        width:.3rem;
                        height: .3rem;
                        margin-top:.09rem;
                    }
                }
            }
            .getInb{
                height:.65rem;
                color: #396EA0;
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom:0;
                span{
                    padding-left:.25rem;
                    float:left;
                    display:block;
                    font-size: 0.28rem;
                }
                img{
                    margin-top:0.08rem;
                    width:.3rem;
                    height:.3rem;
                }
            }
            
        }
    .banner /deep/ .van-overlay{
         background:rgba(12, 12, 12, 0.4);
         top:0.94rem;
    }
    .banner /deep/ .van-popup--top{
        top:0.94rem;
    }
    .menuDetail{
        width: 100%;

        background: #fff;
        ul{
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
           
            li{
                font-size: 0.34rem;
                width: 100%;
                height: .9rem;
                display: flex;
                justify-content: center;
                align-items: center;
                a{
                    width: 100%;
                    height:.9rem;
                     color: #000;
                    font-size: 0.34rem;
                    width: 100%;
                    height: .9rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
            }
            li:nth-child(1){
                    border-top: 1px solid #f4f7f9;
                    padding-top:0.3rem; 
                }
            li:last-child{
                   padding-bottom:0.3rem;
                }
        
        }
    }
}


</style>
