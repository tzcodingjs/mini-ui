

import Vue from 'vue'
import App from './App'
import router from './router'

// 引入组件
import miniUi from '../packages/index.js'
Vue.use(miniUi)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
