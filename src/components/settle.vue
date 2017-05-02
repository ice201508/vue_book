<template>
    <div class="book-settle">
        <div class="row col-md-12">
            <div class="col-md-4">total--{{total}}</div>
        </div>
        <div class="row col-md-12">
            <div class="col-md-4 col-md-offset-4">
                <qrcode :cls="qrClass" :value="qrText" :level="level" :size="size"></qrcode>
            </div>
        </div>
        <div class="row col-md-12 settle-foot">
            <div class="col-md-4 col-md-offset-6">
                <button class="btn btn-success" @click="pay_success">支付完成</button>
            </div>
        </div>
    </div>
</template>

<script>
    import Qrcode from 'v-qrcode'

    export default {
        name: 'settle',
        data(){
            return {
                qrClass: 'qrcode',
                qrText: 'http://www.leijiuling.com',
                level: 'H',  //L, Q, M, H
                size: 200,
            }
        },
        computed: {
            total(){
                let total = 0;
                for (let item of this.$store.state.book.carts){
                    total += parseFloat(item.count) * parseFloat(item.price)
                }
                return parseFloat(total).toFixed(2)
            }
        },
        methods: {
            pay_success(){
                var _this = this;
                _this.$store.dispatch('goSettle')
                    .then(function(data){
                        _this.$notify({
                            title: '下单成功',
                            message: '生成订单成功',
                            type: 'success',
                            duration: 3000,
                        })
                        _this.$store.commit('clearCarts');
                        _this.$router.push('/order');
                    })
                    .catch(function(e){
                        _this.$notify({
                            title: '失败',
                            message: e.message || '请求失败',
                            type: 'error',
                            duration: 3000,
                        })
                    })
            },
        },
        components: {
            Qrcode
        }
    }
</script>
