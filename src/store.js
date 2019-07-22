import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        showLoading: false,
    },
    mutations: {
        SHOW_LOADING: state => state.showLoading = true,
        HIDE_LOADING: state => state.showLoading = false,
    },
    actions: {

    }
})