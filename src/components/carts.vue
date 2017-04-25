<template>
    <div class="book-carts">
        <div class="row col-md-12">
            <table class="table table-hover">
                <tbody>
                    <tr>
                        <td>11</td>
                        <td>11</td>
                        <td>11</td>
                        <td>11</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'carts',
        computed: {
            carts(){
                return this.$store.getters.getCarts
            }
        },
        mounted(){
            console.log('carts---- ', this.carts);
        }
    }
</script>
