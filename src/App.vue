<template>
  <div id="contain">
    <router-view></router-view>
  </div>
</template>

<script>
    export default {
        name: 'app',
        created(){
            require('./bower_components/jquery/dist/jquery.min.js');
            console.log('jquery: ', $);
        },
    }
</script>

<style lang="sass">
  @import  ./assets/sass/bootstrap.scss
  @import  ./assets/sass/font-awesome.scss
  @import  ./assets/sass/custom.scss
</style>

<style scoped>
    #contain {
        -webkit-font-smoothing: antialiased;   //页面抗锯齿，更清晰
        -moz-osx-font-smoothing: grayscale;
        height: 100%;
    }
</style>
