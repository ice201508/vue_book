<template>
    <div class="book-carts">
        <div class="row col-md-12">
            <ul class="clearfix ul-title">
                <li class="pull-left col-md-4">商品信息</li>
                <li class="pull-left col-md-2">单价(元)</li>
                <li class="pull-left col-md-2">数量</li>
                <li class="pull-left col-md-2">金额(元)</li>
                <li class="pull-left col-md-2">操作</li>
            </ul>
            <table class="table table-hover custom-padding" v-if="carts.length>0">
                <tr v-for="(item, index) in carts">
                    <td class="col-md-4">
                        <img :src="item.img_url" class="img-in-table">
                    </td>
                    <td class="col-md-2">{{item.price | parseTwoFloatNumber}}</td>
                    <td class="col-md-2">
                        <span class="fa fa-minus count-span-add" @click="cart_minus(item)"></span>
                        <span class="count-span-num">{{item.count}}</span>
                        <span class="fa fa-plus count-span-add" @click="cart_add(item)"></span>
                    </td>
                    <td class="col-md-2">{{item.price * item.count | parseTwoFloatNumber}}</td>
                    <td class="col-md-2">
                        <button class="btn btn-warning" @click="delete_item(item)">
                            <span>删除</span>
                            <i class="glyphicon glyphicon-trash"></i>
                        </button>
                    </td>
                </tr>
            </table>
            <div v-if="carts.length==0">
                <span>购物车为空</span>
            </div>
            <ul class="clearfix ul-foot" v-if="carts.length>0">
                <li class="col-md-4 col-md-offset-8">
                    <span>商品总价:</span>
                    <span class="price"> ￥{{total}}</span>
                </li>
                <li class="col-md-2 col-md-offset-10">
                    <el-button type="danger" @click="submit">
                        <span class="padding-icon-right">结算</span>
                        <i class="fa fa-credit-card-alt"></i>
                    </el-button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'carts',
        computed: {
            carts(){
                return this.$store.getters.getCarts
            },
            total(){
                let total = 0;
                for (let item of this.$store.getters.getCarts){
                    total += item.count * item.price
                }
                return parseFloat(total).toFixed(2);
            }
        },
        methods: {
            cart_add(cart){
                this.$store.commit('addCartCount', cart);
            },
            cart_minus(cart){
                this.$store.commit('minusCartCount', cart);
            },
            delete_item(cart){
                this.$store.commit('removeOneCart', cart)
            },
            submit(){
                var _this = this;
                if(_this.$cookie.get('isLogin')) {
                    _this.$router.push('/settle');
                } else {
                    _this.$confirm("请先登录，是否跳转到登录界面？", "提示", {
                        comfirmButtonText: '登录',
                        cancelButtonText: '取消',
                        type: 'warning',
                    }).then(() => {
                        _this.$router.push('/login');
                    }).catch(() => {
                        return;
                    })
                }
            }
        },
        mounted(){
            console.log('carts---- ', this.carts);
        }
    }
</script>
