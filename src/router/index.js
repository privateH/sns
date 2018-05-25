import Vue from 'vue'
import Router from 'vue-router'
import login from '@/views/login/login';
import register from '@/views/register/register';
import home from '@/views/home/home';
import mainPage from '@/views/home/mainPage/mainPage.vue';
import myHome from '@/views/home/myHome/myHome.vue';
import aboutMe from '@/views/home/aboutMe/aboutMe.vue';
import helpInfo from '@/views/home/helpInfo/helpInfo.vue';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      children: [{
          path: '/home',
          redirect: '/home/mainPage'
        },
        {
          path: '/home/mainPage',
          name: 'mainPage',
          component: mainPage
        },
        {
          path: '/home/myHome',
          name: 'myHome',
          component: myHome
        },
        {
          path: '/home/aboutMe',
          name: 'aboutMe',
          component: aboutMe
        },
        {
          path: '/home/helpInfo',
          name: 'helpInfo',
          component: helpInfo
        }
      ]
    }
  ]
})
