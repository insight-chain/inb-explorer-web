<template>
    <div class="error">
        <HeaderTwo v-if="!$route.meta.hasHead" class="headerTwo"/>
        <div class="content">
            <div>
                <img src="../../assets/mobileImg/errImg/error404.svg" alt="">
            </div>
            <p class="one">没有找到符合条件的结果!</p>
        </div>
         <Footer class="footer" v-show="hidshow"/>      
    </div>
</template>
<script>
    import HeaderTwo from '@/components/mobile/common/headerMobileTwo'
    import Footer from '@/components/mobile/common/footerMobile'
export default {
    data(){
        return{
            docmHeight: '0',  //默认屏幕高度
            showHeight:  '0',  //实时屏幕高度
            hidshow:true,  //显示或者隐藏footer,
            isResize:false //默认屏幕高度是否已获取
        }
    },
    components: {
            Footer,
            HeaderTwo
    },
    mounted() {    
        // window.onresize监听页面高度的变化    
        window.onresize = ()=>{
            return(()=>{
                if (!this.isResize) { 
                    //默认屏幕高度
                this.docmHeight=document.documentElement.clientHeight    
                this.isResize = true                      
             }                        
            //实时屏幕高度                       
            this.showHeight = document.body.clientHeight         
            })()}  
    },
    watch:{
        showHeight:function() {       
             if(this.docmHeight > this.showHeight){            
                    this.hidshow=false        
                }else{            
            this.hidshow=true       
            }    
        }
    }
}
</script>
<style lang="less" scoped>
    .error{
        width: 100%;
        height: 100vh;
        .content{
            padding-top:2.6rem;
            padding-bottom:2.5rem;
            text-align: center;
            padding-top: 20%;
            img{
                width:3rem;                
            }
        }
        .one{
            color: #999;
            font-size: 0.30rem;
            margin-top: 0.4rem;

        }
    }
</style>
