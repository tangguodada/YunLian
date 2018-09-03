<template>
    <div class="showPersonalProduct">
      <div class="allProducts">
        <p style="background-color: #8bc34a;padding: 5px;color: white">>>{{userName}} 发布的所有产品</p>
        <el-row>
          <el-col :span="8" v-for="(item,index) in items" :key="index" :offset="index > 0 ? 6 : 0">
            <el-card :body-style="{ padding: '0px' }" class="pictureCard" shadow="hover" >
              <router-link :to="'/showProduct/' +item.id"><img v-bind:src=item.image class="image"></router-link>
              <div style="padding: 14px;" class="pictureDescription">
                <div class="box" style="text-align: center">
                  {{item.title}}
                </div>
                <div>
                  <span>￥{{item.price}}</span>
                </div>
                <span>{{item.description}}</span>
                <div class="bottom clearfix">
                  <time class="time">{{ item.time }}</time>
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
            :page-size="6"
            layout="total,  prev, pager, next, jumper"
            :total=allData.total>
          </el-pagination>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "show-personal-product",
      data(){
          return{
            items:[],
            userName:'',
            totalCount:10,
            allData:{},
            currentPage1:1,
          }
      },
      methods:{
        showPersonalProduct(){
          this.$axios.get('/product/?'+'username='+this.userName +'&pageNum=' + this.currentPage1+'&pageSize=6')
            .then(function (res) {
              console.log("显示个人产品");
              console.log(res.data);
              this.items = res.data.data.list;
              this.allData = res.data.data;
            }.bind(this))
            .catch(function (error) {
              console.log(error);
            })
        },
        handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
          this.currentPage1=val;
          this.showPersonalProduct();
        },
      },
      created(){
        this.userName = this.$route.params.username;
        this.showPersonalProduct();
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
</style>
