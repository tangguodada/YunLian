<template>
  <div class="contianBox">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="原密码" prop="oldPass">
        <el-input type="password" v-model="ruleForm.oldPass" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="elBtn" type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button class="elBtn" @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
    export default {
        name: "modify-PWD",
      data() {
        var validatePass = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入密码'));
          } else {
            if (this.ruleForm.checkPass !== '') {
              this.$refs.ruleForm.validateField('checkPass');
            }
            callback();
          }
        };
        var validatePass2 = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请再次输入密码'));
          } else if (value !== this.ruleForm.pass) {
            callback(new Error('两次输入密码不一致!'));
          } else {
            callback();
          }
        };
        return {
          ruleForm: {
            oldPass: '',
            pass: '',
            checkPass: '',
          },
          rules: {
            pass: [
              { validator: validatePass, trigger: 'blur' },
              { min:6, message:'密码长度应大于等于6 ',trigger: 'blur' }
            ],
            checkPass: [
              { validator: validatePass2, trigger: 'blur' }
            ],
          }
        };
      },
      methods: {
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.$axios.put('/users/password?oldPassword='+this.ruleForm.oldPass+'&newPassword='+this.ruleForm.pass)
                .then(function (res) {
                  if(res.data.msg == '密码输入错误') {
                    this.$message({
                      showClose: true,
                      message: '原密码输入错误！',
                      type: 'error'
                    });
                  } else {
                    this.$message({
                      showClose: true,
                      message: '密码修改成功，请重新登录！',
                      type: 'success'
                    });
                    this.$router.push('/login');
                  }
                }.bind(this))
                .catch(function (error) {
                  console.log(error);
                });
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
        }
      }
    }
</script>

<style scoped>
.contianBox {
  margin-top: 50px;
  width: 40%;
  margin-left: 25%;
}
.elBtn {
  margin-left: 30px;
  margin-top: 40px;
}
</style>
