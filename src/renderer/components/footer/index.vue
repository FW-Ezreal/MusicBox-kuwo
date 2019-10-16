<template>
  <div class="player">
    <div class="control">
      <el-button @click="playBefore" :disabled="!before_song">
          <i class="iconfont icon-kuaitui"></i>
      </el-button>
      <el-button class="play-btn" @click="playClick">
          <i class="iconfont icon-zanting" v-if="!is_play"></i>
          <i class="iconfont icon-bofang" v-else></i>
      </el-button>
      <el-button @click="playAfter" :disabled="!after_song">
        <i class="iconfont icon-kuaijin"></i>
      </el-button>
    </div>
    <div class="cover">
      <img src="http://img1.kwcdn.kuwo.cn/star/userpl2015/47/31/1564050079629_11868547_500.jpg">
      <!-- <audio src=""></audio> -->
    </div>
    <div class="info">
      <div class="top">
        <div class="names">
          <div>
            <span class="name">天涯过客</span>
            <span class="ar_name">周杰伦</span>
          </div>
          <div class="time"></div>
        </div>
        <div class="time">00:00-04:50</div>
      </div>
      <div class="progress">
        <el-slider
          :max="time/1000"
          v-model="play_time"
          @change="playTimeChange">
        </el-slider>
      </div>
    </div>
    <div class="actions">
      <el-button type="text">
          <i class="iconfont icon-xiai"></i>
      </el-button>
      <el-button type="text">
          <i class="iconfont icon-liebiaoxunhuan"></i>
      </el-button>
      <el-button type="text">
          <i class="iconfont icon-shengyin"></i>
      </el-button>
      <el-popover
        v-model="visible"
        width="300"
        placement="top">
        
        <el-button slot="reference"><i class="iconfont icon-liebiao"></i></el-button>
      </el-popover>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      is_play: false,
      before_song: true,
      after_song: true,
      play_time: 40,
      time: 1300000,
      visible: false
    }
  },
  methods: {
    playBefore() {

    },
    playClick() {

    },
    playAfter() {

    },
    playTimeChange() {

    }
  }
}
</script>
<style lang="less" scoped>
.player{
  display: flex;
  align-items: center;
  .el-button{
    padding: 0px;
    border-color: transparent;
  }
  .control {
    width: 230px;
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    button {
      margin: 0 15px;
      color: #31c27c;
      i {
          font-size: 32px;
      }
    }
    button:hover {
      color: #2fab67;
    }
    .play-btn {
      i {
        font-size: 38px;
      }
    }
  }
  .cover{
    width: 70px;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    img{
      width: 50px;
      height: 50px;
      border-radius: 2px;
    }
  }
  .info{
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 70px;
    .top{
      font-size: 13px;
      color: #666;
      display: flex;
      justify-content: space-between;
      .names{
        color: #444;
      }
      .time{
        font-size: 12px;
        color: #999;
      }
    }
    .progress{
      margin-top: 10px;
      /deep/.el-slider__runway{
        margin: 0px;
      }
    }
  }
  .actions {
    width: 200px;
    padding: 0 20px;
    display: flex;
    flex-shrink: 0;
    justify-content: space-between;
    button {
      color: #333;
      flex: 1;
      flex-shrink: 0;
    }
    button:hover {
      color: #31c27c;
    }
  }
}
</style>