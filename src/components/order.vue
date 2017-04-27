<template>
    <div class="book-order">
        <div class="row col-md-12">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <td>1</td>
                        <td>2</td>
                        <td>3</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(order, index) in orders">
                        <td>{{order.order_id}}</td>
                        <td>{{order.pay_money}}</td>
                        <td>{{order.create_time}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'order',
        computed: {
            orders(){
                return this.$store.getters.getOrders
            }
        },
        mounted(){
            this.$store.dispatch('getOrdersAction')
        }
    }
</script>
