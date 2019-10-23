<template>
  <div class="play-btn">
    <a class="btn">
      <i class="iconfont icon-play"/>
      <span>播放全部</span>
    </a>
  </div>
</template>
<script>
export default {
  props: {
  },
  watch: {

  },
  created() {
  },
  methods: {

  }
}
</script>
<style lang="less" scoped>
  .btn{
    display: inline-block;
    background: rgb(255, 210, 0);
    padding: 0 11px;
    height: 30px;
    line-height: 30px;
    border-radius: 2px;
    i {
      margin-left: 8px;
    }
    span {
      font-size: 14px;
    }
  }
</style>
