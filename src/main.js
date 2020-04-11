import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import fastClick from 'fastclick'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import axios from 'axios'
import 'styles/border.css'
import 'styles/reset.css'
import 'styles/iconfont.css'
import 'styles/icon.css'
import 'styles/iconfont.js'
import 'swiper/css/swiper.css'
import VueRouter from 'vue-router'
Vue.config.productionTip = false
fastClick.attach(document.body)
Vue.use(VueAwesomeSwiper)
Vue.use(VueRouter)
Vue.config.devtools = true
// axios.defaults.baseURL = '/api' // 配合 proxyTable配置实现跨于请求的前端解决方案
axios.defaults.baseURL = 'http://localhost:8081'
axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
Vue.prototype.$axios = axios
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
