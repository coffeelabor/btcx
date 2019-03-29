import Vue from 'vue'
import VueRouter from 'vue-router';
import BlockViewer from '../components/BlockViewer.vue'
import BlockViewPretty from "../components/views/BlockViewPretty.vue";
import BlockViewJson from "../components/views/BlockViewJson.vue";
import BlockViewHex from "../components/views/BlockViewHex.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    { 
      path: '/block/', component: BlockViewer,
      children: [
        {
          path: 'pretty/:hash?', component: BlockViewPretty, name: 'pretty', props: true
        },
        {
          path: 'json/:hash?', component: BlockViewJson, name: 'json', props: true
        },
        {
          path: 'hex/:hash?', component: BlockViewHex, name: 'hex', props: true
        },
        {
          path: '', redirect: '/block/pretty/'
        },
      ]
    },
    { path: '/', redirect: '/block/pretty/' },
    { path: '*', redirect: '/block/pretty/' },
  ]
})

function hasQueryParameters(route) {
  return route.params.hash != undefined;
}

router.beforeEach((to, from, next) => {
  //If a hash param has been provided, and the user is nagivating to a new route,
  //append the existing param to the new route
  if(to.name != from.name && !hasQueryParameters(to) && hasQueryParameters(from)) {
    var hash = from.params.hash;
    next({ name: to.name, params: { hash: hash } })
  } else {
    next();
  }
})

export default router