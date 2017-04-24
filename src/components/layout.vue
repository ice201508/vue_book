<template>
    <div class="b-container">
        <div class="b-nav">
            <router-link to="/" >
                <i>to---/</i>
            </router-link>
            <router-link to="/book" >
                <i>book</i>
            </router-link>
            <router-link to="/login" >
                <i>login</i>
            </router-link>
        </div>
        <div class="page b-content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'layout',
        created(){
            console.log('123');
        },
    }
</script>
