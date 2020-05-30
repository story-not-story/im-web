import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import fastClick from 'fastclick'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import axios from 'axios'
import qs from 'qs'
import 'styles/border.css'
import 'styles/reset.css'
import 'styles/iconfont.css'
import 'styles/icon.css'
import 'styles/iconfont.js'
import 'swiper/css/swiper.css'
import VueRouter from 'vue-router'
import ws from './ws.js'
import VueClipboard from 'vue-clipboard2'

Vue.use(VueClipboard)
Vue.config.productionTip = false
fastClick.attach(document.body)
Vue.use(VueAwesomeSwiper)
Vue.use(VueRouter)
Vue.config.devtools = true
axios.defaults.baseURL = '/api' // 配合 proxyTable配置实现跨域请求的前端解决方案
// axios.defaults.baseURL = 'http://localhost:8081'
axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded'
axios.interceptors.request.use(function (config) {
  if (config.headers['Content-Type'] !== 'multipart/form-data' && (config.method === 'post' || config.method === 'put')) {
    config.data = qs.stringify({ ...config.data })
  }
  return config
}, function (error) {
  return Promise.reject(error)
})
Vue.prototype.$axios = axios
Vue.prototype.$ws = ws
Vue.prototype.$imgurl = function (avatar) {
  if (avatar) {
    return this.$axios.defaults.baseURL + '/img/' + avatar
  }
}
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
