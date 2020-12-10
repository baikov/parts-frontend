import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'

// export const HTTP = axios.create({
//   baseURL: 'http://127.0.0.1:8000/api/parts/'
// })

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
