<template>
  <div id="touwei">

  </div>
</template>

<script>
    export default {
        name: "touwei",
      methods:{
        getParams () {
          let id = this.$route.query.id;
          if (id == undefined){

          } else {
            console.log(id);
          }
        },
      },
      mounted(){
        this.getParams();
      }
    }
</script>

<style scoped>

</style>
