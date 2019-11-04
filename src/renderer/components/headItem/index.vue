<template>
  <div class="header-wrap">
    <div class="img" :class="from">
      <img v-lazy="listInfo.img300 || listInfo.pic300">
    </div>
    <div class="right" v-if="from === 'playList'">
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
        <div class="subtitle line2">{{ listInfo.info }}</div>
      </div>
    </div>
    <div class="artist-right" v-else-if="from === 'artist'">
      <h1>{{ listInfo.name }}</h1>
      <div class="info">
        <span v-html="listInfo.aartist" v-if="listInfo.aartist"></span>
        <span>粉丝：{{ disposeNum(listInfo.artistFans) }}</span>
      </div>
      <div class="nums">
        <span>单曲：{{ listInfo.musicNum || 0 }}</span>
        <span>专辑：{{ listInfo.albumNum || 0 }}</span>
        <span>MV：{{ listInfo.mvNum || 0 }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { formatNum } from '@/common/tools.js';
import PlayAll from '@/components/buttons/playAll.vue';
export default {
  props: {
    listInfo: Object,
    from: String
  },
  components: {
    PlayAll
  },
  watch: {
    listInfo(curdata) {
      // console.log('curdata: ', curdata);
    }
  },
  methods: {
    playAll() {
      this.$store.commit('PLAY_ALL', this.listInfo.musicList);
      this.$store.commit('CHANGE_NOW_SONG', this.listInfo.musicList[0]);
    },
    disposeNum(num) {
      return formatNum(num);
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
  .artist{
    width: 130px;
    height: 130px;
    img{
      border-radius: 50%;
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
  .artist-right{
    h1{
      font-size: 26px;
      height: 36px;
      line-height: 36px;
      margin-top: 19px;
    }
    div{
      margin: 6px 0 10px;
    }
    .info span{
      margin-right: 14px;
    }
    .nums span{
      margin-right: 22px;
    }
    span{
      display: inline-block;
      opacity: 0.7;
    }
  }
}
</style>
