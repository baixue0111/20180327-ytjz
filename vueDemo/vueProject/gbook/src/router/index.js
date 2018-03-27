import Vue from 'vue'
import Router from 'vue-router'
const home = r => require.ensure([], () => r(require('../page/home/home/home')), 'home')
const lhome = r => require.ensure([], () => r(require('../page/luckybuy/home/home')), 'lhome')
const lygzq = r => require.ensure([], () => r(require('../page/luckybuy/ygzq/ygzq')), 'lygzq')
const lzxjx = r => require.ensure([], () => r(require('../page/luckybuy/zxjx/zxjx')), 'lzxjx')
const lzxjxmore = r => require.ensure([], () => r(require('../page/luckybuy/zxjx/zxjxMore')), 'lzxjxmore')
const lmessagemore = r => require.ensure([], () => r(require('../page/luckybuy/messages/messagesMore')), 'lmessagemore')
const lprizeaffichemore = r => require.ensure([], () => r(require('../page/luckybuy/luckPrizeAffiche/luckPrizeAfficheMore')), 'lprizeaffichemore')
const lnewestannouncemore = r => require.ensure([], () => r(require('../page/luckybuy/newestAnnounce/newestAnnounceMore')), 'lnewestannouncemore')
const lhotrecommendationmore = r => require.ensure([], () => r(require('../page/luckybuy/hotRecommendation/hotRecommendationMore')), 'lhotrecommendationmore')
const lnewarrivalsmore = r => require.ensure([], () => r(require('../page/luckybuy/newArrivals/newArrivalsMore')), 'lnewarrivalsmore')
const lbasksharingmore = r => require.ensure([], () => r(require('../page/luckybuy/luckBaskSharing/luckBaskSharingMore')), 'lbasksharingmore')
const lbookdetail = r => require.ensure([], () => r(require('../page/luckybuy/book/bookDetail')), 'lbookdetail')
const lactivitybookdetail = r => require.ensure([], () => r(require('../page/luckybuy/activity/activityBookDetail')), 'lactivitybookdetail')
const lactivityypabookdetail = r => require.ensure([], () => r(require('../page/luckybuy/activity/activityYesPABookDetail')), 'lactivityypabookdetail')
const lmessagesDetail = r => require.ensure([], () => r(require('../page/luckybuy/messages/messagesDetail')), 'lmessagesDetail')
const user = r => require.ensure([], () => r(require('../page/user/user')), 'user')
const login = r => require.ensure([], () => r(require('../page/login/login')), 'login')
const lbasksharingdetail = r => require.ensure([], () => r(require('../page/luckybuy/luckBaskSharing/luckBaskSharingDetail')), 'lbasksharingdetail')


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/lhome'
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },    
    {
      path: '/lhome',
      name: 'lhome',
      component: lhome
    },    
    {
      path: '/lygzq',
      name: 'lygzq',
      component: lygzq
    },  
    {
      path: '/lzxjx',
      name: 'lzxjx',
      component: lzxjx
    },  
    {
      path: '/lzxjxmore',
      name: 'lzxjxmore',
      component: lzxjxmore
    },  
    {
      path: '/lmessagemore',
      name: 'lmessagemore',
      component: lmessagemore
    },
      {
      path: '/lmessagesDetail',
      name: 'lmessagesDetail',
      component: lmessagesDetail
    },
    {
      path: '/lprizeaffichemore',
      name: 'lprizeaffichemore',
      component: lprizeaffichemore
    },
    {
      path: '/lnewestannouncemore',
      name: 'lnewestannouncemore',
      component: lnewestannouncemore
    },
    {
      path: '/lhotrecommendationmore',
      name: 'lhotrecommendationmore',
      component: lhotrecommendationmore
    },
    {
      path: '/lnewarrivalsmore',
      name: 'lnewarrivalsmore',
      component: lnewarrivalsmore
    },
    {
      path: '/lbasksharingmore',
      name: 'lbasksharingmore',
      component: lbasksharingmore
    },
    {
      path: '/lbasksharingdetail',
      name: 'lbasksharingdetail',
      component: lbasksharingdetail
    },
    {
      path: '/lbookdetail',
      name: 'lbookdetail',
      component: lbookdetail
    },
    {
      path: '/lactivitybookdetail',
      name: 'lactivitybookdetail',
      component: lactivitybookdetail
    },
    {
      path: '/lactivityypabookdetail',
      name: 'lactivityypabookdetail',
      component: lactivityypabookdetail
    },
    {
      path: '/user',
      name: 'user',
      component: user
    },
    {
      path: '/login',
      component: login
    },

  ]
})
