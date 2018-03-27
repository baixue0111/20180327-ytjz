// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router';
import test1 from 'components/test1/test1.vue'
import test2 from 'components/test2/test2.vue'


//全局注册
Vue.use(VueRouter);
Vue.use(VueResource);

//定义路由
const routes = [
  {path: '/test1', component: test1},
  {path: '/test2', component: test2}
];

// 创建实例
var router= new VueRouter({
  mode: 'history',
  linkActiveClass: 'active',
  routes
})
let bus = new Vue();
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

// 打开默认的路劲
router.push('/test1');