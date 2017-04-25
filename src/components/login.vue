<template>
    <div class="b-login">
        <div class="row">
            <div class="col-md-4 col-md-offset-4">
                <div class="login-title">
                    <span>登录</span>
                </div>
                <div class="login-form login-title">
                    <div class="clearfix login-oneline">
                        <div class="pull-left b-label"><label for="emailInput">邮箱</label></div>
                        <div class="form-group pull-left b-form">
                            <input type="email" class="form-control" id="emailInput" v-model="user.email">
                        </div>
                    </div>

                    <div class="clearfix login-oneline">
                        <div class="pull-left b-label"><label for="passwordInput">密码</label></div>
                        <div class="form-group pull-left b-form">
                            <input type="password" class="form-control" id="passwordInput" v-model="user.password">
                        </div>
                    </div>

                    <div class="form-group">
                        <button type="button" class="btn btn-success btn-block login-button" @click="login">登录</button>
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
                user: {
                    email: '',
                    password: '',
                }
            }
        },
        methods: {
            login(){
                var _this=this;
                console.log(this.user);
                _this.$http.post(config.SERVER_NAME  + '/login' , {
                    email: _this.user.email,
                    password: _this.user.password,
                }).then(function(data){
                    if(data.data.code>0){
                        _this.$router.push('/book')
                    }
                    console.log('data: ', data.data);
                }).catch(function(e){
                    console.log('e: ',e)
                })
            },
        },
        created(){
            console.log('_this.route: ', this.$route);
            console.log('_this.router: ', this.$router);
        }
    }
</script>
