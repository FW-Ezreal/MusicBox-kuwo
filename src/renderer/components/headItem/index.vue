<template>
  <div class="header-wrap">
    <div class="img" :class="from">
      <img v-lazy="listInfo.img300 || listInfo.pic300 || listInfo.pic">
    </div>
    <div class="right" v-if="from === 'playList' || from === 'album'">
      <div class="right-top">
        <h1 class="title line1">{{ listInfo.title || listInfo.name || listInfo.album }}</h1>
        <div class="info" v-if="listInfo.uPic">
          <img v-lazy="listInfo.uPic">
          <span class="user-name">{{ listInfo.uname }}</span>
        </div>
        <div class="tags">{{ listInfo.tag }}</div>
        <template v-if="from === 'album'">
          <div class="artist-name" @click="toArtist(listInfo.artistid)">{{ listInfo.artist }}</div>
          <div class="album-info"><span>语言: {{listInfo.lang}}</span> <span>发行时间: {{listInfo.releaseDate}}</span></div>
        </template>
      </div>
      <div class="right-bottom" v-if="from === 'playList' || 'album'">
        <PlayAll @playAll="playAll"/>
        <div class="subtitle line1">{{ listInfo.info || listInfo.albuminfo }}</div>
      </div>
    </div>
    <div class="artist-right" v-else-if="from === 'artist'">
      <h1 v-html="listInfo.name"></h1>
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
    <div class="bang-info" v-else-if="from === 'bang'">
      <h1>{{ listInfo.name }}</h1>
      <div class="pub">{{ listInfo.pub }}</div>
      <PlayAll @playAll="playAll"/>
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
    },
    toArtist(id) {
      this.$router.push({name: 'artist', params: {id}})
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
  .bang{
    width: 130px;
    height: 130px;
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
      .artist-name, .album-info{
        height: 20px;
        line-height: 20px;
        opacity: 0.6;
        margin-top: 12px;
      }
      .artist-name{
        opacity: 0.8;
      }
      .album-info span{
        margin-right: 20px;
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
  .bang-info{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    h1{
      margin-top: 18px;
      height: 37px;
      line-height: 37px;
      font-size: 26px; 
    }
    .pub{
      opacity: .6;
      height: 20px;
      line-height: 20px;
      margin-top: -12px;
    }
  }
}
</style>
