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
      <img :src="curSong.pic">
      <audio
        ref="audio"
        muted
        autoplay
        @timeupdate="timeupdate"
        :src="curSong.url">
      </audio>
    </div>
    <div class="info">
      <div class="top">
        <div class="names">
          <div>
            <span class="name">{{ curSong.name }}</span>
            -
            <span class="ar_name">{{ curSong.artist }}</span>
          </div>
          <div class="time"></div>
        </div>
        <div class="time">
          <span class="cur-time">{{ curTime }}</span>
          <span class="all-time">{{ curSong.songTimeMinutes }}</span>
        </div>
      </div>
      <div class="progress">
        {{currTime}} {{curSong.duration}}
        <el-slider
          :max="curSong.duration"
          :value="currTime" 
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
        popper-class="ls"
        placement="top">
        <PlayList />
        <el-button slot="reference"><i class="iconfont icon-liebiao"></i></el-button>
      </el-popover>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import { mFormat } from '@/common/tools.js'
import jsonp from '@/untils/jsonp.js';
import PlayList from './component/playList';
export default {
  components: {
    PlayList
  },
  data() {
    return {
      is_play: false,
      before_song: true,
      after_song: true,
      play_time: 40,
      time: 1300000,
      visible: false,
      curTime: '00:00'
    }
  },
  computed: {
    ...mapState({
      curSongId(state) {
        return this.curSong.rid;
      },
      curSong(state){
        return state.song.curSong;
      },
      percent(state) {
// console.log('state.song.percent: ', state.song.percent);
        return state.song.percent;
      },
      currTime(state) {
        return state.song.curTime;
      }
    })
  },
  watch: {
    curSongId(curData, lastData) {
      this.getPlayUrl()
    }
  },
  created() {
    window.a = this;
  },
  methods: {
    playBefore() {

    },
    playClick() {

    },
    playAfter() {

    },
    playTimeChange(e) {
      console.log('e', e);
      const audio = this.$refs.audio;
      audio.currentTime = e;
    },
    timeupdate(e) {
      // console.log(e)
      const currTime = e.target.currentTime;
      const percent = currTime / this.curSong.duration;
      this.curTime = mFormat(currTime);
      this.$store.commit('CUR_TIME', currTime);
      this.$store.commit('PERCENT', percent);
    },
    getPlayUrl(){
      // console.log('curSongId');
      const musicUrl = `http://www.kuwo.cn/url?format=mp3&rid=${this.curSongId}&response=url&type=convert_url3&br=128kmp3&from=web&t=${new Date().getTime()}`;
      const infoUrl = `http://www.kuwo.cn/api/www/music/musicInfo?mid=${this.curSongId}`;
      const fn = (res) => {
        return res;
      }
      const arr = [];
      arr[0] = jsonp(musicUrl).then(fn);
      arr[1] = jsonp(infoUrl).then(fn);
      Promise.all(arr).then(res => {
        console.log('res: ', res);
        const playSong = res[1].data;
        playSong.url = res[0].url;
        this.$store.commit('NOW_SONG', playSong);
      })
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