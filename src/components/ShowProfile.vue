<template>
    <div>
      <el-row>
        <el-col :span="6" class="headImgBox">
          <img v-show=showHeadImg v-bind:src="this.$store.state.image" />
          <img src="../assets/photo_80.jpg" v-show=!showHeadImg />
        </el-col>
        <el-col :span="12" :offset="1">
          <div class="userBox" ><p>{{username}}<span>{{role}}</span></p></div>
          <div class="line"></div>
          <div>
            <p class="infoBox">真名: <span>{{realname}}</span> </p>
            <p class="infoBox">注册时间: <span>{{register_time}}</span> </p>
          </div>
        </el-col>
      </el-row>
    </div>
</template>

<script>
    export default {
        name: "show-profile",
        data() {
          return {
            showHeadImg:true,
            username:sessionStorage.getItem('username'),
            role:sessionStorage.getItem('roles'),
            realname:sessionStorage.getItem('realname'),
            register_time:sessionStorage.getItem('register_time'),
            }
        },
        created() {
          if (this.$store.state.image == null) {
            this.showHeadImg = false;
          }
        },
      watch :{

      }
    }
</script>

<style scoped>
  .headImgBox {
    margin-top: 30px;
    padding-left: 15px;
  }
  .headImgBox img{
    height: 188px;
    width: 188px;
    border: 1px solid #808080;
  }
  .userBox p {
    font-size: 30px;
    line-height: 30px;
  }
  .userBox span {
    font-size: 10px;
    line-height: 20px;
    color: #808080;
    margin-left: 5%;
  }
  .line {
    margin: 5px 0;
    height: 1px;
    width: 100%;
    background: rgba(128, 128, 128, 0.33);
  }
  .infoBox {
    color: rgba(40, 40, 40, 0.8);
    margin-top: 30px;
  }
  .infoBox span {
    color: black;
  }
</style>
