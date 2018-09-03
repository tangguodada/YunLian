<template>
    <div class="firstHeader" id="firstHeader">
      <div class="header">
        <div class="firstheader">
          <div class="navLogo" @click="jumpToHome">
            <img src="../assets/yllogo.png" alt="" class="imglogo">
            &nbsp;&nbsp;<b style="font-size: 30px;position: absolute;top: 10px;">云联</b>
          </div>
          <div class="nav-right">
            <div class="modifymenu">
              <img v-show=showHeadImg v-bind:src="this.$store.state.image" class="personHead"/>
              <img src="../assets/photo_80.jpg" class="personHead" v-show=!showHeadImg />
              <ul class="submenu">
                <li @click="jumpToPerson">
                  <p>个人空间</p>
                </li>
                <li @click="jumpexit">
                  <p>注销登录</p>
                </li>
              </ul>
            </div>
          </div>
          </div>
        </div>
    </div>
</template>

<script>
    import router from '../router/index'
    import store from '../vuex/store'
    export default {
        name: "first-header",
        data() {
          return {
            showHeadImg:true,
          }
        },
        methods: {
          jumpToPerson() {
            router.push('/personal');
          },
          jumpexit(){
            sessionStorage.removeItem('token');
            store.state.token = '';
            this.$router.push('/login');
            this.$router.go(0);
          },
          jumpToHome(){
            this.$router.push('/product');
          }
        },
        created() {
          if(this.$store.state.image == null) {
            this.showHeadImg = false;
          }
        }
    }
</script>

<style scoped>
  *{
    margin: 0;
    padding: 0;
  }
  .firstHeader{
    position: absolute;
    z-index: 1;
    width: 100%;
  }
  .header {
    position: relative;
  }
  .firstheader{
    position: relative;
    height: 60px;
    width: 100%;
    background-color: #027cda;
    min-width: 1366px;
  }
  .navLogo{
    height: 100%;
    width: 230px;
    background-color: #008df6;
    cursor:pointer;
  }

  .imglogo{
    margin-top: 10px;
    margin-left: 50px;
    width: 40px;
    height: 40px;
    border-radius: 25%;
  }
  .nav-right{
    float: right;
    margin-top: -50px;
    margin-right: 20px;
  }
  .personHead{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 30px;
  }
  .modifymenu {
    list-style: none;
    padding: 0;
    margin: 0;
    min-width: 100px;
    display: block;
    float: left;
    position: relative;
    background: transparent;
    z-index: 999;
    top: 0;
  }

  .modifymenu p {
    color: #F0F0F0;
    display: block;
    font-size: 16px;
    line-height: 30px;
    padding: 0 20px;
    text-decoration: none;
    text-transform: uppercase;
  }

  /* onhover styles */
  .modifymenu:hover {
    color: #F5F5F5;

  }

  /* submenu styles */
  .submenu {
    margin-top: 5px;
    left: -25%;
    max-height: 0;
    position: absolute;
    top: 100%;
    z-index: 0;

    -webkit-perspective: 400px;
    -moz-perspective: 400px;
    -ms-perspective: 400px;
    -o-perspective: 400px;
    perspective: 400px;
  }

  .submenu li {
    background: #FFFFFF;
    list-style-type: none;
    opacity: 0;

    -webkit-transform: rotateY(90deg);
    -moz-transform: rotateY(90deg);
    -ms-transform: rotateY(90deg);
    -o-transform: rotateY(90deg);
    transform: rotateY(90deg);

    -webkit-transition: opacity .4s, -webkit-transform .5s;
    -moz-transition: opacity .4s, -moz-transform .5s;
    -ms-transition: opacity .4s, -ms-transform .5s;
    -o-transition: opacity .4s, -o-transform .5s;
    transition: opacity .4s, transform .5s;
  }

  .submenu li p {
    color: #909090;
    font-size: 14px;
  }

  .submenu li:hover {
    background: #ECECFF;
    border-radius: 3px;
    cursor: pointer;
  }

  .submenu li:hover p {
    color: #ACD0FF;
  }

  .modifymenu:hover .submenu li, .modifymenu:focus .submenu li {
    opacity: 1;

    -webkit-transform: none;
    -moz-transform: none;
    -ms-transform: none;
    -o-transform: none;
    transform: none;
  }
</style>
