<template>
  <div class="left-aside">
    <div class="menu-top">
      <div class="menu-name">音乐库</div>
      <div class="menu-group">
        <div class="menu-item" @click="goIndex"><i class="el-icon-apple"></i> 推荐</div>
        <div class="menu-item"><i class="el-icon-grape"></i> 歌单</div>
        <div class="menu-item"><i class="el-icon-sugar"></i> 排行榜</div>
      </div>
    </div>
    <div class="menu-bottom">
      <div class="menu-name">我的音乐</div>
      <div class="menu-group">
        <div class="menu-item"><i class="el-icon-dish"></i> 我的收藏</div>
        <div class="menu-item"><i class="el-icon-apple"></i> 最近播放</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    goIndex() {
      this.$router.push({path: '/'});
    }
  }
}
</script>
<style lang="less" scoped>
.left-aside{
  // 31C27C
  .menu-top, .menu-bottom{
    margin-top: 30px;
  }
  .menu-name{
    height: 40px;
    line-height: 40px;
    font-size: 17px;
    text-align: center;
  }
  .menu-item{
    font-size: 15px;
    text-align: center;
    height: 30px;
    line-height: 30px;
    &:hover{
      background: rgba(0,0,0,0.4)
    }
  }
}
</style>