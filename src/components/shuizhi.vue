<template>
  <div id="shuizhi">
    <!--新增水质-->
    <el-button v-has="employee" type="text" @click="dialogFormVisible = true" style="color: green;font-size: 1.5em;margin-left: 50px">+</el-button>
    <!--根据塘口筛选水质-->
    <el-button v-has="employee" @click="dialogTableVisible = true" icon="el-icon-search" circle></el-button>
    <label v-has="employee" style="margin-left: 450px">请选择塘口</label>
    <select v-has="employee" v-if="flagrole" id="sltk" class="el-input__inner" style="width: 200px" v-model="selectedtk" @focus="selectsz" @change="selectsz"></select>

    <el-dialog title="水质信息表" :visible.sync="dialogTableVisible" :modal-append-to-body="false" width="800px">
      <el-table :data="tabledata">
        <el-table-column property="temperature" label="温度" width="100px"></el-table-column>
        <el-table-column property="nh" label="氨氮" width="100px"></el-table-column>
        <el-table-column property="o2" label="氧气" width="100px"></el-table-column>
        <el-table-column property="nano2" label="亚硝酸钠" width="100px"></el-table-column>
        <el-table-column property="alkali" label="碱" width="100px"></el-table-column>
        <el-table-column property="remark" label="备注" width="100px"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.row);dialogFormVisible1 = true"
            >编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
              >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <el-dialog title="更新水质" :visible.sync="dialogFormVisible1" :modal-append-to-body="false">
      <el-form :model="form1">
        <el-form-item label="nh" :label-width="formLabelWidth">
          <el-input v-model="form1.nh" auto-complete="off" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="nano2" :label-width="formLabelWidth">
          <el-input v-model="form1.nano2" auto-complete="off" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="alkali" :label-width="formLabelWidth">
          <el-input v-model="form1.alkali" auto-complete="off" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="o2" :label-width="formLabelWidth">
          <el-input v-model="form1.o2" auto-complete="off" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="temperature" :label-width="formLabelWidth">
          <el-input v-model="form1.temperature" auto-complete="off" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="image" :label-width="formLabelWidth">
          <el-input v-model="form1.image" auto-complete="off" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="form1.remark" auto-complete="off" style="width: 200px" @blur="addslyp"></el-input>
        </el-form-item>
        <el-form-item label="塘口" :label-width="formLabelWidth">
          <select id="sltk2" class="el-input__inner" style="width: 200px" v-model="form1.pound_id" @focus="upslsz" @change="upslsz">
            <option>{{form1.pound_id}}</option>
          </select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="upshuizhi();dialogFormVisible1 = false">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="新增水质" :visible.sync="dialogFormVisible" :modal-append-to-body="false">
      <el-form :model="form">
        <el-form-item label="nh" :label-width="formLabelWidth">
          <el-input v-model="form.nh" auto-complete="off" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="nano2" :label-width="formLabelWidth">
          <el-input v-model="form.nano2" auto-complete="off" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="alkali" :label-width="formLabelWidth">
          <el-input v-model="form.alkali" auto-complete="off" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="o2" :label-width="formLabelWidth">
          <el-input v-model="form.o2" auto-complete="off" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="temperature" :label-width="formLabelWidth">
          <el-input v-model="form.temperature" auto-complete="off" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="image" :label-width="formLabelWidth">
          <el-input v-model="form.image" auto-complete="off" style="width: 200px"></el-input>
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
        <el-button type="primary" @click="addshuizhi();dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>

    <!--echarts-->
    <div id="echarts" style="height: 500px;width: 1000px"></div>

  </div>
</template>

<script>
  import store from '../vuex/store'
  import ElButton from "element-ui/packages/button/src/button";
    export default {
      components: {ElButton},
      name: "shuizhi",
      data(){
          return{
            dialogFormVisible:false,
            dialogTableVisible:false,
            dialogFormVisible1:false,
            formLabelWidth: '120px',
            employee:'ROLE_EMPLOYEE',
            selectedtk:'',
            tklist:[],
            form: {
              nh:'',
              nano2:'',
              alkali:'',
              o2:'',
              temperature:'',
              remark:'',
              pound_id:'',
              image:''
            },
            form1: {
              id:'',
              nh:'',
              nano2:'',
              alkali:'',
              o2:'',
              temperature:'',
              remark:'',
              pound_id:'',
              image:''
            },
            flag:true,
            flagrole:true,
            tabledata:[],
            flag1:true
          }
      },
      methods:{
        getParams () {
          if (store.state.roles != 'ROLE_EMPLOYEE')
            this.flagrole == false;
          let id = this.$route.query.id;
          if (id == undefined){
            this.$axios.get("/pound/"+store.state.username).then(function (res) {
              this.tklist = [].concat(res.data.data);
              this.pagetotal = res.data.total;
              var sltk = document.getElementById("sltk");
              sltk.options.length = 0;
              for (let c = 0; c < res.data.data.length; c++) {
                var ss = new Option();
                ss.text = res.data.data[c].id;
                sltk.add(ss);
              }
            }.bind(this)).catch(function (error) {
              console.log(error);
            });
          } else {
            this.$axios.get('/water/get?pound_id='+id).then(function (res) {
              console.log(res.data);
              var myChart = this.$echarts.init(document.getElementById('echarts'));
              var option = {
                tooltip:{
                  triggerOn: 'axis',
                  formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                parallel: [{
                  axisExpandTriggerOn:"click",
                }],
                parallelAxis: [
                  {dim: 0, name: 'temperature'},
                  {dim: 1, name: 'nh'},
                  {dim: 2, name: 'nano2'},
                  {dim: 3, name: 'alkali'},
                  {dim: 4, name: 'o2'}
                ],
                series: {
                  type: 'parallel',
                  lineStyle: {
                    width: 4
                  },
                  data: []
                }
              };
              myChart.setOption(option);
              let arr = new Array();
              for (let i=0;i<res.data.data.list.length;i++){
                arr[i] = new Array();
                arr[i].push(parseInt(res.data.data.list[i].temperature));
                arr[i].push(res.data.data.list[i].nh);
                arr[i].push(res.data.data.list[i].nano2);
                arr[i].push(res.data.data.list[i].alkali);
                arr[i].push(res.data.data.list[i].o2);
              }
              myChart.setOption({
                series: [{
                  type: 'parallel',
                  data: arr
                }]
              });
            }.bind(this)).catch(function (error) {
              console.log(error);
            })
          }
        },
        selectsz(){
          var myChart = this.$echarts.init(document.getElementById('echarts'));
          var option = {
            parallel: [{
              axisExpandTriggerOn:"click",
            }],
            parallelAxis: [
              {dim: 0, name: '温度'},
              {dim: 1, name: '氨氮'},
              {dim: 2, name: '亚硝酸钠'},
              {dim: 3, name: '碱'},
              {dim: 4, name: '氧气'}
            ],
            series: {
              type: 'parallel',
              lineStyle: {
                width: 4
              },
              data: []
            }
          };
          myChart.setOption(option);
          // this.$axios.get('/water/get?pound_id=3').then(function (res) {
          this.$axios.get('/water/get?pound_id='+this.selectedtk).then(function (res) {
            console.log(res.data.data.list);
            this.tabledata = [].concat(res.data.data.list);
            let arr = new Array();
            for (let i=0;i<res.data.data.list.length;i++){
              arr[i] = new Array();
              arr[i].push(parseInt(res.data.data.list[i].temperature));
              arr[i].push(res.data.data.list[i].nh);
              arr[i].push(res.data.data.list[i].nano2);
              arr[i].push(res.data.data.list[i].alkali);
              arr[i].push(res.data.data.list[i].o2);
            }
            myChart.setOption({
              series: [{
                type: 'parallel',
                data: arr
              }]
            });
          }.bind(this)).catch(function (error) {
            console.log(error);
          });
        },
        addslyp(){
          if (this.flag) {
            this.flag = false;
            var sltk1 = document.getElementById("sltk1");
            sltk1.options.length = 0;
            for (let c = 0; c < this.tklist.length; c++) {
              var ss = new Option();
              ss.text = this.tklist[c].id;
              sltk1.add(ss);
            }
          }
        },
        upslsz(){
          if (this.flag1) {
            this.flag1 = false;
            var sltk1 = document.getElementById("sltk2");
            sltk1.options.length = 0;
            for (let c = 0; c < this.tklist.length; c++) {
              var ss = new Option();
              ss.text = this.tklist[c].id;
              sltk1.add(ss);
            }
          }
        },
        addshuizhi(){
          this.$axios.post("/water/insert",{
            "nh": this.form.nh,
            "nano2": this.form.nano2,
            "alkali": this.form.alkali,
            "o2": this.form.o2,
            "temperature": this.form.temperature,
            "pound_id": this.form.pound_id,
            "image": this.form.image,
            "remark": this.form.remark
          }).then(function (res) {
            this.selectsz();
          }.bind(this)).catch(function (error) {
            console.log(error);
          })
        },
        handleEdit(row){
          this.form1.id = row.id;
          this.form1.nh = row.nh;
          this.form1.nano2 = row.nano2;
          this.form1.alkali = row.alkali;
          this.form1.o2 = row.o2;
          this.form1.temperature = row.temperature;
          this.form1.pound_id = row.pound_id;
          this.form1.image = row.image;
          this.form1.remark = row.remark;
        },
        handleDelete(row){
          this.$axios.delete('/water/'+ row.id).then(function (res) {
            this.$message({
              message: '水质删除成功',
              type: 'success'
            });
            this.selectsz();
          }.bind(this)).catch(function (error) {
            console.log(error);
          })
        },
        upshuizhi(){
          this.$axios.put('/water/update',{
            "id": this.form1.id,
            "nh": this.form1.nh,
            "nano2": this.form1.nano2,
            "alkali": this.form1.alkali,
            "o2": this.form1.o2,
            "temperature": this.form1.temperature,
            "pound_id": this.form1.pound_id,
            "image": this.form1.image,
            "remark": this.form1.remark
          }).then(function (res) {
            this.$message({
              message: '水质更新成功',
              type: 'success'
            });
            this.selectsz();
          }.bind(this)).catch(function (error) {
            console.log(error);
          })
        }
      },
      mounted() {
        this.getParams();
      }
    }
</script>

<style scoped>

</style>
