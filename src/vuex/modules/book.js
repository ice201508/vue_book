import axios from 'axios'
import * as config from '../../config'

const state = {
    books: [],
    carts: [],
}

const getters = {
    getBooks: state => state.books,
    getCarts: state=> state.carts,
}

const mutations = {
    getBooksMutations(state, data){
        console.log('vuex-------  ', data);
        if(data.code > 0){
            state.books = data.books
        } else {
            state.books = [];
        }
    },
    addToCarts(state, data){
        console.log('vuex------- ', data);
        state.carts.push(data)
    }
}

const actions = {
    getBooksActions({commit}){
        axios.get(config.SERVER_NAME + '/book/allbooks')
            .then(function(data){
                commit('getBooksMutations', data)
            })
            .catch(function(e){
                commit('getBooksMutations', e)
            })
    },
}

export default {
    state,
    getters,
    mutations,
    actions,
}
