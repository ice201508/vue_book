<template>
    <!-- <div class="color-primary">
        <span><i class="fa fa-camera-retro fa-lg"></i></span>
        <span><i class="glyphicon glyphicon-user fa-lg"></i></span>
    </div> -->
    <div class="book">
        <div class="book-content">
            <div class="row col-md-12">
                <div class="col-md-3">
                    <div class="one-book panel">
                        <div class="panel-body book-item">
                            <img :src="img">
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="one-book panel">
                        <div class="panel-body book-item">
                            23
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="one-book panel">
                        <div class="panel-body book-item">
                            23
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="one-book panel">
                        <div class="panel-body book-item">
                            23
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'book',
        data(){
            return {
                img: ''
            }
        },
        mounted(){
            var _this = this;
            _this.$http.get('http://127.0.0.1:3005/book/allbooks')
                .then(function(data){
                    console.log('data', data);
                    _this.img = data.books[0].img_url
                })
                .catch(function(e){
                    console.log('e3333: ',e);
                })
        }
    }
</script>
