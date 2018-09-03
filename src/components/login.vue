<template>
  <div id="login">
    <div class="topDiv">
      <div class="center-container">
        <!-- top_header_agile_info_w3ls -->
        <div class="top_header_agile_info_w3ls">
          <nav class="navbar navbar-default">
            <div class="navbar-header navbar-left">
              <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </button>
              <h1><a class="navbar-brand" href="#"><span>Y</span>un lian</a></h1>
            </div>
            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse navbar-right" id="bs-example-navbar-collapse-1">
              <div class="w3l_header_left">
                <ul>
                  <li><a class="sign" href="#" data-toggle="modal" data-target="#myModal2"><i class="fa fa-user" aria-hidden="true"></i></a>										</li>

                  <li><i class="fa fa-phone" aria-hidden="true"></i> +(010) 221 918 811</li>
                  <li><i class="fa fa-envelope-o" aria-hidden="true"></i> <a href="mailto:info@example.com">info@example.com</a></li>
                </ul>
              </div>
              <div class="clearfix"> </div>
            </div>
          </nav>
        </div>

        <!--// top_header_agile_info_w3ls -->
        <!--/slider-->
        <div class="banner_wthree_agile_info">
          <div class="slider">
            <div class="callbacks_container">
              <ul class="rslides callbacks callbacks1" id="slider4">
                <li>
                  <div class="agileits-banner-info">
                    <h4>Star To day</h4>
                    <h3>Real fish</h3>
                    <p>Fresh Cream</p>
                    <div class="more">
                      <a href="#" class="hvr-shutter-in-vertical"> Read More<span class="glyphicon glyphicon-arrow-right"></span></a>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="agileits-banner-info">
                    <h4>Star To day</h4>
                    <h3>Sweet Cream</h3>
                    <p>Fresh Milk</p>
                    <div class="more">
                      <a href="#" class="hvr-shutter-in-vertical">Read More <span class="glyphicon glyphicon-arrow-right"></span></a>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="agileits-banner-info">
                    <h4>Star To day</h4>
                    <h3>Real Taste</h3>
                    <p>Fresh Cream</p>
                    <div class="more">
                      <a href="#" class="hvr-shutter-in-vertical">Read More <span class="glyphicon glyphicon-arrow-right"></span></a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!--//slider-->
      </div>
    </div>
    <!-- //banner -->
    <!-- Modal1 -->
    <div class="modal fade" id="myModal2" tabindex="-1" role="dialog">
      <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>

            <div class="signin-form profile">
              <h3 class="agileinfo_sign">登录</h3>
              <div class="login-form">
                <form action="#" method="post">
                  <el-input v-model="username" placeholder="账号" style="width: 300px"></el-input>
                  <el-input type="password" v-model="password" placeholder="密码" style="width: 300px;margin-top: 20px"></el-input>
                  <div class="tp">
                    <el-button @click="Login" style="margin-top: 20px;width: 100px;height:30px;font-size: 1.1em">立即登录</el-button>
                  </div>
                </form>
              </div>
              <p><a id="noaccount" href="#" data-toggle="modal" data-target="#myModal3"> 没有帐户?</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- //Modal1 -->
    <!-- Modal2 -->
    <div class="modal fade" id="myModal3" tabindex="-1" role="dialog">
      <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
          <div class="modal-header">
            <button id="closebtn" type="button" class="close" data-dismiss="modal">&times;</button>
            <div class="signin-form profile">
              <h3 class="agileinfo_sign">注册</h3>
              <div class="login-form">
                <form action="javascript:">
                  <input type="text" name="name" placeholder="用户名" required="" v-model="registerusername">
                  <!--<input type="email" name="email" placeholder="Email" required="">-->
                  <input type="password" name="password" placeholder="密码" required="" v-model="registerpasswd1">
                  <input type="password" name="password" placeholder="确认密码" required="" v-model="registerpasswd2">
                  <input type="text" name="name" placeholder="真名" required="" v-model="registerrealname">
                  <input type="submit" value="注册" @click="regist">
                </form>
              </div>
              <p><a href="#"> 返回登录</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- //Modal2 -->

    <!-- banner-bottom -->
    <div class="banner-bottom">
      <div class="container">
        <div class="col-md-7 banner_bottom_left">
          <h2 class="title-w3-agileits one">Welcome To Yun Lian!</h2>
          <p><i>Fresh and Local Delivered </i> Quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex
            ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur,
            vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.</p>

        </div>
        <div class="col-md-5 banner_bottom_right">
          <div class="img_agile">
            <img src="../assets/ab.jpg" class="img-responsive" alt="" />
          </div>
        </div>
        <div class="clearfix"> </div>
        <div class="banner_bottom_agile_grids">
          <div class="wthree_banner_bottom_right_grids">
            <div class="col-md-3 banner_bottom_right_grid">
              <div class="view view-tenth">
                <div class="agile_text_box">
                  <i class="fa fa-eye" aria-hidden="true"></i>
                  <h3>Our Dairy Farm</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adip.</p>
                </div>
                <div class="mask">
                  <img src="../assets/a1.jpg" class="img-responsive" alt="" />
                </div>
              </div>
            </div>
            <div class="col-md-3 banner_bottom_right_grid">
              <div class="view view-tenth">
                <div class="agile_text_box">
                  <i class="fa fa-building-o" aria-hidden="true"></i>
                  <h3>Meet Our Cows</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adip.</p>
                </div>
                <div class="mask">
                  <img src="../assets/a2.jpg" class="img-responsive" alt="" />
                </div>
              </div>
            </div>

            <div class="col-md-3 banner_bottom_right_grid">
              <div class="view view-tenth">
                <div class="agile_text_box">
                  <i class="fa fa-eraser" aria-hidden="true"></i>
                  <h3>High quality </h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adip.</p>
                </div>
                <div class="mask">
                  <img src="../assets/a3.jpg" class="img-responsive" alt="" />
                </div>
              </div>
            </div>
            <div class="col-md-3 banner_bottom_right_grid">
              <div class="view view-tenth">
                <div class="agile_text_box">
                  <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                  <h3>Meet Our Cows</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adip.</p>
                </div>
                <div class="mask">
                  <img src="../assets/a4.jpg" class="img-responsive" alt="" />
                </div>
              </div>
            </div>
            <div class="clearfix"> </div>
          </div>
          <div class="clearfix"> </div>
        </div>
      </div>
    </div>
    <!-- footer -->
    <div class="footer">
      <div class="container">
        <div class="w3agile_footer_grid">
          <h3>About Us</h3>
          <p>Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus.
          </p>
          <div class="agileinfo_copy_right_left" style="margin-top: 20px">
            <p>Copyright &copy; 2017.Company name YunLian.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../vuex/store";
import {route,dynamicRouter} from '../router/index'

export default {
  name: 'login',
  data () {
    return {
      username: '',
      password: '',
      registerusername:'',
      registerpasswd1:'',
      registerpasswd2:'',
      registerrealname:''
    }
  },
  methods:{
    Login(){
      if (!this.username || !this.password){
        this.$message.error('账号或密码不能为空！');
        return;
      }
      this.$axios.post("/auth", {
        'username': this.username,
        'password': this.password
      }).then(function (res) {
        if (res.data.msg == '成功') {
          console.log(res.data.data);
          sessionStorage.setItem('token', res.data.data.token);
          sessionStorage.setItem('roles', res.data.data.role);
          sessionStorage.setItem('image', res.data.data.image);
          sessionStorage.setItem('realname', res.data.data.realname);
          sessionStorage.setItem('username', res.data.data.username);
          sessionStorage.setItem('register_time',res.data.data.register_time);
          store.state.roles = res.data.data.role;
          store.state.token = res.data.data.token;
          store.state.image = res.data.data.image;
          store.state.realname = res.data.data.realname;
          store.state.username = res.data.data.username;

          let dR = new Array();
          let menus = new Array();
          for (let i = 0; i < dynamicRouter.length; i++) {
            for (let j = 0; j < dynamicRouter[i].meta.roles.length; j++) {
              if (dynamicRouter[i].meta.roles[j] == res.data.data.role) {
                dR.push(dynamicRouter[i]);
                if (dynamicRouter[i].children) {
                  for (let m = 0; m < dynamicRouter[i].children.length; m++) {
                    if (dynamicRouter[i].children[m].meta.menu) {
                      let mr = new Object();
                      mr.menu = dynamicRouter[i].children[m].meta.menu;
                      mr.path = '/' + dynamicRouter[i].children[m].path;
                      menus.push(mr);
                      store.state.menu = [].concat(menus);
                    }
                  }
                }
              }
            }
          }
          this.$message({
            message: this.username+',欢迎登陆！',
            type: 'success'
          });
          this.$router.addRoutes(dR.concat([{
            path: '*',
            redirect: '/404'
          }]));
          this.$router.push('/product');
        } else {
          this.$message.error('账号或密码错误');
        }

      }.bind(this)).catch(function (error) {
        console.log(error);
      });
    },
    regist(){
      if (!this.registerpasswd1 || !this.registerpasswd2 || !this.registerusername) {
        this.$message.error('请把消息填写完整！');
        return;
      }
      if (this.registerpasswd1 != this.registerpasswd2) {
        this.$message.error('两次密码不同');
        return;
      }
      this.$axios.post("/auth/register", {
        'username': this.registerusername,
        'password': this.registerpasswd1,
        'realname': this.registerrealname,
      }).then(function (res) {
        console.log(res.data);
        if (!res.data.data) {
          this.$message.error(res.data.msg);
        } else {
          this.$message({
            message: '注册成功',
            type: 'success'
          });
          $('#closebtn').click();
        }
      }.bind(this)).catch(function (error) {
        console.log(error);
        this.$message.error('密码格式不对');
      });
    }
  },
  created(){
    sessionStorage.clear();
  }
}
</script>

<style scoped>
  @import '../assets/css/bootstrap.css';
  @import '../assets/css/font-awesome.css';
  @import '../assets/css/style.css';
  .topDiv{
    background-image: url("../assets/farm.jpg");
  }
  #noaccount:hover{
    color: red;
  }
</style>

