<template>
  <div class="list">
    <div class="list-item-wrap tab-name">
      <div class="num">{{ musicList.length }}</div>
      <div class="music-info">
        <div class="name">
          歌名
        </div>
        <div class="other-info">
          <span class="artist line1"
            v-if="from !== 'artist'"
          >歌手</span>
          <span class="album line1"
            v-if="from !== 'album'"
          >专辑</span>
        </div>
      </div>
      <!-- <span class="time">{{ time(item) }}</span> -->
      <div class="end-icon">
        <span class="hot">热度</span>
        <span class="format">音质</span>
      </div>
    </div>
    <div class="list-item-wrap tab-list" v-for="(item, index) in musicList" :key="index">
      <div class="num">{{ sort(index) }}</div>
      <div class="music-info">
        <div class="name">
          <a href="javascript:;" class="line1" @click="playSong(item)">{{ name(item) }}</a>
          <i class="iconfont icon-vip" v-if="item.isListenFee"></i>
          <i class="iconfont icon-mv-play" v-if="item.hasmv === 1"></i>
        </div>
        <div class="other-info">
          <span class="artist line1"
            v-if="from !== 'artist'"
          >
            <a href="javascript:;" @click="toArtist(item)">{{ artist(item)}}</a>
          </span>
          <span class="album line1"
            v-if="from !== 'album'"
          >
            <a href="javascript:;" @click="toAlbum(item)">{{ album(item) }}</a>
          </span>
        </div>
      </div>
      <!-- <span class="time">{{ time(item) }}</span> -->
      <div class="end-icon">
        <div class="hot">
          <span class="progess-bg">
            <span class="progess" :style="{width: `${92 - index - Math.random()*6}%`}"></span>
          </span>
        </div>
        <span class="format"><i class="iconfont icon-nondestructive"></i></span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    musicList: Array,
    from: String
  },
  watch: {
    musicList(curdata) {
      // console.log('curdata: ', curdata);
    }
  },
  mounted() {
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
    playSong(item) {
      // console.log('item: ', item);
      this.$store.commit('CHANGE_NOW_SONG', item);
      this.$store.commit('ADD', item);
    },
    toArtist(item) {
      // console.log('this.$route: ', this.$router);
      // this.$route.push({name: 'playlist_detail', params: {id: item.artistid}})
      
      this.$router.push({name: 'artist', params: { id: item.artistid }})
    },
    toAlbum(item) {
      this.$router.push({name: 'album', params: { id: item.albumid }})
      // this.$route.push({name: 'artist', params: {id: item.artistid}})
    }
  }
}
</script>
<style lang="less" scoped>
  .list-item-wrap{
    i{
      font-size: 14px;
      color: #C77F0E;
    }
    &.tab-name{
      background: rgba(0, 0, 0, 0.03);
      opacity: 0.6;
    }
    font-size: 14px;
    height: 44px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgba(0,0,0,0.03);
    >span, >div{
      line-height: 44px;
      height: 44px;
    }
    a:hover{
      color: rgb(199, 127, 14);
    }
    &.tab-list{
      .num{
        opacity: 0.6;
      }
    }
    .num{
      width: 71px;
      margin-right: 14px;
    }
    .music-info{
      flex: 1;
      display: flex;
      overflow: hidden;
      i{
        margin-left: 5px;
      }
      a{
        opacity: 0.8;
      }
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
        position: relative;
        width: 52px;
        margin-right: 8px;
        span{
          display: inline-block;
          height: 6px;
          border-radius: 10px;
          width: 100%;
          background: rgba(0,0,0, 0.07);
        }
        .progess{
          position: absolute;
          top: 20px;
          background: rgba(0,0,0, 0.2);
        }
      }
      .format{
        width: 28px;
        font-size: 14px;
        line-height: 44px;
        height: 44px;
        margin: 0 14px 0 32px;
      }
    }
  }
  .list-item-wrap:hover{
    background: rgba(0, 0, 0, 0.03);
  }
</style>
