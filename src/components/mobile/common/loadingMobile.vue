<template>
    <div class="Loading">
        <div>
             <Loading type="spinner" color="#396Ea0"  size="50px"/>     
        </div>
         
    </div>
</template>
<script>
import { Loading } from 'vant';
import { mapState, mapMutations } from 'vuex'
export default {
    data(){
        return{
            LoadingShow:true
        }
    },
    computed:{
        ...mapState(['showLoading'])
    },
    components:{
        Loading
    }
}
</script>
<style lang="less" scoped>
    .Loading{
        width:100%;
        height: 100%;
        position: absolute;
        left:0;
        top:0;
        background-color: rgba(0,0,0,.6);
        >div{
            position: absolute;
            left:50%;
            top:50%;
            transform: translate(-50%,-50%);
            background: #fff;
            width: 2.5rem;
            height: 2.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: .1rem;  
        }
    }
</style>
