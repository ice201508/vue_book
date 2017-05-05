<template>
    <div class="b-container">
        <div class="b-nav">
            <ul>
                <li>
                    <router-link to="/book" >
                        <i class="fa fa-home"></i>
                        <span>首页</span>
                    </router-link>
                </li>
                <li>
                    <router-link to="/carts">
                        <i class="fa fa-shopping-cart"></i>
                        <div class="book-nav-carts">
                            <span>购物车</span>
                            <div class="carts-badge" v-show="carts_count>0">
                                <p class="number" :class="{'litter-font': carts_count>9}">{{carts_count}}</p>
                            </div>
                        </div>
                    </router-link>
                </li>
                <li>
                    <router-link to="/order">
                        <i class="fa fa-list-alt"></i>
                        <span>我的订单</span>
                    </router-link>
                </li>
                <li>
                    <a @click="go_login">
                        <i class="fa fa-sign-in" v-if="!loginInfo.isLogin"></i>
                        <span v-if="!loginInfo.isLogin">登录</span>
                        <span v-if="loginInfo.isLogin">退出</span>
                        <i class="fa fa-sign-out"  v-if="loginInfo.isLogin"></i>
                    </a>
                </li>
            </ul>
        </div>
        <div class="page">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'layout',
        computed: {
            carts_count(){
                return this.$store.getters.getCarts.length
            },
            loginInfo(){
                return this.$store.getters.getLoginStatus
            }
        },
        methods: {
            go_login(){
                var _this=this;
                if(localStorage.isLogin){
                    _this.$confirm("是否退出当前页面？", "提示", {
                        comfirmButtonText: '退出',
                        cancelButtonText: '取消',
                        type: 'warning',
                    }).then(() => {
                        localStorage.removeItem('isLogin');
                        localStorage.removeItem('user_id');
                        _this.$store.commit('getLoginInfoMutation', {
                            isLogin: false,
                            user_id: null,
                        })
                        _this.$router.push('/login');
                    }).catch(() => {
                        return;
                    })
                } else {
                    _this.$router.push('/login');
                }
            }
        },
        created(){   //这里不能用mounted，要在$el元素绑定之前设置这个值
            if(localStorage.isLogin) {
                this.$store.commit('getLoginInfoMutation', {
                    isLogin: localStorage.isLogin,
                    user_id: localStorage.user_id,
                })
            }
        },
    }
</script>
