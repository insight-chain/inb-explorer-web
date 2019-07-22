<template>
    <div class="alertwrap"  ref="alertwrap">
        <div>
                <div class="alert">
                    <div class="title">
                        获取INB
                    </div>
                    <div class="text">
                        <textarea @focus="textareaFocus" @blur="blur" placeholder="输入公链地址获取INB" v-model="address"></textarea>
                    </div>
                    <div class="confirmWrap">
                        <div class="getConfirm">
                            <span @click="getInbConfirm">立即获取</span>
                        </div>
                    </div>
                </div>
                <p class="close" @click="close">
                    <img src="../../../assets/mobileImg/home/closeAlert.svg" alt="">
                </p> 
            </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            address:''
        }
    },
    methods:{
        close(){
            this.$emit('closeAlert',false)
        },
        getInbConfirm(){
                const addressReg = /^[a-zA-Z0-9]{40,42}$/;
                if(addressReg.test(this.address) && this.address != ''){
                    this.$emit('closeAlert',true)
                    this.$axios.get('/transaction/send',{
                         params:{
                             toAddress:this.address
                         }
                     }).then((res=>{
                        if(res.data){
                            console.log(res.data)
                            //this.hash=res.data
                        }
                     }))
                }else{
                     this.$router.push({path:'/Mobile404'})
                      this.$emit('closeAlert',true)
                }
        },
        blur(){
            window.scroll(0,0);
            var u = navigator.userAgent;
            var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            if(isiOS){
                this.$refs.alertwrap.style.transform="translateY(0rem)";
           }
             if(navigator.appVersion.match(/oppo/gi)){
                this.$refs.alertwrap.style.transform="translateY(0rem)";  
           }
        },
        textareaFocus(){
            var u = navigator.userAgent;
            var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
            if(isiOS){
               this.$refs.alertwrap.style.transform="translateY(-0.5rem)";     
           }
           //oppo 
           if(navigator.appVersion.match(/oppo/gi)){
                this.$refs.alertwrap.style.transform="translateY(-2rem)";  
           }          
        }
    },
}
</script>
<style lang="less" scoped>
    .alertwrap{
        position: absolute;
        width: 100%;
        height:100%;
        top:0;
        left:0;
        background:rgba(12, 12, 12, 0.5);
       // opacity: 0.5;
        >div{
            width:4.48rem;
            border-radius: .1rem;
            height: 4.18rem;
            background: #fff;
            position: absolute;
            left:50%;
            top:50%;
            padding:.36rem;
            transform: translate(-50%,-50%);
            .title{
                text-align: center;
                padding-bottom: .26rem;
                color:#396EA0;
                font-size: 0.32rem;
                font-weight: bold;
                border-bottom: 1px solid #f6f7f9;
            }
            .text{
                width:4.48rem;
                height:1.9rem;
                margin-top:0.4rem;
                 background: #f5f5f5;
                border-radius: 0.1rem;
               
                textarea{
                    outline: none;
                    border:none;
                    width: 90%;
                    height: 85%;;
                    font-size:0.28rem;
                    color: #000;
                    background: #f5f5f5;
                    resize:none;
                    margin-left:0.2rem;
                    margin-top:0.2rem;
                }
            }
            .confirmWrap{
                display: flex;
                justify-content: center;
                align-items: center;
                .getConfirm{
                        width:2rem;
                        height: .6rem;
                        line-height: .6rem;
                        background: #396EA0;
                        text-align: center;
                        margin-top:.5rem;
                        border-radius: 0.1rem;
                        >span{
                            color: #fff;
                            font-size: 0.28rem;
                        }
                }
            }
        }
        .close{
            margin-left:50%;
            transform: translateX(-50%);
            margin-top: 20%;
            width: .55rem;
            height: .55rem;
            img{
                width:100%;
                height:100%;
            }
        }
    }
</style>
