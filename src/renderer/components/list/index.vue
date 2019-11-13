<template>
  <div class="list">
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
        <span class="hot">{{ hot(item) }}</span>
        <span class="format">音质</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    musicList: Array
  },
  methods: {
    sort (index) {
      let idx = parseInt(index) + 1
      idx = idx < 10 ? `0${idx}` : idx
      return idx
    },
    name (item) {
      return item.name || ''
    },
    artist (item) {
      return item.artist || ''
    },
    album (item) {
      return item.album || ''
    },
    time (item) {
      return item.songTimeMinutes || ''
    },
    hot (item) {
      return item.score100
    },
    playSong (item) {
      const params = {
        url: `http://www.kuwo.cn/url?format=mp3&rid=${item.id}&response=url&type=convert_url3&br=128kmp3&from=web&t=1571301747629`,
        method: 'get'
      }
      this.$http(params).then(res => {
        if (res.code) {
          console.log('url', res.url)
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
  .list-item-wrap{
    font-size: 14px;
    height: 44px;
    display: flex;
    align-items: center;
    >span, >div{
      line-height: 40px;
      height: 40px;
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
