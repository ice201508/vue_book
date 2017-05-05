### Vue

npm run dev

### 项目
bower install jquery bootstrap-sass font-awesome-sass --save
npm install axios vuex v-qrcode element-ui  --save
npm install sass-loader node-sass --save-dev
使用bootstrap-sass之前需要先引入sass-loader


[element-ui组件框架](https://github.com/ElemeFE/element)
[axios文档](https://github.com/mzabriskie/axios)
[v-qrcode二维码文档](https://github.com/atwxp/v-qrcode)
[vue-cookie使用文档](https://github.com/alfhen/vue-cookie)
[moment时间库](http://momentjs.com/docs)


localStorage sessionStorage  html5原生支持的对象   代替了原来cookie一些不足
实例里面就用  this.$cookie.set(..)  vuex文件里面就用Vue.cookie.set(...)

localStorage.setItem('key_a', 1)   ====  localStorage.key_a = 1
localStorage.getItem('key_a')       ====  localStorage.key_a
localStorage.removeItem('key_a')
localStorage.clear()

存放对象
sessionStorage.setItem('page', JSON.stringify(obj));
取对象
JSON.parse(localStorage.getItem('key_a'))

### 常见错误
数据库的错误  order关键字的错误(将order作为insert的表名，发生冲突)
