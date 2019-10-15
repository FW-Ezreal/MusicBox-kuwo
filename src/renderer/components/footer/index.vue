<template>
  <div class="footer">
    <div>
      <el-button type="text" @click="playBefore" :disabled="!before_song">
          <i class="iconfont icon-kuaitui"></i>
      </el-button>
      <el-button class="play-btn" type="text" @click="playClick">
          <i class="iconfont icon-zanting" v-if="!is_play"></i>
          <i class="iconfont icon-bofang" v-else></i>
      </el-button>
      <el-button type="text" @click="playAfter" :disabled="!after_song">
        <i class="iconfont icon-kuaijin"></i>
      </el-button>
    </div>
    <div class="cover">
      <img src="">
      <!-- <audio src=""></audio> -->
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
        width="300"
        placement="top">
        <el-button><i class="iconfont icon-liebiao"></i></el-button>
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
      after_song: true
    }
  },
  methods: {
    playBefore() {

    },
    playClick() {

    }
  }
}
</script>
<style lang="less" scoped>
.left-aside{
  // 31C27C
}
</style>