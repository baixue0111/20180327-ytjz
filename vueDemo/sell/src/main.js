// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

import goods from 'components/goods/goods.vue';
import ratings from 'components/ratings/ratings.vue';
import seller from 'components/seller/seller.vue';
import 'common/stylus/index.styl';

// 全局注册
Vue.use(VueRouter);
Vue.use(VueResource);

// 定义路由
const VueRoutes = [
  {path: '/goods', component: goods},
  {path: '/ratings', component: ratings},
  {path: '/seller', component: seller}
];

var router = new VueRouter({
  mode: 'history',
  linkActiveClass: 'active',
  routes: VueRoutes
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)  // 渲染视图到app组件
});

// // 打开的默认路径
router.push('/goods');
