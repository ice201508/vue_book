<template>
    <div class="book clearfix">
        <div class="book-content">
            <div class="row col-md-12">
                <div class="col-md-3 book-item" v-for="book in books">
                    <div class="one-book"  @click="chose_one(book.bid)">
                            <img :src="book.img_url">
                            <div class="book-info">
                                <p class="b-title">{{book.bname}}</p>
                                <p class="b-rate">{{book.rate}}</p>
                                <p>
                                    <span>{{book.author}}</span>
                                    <span>{{book.create_time}}</span>
                                    <span>{{book.press}}</span>
                                </p>
                                <p class="b-price">
                                    <span>￥{{book.price}}</span>
                                    <span class="delete">￥{{book.price}}</span>
                                </p>
                            </div>
                    </div>
                    <div class="book-hover-carts clearfix">
                        <div class="add pull-left clearfix" @click="add_to_cart(book)">
                            <i class="fa fa-plus fa-1x"></i>
                        </div>
                        <div class="add pull-left clearfix" @click="buy_book(book)">
                            <i class="fa fa-credit-card-alt fa-1x"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import * as config from '../config'
    export default {
        name: 'book',
        data(){
            return {
                // books: []
            }
        },
        computed: {
            books(){
                return this.$store.getters.getBooks;
            }
        },
        methods: {
            chose_one(id){
                var _this = this;
                _this.$router.push('/book/' + id)
            },
            add_to_cart(book){
                this.$store.commit('addToCarts', book);
            },
            buy_book(){
                console.log(11);
            }
        },
        mounted(){
            var _this = this;
            _this.$store.dispatch('getBooksActions');
            // _this.$http.get(config.SERVER_NAME + '/book/allbooks')
            //     .then(function(data){
            //         console.log('data', data);
            //         _this.books = data.books
            //     })
            //     .catch(function(e){
            //         console.log('e3333: ',e);
            //     })
        }
    }
</script>
