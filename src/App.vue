<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import store from './vuex/store'
  import {router,dynamicRouter} from './router/index'

export default {
  name: 'App',
  data(){
    return {
      menus:[]
    }
  },
  methods:{
    judgeLogin(){
      let isLogin = sessionStorage.getItem('token');
      if(!isLogin){
        return this.$router.push('/login');
      } else {
        store.state.token = sessionStorage.getItem('token');
        store.state.roles = sessionStorage.getItem('roles');
        store.state.image = sessionStorage.getItem('image');
        store.state.realname = sessionStorage.getItem('realname');
        store.state.username = sessionStorage.getItem('username');
        let dR = new Array();
        for (let i=0;i<dynamicRouter.length;i++){
          for (let j=0;j<dynamicRouter[i].meta.roles.length;j++){
            if (dynamicRouter[i].meta.roles[j] == store.state.roles){
              // if (dynamicRouter[i].meta.menu) {
              //   let mr = new Object();
              //   mr.menu = dynamicRouter[i].meta.menu;
              //   mr.path = dynamicRouter[i].path;
              //   this.menus.push(mr);
              //   store.state.menu = [].concat(this.menus);
              // }
              dR.push(dynamicRouter[i]);
              if (dynamicRouter[i].children) {
                for (let m=0;m<dynamicRouter[i].children.length;m++){
                  console.log(dynamicRouter[i].children[m]);
                  if (dynamicRouter[i].children[m].meta.menu){
                    let mr = new Object();
                    mr.menu = dynamicRouter[i].children[m].meta.menu;
                    mr.path = '/'+ dynamicRouter[i].children[m].path;
                    this.menus.push(mr);
                    store.state.menu = [].concat(this.menus);
                  }
                }
              }
            }
          }
        }

        this.$axios.get("/users/getUsers").then(function (res) {
          store.state.MyUsers = [].concat(res.data.data);
        }.bind(this)).catch(function (error) {
          console.log(error);
        });

        console.log(dR);
        this.$router.addRoutes(dR);
      }
    }
  },
  created() {
     this.judgeLogin();
  }
}
</script>

<style>
</style>
