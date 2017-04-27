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
                        <div class="form-group pull-left b-form" autocomplete="off">
                            <input type="email" class="form-control cus-imput" id="emailInput" v-model="user.email"  autocomplete="off">
                        </div>
                    </div>

                    <div class="clearfix login-oneline">
                        <div class="pull-left b-label"><label for="passwordInput">密码</label></div>
                        <div class="form-group pull-left b-form">
                            <input type="password" class="form-control cus-imput" id="passwordInput" v-model="user.password"  autocomplete="off">
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
                _this.$store.dispatch('loginAction', {
                    email: _this.user.email,
                    password: _this.user.password,
                }).then(function(data){
                        console.log('----------data ', data);
                        _this.$cookie.set('isLogin', true, {expires: '1h'})  //hms时分秒  D天 M月
                        _this.$cookie.set('user_id', data.uid, {expires: '1D'})
                        _this.$store.commit('getLoginInfoMutation', {
                            isLogin: true,
                            user_id: data.uid,
                        });
                        _this.$router.push('/book')
                    }).catch(function(e){
                        _this.$notify({
                            title: '失败',
                            message: e.message || '请求失败',
                            type: 'error',
                            duration: 3000,
                        })
                    })
            },
        },
        created(){
            console.log('localStorage: ', localStorage);
        }
    }
</script>
