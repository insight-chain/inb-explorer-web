<template>
    <div class="HashWrap">
        <div>
            <p>提示</p>
            <p class="tips">获取INB成功，是否查看该交易？</p>
            <div class="btn">
                 <Button @click="sure">立即查看</Button>
            </div>
            <h4 class="close" @click="close">
                <img src="../../../assets/mobileImg/home/closeAlert.svg" alt="">
            </h4> 
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{

        }
    },
    methods:{
        close(e){
            this.$emit('HashAlert')
        },
        sure(){
            this.$router.push({path:"/transactionHashMobile"})
            this.$emit('HashAlert')
        }
    }
}
</script>
<style lang="less" scoped>
    .HashWrap{
        position: absolute;
        width: 100%;
        height:100%;
        top:0;
        left:0;
        background: rgba(12,12,12,0.5);
        >div{
            width:5rem;
            border-radius: .1rem;
            height: 2.5rem;
            background: #fff;
            position: absolute;
            left:50%;
            top:50%;
            padding:.36rem;
            transform: translate(-50%,-50%);
            display: flex;
            align-items: center;
            flex-direction: column;
            p{
                color: #396ea0;
                width:100%;
                border-bottom: 1px solid #f4f7f9;
                text-align: center;
                font-size: 0.32rem;
                padding-bottom: 0.3rem;
            }
            .tips{
                margin-top:.25rem;
                color: #000;
                border-bottom: none;
            }
            .btn{
                margin-top:.1rem;
                
                Button{
                    width:2rem;
                    height:0.6rem;
                    background: #396ea0;
                    color: #fff;
                    font-size: .28rem;
                    border-radius: 0.1rem;
                }
            }
            .close{
                margin-top:0.8rem;
                width:.55rem;
                height:.55rem;
                img{
                    width:100%;
                    height:100%;
                }
            }

        }
    }
</style>