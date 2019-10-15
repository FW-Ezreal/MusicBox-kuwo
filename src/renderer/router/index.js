import Vue from 'vue'
import Router from 'vue-router'
import Index from '../views/index/index.vue';
// console.log('Index: ', Index);

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: {name: 'musicLibrary'},
      component: require('@/views/main').default,
      children: [
        {
          path: 'musicLibrary',
          name: 'musicLibrary',
          component: Index
        }
      ]
    },
  ]
})
