<template>
    <div class="footer">
        <div class="contact">
            <a href="https://www.facebook.com/Insight-Chain-210150206429393 " target="_Blank" class="contact-list" @mouseover="FacebookmouseOver"  @mouseleave="FacebookmouseLeave">
                <img src="../../assets/images/footer/iconFacebook.svg" alt="">
                <div>Facebook</div>
                <div class="xinxi" ref="facebook">InsightChain</div>
            </a>
            <a href="https://weibo.com/u/6394744395?is_hot=1" class="contact-list" target="_Blank" @mouseover="weibomouseOver"  @mouseleave="weibomouseLeave">
                <img src="../../assets/images/footer/weibo.svg" alt="">
                <div>微博</div>
                <div class="xinxi" ref="weibo">InsightChain</div>
            </a>
            <a href="https://twitter.com/InsightChain" class="contact-list" target="_Blank" @mouseover="twittermouseOver"  @mouseleave="twittermouseLeave">
                <img src="../../assets/images/footer/icon.svg" alt="">
                <div>Twitter</div>
                <div class="xinxi" ref="twitter">InsightChain</div>
            </a>
            <a class="contact-list" @mouseover="weixinmouseOver"  @mouseleave="weixinmouseLeave">
                <img src="../../assets/images/footer/weixin.svg" alt="">
                <div>微信</div>
                <div class="weixin-ma clearfix" ref="weixin">
                    <div class="ma-left left">
                        <div>微信公众号</div>
                        <img src="../../assets/images/footer/QR_group-g.jpg" alt="" width="90">
                    </div>
                    <div class="ma-right right">
                        <div>微信群聊</div>
                        <img src="../../assets/images/footer/QR_public-j.jpg" alt="" width="90">
                    </div>
                </div>
            </a>
            <a href="https://t.me/InsightChain_CN" class="contact-list" target="_Blank" @mouseover="dianbaomouseOver"  @mouseleave="dianbaomouseLeave">
                <img src="../../assets/images/footer/dianbao.svg" alt="">
                <div>电报</div>
                <div class="xinxi" ref="dianbao">InsightChain社区</div>
            </a>
            <a href="https://0.plus/#/InsightChain_CN" class="contact-list" target="_Blank" @mouseover.native="biyongmouseOver"  @mouseleave.native="biyongmouseLeave">
                <img src="../../assets/images/footer/biyong.svg" alt="">
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
.footer {
  width: 100%;
  background-color: #396ea0;
  text-align: center;
  color: #ccc;
  padding-bottom: 20px;
}
.contact {
  width: 100%;
  font-size: 12px;
}
.contact a {
  width: 80px;
  height: 80px;
  display: inline-block;
  margin: 30px 10px;
  margin-bottom: 10px;
  color: #fff;
  font-size: 14px;
  position: relative;
  font-size: 12px;
}
.contact a img{
  border: 0px;
}
.contact a div {
  font-size: 14px;
}
.guanyu div{
  font-size: 14px;
}

@media (max-width: 767px) and (min-width: 320px) {
  .contact a div {
    font-size: 14px;
  }
}
.contact a .xinxi {
  display: none;
  width: 100px;
  height: 30px;
  font-size: 12px;
  background-color: #fff;
  text-align: center;
  line-height: 30px;
  border-radius: 5px;
  position: absolute;
  top: -40px;
  left: -10px;
  color: #333333;
  border: 1px solid #ccc;
}
.contact a .weixin-ma {
  display: none;
  width: 200px;
  height: 130px;
  position: absolute;
  top: -140px;
  left: -50px;
  border-radius: 5px;
  padding: 0 5px;
  box-sizing: border-box;
  background-color: #fff;
  border: 1px solid #ccc;
  overflow: hidden;
}
.contact a .weixin-ma div {
  font-size: 12px;
  margin: 5px 0;
  background-color: #fff;
  color:#000;
}
.contact a:hover {
  transform: translate(0, -5px);
  transition: all 0.5s;
  cursor: pointer;
}
.guanyu {
  width: 100%;
}
.guanyu a {
  color: #fff;
  font-size: 14px;
}
.guanyu a:hover {
  color: #82c2ff;
  cursor: pointer;
}
.wenzi {
  color: #fff;
  margin-top: 20px;
}
.wenzi div {
  font-size: 12px;
}
@media (min-width: 767px) and (max-width: 1024px) {
  .body {
    width: 100%;
  }
  .footer {
    width: 100%;
  }
}
@media (min-width: 320px) and (max-width: 767px) {
  body {
    width: 100%;
  }
  .footer {
    width: 100%;
  }
  .footer .contact {
    margin-left: 0;
    display: flex;
    justify-content: center;
  }
  .footer .contact a {
    /*width: 14.3%;*/
    width: 17%;
    height: auto;
    display: inline-block;
    margin: 10px 0;
    margin-bottom: 10px;
    color: #999;
    font-size: 12px;
    text-align: center;
    -webkit-transform: scale(0.7);
    transform: scale(0.7);
  }
  .weixin-ma {
    width: 200px;
    position: absolute;
  }
  .weixin-ma div {
    font-size: 12px;
    margin: 5px 0;
    background-color: #fff;
  }
  .guanyu {
    width: 100%;
  }
  .guanyu a {
    margin: 0 3px;
    font-size: 12px;
    transform: scale(0.8);
  }
  .wenzi {
    width: 100%;
    margin-top: 5px;
  }
  .wenzi div {
    width: 100%;
    text-align: center;
    -webkit-transform: scale(0.7);
    transform: scale(0.7);
  }
}

</style>
