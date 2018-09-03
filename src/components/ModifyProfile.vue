<template>
  <el-row class="conBox">
    <el-col :span="5" :offset="1">
      <el-upload
        class="avatar-uploader"
        action="http://223.2.197.240:8089/users/image"
        :headers="header"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl!='null'" :src="imageUrl" class="avatar">
        <img src="../assets/photo_80.jpg" class="avatar" v-else>
      </el-upload>
    </el-col>
    <el-col :span="10" :offset="2">
      <el-form ref="form" :model="form" label-width="80px" >
        <el-form-item label="真名">
          <el-input v-model="form.realname"></el-input>
        </el-form-item>
        <el-form-item label="部门">
          <el-input v-model="form.department"></el-input>
        </el-form-item>
        <el-form-item label="省份">
          <el-input v-model="form.province"></el-input>
        </el-form-item>
        <el-form-item label="城市">
          <el-input v-model="form.city"></el-input>
        </el-form-item>
        <el-form-item label="地区">
          <el-input v-model="form.country"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="form.tel"></el-input>
        </el-form-item>
        <el-form-item label="收入">
          <input class="incomeBox" type="number" v-model.number="form.income">
        </el-form-item>
        <el-form-item label="地域">
          <el-input v-model="form.area"></el-input>
        </el-form-item>
        <el-form-item label="分类">
          <el-input v-model="form.category"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email"> </el-input>
        </el-form-item>
        <el-form-item label="爱好">
          <el-input v-model="form.category"></el-input>
        </el-form-item>
        <el-form-item label="个人简介">
          <el-input type="textarea" v-model="form.sign"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" class="submitBtn">修改</el-button>
        </el-form-item>
      </el-form>
    </el-col>

  </el-row>
</template>

<script>
    import ElRow from "element-ui/packages/row/src/row";

    export default {
      components: {ElRow},
      name: "modify-profile",
      data() {
        return {
          header: {
            Authorization: "Bearer "+sessionStorage.getItem('token'),
          },
          imageUrl:sessionStorage.getItem('image'),
          username:sessionStorage.getItem('username'),
          form:{},
        };
      },
      methods: {
        handleAvatarSuccess(res, file) {
          this.imageUrl = URL.createObjectURL(file.raw);
          sessionStorage.setItem('image',file.response.data.image);
          this.$store.state.image = file.response.data.image;
        },
        beforeAvatarUpload(file) {
          const isJPG = file.type === 'image/jpeg';
          const isLt3M = file.size / 1024 / 1024 < 3;

          if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
          }
          if (!isLt3M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
          }
          return isJPG && isLt3M;
        },
        onSubmit() {
          this.$axios.put('/users/', {
              realname: this.form.realname,
              department: this.form.department,
              province: this.form.province,
              city: this.form.city,
              country: this.form.country,
              address: this.form.address,
              tel: this.form.tel,
              income: this.form.income,
              area: this.form.area,
              category: this.form.category,
              email: this.form.email,
              hobby: this.form.hobby,
              sign: this.form.sign,
          })
            .then(function (res) {
              this.form = res.data.data;
              this.form.qr_code = sessionStorage.getItem('qrCode');
              this.$message({
                showClose: true,
                message: '资料修改成功！',
                type: 'success'
              });
            }.bind(this))
            .catch(function (error) {
              console.log(error);
            });
        }
      },
      created() {
        this.$axios.get('/users/'+this.username)
          .then(function (res) {
            this.form = res.data.data;
            this.form.qr_code = sessionStorage.getItem('qrCode');
          }.bind(this))
          .catch(function (error) {
            console.log(error);
          });
      }
    }
</script>

<style scoped>
  /* chrome */
  input[type=number]::-webkit-outer-spin-button,
  input[type=number]::-webkit-inner-spin-button{
    -webkit-appearance: none!important;
    margin: 0;
  }
  /* Firefox */
  input[type=number]{
    -moz-appearance: textfield;
  }

  .conBox {
    margin-top: 30px;
    height:100%;
  }
  .avatar-uploader .el-upload img{
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload img:hover {
    border-color: #409EFF;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .incomeBox {
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: 0;
    padding: 0 15px;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 100%;
  }
  .submitBtn {
    margin-top: 45px;
    width: 160px;
    margin-left: 50px;
  }
</style>
