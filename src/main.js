import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import VueTippy from "vue-tippy"

Vue.use(VueTippy, {
  interactive: false,
  arrow: true,
  arrowTransform: "scale(1.5)",
  trigger: "click",
  placement: "bottom",
  theme: "btc"
});

window.EventBus = new Vue({name : "event-bus"})

Vue.use(BootstrapVue)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
