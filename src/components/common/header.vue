<template>
    <div class="header">
        <div class="body header-box">
            <div class='bann'>
                <a href="www.insightchain.io"></a>
                <div class="input-sou">
                    <input type="text" placeholder="区块高度、交易哈希、账号地址">
                    <div>
                       <div>
                          <img src="../../assets/images/list/sousuo.svg" alt="" width='100%'>
                       </div>
                    </div>
                </div>
                <span>简体中文</span>
                <span>主网</span>             
            </div>          
        </div>
    </div>
</template>

<script>
export default {
}
</script>

<style lang="less" scoped>
.header{
    width:100%;
    height:80px;
    background:url('../../assets/images/list/b_logo.svg') no-repeat;
    .header-box{
        display:flex;
        align-items:center;
        .bann{
            width:100%;
            height:80px; 
            display:flex;
            align-items:center;
            a{
                display:block;
                width:140px;
                height:40px;
                background:url('../../assets/images/home/logo.svg') no-repeat;
                background-size:100%;
            }
            span{
                color:#fff;
            }
            span:nth-child(3){
                margin-left:100px;
            }
            span:nth-child(4){
                margin-left:20px;
            }
            >div{
               height:40px;
               width:400px;
               background-color:pink;
               margin-left:auto;
               display:flex;
               align-items:center;
               background:#fff; 
               border-radius:5px;
               input{
                   width:90%;
                   height:100%;
                   border:none;
                   border-radius:5px;
                   padding-left:20px;
               }
               >div{
                   width:10%;
                   height:30px;
                   background:#fff; 
                   border-left:1px  solid #ccc;
                   display:flex;
                   align-items:center;
                   justify-content:center;
                   div{
                       width:20px;
                       height:20px;
                   }
               }
            } 
        }
    }
}
</style>
