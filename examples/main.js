

import Vue from 'vue'
import App from './App'
import router from './router'

// 引入组件
import MiniUi from '../packages/index.js'
Vue.use(MiniUi)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
