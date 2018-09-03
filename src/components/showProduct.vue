<template>
    <div class="showProduct">
      <div class="imgInfo">
        <img :src=lists.image alt="" class="showImage">
        <div class="contentInfo">
          <img :src=lists.content alt="" class="showContent">
        </div>
      </div>
      <div class="productInfo" style="" >
        <p>{{lists.description}}</p><br>
        <span class="productName">产品名称</span><br>
        <span>{{lists.type}} / {{lists.title}}</span><br>
        <div style="background-color: #f0f0f0;margin-top: 10px;padding-bottom: 5px" >
          <div style="margin-top: 5px">
          <span style="font-size: 15px ;color: #5e5e61;"> 促销价:</span> &nbsp; &nbsp;&nbsp;&nbsp;
          <span style="color: red">￥</span>
          <span style="color: red;font-size: 20px">{{lists.price}}</span><br><br>
            <span style="font-size: 15px ;color: #5e5e61; ">剩余量:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{lists.sum}}</span>
          </div>
          <br>
          <p style="margin-top: 8px;font-size: 15px ;color: #5e5e61;">发布时间:&nbsp;&nbsp;&nbsp;&nbsp;{{lists.time}}</p>
        </div>
        <br><hr>
        <div class="publicPerson">
          <span> 发布者:&nbsp;&nbsp;&nbsp;&nbsp;{{lists.realname}}</span>
          <router-link :to="'/showPersonalProduct/' +lists.username"><div class="userName" style="float: right">
            <img :src=lists.user_image  class="publicImage" alt="">
            <span> {{lists.username}}</span>
          </div></router-link>

        </div>

      </div>
    </div>
</template>

<script>
  import store from '../vuex/store'
  import router from '../router/index'
    export default {
        name: "show-product",
      data(){
          return{
            lists:"",
        }
      },
      methods:{
        showProduct(){
          this.$axios.get('/product/check/'+this.productId)
            .then(function (res) {
              this.lists = res.data.data;
              console.log(this.lists);
            }.bind(this))
            .catch(function (error) {
              console.log(error);
            })
        }
      },
      created(){
        this.$store.state.productId = this.$route.params.id;
        this.productId = this.$route.params.id;
        this.showProduct();
      }
    }
</script>

<style scoped>
  *{
    margin: 0;
    padding: 0;
  }
  .imgInfo{
    margin-left: 60px;
    margin-top: 40px;
    width: 300px;
    float: left;
    /*border: 1px solid black;*/
  }
.showImage{
  width: 300px;
  height: 300px;
  display: block;
  border: 1px solid #dc2143;
}
  .showContent{
    width: 60px;
    height: 60px;
    display: block;
    margin-left: 10px;
  }
  .contentInfo{
    margin-top: 10px;
  }
  .showContent:hover{
    border:3px solid red;
  }
  .productInfo{
    margin-left: 40px;
    margin-top: 40px;
    width: 500px;
    height: 410px;
    background-color: #ffffff;
    float: left
  }
  .productName{
    display: block;
    padding: 10px;
    background-color: #c7254e;
    color: white;
  }
  .publicPerson{
    margin-top: 18px;
  }
  .publicImage {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    vertical-align:middle
  }
  .userName{
    float: right;
    cursor: pointer;
    padding: 5px;
    border-radius: 5px 5px 5px 5px ;
  }
  .userName:hover{
    background-color: #67c23a;
  }
</style>
