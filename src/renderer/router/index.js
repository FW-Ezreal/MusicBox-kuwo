import Vue from 'vue'
import Router from 'vue-router'
import Index from '../views/index'
import Playlist_detail from '@/views/playlist_detail'
import Artist from '@/views/artist'
import Album from '@/views/album'
import searchPage from '@/views/searchPage'
import bangDetial from '@/views/bang_detial'
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
        },
        {
          path: 'playlist_detail/:id',
          name: 'playlist_detail',
          component: Playlist_detail
        },
        {
          path: 'artist/:id',
          name: 'artist',
          component: Artist
        },
        {
          path: 'album/:id',
          name: 'album',
          component: Album
        },
        {
          path: 'searchPage/:key',
          name: 'searchPage',
          component: searchPage
        },
        {
          path: 'bangDetial',
          name: 'bangDetial',
          component: bangDetial
        }
      ]
    }

  ]
})
