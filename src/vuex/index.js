import Vue from 'vue'
import Vuex from 'vuex'
import book from './modules/book'

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        book
    },
    state: {
        carts: [],
    }
})

export default store;
