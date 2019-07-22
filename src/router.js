import Vue from 'vue'
import Router from 'vue-router'
import Home from './pages/home.vue'
import Block from './pages/block/block.vue'
import BlockDetails from './pages/block/BlockDetails.vue'
import Account from './pages/block/Account.vue'
import TransactionHash from './pages/block/TransactionHash.vue'
import LatestTransaction from './pages/block/LatestTransaction.vue'
import LatestBlock from './pages/block/LatestBlock.vue'
Vue.use(Router)
    //pc端
const pcRouter = [{
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/block',
            name: 'block',
            component: Block,
            children: [{
                    path: '/BlockDetails',
                    name: 'BlockDetails',
                    component: BlockDetails,
                },
                {
                    path: '/Account',
                    name: 'Account',
                    component: Account
                },
                {
                    path: '/TransactionHash',
                    name: 'TransactionHash',
                    component: TransactionHash
                },
                {
                    path: '/LatestTransaction',
                    name: 'LatestTransaction',
                    component: LatestTransaction
                },
                {
                    path: '/LatestBlock',
                    name: 'LatestBlock',
                    component: LatestBlock
                }
            ]
        }
    ]
    //移动端
const mobileRouter = [{
        path: '/',
        name: 'mainMobile',
        component: resolve => { require(['@/pages/mobile/mainMobile.vue'], resolve); },
        redirect: '/homePageMobile',
        children: [{
                path: '/homePageMobile',
                name: 'homePageMobile',
                meta: { isMobile: true, hasHead: true },
                component: resolve => { require(['@/pages/mobile/homePageMobile.vue'], resolve); }
            },
            {
                path: '/transactionListMobile',
                name: 'transactionListMobile',
                meta: { isMobile: true, hasHead: false },
                component: resolve => { require(['@/pages/mobile/transactionListMobile.vue'], resolve); }
            },
            {
                path: '/blockListMobile',
                name: 'blockListMobile',
                meta: { isMobile: true, hasHead: false },
                component: resolve => { require(['@/pages/mobile/blockListMobile.vue'], resolve); }
            },
            {
                path: '/blockDetailsMobile',
                name: 'blockDetailsMobile',
                meta: { isMobile: true, hasHead: false },
                component: resolve => { require(['@/pages/mobile/blockDetailsMobile.vue'], resolve); }
            },
            {
                path: '/transactionHashMobile',
                name: 'transactionHashMobile',
                meta: { isMobile: true, hasHead: false },
                component: resolve => { require(['@/pages/mobile/transactionHashMobile.vue'], resolve); }
            },
            {
                path: '/accountMobile',
                name: 'accountMobile',
                meta: { isMobile: true, hasHead: false },
                component: resolve => { require(['@/pages/mobile/accountMobile.vue'], resolve); }
            }

        ],
    },
    {
        path: '/Mobile404',
        name: 'error',
        meta: { isMobile: true, hasHead: false },
        component: resolve => { require(['@/pages/mobile/404.vue'], resolve); }
    }
]


const routers = [
    ...pcRouter,
    ...mobileRouter
]

export default new Router({
    routes: routers,
    scrollBehavior() {
        return { x: 0, y: 0 }
    }
})