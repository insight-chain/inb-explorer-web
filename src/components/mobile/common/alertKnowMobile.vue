<template>
    <div class="HashWrap">
        <div>
            <p><img src="../../../assets/mobileImg/home/tishi.svg"></p>
            <p class="tips">主网暂未上线，敬请期待</p>
            <div class="btn">
                 <Button @click="closeKnow">知道了</Button>
            </div>
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
        closeKnow(e){
            this.$emit('closeKnow')
        },
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
        z-index:9999;
        >div{
            width:5rem;
            border-radius: .1rem;
            height: 2.5rem;
            background: #fff;
            position: absolute;
            left:50%;
            top:50%;
            padding:.3rem;
            transform: translate(-50%,-50%);
            display: flex;
            align-items: center;
            flex-direction: column;
            p{
                width:0.8rem;
                height:0.8rem;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .tips{
                width: 100%;
                text-align: center;
                margin-top:.2rem;
                color: #000;
                border-bottom: none;
                font-size:0.32rem;
            }
            .btn{ 
                Button{
                    width:2rem;
                    height:0.6rem;
                    background: #396ea0;
                    color: #fff;
                    font-size: .28rem;
                    border-radius: 0.1rem;
                }
            }


        }
    }
</style>