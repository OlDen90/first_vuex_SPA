import Vue from 'vue'
import Vuex from 'vuex'
import post from './modules/post'
import album from './modules/album'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({

  modules: {
    post,
    album,
    user,
  },
})