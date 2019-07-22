import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueI18n from 'vue-i18n' //vue国际化
import axios from 'axios' //axios 请求
import { baseURL } from './config/env'
import { Message } from 'element-ui'
import { isMobile } from "@/utils/utils"
import './utils/rem'
Vue.config.productionTip = false

//国际化配置
Vue.use(VueI18n) // 通过插件的形式挂载

Vue.prototype.$message = Message //将message方法挂载到vue上

Vue.prototype.$axios = axios
axios.defaults.baseURL = baseURL;
axios.defaults.timeout = 10000

const i18n = new VueI18n({
    locale: 'zh-CN', // 语言标识
    //this.$i18n.locale // 通过切换locale的值来实现语言切换
    messages: {
        'zh-CN': require('./assets/lang/zh-CN'), // 中文语言包
        'en-US': require('./assets/lang/en-US') // 英文语言包
    }
})


// 请求拦截（配置发送请求的信息）
axios.interceptors.request.use(function(config) {
    // 处理请求之前的配置
    // Loading.service({
    //    text:'加载中，请稍后'
    // });
    // document.querySelector('body').setAttribute('style', 'overflow:hidden')
    return config;
}, function(error) {
    // 请求失败的处理
    console.log(error)
    return Promise.reject(error);
});


// 响应拦截（配置请求回来的信息）
axios.interceptors.response.use(function(response) {
    // 处理响应数据
    // document.querySelector('body').setAttribute('style', 'overflow:visible')
    return response;
}, function(error) {
    // 处理响应失败
    return Promise.reject(error);
});


//栈溢出错误:进入移动端首页的时候根路径匹配
router.beforeEach((to, from, next) => {
    if (isMobile()) {
        if (to.meta.isMobile) {
            next();
        } else {
            next({
                path: 'homePageMobile'
            });
        }
    } else {
        next();
    }
});


new Vue({
    i18n,
    router,
    store,
    render: h => h(App)
}).$mount('#app')