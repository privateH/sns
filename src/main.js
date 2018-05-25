// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import "./css/common.css";
import "font-awesome/css/font-awesome.min.css";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import Axios from "axios";
import VueCookie from "vue-cookie";

Vue.use(ElementUI);
Vue.use(VueCookie);

Vue.config.productionTip = false;
Vue.prototype.$http = Axios;
// Vue.prototype.server = "/GAMarketSupervise/";

//事件总线
var bus = new Vue();
Vue.prototype.$bus = bus;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  components: {
    App
  }
})
