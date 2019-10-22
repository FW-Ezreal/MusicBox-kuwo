<template>
  <div class="player">
    <div class="control">
      <el-button @click="playBefore" :disabled="!before_song">
          <i class="iconfont icon-kuaitui"></i>
      </el-button>
      <el-button class="play-btn" @click="playClick">
          <i class="iconfont icon-zanting" v-if="is_play"></i>
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
        autoplay
        @timeupdate="timeupdate"
        :src="curSong.url">
      </audio>
    </div>
    <div class="info">
      <div class="top">
        <div class="names">
          <div>
            <span class="name">{{ curSong.name }} </span>
            -
            <span class="ar_name">{{ curSong.artist }}</span>
          </div>
          <div class="time"></div>
        </div>
        <div class="time">
          <span class="cur-time">{{ curTime }}</span>
          <span class="all-time">{{ curSong.songTimeMinutes ? curSong.songTimeMinutes : '00:00' }}</span>
        </div>
      </div>
      <div class="progress">
        <el-slider
          v-model="nowTime"
          :max="Number(curSong.duration)"
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
      <el-popover
        width="10"
        placement="top"
        popper-class="volume"
      >
        <el-slider
          v-model="volumeNum"
          :max="100"
          :height="'100px'"
          @input="changeVolume"
          vertical>
        </el-slider>
        <el-button type="text" slot="reference">
            <i class="iconfont icon-shengyin"></i>
        </el-button>
      </el-popover>
      <el-popover
        v-model="visible"
        width="300"
        min-width="40"
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
      before_song: true,
      after_song: true,
      play_time: 40,
      time: 1300000,
      visible: false,
      curTime: '00:00',
      nowTime: 0,
      is_play: false,
      volumeNum: this.$store.state.song.volumeNum
    }
  },
  computed: {
    ...mapState({
      curSongId(state) {
        return this.curSong.rid || this.curSong.id;
      },
      curSong(state){
        return state.song.curSong;
      },
      percent(state) {
        return state.song.percent;
      },
      currTime(state) {
        return state.song.curTime;
      },
      songList(state) {
        return state.songList.list;
      }
    }),
    currentIndex() {
      const list = this.songList;
      if (list.length === 0) return -1;
      return list.findIndex((ele, idx) => {
        console.log('ele.rid === this.curSongId: ', ele.rid, this.curSongId);
        return ele.rid === this.curSongId;
      })
    }
  },
  watch: {
    curSongId(curData, lastData) {
      console.log('curData: ', curData);
      if (curData){
        this.curTime = '00:00'
        this.getPlayUrl();
      }
    }
  },
  created() {
    window.a = this;
  },
  methods: {
    playBefore() {
      console.log(this.currentIndex);
      if (this.currentIndex === 0) return;
      this.$store.commit('CHANGE_NOW_SONG', this.songList[this.currentIndex - 1]);
    },
    playClick() {
      const audio = this.$refs.audio;
      console.log(audio.paused);
      this.is_play = !audio.paused;
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
      }
      // if (this.songList.length === 0) return;
      // this.$store.commit('CHANGE_STATE');
    },
    playAfter() {
      if (this.currentIndex === this.songList.length - 1) return;
      this.$store.commit('CHANGE_NOW_SONG', this.songList[this.currentIndex + 1]);      
    },
    playTimeChange(e) {
      const audio = this.$refs.audio;
      audio.currentTime = e;
    },
    timeupdate(e) {
      // console.log(e)
      const currTime = e.target.currentTime;
      const percent = currTime / this.curSong.duration;
      this.curTime = mFormat(currTime);
      this.nowTime = currTime;
      this.$store.commit('CUR_TIME', currTime);
      this.$store.commit('PERCENT', percent);
    },
    changeVolume(e) {
      const audio = this.$refs.audio;
      audio.volume = e / 100;
      this.$store.commit('CHANGE_VOLUME', e)
    },
    getPlayUrl(){
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
        this.$store.commit('CHANGE_NOW_SONG', playSong);
      })
    }
  }
}
</script>
<style lang="less">
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
.volume{
  min-width: 40px;
}
</style>