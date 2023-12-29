import Vue from 'vue'
import VueRouter from 'vue-router'
import UsersList from '@/views/UsersList.vue'
import UserPage from '@/views/UserPage.vue'

import AlbumsList from '@/components/AlbumsList.vue'
import PostsList from '@/components/PostsList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/', component: UsersList
  },
  {
    path: '/user/:id', name: 'user', component: UserPage, props: true
  },
  {
    path: '/album/:id', name: 'album', component: AlbumsList, props: true
  },
  {
    path: '/post/:id', name: 'post', component: PostsList, props: true
  },
]

const router = new VueRouter({
  mode: 'history',
  routes,
  base: '/first_vue_SPA/'
})

export default router
