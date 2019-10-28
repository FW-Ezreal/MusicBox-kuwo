import './base.less'
import Vue from 'vue';
import VueLazyload from 'vue-lazyload';

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: require('../assets/def270.png'),
  loading: require('../assets/def270.png'),
  attempt: 1
});
