<template>
  <div class="header-wrap">
    <div class="img">
      <img v-lazy="listInfo.img300">
    </div>
    <div class="right">
      <div class="right-top">
        <h1 class="title line1">{{ listInfo.title || listInfo.name }}</h1>
        <div class="info">
          <img v-lazy="listInfo.uPic">
          <span class="user-name">{{ listInfo.uname }}</span>
        </div>
        <div class="tags">{{ listInfo.tag }}</div>
      </div>
      <div class="right-bottom">
        <PlayAll @playAll="playAll"/>
        <div class="subtitle">{{ listInfo.info }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import PlayAll from '@/components/buttons/playAll.vue';
export default {
  props: {
    listInfo: Object,
  },
  components: {
    PlayAll
  },
  watch: {
    listInfo(curdata) {
      console.log('curdata: ', curdata);
    }
  },
  methods: {
    playAll() {
      this.$store.commit('PLAY_ALL', this.listInfo.musicList);
      this.$store.commit('CHANGE_NOW_SONG', this.listInfo.musicList[0]);
    }
  }
}
</script>
<style lang="less" scoped>
.header-wrap{
  margin-bottom: 20px;
  display: flex;
  font-size: 14px;
  .img{
    width: 180px;
    height: 180px;
    margin-right: 20px;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .right{
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .right-top{
      h1{
        height: 38px;
        line-height: 38px;
        font-size: 26px;
      }
      .info{
        display: flex;
        align-items: center;
        margin: 10px 0;
        img{
          width: 30px;
          height: 30px;
          margin-right: 10px;
          border-radius: 50%;
        }
      }
      .tags{
        opacity: 0.8;
      }
    }
    .right-bottom{
      .subtitle{
        margin-top: 14px;
        font-size: 14px;
        opacity: 0.6;
      }
    }
  }

}
</style>
