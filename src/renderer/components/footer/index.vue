<template>
  <div class="player" :style="{backgroundColor: 'rgba(16,17,33,1)', color: 'rgba(255,255,255,0.88)'}">
    <div class="control">
      <el-button class="pre-btn hover-8" @click="playBefore" :disabled="!before_song">
          <i class="iconfont icon-shangyiqu"></i>
      </el-button>
      <el-button class="play-btn hover-8" @click="playClick">
          <i class="iconfont icon-bofang1" v-if="is_play"></i>
          <i class="iconfont icon-zanting" v-else></i>
      </el-button>
      <el-button class="next-btn hover-8" @click="playAfter" :disabled="!after_song">
        <i class="iconfont icon-shangyiqu"></i>
      </el-button>
    </div>
    <div class="cover">
      <img v-lazy="curSong.pic" :title="curSong.url">
      <audio
        ref="audio"
        autoplay
        @timeupdate="timeupdate"
        @ended="ended"
        :src="curSong.url">
      </audio>
    </div>
    <div class="info">
      <div class="top">
        <div class="names">
          <div>
            <span class="name">{{ curSong.name }} </span>
            {{ curSong.name || curSong.artist ? ' / ' : '' }}
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
          :max="curSong.duration || 0"
          @change="playTimeChange">
        </el-slider>
      </div>
    </div>
    <div class="actions">
      <el-button type="text">
          <i class="iconfont icon-xiai"></i>
      </el-button>
      <el-popover
        v-model="showMode"
        width="150"
        placement="top">
        <div
          class="mode-list"
          v-for="(ele, idx) in playModeArray"
          @click="changeMode(idx)"
          :class="{curMode: idx === playMode}"
          :key="idx">
          {{ ele }}
        </div>
        <el-button slot="reference"><i class="iconfont icon-liebiao"></i></el-button>
      </el-popover>
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
            <i class="iconfont icon-yinliang"></i>
        </el-button>
      </el-popover>
      <el-popover
        v-model="visible"
        width="400"
        popper-class="ls"
        placement="top">
        <PlayList />
        <el-button slot="reference"><i class="iconfont icon-yinleliebiao-"></i></el-button>
      </el-popover>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import { mapState } from 'vuex';
import { mFormat } from '@/common/tools.js'
import jsonp from '@/untils/jsonp.js';
import PlayList from './component/playList';
import { relative } from 'path';
export default {
  components: {
    PlayList
  },
  data () {
    return {
      before_song: true,
      after_song: true,
      play_time: 40,
      time: 1300000,
      visible: false,
      curTime: '00:00',
      nowTime: 0,
      is_play: false,
      isLoop: false,
      showMode: false,
      volumeNum: this.$store.state.song.volumeNum,
      playModeArray: ['one', 'oneLoop', 'order','loop', 'random'],
    }
  },
  computed: {
    ...mapState({
      curSongId(state) {
        return this.curSong.rid || this.curSong.id;
      },
      curSong (state) {
        return state.song.curSong
      },
      percent(state) {
        return state.song.percent;
      },
      currTime(state) {
        return state.song.curTime;
      },
      songList(state) {
        return state.songList.list;
      },
      playMode(state) {
        return state.song.playMode;
      }
    }),
    currentIndex() {
      const list = this.songList;
      if (list.length === 0) return -1;
      return list.findIndex((ele, idx) => {
        return ele.rid === this.curSongId;
      })
    }
  },
  watch: {
    curSongId(curData, lastData) {
      // console.log('curData: ', curData);
      if (curData){
        this.curTime = '00:00'
        this.getPlayUrl();
      } else {
        this.curTime = '00:00';
      }
    }
  },
  created () {
    window.a = this
  },
  methods: {
    playBefore() {
      if (this.playMode === 4) {
        this.randomPlay();
        return;
      }
      if (this.currentIndex === 0) return;
      this.$store.commit('CHANGE_NOW_SONG', this.songList[this.currentIndex - 1]);
    },
    playClick() {
      const audio = this.$refs.audio;
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
      if (this.playMode === 4) {
        this.randomPlay();
        return;
      }
      if (this.currentIndex === this.songList.length - 1) return;
      this.$store.commit('CHANGE_NOW_SONG', this.songList[this.currentIndex + 1]);  
    },
    playTimeChange(e) {
      const audio = this.$refs.audio;
      audio.currentTime = e || 0;
    },
    timeupdate (e) {
      // console.log(e)
      const currTime = e.target.currentTime;
      const percent = currTime / this.curSong.duration;
      this.curTime = mFormat(currTime);
      this.nowTime = currTime;
      this.$store.commit('CUR_TIME', currTime);
      this.$store.commit('PERCENT', percent);
    },
    ended() {
      this.nowTime = 0;

      const mode = this.playMode;
      if (mode === 0) { // 单曲播放
        this.$store.commit('CHANGE_NOW_SONG', {});
      } else if (mode === 1) { // 单曲循环
        this.$store.commit('CHANGE_NOW_SONG', this.songList[this.currentIndex]);
      } else if (mode === 2) { // 顺序播放
        if (this.currentIndex === this.songList.length - 1) return;
        this.$store.commit('CHANGE_NOW_SONG', this.songList[this.currentIndex + 1]);   
      } else if (mode === 3) { // 循环播放
        const index = this.currentIndex === this.songList.length - 1 ? 0 : this.currentIndex + 1;
        this.$store.commit('CHANGE_NOW_SONG', this.songList[index]);
      } else { // 随机播放
        this.randomPlay();
      }
    },
    randomPlay() {
      const len = this.songList.length;
      let randomNum = -1;
      while(randomNum < 0) {
        const num = Math.floor(Math.random()*len);
        if (num === this.currentIndex) {
          continue;
        } else {
          randomNum = num;
        }
      }
      this.$store.commit('CHANGE_NOW_SONG', this.songList[randomNum]);
    },
    changeMode(idx) {
      this.$store.commit('CHANGE_MODE', idx);
      this.showMode = false;
    },
    changeVolume(e) {
      const audio = this.$refs.audio;
      audio.volume = e / 100;
      this.$store.commit('CHANGE_VOLUME', e)
    },
    getPlayUrl(){
      const musicUrl = `http://www.kuwo.cn/url?format=mp3&rid=${this.curSongId}&response=url&type=convert_url3&br=128kmp3&from=web&t=${new Date().getTime()}`;
      // const infoUrl = `http://www.kuwo.cn/api/www/music/musicInfo?mid=${this.curSongId}`;
      const fn = (res) => {
        return res
      }
      const arr = [];
      arr[0] = jsonp(musicUrl).then(fn);
      // arr[1] = jsonp(infoUrl).then(fn);
      Promise.all(arr).then(res => {
        // console.log('res: ', res);
        const playSong = Object.assign({}, this.$store.state.song.curSong);
        playSong.url = res[0].url;
        console.log('playSong', playSong)
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
  font-weight: lighter !important;
  .el-button{
    padding: 0px;
    border-color: transparent;
  }
  .control {
    width: 200px;
    flex-shrink: 0;
    display: flex;
    button {
      color: #FFD200;
      background: transparent;
      i {
          font-size: 37px;
      }
    }
    .next-btn{
      margin-left: 14px;
      transform: rotateZ(180deg);
    }
    .pre-btn{
      margin-left: 26px;
    }
    .play-btn {
      margin-left: 15px;
      i {
        font-size: 42px;
      }
    }
  }
  .cover{
    width: 60px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 16px;
    img{
      width: 59px;
      height: 59px;
      border-radius: 0;
      // border-radius: 2px;
    }
  }
  .info{
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 60px;
    .top{
      font-size: 13px;
      display: flex;
      justify-content: space-between;
      .names{
      }
      .time{
        font-size: 12px;
      }
    }
    .progress{
      margin-top: 10px;
      /deep/.el-slider__runway{
        margin: 0px;
      }
      /deep/.el-slider__bar{
        height: 2px;
        background-color: #FFD200;
      }
      /deep/.el-slider__runway{
        height: 2px;
        background: rgba(255,255,255,0.3);
        .el-slider__button{
          width: 12px;
          height: 12px;
          background-color: #FFD200;
          border: none;
        }
        .el-slider__button-wrapper{
          top: -17px;
        }
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
      flex: 1;
      flex-shrink: 0;
    }
  }
}
.volume{
  min-width: 40px;
}
.mode-list{
  height: 20px;
  line-height: 20px;
  &:hover{
    background: rgba(0,0,0,0.05);
  }
}
.curMode{
  background: rgba(0,0,0,0.5);
}
</style>