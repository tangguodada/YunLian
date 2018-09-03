<template>
  <div id="home">
    <firstheader></firstheader>
    <div class="sidermenu">
      <div class="navmenu" v-for="(content,key) in menus" style="height: 50px;line-height: 50px">
        <span style="font-family:Comic Sans MS;font-size:14px;"><div class="menu-icon"></div></span>
        <router-link :to="content.path" :key="key">{{content.menu}}<br></router-link>
      </div>
    </div>
    <div class="ctn">
      <router-view/>
    </div>
  </div>
</template>

<script>
  import store from '../vuex/store'
  import router from "../router";
  import firstheader from './firstHeader'
  import '../../static/js/ClickMenu'
  // import '../../static/js/Scoll'
    export default {
      name: "home",
      data () {
        return {
          user:'user',
          menus:[],
        }
      },
      components:{
        'firstheader':firstheader
      },
      methods:{
        getParams(){
          this.menus = [].concat(store.state.menu);
        },
        getMyUser(){
          this.$axios.get("/users/getUsers").then(function (res) {
            store.state.MyUsers = [].concat(res.data.data);
          }.bind(this)).catch(function (error) {
            console.log(error);
          });
        }
      },
      mounted () {
        this.getParams();
        if (store.state.roles != 'ROLE_EMPLOYEE'){
          this.getMyUser();
        }
      }
    }
</script>

<style scoped>
  .sidermenu{
    width: 230px;
    height: 560px;
    background-color: rgb(42,45,52);
    position: absolute;
    top: 60px;
    float: left
  }
  .ctn{
    float: left;
    width: 1100px;
    /*background-color: yellow;*/
    height: 700px;
    position: absolute;
    top: 70px;
    left: 240px;
    z-index: -1;
  }
  a{
    font-size: 1.2em;
    text-decoration:none;
    color: white;
    margin-top: 13px;
    margin-left: 13px;
    /*vertical-align:middle;*/
  }
  .navmenu{
    text-align: center;
    cursor:pointer;
  }
  .navmenu:hover{
    background-color: rgb(100,109,127);
  }
  .navmenu a:hover{
    //color: white;
  }
  .current{
    text-align: center;
    background-color: rgb(100,109,127);
  }
  span{
    display: inline-block;
    margin-top: 15px;
  }
  .menu-icon{
    width: 20px;
    height: 3px;
    border-top: 3px solid white;
    border-bottom: 3px solid white;
    background-color: white;
    padding: 3px 0;
    background-clip:content-box;
  }
</style>
