// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import VueCookie from 'vue-cookie';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import * as moment from 'moment';

import App from './App'
import routes from './routes.js';
import store from './vuex'

Vue.use(VueRouter);
Vue.use(ElementUI)
Vue.use(VueCookie)
Vue.config.productionTip = false
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
    console.log('拦截器config请求失败: ',e);
    return Promise.reject(e)
})
axios.interceptors.response.use(function(response){
    console.log('拦截器response:', response);
    if(response.data.code > 0){
        console.log(2);
        return response.data
    } else {
        console.log(3);
        return Promise.reject(response.data)
    }
}, function(e){
    //axios的错误处理方式
    //axios的e是一个错误报告，必须手动调用里面的方法 e.response, e.request, e.message,e.config
    console.log('拦截器response返回失败: ',e.response);
    return Promise.reject(e.response.data)
})

router.beforeEach((to, from, next) => {
    next()
})

router.afterEach((to, from, next) => {

})

Vue.filter('parseTwoFloatNumber', function(value){
    if(!value) return '';
    var pattern_int = /^\d*$/;
    value = parseFloat(value);
    if(value && parseFloat(value)) {
        if(pattern_int.test(value)){
            return parseInt(value);
        } else{
            return parseFloat(value)
        }
    } else {
        return '数值错误';
    }
})

Vue.filter('timePraseDate', function(value){
    if(!value) return '';
    return moment(value).format("YYYY-MM-DD HH:mm")
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
