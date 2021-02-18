import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap-css-only/css/bootstrap.min.css'
import 'mdbvue/lib/css/mdb.min.css'
import Vue from 'vue'
import App from './App.vue'
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css' //Vuesax styles
import router from "./router";
import store from './store'

Vue.config.productionTip = false

Vue.use(Vuesax, {
  // options here
})

new Vue({
  router,
  store,
  beforeCreate() { this.$store.commit('initialiseStore');},
  render: h => h(App),
}).$mount('#app')
