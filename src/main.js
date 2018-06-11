// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Element from 'element-ui'
import http from '../utils/http.js'
Vue.use(http)
import store from '../store'
import 'element-ui/lib/theme-chalk/index.css';
// import axios from 'axios'
// Vue.prototype.$http = axios
Vue.use(Element)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
