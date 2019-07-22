<template>
    <div class="wrap">
       <newBlock></newBlock>
       <newTransactionMobile></newTransactionMobile>
    </div>
</template>
<script>
import newBlock from "../mobile/newBlockMobile";
import newTransactionMobile from "../mobile/newTransactionMobile";

export default {
    data(){
        return{

        }
    },
    components:{
        newBlock,
        newTransactionMobile,
        }
}
</script>
<style lang="less" scoped>
    .wrap{
        background: #F4F6FA;
    }
</style>
