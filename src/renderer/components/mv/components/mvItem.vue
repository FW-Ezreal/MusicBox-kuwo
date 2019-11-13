<template>
  <div class="mv-wrap">
    <div class="mv">
      <img v-lazy="listData.pic" alt="">
    </div>
    <div class="title" v-html="listData.name"/>
    <div class="artist" v-html="listData.artist"/>
  </div>
</template>
<script>
export default {
  props: {
    listData: Object
  },
  mounted () {
  },
  components: {
  }
}
</script>
<style lang="less" scoped>
.mv-wrap{
  padding: 0 8px;
  margin-bottom: 14px;
  .mv{
    width: 100%;
    padding-top: 56.25%;
    position: relative;
  }
  img{
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .title{
    height: 22px;
    line-height: 22px;
    margin-top: 2px;
    font-size: 14px;
    opacity: 0.8;
  }
  .artist{
    height: 22px;
    line-height: 22px;
    font-size: 13px;
    opacity: 0.6;
  }
}
</style>
