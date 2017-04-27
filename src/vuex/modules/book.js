import axios from 'axios'
import Vue from 'vue'
import * as config from '../../config'

const state = {
    book: {},
    books: [],
    carts: [],
    orders: [],
    login_info: {},
}

const getters = {
    getBook: state=> state.book,
    getBooks: state => state.books,
    getCarts: state=> state.carts,
    getOrders: state=> state.orders,
    getLoginStatus: state => state.login_info,
}

const mutations = {
    getLoginInfoMutation(state, data){
        state.login_info.isLogin = data.isLogin;
        state.login_info.user_id = data.user_id;
    },
    getOneBookDetailMutation(state, data){
        if(data.code > 0){
            state.book = data.book[0]
        } else {
            state.book = {}
        }
    },
    getBooksMutations(state, data){
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
    },
    clearCarts(state){
        state.carts = [];
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
    getOrdersMutation(state, data){
        if(data.code > 0){
            state.orders = data.orders;
        } else {
            state.orders = [];
        }
    }
}

const actions = {
    loginAction({commit}, data){
        console.log('loginAction:  ', data);
        return new Promise(function(resolve, reject){
            axios.post(config.SERVER_NAME + '/login', data)
                .then(function(data){
                    resolve(data)
                }).catch(function(e){
                    reject(e)
                })
        })
    },
    getBooksActions({commit}){
        axios.get(config.SERVER_NAME + '/book/allbooks')
            .then(function(data){
                commit('getBooksMutations', data)
            })
            .catch(function(e){
                commit('getBooksMutations', e);
            })
    },
    getOneBookDetail({commit}, id){
        axios.get(config.SERVER_NAME + '/book/onebook/' + id)
            .then(function(data){
                commit('getOneBookDetailMutation', data)
            })
            .catch(function(e){
                commit('getBooksMutations', e)
            })
    },
    goSettle(context){
        let total = 0;
        for (let item of context.state.carts){
            total += parseFloat(item.count) * parseFloat(item.price)
        }
        total = parseFloat(total).toFixed(2)
        return new Promise(function(resolve, reject){
            axios.post(config.SERVER_NAME + '/order/settle', {
                total: total,
                carts: context.state.carts,
                create_time: 1493265477873,
                user_id: context.state.login_info.user_id
            }).then(function(data){
                resolve(data)
            }).catch(function(e){
                reject(e)
            })
        })
    },
    getOrdersAction({commit, state}){
        axios.get(config.SERVER_NAME + '/order/all_orders', {
            params:{
                user_id: state.login_info.user_id
            }
        }).then(function(data){
            commit('getOrdersMutation', data)
        }).catch(function(e){
            commit('getOrdersMutation', data)
        })
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
}
