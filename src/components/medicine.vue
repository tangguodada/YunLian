<template>
    <div id="medicine">
      <!--新增药品-->
      <el-button v-has="employee" type="text" @click="dialogFormVisible = true" style="color: green;font-size: 1.5em;margin-left: 50px">+</el-button>
      <!--根据塘口筛选药品-->
      <label v-has="employee" style="margin-left: 500px">请选择塘口</label>
      <select v-has="employee" id="sltk" class="el-input__inner" style="width: 200px" v-model="selectedtk" @change="selectyp" @focus="selectyp"></select>
      <!--新增药品模态框-->
      <el-dialog title="新增药品" :visible.sync="dialogFormVisible" :modal-append-to-body="false">
        <el-form :model="form">
          <el-form-item label="名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" auto-complete="off" style="width: 200px"></el-input>
          </el-form-item>
          <el-form-item label="用量" :label-width="formLabelWidth">
            <el-input v-model="form.amount" auto-complete="off" style="width: 200px"></el-input>
          </el-form-item>
          <el-form-item label="作用" :label-width="formLabelWidth">
            <el-input v-model="form.ypfunction" auto-complete="off" style="width: 200px"></el-input>
          </el-form-item>
          <el-form-item label="描述" :label-width="formLabelWidth">
            <el-input v-model="form.description" auto-complete="off" style="width: 200px"></el-input>
          </el-form-item>
          <el-form-item label="来源" :label-width="formLabelWidth">
            <el-input v-model="form.origin" auto-complete="off" style="width: 200px"></el-input>
          </el-form-item>
          <el-form-item label="购量" :label-width="formLabelWidth">
            <el-input v-model="form.buy_amount" auto-complete="off" style="width: 200px"></el-input>
          </el-form-item>
          <el-form-item label="备注" :label-width="formLabelWidth">
            <el-input v-model="form.remark" auto-complete="off" style="width: 200px" @blur="addslyp"></el-input>
          </el-form-item>
          <el-form-item label="塘口" :label-width="formLabelWidth">
            <select id="sltk1" class="el-input__inner" style="width: 200px" v-model="form.pound_id" @focus="addslyp" @change="addslyp"></select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addYaoping();dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
      <!--更新药品模态框-->
      <el-dialog title="更新药品" :visible.sync="dialogFormVisible1" :modal-append-to-body="false">
        <el-form :model="upform">
          <el-form-item label="名称" :label-width="formLabelWidth">
            <el-input v-model="upform.name" auto-complete="off" style="width: 200px"></el-input>
          </el-form-item>
          <el-form-item label="用量" :label-width="formLabelWidth">
            <el-input v-model="upform.amount" auto-complete="off" style="width: 200px"></el-input>
          </el-form-item>
          <el-form-item label="作用" :label-width="formLabelWidth">
            <el-input v-model="upform.ypfunction" auto-complete="off" style="width: 200px"></el-input>
          </el-form-item>
          <el-form-item label="描述" :label-width="formLabelWidth">
            <el-input v-model="upform.description" auto-complete="off" style="width: 200px"></el-input>
          </el-form-item>
          <el-form-item label="来源" :label-width="formLabelWidth">
            <el-input v-model="upform.origin" auto-complete="off" style="width: 200px"></el-input>
          </el-form-item>
          <el-form-item label="购量" :label-width="formLabelWidth">
            <el-input v-model="upform.buy_amount" auto-complete="off" style="width: 200px"></el-input>
          </el-form-item>
          <el-form-item label="备注" :label-width="formLabelWidth">
            <el-input v-model="upform.remark" auto-complete="off" style="width: 200px" @blur="addslyp"></el-input>
          </el-form-item>
          <el-form-item label="塘口" :label-width="formLabelWidth">
            <select id="sltk2" class="el-input__inner" style="width: 200px" v-model="upform.pound_id" @focus="upslyp" @change="upslyp">
              <option>{{upform.pound_id}}</option>
            </select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible1 = false">取 消</el-button>
          <el-button type="primary" @click="upYaoping();dialogFormVisible1 = false">确 定</el-button>
        </div>
      </el-dialog>
      <!--药品列表-->
      <el-table
        :data="yplist"
        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="养殖户：">
                <span>{{ props.row.username }}</span>
              </el-form-item>
              <el-form-item label="数量：">
                <span>{{ props.row.amount }}</span>
              </el-form-item>
              <el-form-item label="作用：">
                <span>{{ props.row.function }}</span>
              </el-form-item>
              <el-form-item label="描述：">
                <span>{{ props.row.description }}</span>
              </el-form-item>
              <el-form-item label="备注：">
                <span>{{ props.row.remark }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="药品 ID"
          prop="id">
        </el-table-column>
        <el-table-column
          label="药品名称"
          prop="name">
        </el-table-column>
        <el-table-column
          label="时间"
          prop="time">
        </el-table-column>
        <el-table-column label="操作" v-if="ypflag">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.row);dialogFormVisible1 = true" v-show="usinline==scope.row.username?true:false">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)" v-show="usinline==scope.row.username?true:false">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
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
    export default {
      name: "medicine",
      data () {
        return {
          usinline:store.state.username,
          tklist:[],
          yplist:[],
          currentPage1:1,
          pagetotal:0,
          ypflag:false,
          flag:true,
          flag2:true,
          employee:'ROLE_EMPLOYEE',
          selectedtk:'',
          formLabelWidth: '120px',
          dialogFormVisible: false,
          dialogFormVisible1: false,
          form: {
            name:'',
            amount:'',
            ypfunction:'',
            description:'',
            origin:'',
            buy_amount:'',
            remark:'',
            pound_id:''
          },
          upform: {
            id:0,
            name:'',
            amount:'',
            ypfunction:'',
            description:'',
            origin:'',
            buy_amount:'',
            remark:'',
            pound_id:''
          },
        }
      },
      methods: {
        getParams () {
          if (store.state.roles == 'ROLE_EMPLOYEE'){
            this.ypflag = true;
          } else {
            this.ypflag = false;
          }
          let id = this.$route.query.id;
          if (id == undefined){
            this.$axios.get("/pound/"+store.state.username).then(function (res) {
              console.log(res.data.data);
              this.tklist = [].concat(res.data.data);
              this.pagetotal = res.data.total;
              var sltk = document.getElementById("sltk");
              sltk.options.length = 0;
              for (let c=0;c<res.data.data.length;c++){
                var ss = new Option();
                ss.text = res.data.data[c].id;
                sltk.add(ss);
              }
            }.bind(this)).catch(function (error) {
              console.log(error);
            });

          } else {
            this.$axios.get('/medicine/get?pound_id=' + id + '&pageNum=' + this.currentPage1 + '&pageSize=8').then(function (res) {
              console.log(res.data.data);
              this.yplist = [].concat(res.data.data.list);
              this.pagetotal = res.data.data.total;
            }.bind(this)).catch(function (error) {
              console.log(error);
            })
          }
        },
        addslyp(){
          if (this.flag) {
            this.flag = false;
            var sltk1 = document.getElementById("sltk1");
            for (let c = 0; c < this.tklist.length; c++) {
              var ss = new Option();
              ss.text = this.tklist[c].id;
              sltk1.add(ss);
            }
          }
        },
        upslyp(){
          if (this.flag2) {
            this.flag2 = false;
            var sltk2 = document.getElementById("sltk2");
            sltk2.options.length = 0;
            for (let c = 0; c < this.tklist.length; c++) {
              var ss = new Option();
              ss.text = this.tklist[c].id;
              sltk2.add(ss);
            }
          }
        },
        upYaoping(){
          this.$axios.put('/medicine/update',{
            "id":this.upform.id,
            "name": this.upform.name,
            "amount": this.upform.amount,
            "function": this.upform.ypfunction,
            "description": this.upform.description,
            "origin": this.upform.origin,
            "buy_amount": this.upform.buy_amount,
            "remark": this.upform.buy_amount,
            "pound_id": this.upform.pound_id
          }).then(function (res) {
            console.log(this.upform.id);
            console.log(res.data);
            this.$message({
              type: 'success',
              message: '更新成功!'
            });
            this.selectyp();
          }.bind(this)).catch(function (error) {
            console.log(error);
          })
        },
        selectyp(){
          this.$axios.get('/medicine/get?pound_id='+this.selectedtk+ '&pageNum=' + this.currentPage1 +'&pageSize=8').then(function (res) {
            console.log(res.data);
            this.yplist = [].concat(res.data.data.list);
            this.pagetotal = res.data.data.total;
          }.bind(this)).catch(function (error) {
            console.log(error);
          });
        },
        handleEdit(row){
          this.upform.id = row.id;
          this.upform.name = row.name;
          this.upform.amount = row.amount;
          this.upform.ypfunction = row.function;
          this.upform.description = row.description;
          this.upform.origin = row.origin;
          this.upform.buy_amount = row.buy_amount;
          this.upform.remark = row.remark;
          this.upform.pound_id = row.pound_id;
        },
        handleDelete(row){
          this.$axios.delete('/medicine/'+ row.id).then(function (res) {
            this.$message({
              message: '药品删除成功',
              type: 'success'
            });
            this.selectyp();
            console.log(res.data);
          }.bind(this)).catch(function (error) {
            console.log(error);
          })
        },
        handleCurrentChange(val){
          this.currentPage1 = val;
          if (store.state.roles == 'ROLE_EMPLOYEE')
            this.selectyp();
          else
            this.getParams();
        },
        addYaoping(){
          console.log(this.form);
          this.$axios.post('/medicine/insert',{
            "name": this.form.name,
            "amount": this.form.amount,
            "function": this.form.ypfunction,
            "description": this.form.description,
            "origin": this.form.origin,
            "buy_amount": this.form.buy_amount,
            "remark": this.form.buy_amount,
            "pound_id": this.form.pound_id
          }).then(function (res) {
            console.log(res.data);
            this.$message({
              message: '药品增加成功！',
              type: 'success'
            });
            this.selectyp();
          }.bind(this)).catch(function (error) {
            console.log(error);
          })
        }
      },
      mounted(){
        this.getParams()
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
