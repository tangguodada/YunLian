<template>
  <div>
    <div class="headBox">
      <firstheader></firstheader>
    </div>
    <div class="tabs">
      <el-tabs  v-model="activeName">
        <el-tab-pane label="基本资料" name="first"><showProfile></showProfile></el-tab-pane>
        <el-tab-pane label="编辑资料" name="second"><modifyProfile></modifyProfile></el-tab-pane>
        <el-tab-pane label="修改密码" name="third"><modifyPWD></modifyPWD></el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import firstheader from './firstHeader'
  import showProfile from './ShowProfile'
  import modifyProfile from './ModifyProfile'
  import modifyPWD from './ModifyPWD'
    export default {
        name: "personal",
        components:{
          'firstheader':firstheader,
          'showProfile':showProfile,
          'modifyProfile':modifyProfile,
          'modifyPWD':modifyPWD
      },
      data() {
        return {
          activeName: 'first'
        };
      },

    }
</script>

<style scoped>
  .headBox{
    height: 60px;
  }
  .tabs{
    width: 70%;
    margin-left: 15%;
    padding-top: 3%;
  }
</style>
