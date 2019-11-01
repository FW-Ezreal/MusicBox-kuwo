<template>
  <div class="left-aside">
    <div class="menu-top">
      <img class="user-img" src="../../assets/head.jpg">
      <span>伊泽瑞尔</span>
      <img class="vip-img" src="http://www.kuwo.cn/static/image/web/kudou/icon_luxuryVip.png">
    </div>
    <el-scrollbar class="scrollbar">
      <div class="menu-bottom" @mouseenter="mouseEnter" @mouseleave="mouseLeave">
        <div class="menu-group">
          <div class="menu-item active" @click="goIndex"><i class="el-icon-apple"></i>推荐</div>
          <div class="menu-item"><i class="el-icon-grape"></i>电台</div>
          <div class="menu-item"><i class="el-icon-sugar"></i>视频</div>
          <div class="menu-item"><i class="el-icon-sugar"></i>直播</div>
          <div class="menu-item"><i class="el-icon-sugar"></i>HIFI发烧音乐</div>
        </div>
      </div>
      <div class="menu-bottom" @mouseenter="mouseEnter" @mouseleave="mouseLeave">
        <div class="menu-name">我的音乐</div>
        <div class="menu-group">
          <div class="menu-item"><i class="el-icon-dish"></i>我的电台</div>
          <div class="menu-item"><i class="el-icon-apple"></i>下载管理</div>
          <div class="menu-item"><i class="el-icon-apple"></i>本地音乐</div>
          <div class="menu-item"><i class="el-icon-apple"></i>我的云盘</div>
          <div class="menu-item"><i class="el-icon-apple"></i>最近播放</div>
        </div>
      </div>
      <div class="menu-bottom" @mouseenter="mouseEnter" @mouseleave="mouseLeave">
        <div class="menu-name">自建歌单</div>
        <div class="menu-group">
          <div class="menu-item"><i class="el-icon-dish"></i>我的收藏</div>
          <div class="menu-item"><i class="el-icon-apple"></i>默认列表</div>
        </div>
      </div>
      <div class="menu-bottom" @mouseenter="mouseEnter" @mouseleave="mouseLeave">
        <div class="menu-name">收藏歌单</div>
        <div class="menu-group">
          <div class="menu-item"><i class="el-icon-dish"></i> 周杰伦全集</div>
          <div class="menu-item"><i class="el-icon-apple"></i> 孙燕姿全集</div>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>
<script>
export default {
  methods: {
    goIndex() {
      this.$router.push({path: '/'});
    },
    mouseEnter() {

    },
    mouseLeave() {

    }
  }
}
</script>
<style lang="less" scoped>
.left-aside{
  // 31C27C  "#FFD200"
  display: flex;
  flex-direction: column;
  cursor: default;
  .menu-top{
    display: flex;
    align-items: center;
    height: 56px;
    .user-img{
      width: 36px;
      height: 36px;
      border-radius: 50%;
      margin-left: 26px;
    }
    span{
      font-size: 13px;
      margin-left: 12px;
    }
    .vip-img{
      width: 20px;
      height: 20px;
      margin-left: 10px;
    }
  }
  .scrollbar{
    flex: 1;
  }
  .menu-name{
    height: 32px;
    line-height: 32px;
    font-size: 12px;
    padding-left: 35px;
    opacity: 0.6;
    margin-top: 8px;
  }
  .menu-item{
    font-size: 14px;    
    height: 36px;
    line-height: 36px;
    padding-left: 35px;
    i{
      font-size: 17px;
      margin-right: 8px;
    }
    &:hover{
      background: rgba(255, 210, 0, 0.2);
    }
    &.active{
      background: #FFD200;
    }
  }
}
</style>