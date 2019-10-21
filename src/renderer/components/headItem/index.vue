<template>
  <div class="header-wrap">
    <div class="img">
      <img src="">
    </div>
    <div class="right">
      <h1 class="title line1">douyu</h1>
      <div class="info">
        <img src="">
        <span class="user-name"></span>
      </div>
      <div class="buttons"></div>
      <div class="subtitle"></div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {

  }
}
</script>
<style lang="less" scoped>
.header-wrap{
  display: flex;
  .img{
    width: 180px;
    height: 180px;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .right{
    flex: 1;
    .title{
      height: 37px;
      line-height: 37px;
    }
    .info
  }

}
</style>
