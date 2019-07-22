<template>
    <div class="footer">
        <div class="contact">
            <a href="https://www.facebook.com/Insight-Chain-210150206429393 " target="_Blank" class="contact-list" @mouseover="FacebookmouseOver"  @mouseleave="FacebookmouseLeave">
                <img src="@/assets/images/footer/iconFacebook.svg" alt="">
                <div>Facebook</div>
                <div class="xinxi" ref="facebook">Insight Chain</div>
            </a>
            <a href="https://weibo.com/u/6394744395?is_hot=1" class="contact-list" target="_Blank" @mouseover="weibomouseOver"  @mouseleave="weibomouseLeave">
                <img src="@/assets/images/footer/weibo.svg" alt="">
                <div>微博</div>
                <div class="xinxi" ref="weibo">Insight Chain</div>
            </a>
            <a href="https://twitter.com/InsightChain" class="contact-list" target="_Blank" @mouseover="twittermouseOver"  @mouseleave="twittermouseLeave">
                <img src="@/assets/images/footer/icon.svg" alt="">
                <div>Twitter</div>
                <div class="xinxi" ref="twitter">Insight Chain</div>
            </a>
            <a class="contact-list" @mouseover="weixinmouseOver"  @mouseleave="weixinmouseLeave">
                <img src="@/assets/images/footer/weixin.svg" alt="">
                <div>微信</div>
                <div class="weixin-ma clearfix" ref="weixin">
                    <div class="ma-left left">
                        <div>微信公众号</div>
                        <img src="@/assets/images/footer/QR_group-g.jpg" alt="" width="90">
                    </div>
                    <div class="ma-right right">
                        <div>微信群聊</div>
                        <img src="@/assets/images/footer/QR_public-j.jpg" alt="" width="90">
                    </div>
                </div>
            </a>
            <a href="https://t.me/InsightChain_CN" class="contact-list" target="_Blank" @mouseover="dianbaomouseOver"  @mouseleave="dianbaomouseLeave">
                <img src="@/assets/images/footer/dianbao.svg" alt="">
                <div>电报</div>
                <div class="xinxi" ref="dianbao">InsightChain社区</div>
            </a>
            <a href="https://0.plus/#/InsightChain_CN" class="contact-list" target="_Blank" @mouseover.native="biyongmouseOver"  @mouseleave.native="biyongmouseLeave">
                <img src="@/assets/images/footer/biyong.svg" alt="">
                <div>BiYong</div>
                <div class="xinxi" ref="BiYong">InsightChain社区</div>
            </a>
        </div>
        <div class="guanyu">
            <a href="">Email: inb@insightchain.io</a>
        </div>
        <div class="wenzi">
            <div>
                Copyright©insightchain.io 2019
            </div>
        </div>
    </div> 
</template>

<script>
export default {
  methods: {
    FacebookmouseOver(){
      this.$refs.facebook.style.display='block'
    },
    FacebookmouseLeave(){
      this.$refs.facebook.style.display='none'
    },
    weibomouseOver(){
      this.$refs.weibo.style.display='block'
    },
    weibomouseLeave(){
      this.$refs.weibo.style.display='none'
    },
    twittermouseOver(){
      this.$refs.twitter.style.display='block'
    },
    twittermouseLeave(){
      this.$refs.twitter.style.display='none'
    },
    weixinmouseOver(){
      this.$refs.weixin.style.display='block'
    },
    weixinmouseLeave(){
      this.$refs.weixin.style.display='none'
    },
    dianbaomouseOver(){
      this.$refs.dianbao.style.display='block'
    },
    dianbaomouseLeave(){
      this.$refs.dianbao.style.display='none'
    },
    BiYongmouseOver(){
      this.$refs.BiYong.style.display='block'
    },
    BiYongmouseLeave(){
      this.$refs.BiYong.style.display='none'
    }   
  }
}
</script>

<style lang="less" scoped>
.footer{
  width:100%;
  background-color: #396ea0;
  padding-bottom: 0.1rem;
  .contact{
    display: flex;
    justify-content: space-between;
    padding:0.3rem 0.3rem 0.3rem;
    .contact-list{
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      position: relative;
      img{
        width:.6rem;
        height:.6rem;
        margin-bottom: 0.2rem;
      }
      div{
        color: #fff;
        font-size: .24rem;
      }
      .xinxi{
          display: none;
          width:1.8rem;
          height: .3rem;
          font-size:.22rem;
          background-color: #fff;
          text-align: center;
          line-height: .3rem;
          border-radius: 0.05rem;
          position: absolute;
          top: -.4rem;
          left: -.4rem;
          color:#333;
          border: 1px solid #ccc;
    }
    }
        .weixin-ma{
          display: none;
          position: absolute;
          width:3.02rem;
          height: 1.7rem;
          top:-1.8rem;
          border-radius: 0.05rem;
          background: #fff;
          border:1px solid #ccc;
          >div{
            >div{
              color: #000;
              font-size: 0.22rem;
            }
          }
          .ma-left{
            padding: 0 .08rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            img{
              margin:0.15rem;
              width:.95rem;
              height: 1.1rem
            }
          }
          .ma-right{
            padding: 0 .08rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            img{
              margin:0.2rem;
              width:.95rem;
              height: 1.1rem
            }
          }
      }
  }
  .guanyu{
     width: 100%;
     display: flex;
     justify-content: center;
     margin-bottom: 0.2rem;
     a{
        color: #fff;
        font-size: 0.24rem;
     }
  }
  .wenzi{
    width: 100%;
    margin-bottom: 0.5rem;
    display: flex;
    justify-content: center;
    margin-bottom: 0.3rem;
    >div{
      color: #fff;
      font-size: 0.24rem;
    }
  }
}
</style>