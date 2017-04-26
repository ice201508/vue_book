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
                return this.$store.getters.getTotal
            }
        },
        methods: {
            pay_success(){
                this.$router.push('order');
            },
        },
        components: {
            Qrcode
        }
    }
</script>
