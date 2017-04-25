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
                    <router-link to="/login" >
                        <i class="fa fa-sign-in"></i>
                        <span>登录</span>
                    </router-link>
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
            }
        },
        created(){
            console.log('123');
        },
        mounted(){

        }
    }
</script>
