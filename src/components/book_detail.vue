<template>
    <div class="book-detail">
        <div class="row col-md-12">
            <div class="panel">
                <div class="panel-body">
                    <div class="cus-img clearfix">
                        <img :src="book.img_url" class="pull-left">
                        <div class="wrap-img-div">
                            <p>22{{book.bname}}</p>
                            <p>22{{book.detail}}</p>
                        </div>
                    </div>
                    <div class="col-md-offset-7">
                        <el-button type="danger" @click="buy_book(book)">购买</el-button>
                        <el-button type="success" @click="go_back_book()">返回</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'book_detail',
        data(){
            return {
                dialogVisible: false
            }
        },
        computed: {
            book(){
                return this.$store.getters.getBook
            }
        },
        methods: {
            buy_book(book){
                //不能写settle，不然就会跳转到当前路由/book/settle 下面去了
                this.$confirm("请先登录，是否跳转到登录界面？", "提示", {
                    comfirmButtonText: '登录',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(() => {
                    this.$store.commit('addToCarts', book);
                    this.$router.push('/login');
                }).catch(() => {
                    return;
                })
            },
            go_back_book(){
                this.$router.push('/book');
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
