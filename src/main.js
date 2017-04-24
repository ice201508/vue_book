// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'

import App from './App'
import routes from './routes.js';
import store from './vuex'

Vue.config.productionTip = false
Vue.use(VueRouter);
Vue.prototype.$http = axios;

const router = new VueRouter({
    //mode: 'history',
    routes,
    linkActiveClass : 'active',
});

//axios请求拦截器,
axios.interceptors.request.use(function(config){
    console.log('拦截器config: ',config);
    return config
}, function(e){
    return Promise.reject(e)
})
axios.interceptors.response.use(function(response){
    console.log('拦截器response:', response);
    if(response.data.code > 0){
        console.log(2);
        return response.data
    } else {console.log(3);
        return Promise.reject(response.data)
    }
}, function(e){
    console.log('eeeee: ',e);
    return Promise.reject(e)
})

router.beforeEach((to, from, next) => {
    next()
})

router.afterEach((to, from, next) => {

})

new Vue({
    router,
    store,
    render(h) {
        return h(App)
    }
    // el: '#app',
    // template: '<App/>',
    // components: { App }
}).$mount('#app')
