<template>
    <div class="wrapper">
        <Header  v-if="$route.meta.hasHead"  class="header"/>
        <HeaderTwo v-if="!$route.meta.hasHead" class="headerTwo"/>
        <router-view class="middleContent"/>
        <Footer class="footer"/>
        
    </div>
</template>

<script>
    import Header from '@/components/mobile/common/headerMobile'
    import Footer from '@/components/mobile/common/footerMobile'
    import HeaderTwo from '@/components/mobile/common/headerMobileTwo'

    export default {
        data(){
            return{
                
            }
        },
        components: {
			Header,
            Footer,
            HeaderTwo
		}
    }
</script>

<style scoped lang="less">
    .wrapper {
        .middleContent{
            flex:1;     
            overflow: auto;
        }
   
    }
</style>
