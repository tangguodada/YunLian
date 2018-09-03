<template>
  <div id="tangkou">
    <!--新增塘口-->
    <el-button v-has="manager" type="text" @click="dialogFormVisible = true" style="color: green;font-size: 1.5em;margin-left: 50px">+</el-button>
    <!--根据养殖户筛选塘口-->
    <label v-has="manager" style="margin-left: 500px">请选择养殖户</label>
    <select v-has="manager" id="sluser" class="el-input__inner" style="width: 200px" v-model="selecteduser" @change="selectTangkou"></select>
    <!--删除该养殖户所有塘口-->
    <el-button v-has="manager" type="danger" @click="deleteall" style="background-color: red;color: white;margin-left: 40px" size="small">一键删除</el-button>
    <!--新增塘口模态框-->
    <el-dialog title="新增塘口" :visible.sync="dialogFormVisible" :modal-append-to-body="false">
      <el-form :model="form">
        <el-form-item label="数量" :label-width="formLabelWidth">
          <el-input v-model="form.number" auto-complete="off" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="类型" :label-width="formLabelWidth">
          <el-input v-model="form.type" auto-complete="off" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="单位" :label-width="formLabelWidth">
          <el-select v-model="form.unit" placeholder="请选择面积单位">
            <el-option label="平方米" value="平方米"></el-option>
            <el-option label="亩" value="亩"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="养殖户" :label-width="formLabelWidth">
          <select id="addsl" class="el-input__inner" style="width: 200px" v-model="form.username" @focus="addsluser" @change="addsluser">
          </select>
        </el-form-item>
        <el-form-item label="省" :label-width="formLabelWidth">
          <el-input v-model="form.province" auto-complete="off" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="市" :label-width="formLabelWidth">
          <el-input v-model="form.city" auto-complete="off" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="县" :label-width="formLabelWidth">
          <el-input v-model="form.country" auto-complete="off" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth">
          <el-input v-model="form.address" auto-complete="off" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="长度" :label-width="formLabelWidth">
          <el-input v-model="form.length" auto-complete="off" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="宽度" :label-width="formLabelWidth">
          <el-input v-model="form.width" auto-complete="off" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="深度" :label-width="formLabelWidth">
          <el-input v-model="form.depth" auto-complete="off" style="width: 200px"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addTangkou();dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>

    <!--塘口列表-->
    <el-table
      :data="tklist"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="养殖户：">
              <span>{{ props.row.username }}</span>
            </el-form-item>
            <el-form-item label="数量：">
              <span>{{ props.row.number }}</span>
            </el-form-item>
            <el-form-item label="面积：">
              <span>{{ props.row.square }}{{props.row.unit}}</span>
            </el-form-item>
            <el-form-item label="地址：">
              <span>{{ props.row.province }}-{{props.row.city}}-{{props.row.country}}-{{props.row.address}}</span>
            </el-form-item>
            <el-form-item label="经销商：">
              <span>{{ props.row.fromUser }}</span>
            </el-form-item>
            <el-form-item label="查看： " v-if=flag1>
              <el-button size="mini"><router-link :to="{name: 'medicine',query:{id: props.row.id}}">药品管理</router-link></el-button>
              <el-button size="mini"><router-link :to="{name: 'shuizhi',query:{id: props.row.id}}">水质管理</router-link></el-button>
              <el-button size="mini"><router-link :to="{name: 'touwei',query:{id: props.row.id}}">投喂管理</router-link></el-button>
              <el-button size="mini">设备管理</el-button>
              <el-button size="mini">种苗管理</el-button>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="塘口 ID"
        prop="id">
      </el-table-column>
      <el-table-column
        label="塘口类型"
        prop="type">
      </el-table-column>
      <el-table-column
        label="时间"
        prop="time">
      </el-table-column>
      <el-table-column label="操作" v-if=flag1>
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.row);dialogFormVisible1 = true">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--更新塘口模态框-->
    <el-dialog title="更新塘口" :visible.sync="dialogFormVisible1" :modal-append-to-body="false">
      <el-form :model="upform">
        <el-form-item label="数量" :label-width="formLabelWidth">
          <el-input v-model="upform.number" auto-complete="off" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="类型" :label-width="formLabelWidth">
          <el-input v-model="upform.type" auto-complete="off" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="单位" :label-width="formLabelWidth">
          <el-select v-model="upform.unit" placeholder="请选择面积单位">
            <el-option label="平方米" value="平方米"></el-option>
            <el-option label="亩" value="亩"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="养殖户" :label-width="formLabelWidth">
          <select id="upsl" class="el-input__inner" style="width: 200px" v-model="upform.username" @focus="upsluser">
            <option>{{upform.username}}</option>
          </select>
        </el-form-item>
        <el-form-item label="省" :label-width="formLabelWidth">
          <el-input v-model="upform.province" auto-complete="off" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="市" :label-width="formLabelWidth">
          <el-input v-model="upform.city" auto-complete="off" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="县" :label-width="formLabelWidth">
          <el-input v-model="upform.country" auto-complete="off" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth">
          <el-input v-model="upform.address" auto-complete="off" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="长度" :label-width="formLabelWidth">
          <el-input v-model="upform.length" auto-complete="off" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="宽度" :label-width="formLabelWidth">
          <el-input v-model="upform.width" auto-complete="off" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="深度" :label-width="formLabelWidth">
          <el-input v-model="upform.depth" auto-complete="off" style="width: 200px"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="upTangkou();dialogFormVisible1 = false">确 定</el-button>
      </div>
    </el-dialog>
    <!--分页-->
    <div class="block" style="margin: 0 auto; text-align: center" v-show="pagetotal!=0">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage1"
        :page-size="8"
        layout="total, prev, pager, next"
        :total="pagetotal">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import store from "../vuex/store";
  import ElButton from "element-ui/packages/button/src/button";
  import ElOption from "element-ui/packages/select/src/option";
  import ElFormItem from "element-ui/packages/form/src/form-item";
    export default {
      components: {
        ElFormItem,
        ElOption,
        ElButton},
      name: "tangkou",
      data(){
        return{
          pagetotal: 0,
          currentPage1: 1,
          manager:'ROLE_MANAGER',
          tklist:[],
          myuser:[],
          formLabelWidth: '120px',
          dialogFormVisible: false,
          dialogFormVisible1: false,
          selecteduser:'',
          flag:true,
          flag1:true,
          flag2:true,
          form: {
            number:'',
            type:'',
            unit:'',
            username:'',
            province:'',
            city:'',
            country:'',
            address:"",
            length:'',
            width:'',
            depth:'',
          },
          upform: {
            number:'',
            type:'',
            unit:'',
            username:'',
            province:'',
            city:'',
            country:'',
            address:"",
            length:'',
            width:'',
            depth:'',
            id:'',
          },
        }
      },
      methods:{
        deleteall(){
          this.$confirm('此操作将永久删除该用户所有塘口, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$axios.delete("/pound/all/"+this.selecteduser).then(function (res) {
              console.log(res);
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.selectTangkou();
            }.bind(this)).catch(function (error) {
              console.log(error);
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            }.bind(this));
          });
        },
        addsluser(){
          if (this.flag) {
            this.flag = false;
            var addsl = document.getElementById("addsl");
            for (let c = 0; c < this.myuser.length; c++) {
              var ss1 = new Option();
              ss1.text = this.myuser[c].username;
              addsl.add(ss1);
            }
          }
        },
        upsluser(){
          if (this.flag2) {
            var upsl = document.getElementById("upsl");
            upsl.options.length = 0;
            for (let c = 0; c < this.myuser.length; c++) {
              var ss1 = new Option();
              ss1.text = this.myuser[c].username;
              upsl.add(ss1);
            }
            this.flag2 = false;
          }
        },
        selectTangkou(){
          this.$axios.get("/pound/" + this.selecteduser + '?pageNum=' + this.currentPage1 +'&pageSize=8').then(function (res) {
            console.log(res);
            this.tklist = [].concat(res.data.data);
            this.pagetotal = res.data.data.total;
          }.bind(this)).catch(function (error) {
            console.log(error);
          });
        },
        getTangkou(){
          if (store.state.roles == 'ROLE_EMPLOYEE'){
            this.flag1 = false;
          }
          this.myuser = [].concat(store.state.MyUsers);
          var sluser = document.getElementById("sluser");
          for (let c=0;c<this.myuser.length;c++){
            var ss = new Option();
            ss.text = this.myuser[c].username;
            sluser.add(ss);
          }
          let username = store.state.username;
          this.$axios.get("/pound/"+username+ '?pageNum=' + this.currentPage1 +'&pageSize=8').then(function (res) {
            this.tklist = [].concat(res.data.data);
            this.pagetotal = res.data.data.total;
          }.bind(this)).catch(function (error) {
            console.log(error);
          });
        },
        addTangkou(){
          this.$axios.post("/pound/",{
            "number": this.form.number,
            "type": this.form.type,
            "unit": this.form.unit,
            "username": this.form.username,
            "province": this.form.province,
            "city": this.form.city,
            "country": this.form.country,
            "address": this.form.address,
            "length": this.form.length,
            "width": this.form.width,
            "depth": this.form.depth
          }).then(function (res) {
            this.$message({
              message: '塘口增加成功！',
              type: 'success'
            });
            this.selectTangkou();
          }.bind(this)).catch(function (error) {
            console.log(error);
            this.$message.error('系统繁忙，稍后重试！');
          }.bind(this));
        },
        upTangkou(){
          console.log(this.upform.username);
          this.$axios.put("/pound/"+this.upform.id,{
            "number": this.upform.number,
            "type": this.upform.type,
            "unit": this.upform.unit,
            "username": this.upform.username,
            "province": this.upform.province,
            "city": this.upform.city,
            "country": this.upform.country,
            "address": this.upform.address,
            "length": this.upform.length,
            "width": this.upform.width,
            "depth": this.upform.depth
          }).then(function (res) {
            console.log(res);
            this.$message({
              type: 'success',
              message: '更新成功!'
            });
            this.selectTangkou();
          }.bind(this)).catch(function (error) {
            console.log(error);
          });
        },
        handleEdit(row) {
          this.upform.number = row.number;
          this.upform.type = row.type;
          this.upform.unit = row.unit;
          this.upform.province = row.province;
          this.upform.city = row.city;
          this.upform.country = row.country;
          this.upform.address = row.address;
          this.upform.length = row.length;
          this.upform.width = row.width;
          this.upform.depth = row.depth;
          this.upform.username = row.username;
          this.upform.id = row.id;
        },
        handleDelete(row) {
          this.$confirm('此操作将永久删除该塘口, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$axios.delete("/pound/"+row.id).then(function (res) {
              console.log(res);
              this.$message({
                message: '塘口删除成功',
                type: 'success'
              });
              this.selectTangkou();
            }.bind(this)).catch(function (error) {
              console.log(error);
              this.$message.error('塘口删除失败');
            }.bind(this));
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        },
        handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
          this.currentPage1 = val;
          if (store.state.roles == 'ROLE_EMPLOYEE')
            this.getTangkou();
          else
            this.selectTangkou();
        }
      },
      mounted(){
        this.getTangkou();
      },
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
    width: 100%;
  }
  a{
    color: rgb(96,98,102);
    text-decoration: none;
  }
  a:hover{
    color: #31b0d5;
  }
</style>
