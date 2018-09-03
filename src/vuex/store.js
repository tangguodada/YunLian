import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state:{
    token:'',
    roles:'',
    image:'',
    realname:'',
    username:'',
    register_time:'',
    menu:[],
    MyUsers:[]
  },
})

