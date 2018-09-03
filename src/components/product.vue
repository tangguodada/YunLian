<template>
  <div class="product">
    <div class="type" style="position: relative;">
      <span class="order" @click="latestorder">{{latest}}</span>&nbsp;/
      <span class="order" @click="hotorder">{{hot}}</span>
      <div class="search" style="position:absolute;left: 600px;top: 0px;">
        <input type="text" class="searchInput" placeholder="搜索某用户的产品"
               v-model="insearch" @keyup.enter="searchUserProduct">
      </div>
      <el-button type="success" class="publicProduct" @click="dialogFormVisible = true" v-has="manager">发布产品</el-button>
      <el-dialog title="发布产品" :visible.sync="dialogFormVisible" :modal-append-to-body="false">
        <el-form :model="form" style="height: 370px;">
          <div class="rightBox"
               style="width: 370px;height: 390px;background-color:#f0f0f0;float: left;margin-left: 10px;padding-left: 8px">
            <el-form-item label="产品名称">
              <el-input v-model="form.name" auto-complete="off" class="inputText"></el-input>
            </el-form-item>
            <el-form-item label="产品描述" style="margin-top: 10px;">
              <textarea v-model="form.description" id="description" cols="47" rows="12" class="description"
                        style="margin-left: 3px"></textarea>
            </el-form-item>
            <el-form-item label="价格  ￥" style="margin-top: 10px">
              <el-input v-model="form.price" auto-complete="off" class="inputprice" style="width: 100px"></el-input>
            </el-form-item>
          </div>
          <div class="leftBox" style="width: 230px;background-color: #f0f0f0;float: left;padding-left:8px">
            <el-form-item label="产品类型">
              <el-select v-model="form.type" placeholder="请选择种类">
                <el-option label="虾类" value="虾类"></el-option>
                <el-option label="蟹类" value="蟹类"></el-option>
                <el-option label="鱼类" value="鱼类"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="添加图片" style="margin-top: 10px">
              <el-input type="file" v-model="form.image" v-on:change="change" id="saveImage"
                        style="width: 100px"></el-input>
              <div class="uploadimage">
                <img src="" class="avatar" id="portrait" alt="">
              </div>
            </el-form-item>
            <el-form-item label="图片描述">
              <el-input type="file" v-model="form.content" id="imageContent"></el-input>
            </el-form-item>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false" class="footerButton">取 消</el-button>
          <el-button type="primary" @click="handleSubmit();dialogFormVisible = dialogflag;" class="footerButton">确 定
          </el-button>
        </div>
      </el-dialog>
    </div>
    <!--产品展示区域-->
    <div class="allProducts">
      <el-row>
        <el-col :span="6" v-for="(item,index) in items" :key="index" :offset="index > 0 ? 6 : 0">
         <el-card :body-style="{ padding: '0px' }" class="pictureCard" shadow="hover" >
           <router-link :to="'/showProduct/' +item.id"><img v-bind:src=item.image class="image"></router-link>
            <div style="padding: 14px;" class="pictureDescription">
              <div class="box" style="text-align: center">
                {{item.title}}
              </div>
              <div>
                <span style="color: red;">￥{{item.price}}</span>
              </div>
              <span>{{item.description}}</span>
              <div class="bottom clearfix">
                <time class="time">{{ item.time }}</time>
              </div>
              <div class="operation" style="height: 30px">
                <el-button v-if="theuser==item.username" type="success" class="button updateProduct"
                           @click="updateProduct(item);dialogFormUpdateVisible = true">更新产品
                </el-button>
                <el-dialog title="更新产品" :visible.sync="dialogFormUpdateVisible" :modal-append-to-body="false">
                  <el-form :model="updateform" style="height: 370px;">
                    <div class="rightBox"
                         style="width: 370px;height: 390px;background-color:#f0f0f0;float: left;margin-left: 10px;padding-left: 8px">
                      <el-form-item label="更新产品名称">
                        <el-input v-model="updateform.name" auto-complete="off" class="inputText"></el-input>
                      </el-form-item>
                      <el-form-item label="更新产品描述" style="margin-top: 10px;">
                        <textarea v-model="updateform.description" cols="47" rows="12" class="description"
                                  style="margin-left: 3px"></textarea>
                      </el-form-item>
                      <el-form-item label="更新产品价格  ￥" style="margin-top: 10px">
                        <el-input v-model="updateform.price" auto-complete="off" class="inputprice"
                                  style="width: 100px"></el-input>
                      </el-form-item>
                    </div>
                    <div class="leftBox" style="width: 230px;background-color: #f0f0f0;float: left;padding-left:8px">
                      <el-form-item label="更新产品类型">
                        <el-select v-model="updateform.type" placeholder="请选择种类">
                          <el-option label="虾类" value="虾类"></el-option>
                          <el-option label="蟹类" value="蟹类"></el-option>
                          <el-option label="鱼类" value="鱼类"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="添加更新图片" style="margin-top: 10px">
                        <input type="file" @change="updateImage($event)" style="width: 100px">
                        <div class="uploadimage">
                          <img :src=updateImagesrc class="avatar" id="updateImagesrc" alt="">
                        </div>
                      </el-form-item>
                      <el-form-item label="更新图片描述">
                        <input type="file" @change="updateContent($event)" id="updateContent">
                      </el-form-item>
                    </div>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormUpdateVisible = false" class="footerButton">取 消</el-button>
                    <el-button type="primary" @click="updateSubmit();dialogFormUpdateVisible = false;"
                               class="footerButton">确 定
                    </el-button>
                  </div>
                </el-dialog>
                <el-button v-if="theuser==item.username" type="success" class="button deleteProduct" @click="deleteProduct(item.id)">删除产品</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <!--分页-->
      <div class="block">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage1"
          :page-size="8"
          layout="total,  prev, pager, next, jumper"
          :total=allData.total>
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>

  import store from '../vuex/store'
  import router from '../router/index'

  export default {
    name: "product",
    data() {
      return {
        manager: 'ROLE_MANAGER',
        dialogFormVisible: false,
        dialogFormUpdateVisible: false,
        theuser: store.state.username,
        form: {
          name: '',
          price: '',
          description: '',
          content: '',
          type: '',
          image: ''
        },
        updateform: {
          id: '',
          name: '',
          price: '',
          description: '',
          type: '',
        },
        latest: '最新',
        hot: '最热',
        items: {},
        dialogflag: true,
        updateImagesrc: '',
        updateDialogflag: true,
        file1: '',
        file2: '',
        totalCount:10,
        allData:{},
        currentPage1:1,
        insearch:'',
      }
    },
    mounted() {
      this.great();
    },
    methods: {
      //搜索某用户的产品
      searchUserProduct(){
        this.$router.push({path:'/showPersonalProduct/'+this.insearch});
      },
      //分页处理函数
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage1=val;
        this.great();
      },
      //显示图片的函数
      change() {
        var imgFile = document.getElementById('saveImage').files[0];
        var fr = new FileReader();
        fr.onload = function () {
          document.getElementById('portrait').src = fr.result;
        };
        fr.readAsDataURL(imgFile);
      },
      //显示产品的请求
      great() {
        this.$axios.get("/product/all?"+'pageSize=8&' + 'pageNum='+this.currentPage1)
          .then(function (res) {
            console.log(res.data);
            this.items = res.data.data.list;
            this.allData = res.data.data;
            for (let i = 0; i < this.items.length; i++) {
              if (this.items[i].description.length > 6) {
                this.items[i].description = this.items[i].description.slice(0, 6) + '...';
              }
            }
          }.bind(this))
          .catch(function (error) {
            console.log(error);
          })
      },
      //产品最新排布
      latestorder() {
        this.$axios.get("/product/all?"+'pageSize=8&'+'pageNum='+this.currentPage1)
          .then(function (res) {
            this.items = res.data.data.list;
            for (let i = 0; i < this.items.length; i++) {
              if (this.items[i].description.length > 6) {
                this.items[i].description = this.items[i].description.slice(0, 6) + '...';
              }
            }
            console.log(this.items);
          }.bind(this))
          .catch(function (error) {
            console.log(error);
          })
      },
      //产品最热排布
      hotorder() {
        this.$axios.get("/product/hot?"+'pageSize=8&'+'pageNum='+this.currentPage1)
          .then(function (res) {
            // console.log(res.data);
            this.items = res.data.data.list;
            for (let i = 0; i < this.items.length; i++) {
              if (this.items[i].description.length > 6) {
                this.items[i].description = this.items[i].description.slice(0, 6) + '...';
              }
            }
            console.log(this.items);
          }.bind(this))
          .catch(function (error) {
            console.log(error);
          })
      },
      //发布产品
      handleSubmit() {
        let f = document.getElementById('saveImage').files;
        let content = document.getElementById('imageContent').files;
        console.log("产品类型" + this.form.type);
        console.log("产品名称" + this.form.name);
        console.log("产品描述" + this.form.description);
        console.log("产品价格" + this.form.price);
        console.log('图片' + this.form.image);
        console.log('图片描述' + this.form.content);
        console.log('图片' + JSON.stringify(f[0]));
        console.log('图片描述' + JSON.stringify(content[0]));
        if (this.form.name == '' || this.form.type == '' || this.form.description == '' || this.form.price == '' || typeof (f[0]) == 'undefined' || typeof (content[0]) == 'undefined') {
          this.$alert('请将信息填写完整', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              console.log('不通过');
            }
          });
          return;
        }
        let params = new FormData();
        params.append('image', f[0], f[0].name);
        params.append('content', content[0], content[0].name);
        params.append('title', this.form.name);
        params.append('price', this.form.price);
        params.append('type', this.form.type);
        params.append('description', this.form.description);

        var config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        };
        this.$axios.post('/product/', params, config)
          .then(function (res) {
            console.log(res);
            this.dialogflag = false;
            this.$message({
              message: '发布产品成功',
              type: 'success'
            });
            router.go(0);
          }.bind(this))
          .catch(function (error) {
            console.log(error);
          })
      },

      //  更新产品
      //更新产品时获取原数据
      updateProduct(update) {
        console.log(update);
        this.updateform.id = update.id;
        this.updateform.type = update.type;
        this.updateform.price = update.price;
        this.updateform.name = update.title;
        this.updateform.description = update.description;
        this.updateImagesrc = update.image;
      },
      //更新产品的图片
      updateImage(event) {
        this.file1 = event.target.files[0];
        var windowURL = window.URL || window.webkitURL;
        this.updateImagesrc = windowURL.createObjectURL(event.target.files[0]);
      },
      updateContent(event) {
        this.file2 = event.target.files[0];
        var windowURL = window.URL || window.webkitURL;
        // this.updatecontent = windowURL.createObjectURL(event.target.files[0]);
      },

      updateSubmit() {
        if (this.updateform.name == '' || this.updateform.type == '' || this.updateform.description == '' || this.updateform.price == '') {
          this.$alert('请将信息填写完整', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              console.log('不通过');
            }
          });
          return;
        }
        let updateparams = new FormData();
        updateparams.append('image', this.file1);
        updateparams.append('content', this.file2);
        updateparams.append('title', this.updateform.name);
        updateparams.append('price', this.updateform.price);
        updateparams.append('type', this.updateform.type);
        updateparams.append('description', this.updateform.description);

        var config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        };
        this.$axios.put('/product/' + this.updateform.id, updateparams, config)
          .then(function (res) {
            console.log(res.data);
            this.updateDialogflag = false;
            this.$message({
              message: '更新产品成功',
              type: 'success'
            });
            this.great();
          }.bind(this))
          .catch(function (error) {
            console.log(error);
          })
      },
      //删除发布的产品
      deleteProduct(id){
        this.$confirm('此操作将永久删除该产品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.delete('/product/' + id)
            .then(function (res) {
              console.log("删除成功");
              this.great();
            }.bind(this))
            .catch(function (error) {
              console.log(error);
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    }
  }
</script>

<style scoped>
  * {
    margin: 0;
    padding: 0;
  }

  .order {
    cursor: pointer;
  }

  .type {
    margin-left: 20px;
    height: 40px;
    margin-top: 16px;

  }

  .type span {
    font-size: 16px;
  }

  .publicProduct {
    width: 80px;
    height: 35px;
    float: right;
    margin-right: 40px;
  }

  .allProducts {
    margin-left: 40px;
    margin-top: 10px;
    width: 1000px;
    background-color: #f9f9f9;
  }

  .pictureDescription span {
    font-size: 14px;
  }

  .pictureCard {
    margin: 10px;
  }

  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .operation {
    margin-top: 5px;
  }

  .button {
    padding: 5px;
  }

  .deleteProduct {
    float: right;
  }

  .image {
    width: 100%;
    height: 200px;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .inputText {
    width: 360px;
  }

  .uploadimage {
    border: 2px dashed #f0f0f0;
    border-radius: 6px;
    position: relative;
    width: 178px;
    height: 178px;
    margin-left: 5px;
    overflow: hidden;
    background-color: #ffffff;
  }

  .uploadimage:hover {
    border-color: #409EFF;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  .footerButton {
    width: 50px;
    height: 35px;
  }
  /*分页的样式*/
  .block{
    margin-left: 300px;
    margin-top: 40px;
  }
  .searchInput{
    width: 100%;
    height: 28px;
    border: 0;
    border-radius: 25px;
    padding-left: 15px;
    background: #f2f2f2 url("../assets/search.png") no-repeat 95%;
  }
</style>
