<template>
    <div id="zhongmiao">

    </div>
</template>

<script>
    export default {
        name: "zhongmiao",
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
