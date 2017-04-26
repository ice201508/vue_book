import axios from 'axios'
import Vue from 'vue'
import * as config from '../../config'

const state = {
    book: {},
    books: [],
    carts: [],
    total: 0,
}

const getters = {
    getBook: state=> state.book,
    getBooks: state => state.books,
    getCarts: state=> state.carts,
    getTotal: state=> {
        let total = 0;
        for (let item of state.carts){
            total += parseFloat(item.count) * parseFloat(item.price)
        }
        return parseFloat(total).toFixed(2);
    }
}

const mutations = {
    getOneBookDetailMutation(state, data){
        console.log('book-------  ', data);
        if(data.code > 0){
            state.book = data.book[0]
        } else {
            state.book = {}
        }

        /* mutations里面不能放异步操作
        return new Promise(function(resolve, reject){
            if(data.code > 0){
                state.books = data.book[0]
                resolve(state.books)
            } else {
                state.books = {}
                reject(state.books)
            }
        })
        */
    },
    getBooksMutations(state, data){
        console.log('vuex-------  ', data);
        if(data.code > 0){
            state.books = data.books
        } else {
            state.books = [];
        }
    },
    addToCarts(state, data){
        //data.count = 1;
        Vue.set(data, 'count', 1);  //这种写法可以count属性加入监听队列
        let first_add = true;
        let curr_bid_index = null;
        if(state.carts.length > 0){
            for(let [index, item] of state.carts.entries()) {
                if(item.bid == data.bid){
                    first_add = false;
                    curr_bid_index = index;
                }
            }
            if(first_add) {
                state.carts.push(data)
            } else {
                state.carts[curr_bid_index].count += 1;
            }
        } else {
            state.carts.push(data)
        }

        console.log('vuex-------state ', state.carts);
    },
    addCartCount(state, data){
        let curr_index = null;
        for(let [index, item] of state.carts.entries()){
            if(item.bid == data.bid){
                curr_index = index;
            }
        }
        state.carts[curr_index].count += 1;
    },
    minusCartCount(state, data){
        let curr_index = null;
        for(let [index, item] of state.carts.entries()){
            if(item.bid == data.bid){
                curr_index = index;
            }
        }
        if(state.carts[curr_index].count == 1){
            state.carts.splice(curr_index, 1);
        } else {
            state.carts[curr_index].count -= 1;
        }
    },
    removeOneCart(state, data){
        let curr_index = null;
        for(let [index, item] of state.carts.entries()){
            if(item.bid == data.bid){
                curr_index = index;
            }
        }
        state.carts.splice(curr_index, 1);
    },
}

const actions = {
    getBooksActions({commit}){
        return new Promise(function(resolve, reject){
            axios.get(config.SERVER_NAME + '/book/allbooks')
                .then(function(data){
                    resolve(commit('getBooksMutations', data))
                })
                .catch(function(e){
                    reject(commit('getBooksMutations', e));
                })
        })
    },
    getOneBookDetail({commit}, id){
        console.log("config.SERVER_NAME + '/book/onebook/' + id: ", config.SERVER_NAME + '/book/onebook/' + id);
        axios.get(config.SERVER_NAME + '/book/onebook/' + id)
            .then(function(data){
                commit('getOneBookDetailMutation', data)
            })
            .catch(function(e){
                commit('getBooksMutations', e)
            })
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
}
