<template>
  <div class="play-btn">
    <a href="javascript:;" class="btn color" @click="playAll">
      <i class="iconfont icon-play"/>
      <span>播放全部</span>
    </a>
    <a href="javascript:;" class="btn other">
      <i class="iconfont icon-addbtn"/>
      <span>添加到</span>
    </a>
  </div>
</template>
<script>
export default {
  props: {
  },
  watch: {

  },
  created () {
  },
  methods: {
    playAll () {
      this.$emit('playAll')
    }
  }
}
</script>
<style lang="less" scoped>
  .btn{
    display: inline-block;
    padding: 0 11px;
    height: 30px;
    line-height: 30px;
    border-radius: 2px;
    vertical-align: middle;
    span {
      font-size: 14px;
    }
    &:hover{

    }
  }
  .color{
    background: rgb(255, 210, 0);
  }
  .other{
    border: 1px solid rgba(0,0,0,0.2);
  }
</style>
