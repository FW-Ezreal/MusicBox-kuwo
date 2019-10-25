<template>
  <div class="list">
    <div class="list-item-wrap tab-name">
      <span class="num">{{ musicList.length }}</span>
      <div class="music-info">
        <div class="name">
          歌名
        </div>
        <div class="other-info">
          <span class="artist line1">歌手</span>
          <span class="album line1">专辑</span>
        </div>
      </div>
      <!-- <span class="time">{{ time(item) }}</span> -->
      <div class="end-icon">
        <span class="hot">热度</span>
        <span class="format">音质</span>
      </div>
    </div>
    <div class="list-item-wrap" v-for="(item, index) in musicList" :key="index">
      <span class="num">{{ sort(index) }}</span>
      <div class="music-info">
        <div class="name">
          <a href="javascript:;" @click="playSong(item)">{{ name(item) }}</a>
        </div>
        <div class="other-info">
          <span class="artist line1"><a href="javascript:;">{{ artist(item)}}</a></span>
          <span class="album line1"><a href="javascript:;">{{ album(item) }}</a></span>
        </div>
      </div>
      <!-- <span class="time">{{ time(item) }}</span> -->
      <div class="end-icon">
        <div class="hot">{{ hot(item) }}</div>
        <span class="format">音质</span>
      </div>
    </div>
  </div>
</template>
<script>
import jsonp from '@/untils/jsonp.js';
export default {
  props: {
    musicList: Array
  },
  watch: {
    musicList(curdata) {
      console.log('curdata: ', curdata);
    }
  },
  mounted() {
  },
  methods: {
    sort(index) {
      let idx = parseInt(index) + 1;
      idx = idx < 10 ? `0${idx}` : idx;
      return idx;
    },
    name(item) {
      return item.name || '';
    },
    artist(item) {
      return item.artist || '';
    },
    album(item) {
      return item.album || '';
    },
    time(item) {
      return item.songTimeMinutes || '';
    },
    hot(item) {
      return item.score100;
    },
    playSong(item) {
      this.$store.commit('CHANGE_NOW_SONG', { rid: item.rid });
      this.$store.commit('ADD', Object.assign(item, {rid: item.rid}) );
    }
  }
}
</script>
<style lang="less" scoped>
  .list-item-wrap{
    &.tab-name{
      background: rgba(0, 0, 0, 0.03);
    }
    font-size: 14px;
    height: 44px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgba(0,0,0,0.04);
    >span, >div{
      line-height: 44px;
      height: 44px;
    }
    a:hover{
      color: rgb(199, 127, 14);
    }
    .num{
      width: 71px;
      margin-right: 14px;
    }
    .music-info{
      flex: 1;
      display: flex;
      .name{
        display: flex;
        width: 50%;
      }
      .other-info{
        width: 50%;
        display: flex;
        .artist, .album{
          width: 50%;
        }
      }
    }
    .end-icon{
      width: 135px;
      display: flex;
      .hot{
        width: 60px;
      }
      .format{
        width: 60px;
      }
    }
  }
  .list-item-wrap:hover{
    background: rgba(0, 0, 0, 0.03);
  }
</style>
