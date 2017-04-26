<template>
    <div class="book-detail">
        <div class="row col-md-12">
            <div class="panel">
                <div class="panel-body clearfix">
                    <div class="pull-left cus-img clearfix">
                        <img :src="book.img_url">
                    </div>
                    <div class="pull-left">
                        <p>{{book.name}}</p>
                        <p>{{book.detail}}</p>
                    </div>
                    <div>
                        <button class="btn btn-success" @click="add_to_cart(book)">添加到购物车</button>
                        <button class="btn btn-success" @click="buy_book(book)">购买</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'book_detail',
        computed: {
            book(){
                return this.$store.getters.getBook
            }
        },
        methods: {
            add_to_cart(book){
                this.$store.commit('addToCarts', book);
            },
            buy_book(book){
                //不能写settle，不然就会跳转到当前路由/book/settle 下面去了
                this.$router.push('/settle');
            }
        },
        mounted(){
            this.$store.dispatch('getOneBookDetail', this.$route.params.id)
                .then(function(data){
                    console.log('vue文件里面处理异步：', data);
                })
                .catch(function(e){
                    console.log('error: ', e)
                })
            console.log(this.book);
        }
    }
</script>
