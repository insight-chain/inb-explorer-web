<template>
  <div id="app">
      <keep-alive>
        <router-view class='position-div'></router-view>
      </keep-alive>
  </div>
</template>

<script>
import  './assets/css/base.css';

export default {

}
</script>
<style lang='less' scoped>
  #app {
    width:100%;
    height:100%;
  }
</style>
