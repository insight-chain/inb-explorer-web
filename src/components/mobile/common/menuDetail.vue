<template>
    <div class="menuWrap">
            <div class="menu">
                <ul>
                    <li> <a href="http://insightchain.io" target="_Blank">官网</a></li>
                    <li> <a href="https://github.com/insight-chain/inb-go" target="_Blank">GitHub</a></li>
                    <li><a href="https://github.com/insight-chain/inb-go/wiki/Getting-Started" target="_Blank">开始使用</a></li>
                    <li><a href="https://github.com/insight-chain/inb-go/wiki/JSON-RPC-server" target="_Blank">API文档</a></li>
                    <li @click="message">主网</li>
                    <li @click="testNet">测试网</li>
                </ul>
            </div>
        <alertKnowMobile v-if="KnowShow" @closeKnow="closeKnow"></alertKnowMobile>
    </div>
</template>
<script>
import alertKnowMobile from "@/components/mobile/common/alertKnowMobile"

export default {
    data(){
        return{
            KnowShow:false
        }
    },
    components:{
        alertKnowMobile,

    },
    methods:{
        message(){
            this.KnowShow = true;
        },
        closeKnow(){
            this.KnowShow = false
        },
        testNet(){
            this.$emit('testClose')
        },
        bubbleClick(){
            alert()
        }
    }  
}
</script>
<style lang="less" scoped>
.menuWrap{
    position: absolute;
    top:0.94rem;
    left:0;
    width:100%;
    height:94.2%;
    background:rgba(12, 12, 12, 0.4);
    .menu{
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