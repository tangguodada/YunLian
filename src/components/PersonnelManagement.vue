<template>
  <div>
    <div>
      <el-button icon="el-icon-plus" type="primary" size="small"
                 @click="addNewPerson= true"> 新添客户</el-button>
    </div>

    <el-dialog title="新增客户"
               :visible.sync="addNewPerson"
               :modal-append-to-body="false"
               width="35%">
      <el-form  :model="addUser" class="modelBody">
        <el-form-item label="用户名">
          <el-input v-model="addUser.username" > </el-input>
        </el-form-item>
        <el-form-item label="真名">
          <el-input v-model="addUser.realname"> </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addNewPerson = false">取 消</el-button>
        <el-button type="primary" @click="comfirmAdd">确 定</el-button>
      </div>
    </el-dialog>

    <el-table
      :data="personList"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="分类">
              <span>{{ props.row.category }}</span>
            </el-form-item>
            <el-form-item label="部门">
              <span>{{ props.row.department }}</span>
            </el-form-item>
            <el-form-item label="设备数">
              <span>{{ props.row.deviceCount }}</span>
            </el-form-item>
            <el-form-item label="旗下客户数" >
              <span>{{ props.row.userCount }}</span>
            </el-form-item>
            <el-form-item label="户籍">
              <span>{{ props.row.area+ ' ' +props.row.province+ ' ' +props.row.city+ ' ' +props.row.country }}</span>
            </el-form-item>
            <el-form-item label="地址">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="电话">
              <span>{{ props.row.tel }}</span>
            </el-form-item>
            <el-form-item label="邮箱">
              <span>{{ props.row.email }}</span>
            </el-form-item>
            <el-form-item label="爱好">
              <span>{{ props.row.hobby }}</span>
            </el-form-item>
            <el-form-item label="签名">
              <span>{{ props.row.sign }}</span>
            </el-form-item>
            <el-form-item >
                <template>
                  <el-table
                    :data="props.row.pounds"
                    height="200">
                    <el-table-column
                      prop="id"
                      label="塘口编号">
                    </el-table-column>
                    <el-table-column
                      prop="type"
                      label="类型">
                    </el-table-column>
                    <el-table-column
                      prop="length"
                      label="长度">
                    </el-table-column>
                    <el-table-column
                      prop="width"
                      label="宽度">
                    </el-table-column>
                    <el-table-column
                      prop="depth"
                      label="深度">
                    </el-table-column>
                  </el-table>
                </template>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column width="80">
        <template slot-scope="props">
          <img v-if="props.row.image!=null" :src=props.row.image class="imageBox">
          <img src="../assets/photo_80.jpg" class="avatar imageBox" v-else >
        </template>
      </el-table-column>
      <el-table-column
        label="编号"
        prop="id">
      </el-table-column>
      <el-table-column
        label="用户名"
        prop="username">
      </el-table-column>
      <el-table-column
        label="真名"
        prop="realname">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
    export default {
        name: "personnel-management",
      data() {
        return {
          personList: [],
          addNewPerson:false,
          addUser:{},
        }
      },
      methods: {
          comfirmAdd() {
            this.$axios.post('/register/user',{
              username:this.addUser.username,
              realname:this.addUser.realname
            })
              .then(function (res) {
                if(res.data.code == 1) {
                  this.getUsers();
                  this.addNewPerson = false;
                  this.addUser.username = '';
                  this.addUser.realname = '';
                }
                else if(res.data.code == 20005) {
                  this.$message({
                    message: '该用户已存在啦！',
                    type: 'error'
                  });
                }
              }.bind(this))
              .catch(function (error) {
                console.log(error);
              });
          },
          getUsers() {
            this.$axios.get('/users/getUsers')
              .then(function (res) {
                if(res.data.code == 1) {
                  this.personList = res.data.data;
                }
              }.bind(this))
              .catch(function (error) {
                console.log(error);
              });
          }
      },
      created() {
        this.getUsers();
      }
    }
</script>

<style scoped>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .imageBox {
    width: 40px;
    height: 40px;
    border-radius: 50px;
  }
  .modelBody{
    margin-left: 25%;
    width: 50%;
  }
</style>
