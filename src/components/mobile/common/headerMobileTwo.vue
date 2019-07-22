<template>
    <div class="home">
        <div class="logoMenuwrap ">
            <div class="logoMenu ">
                <div class="logo" @click="toHome">
                    <img src="../../../assets/mobileImg/home/insightLogo1.svg">
                </div>
                <div class="menu" @click="menuShow">
                     <img :src="!menuDetailShow ? require('@/assets/mobileImg/home/menu.svg') : require('@/assets/mobileImg/home/closeMenu.svg')" style="width:.38rem;height:.30rem">
                </div>
            </div>
        </div>
            <div class="banner">
                <div class="search">
                    <input type="text" ref="input" placeholder="账户地址、区块高度、交易哈希" v-model="inputContent2">
                    <div>
                        <div @click="search">
                            <img src="../../../assets/mobileImg/home/search.svg" alt="">    
                        </div>    
                    </div> 
                </div>
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
            </div>
            <!--  <menuDetail v-if="menuDetailShow" @testClose="testClose"></menuDetail> -->
       </div>
</template>
<script>
    function preDev(e){
        e.preventDefault();
    }   
import menuDetail from "../common/menuDetail"
import { constants } from 'crypto';
import alertKnowMobile from "../../mobile/common/alertKnowMobile"
import { Popup } from 'vant';
export default {
        data () {
        return {
            menuDetailShow:false,
            KnowShow:false,
            list: [],
            inputContent2:'',
        }
    },
    components:{
        menuDetail,
        alertKnowMobile,
        Popup
    },
    methods:{
        toHome(){
            this.$router.push("/homePageMobile")
        },
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
            this.$router.push({path:'/hpmePageMobile'})
            this.menuDetailShow = false;
            this.move()
           
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
        search(){
            const accountReg = /^[a-zA-Z0-9]{40,42}$/;
            const hashReg = /^[a-zA-Z0-9]{64,66}$/;
            const blockReg =/^[0-9]*$/;
            if(blockReg.test(this.inputContent2) && this.inputContent2 != ''){
                this.$axios.get('/block/search',{
                    params:{
                        blockNumber:this.inputContent2
                    }
                }).then(res=>{
                    this.$router.push({
                        path:'/blockDetailsMobile',
                        query:{
                            blockNum:this.inputContent2,
                            blockid:res.data.id
                        }
                    })
                })
            }else if(hashReg.test(this.inputContent2)){
                this.$router.push({
                    path:'/transactionHashMobile',
                    query:{
                        transactionHash: this.inputContent2   
                    }
                })

            }else if(accountReg.test(this.inputContent2)){
                this.$router.push({
                    path:'/accountMobile',
                    query:{
                        sourceAccount:this.inputContent2
                    }
                })
            }else{
                 this.$router.push({path:'/Mobile404'})
            }
           
        }
    },
    mounted(){
        //this.$refs.input.focus()
    }
}
</script>
<style lang="less" scoped>
.home{
    width:100%;
    .logoMenuwrap{
        width: 100%;
        position: absolute;
        top:0;
        left:0;
        .logoMenu{
            padding: .14rem .16rem 0 .16rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .logo{
                width: 2.3rem;
                height: .7rem;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
        }
    } 
        .banner{
            background: url('../../../assets/mobileImg/home/bg2.svg');
            background-size:cover;
            width: 100%;
            height:2.6rem;
            display: flex;
            align-items: center;
            flex-direction: column;
            .search{
                width:5.8rem;
                height:.8rem;
                border-radius:.1rem;
                display: flex;
                margin-bottom: .42rem;
                background:#fff;
                display: flex;
                align-items: center;
                margin-top: 1.2rem;
                input{
                    padding-left:.25rem;
                    font-size: 0.28rem;
                    width:90%;
                    height:100%;
                    border-radius: 0.1rem;
                    border:none;
                    outline:none;
                }
                >div{
                    width: 10%;
                    height: .25rem;
                    padding:.1rem .1rem;
                    border-left:1px solid #ccc;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    img{
                        width:.3rem;
                        height: .3rem
                    }
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
