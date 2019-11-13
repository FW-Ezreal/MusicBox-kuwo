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
        :loop="playMode === 1"
        @timeupdate="timeupdate"
        @ended="ended"
        :src="curSong.url">
      </audio>
    </div>
    <div class="info">
      <div class="top">
        <div class="names">
          <div class="song-info">
            <span class="name line1" :title="curSong.name">{{ curSong.name }} </span>
            {{ curSong.name || curSong.artist ? ' - ' : '' }}
            <span class="ar_name line1" :title="curSong.artist">{{ curSong.artist }}</span>
          </div>
        </div>
        <div class="time">
          <span class="cur-time">{{ curTime }}</span>
          {{ curTime || curSong.songTimeMinutes ? ' / ' : '' }}
          <span class="all-time">{{ curSong.songTimeMinutes ? curSong.songTimeMinutes : '00:00' }}</span>
        </div>
      </div>
      <div class="progress">
        <el-slider
          v-model="nowTime"
          :max="curSong.duration || 1"
          @change="playTimeChange">
        </el-slider>
      </div>
    </div>
    <div class="actions">
      <el-popover
        popper-class="speed"
        width="100"
        placement="top">
        <div
          class="mode-list"
          v-for="(ele, idx) in speeds"
          @click="changeSpeed(idx)"
          :class="{curMode: idx === speedIndex}"
          :key="idx">
          {{ ele }}
        </div>
        <a href="javascript:;" slot="reference">{{ speeds[speedIndex] }}</a>
      </el-popover>
      <el-popover
        popper-class="play-mode"
        v-model="showMode"
        width="150"
        placement="top">
        <div
          class="mode-list"
          v-for="(ele, idx) in playModeArray"
          @click="changeMode(idx)"
          :class="{curMode: idx === playMode}"
          :key="idx">
          <i class="iconfont" :class="playIcons[idx]"></i> {{ ele }}
        </div>
        <i class="iconfont" :class="iconType" slot="reference"></i>
      </el-popover>
      <el-popover
        width="10"
        placement="top"
        popper-class="volume">
        <el-slider
          v-model="volumeNum"
          :max="100"
          :height="'100px'"
          @input="changeVolume"
          vertical>
        </el-slider>
        <a href="javascript:;" slot="reference"><i class="iconfont icon-yinliang"></i></a>
      </el-popover>
      <!-- <a href="javascript:;"><i class="iconfont icon-junhengqi32 icon"/></a> -->
      <a href="javascript:;">HIFI</a>
      <a href="javascript:;"><i class="iconfont icon-ci icon"/></a>
      <a href="javascript:;"><i class="iconfont icon-pinglun icon"/></a>
      <a href="javascript:;"><i class="iconfont icon-xihuan"></i></a>
      <el-popover
        v-model="visible"
        width="400"
        popper-class="ls"
        placement="top">
        <PlayList />
        <a href="javascript:;" slot="reference"><i class="iconfont icon-yinleliebiao-"></i>{{ songList.length ? songList.length : '' }}</a>
      </el-popover>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { mFormat } from '@/common/tools.js'
import jsonp from '@/untils/jsonp.js'
import PlayList from './component/playList'
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
      playModeArray: ['单曲播放', '单曲循环', '顺序播放', '循环播放', '随机播放'],
      playIcons: ['icon-danqubofang', 'icon-danquxunhuan', 'icon-shunxu', 'icon-xunhuanbofang', 'icon-bofangye-caozuolan-suijibofang'],
      speeds: ['0.5x', '0.75x', '1.0x', '1.5x', '2.0x'],
      speedIndex: 2
    }
  },
  computed: {
    ...mapState({
      curSongId (state) {
        return this.curSong.rid || this.curSong.id
      },
      curSong (state) {
        return state.song.curSong
      },
      percent (state) {
        return state.song.percent
      },
      currTime (state) {
        return state.song.curTime
      },
      songList (state) {
        return state.songList.list
      },
      playMode (state) {
        return state.song.playMode
      }
    }),
    currentIndex () {
      const list = this.songList
      if (list.length === 0) return -1
      return list.findIndex((ele, idx) => {
        return ele.rid === this.curSongId
      })
    },
    iconType () {
      switch (this.playMode) {
        case 0:
          return 'icon-danqubofang'
        case 1:
          return 'icon-danquxunhuan'
        case 2:
          return 'icon-shunxu'
        case 3:
          return 'icon-xunhuanbofang'
        case 4:
          return 'icon-bofangye-caozuolan-suijibofang'
      }
    }
  },
  watch: {
    curSongId (curData, lastData) {
      // console.log('curData: ', curData);
      this.is_play = false;
      if (curData) {
        this.curTime = '00:00'
        this.getPlayUrl()
      } else {
        this.is_play = true;
        this.curTime = '00:00'
      }
    }
  },
  created () {
    window.a = this;
    this.getPlayUrl()
  },
  mounted () {
    const audio = this.$refs.audio
    this.is_play = !audio.paused
    if (!this.curSongId) {
      this.is_play = true;
    }
  },
  methods: {
    changeSpeed (index) {
      this.speedIndex = index
      const audio = this.$refs.audio
      const speedArr = [0.5, 0.75, 1, 1.5, 2]
      audio.playbackRate = speedArr[index]
    },
    playBefore () {
      if (this.playMode === 4) {
        this.randomPlay()
        return
      }
      if (this.currentIndex === 0) return
      this.$store.commit('CHANGE_NOW_SONG', this.songList[this.currentIndex - 1])
    },
    playClick () {
      const audio = this.$refs.audio
      this.is_play = !audio.paused
      if (audio.paused) {
        audio.play()
      } else {
        audio.pause()
      }
      // if (this.songList.length === 0) return;
      // this.$store.commit('CHANGE_STATE');
    },
    playAfter () {
      if (this.playMode === 4) {
        this.randomPlay()
        return
      }
      if (this.currentIndex === this.songList.length - 1) return
      this.$store.commit('CHANGE_NOW_SONG', this.songList[this.currentIndex + 1])
    },
    playTimeChange (e) {
      const audio = this.$refs.audio
      audio.currentTime = e || 0
    },
    timeupdate (e) {
      const currTime = e.target.currentTime
      const percent = currTime / this.curSong.duration
      this.curTime = mFormat(currTime)
      this.nowTime = currTime
      this.$store.commit('CUR_TIME', currTime)
      this.$store.commit('PERCENT', percent)
    },
    ended () {
      this.nowTime = 0
      const mode = this.playMode
      if (mode === 0) { // 单曲播放
        this.$store.commit('CHANGE_NOW_SONG', {})
      } else if (mode === 1) { // 单曲循环
        // this.$store.commit('CHANGE_NOW_SONG', this.songList[this.currentIndex])
      } else if (mode === 2) { // 顺序播放
        if (this.currentIndex === this.songList.length - 1) {
          this.$store.commit('CHANGE_NOW_SONG', {})
          return
        }
        this.$store.commit('CHANGE_NOW_SONG', this.songList[this.currentIndex + 1])
      } else if (mode === 3) { // 循环播放
        const index = this.currentIndex === this.songList.length - 1 ? 0 : this.currentIndex + 1
        this.$store.commit('CHANGE_NOW_SONG', this.songList[index])
      } else { // 随机播放
        this.randomPlay()
      }
    },
    randomPlay () {
      const len = this.songList.length
      let randomNum = -1
      while (randomNum < 0) {
        const num = Math.floor(Math.random() * len)
        if (num === this.currentIndex) {
          continue
        } else {
          randomNum = num
        }
      }
      this.$store.commit('CHANGE_NOW_SONG', this.songList[randomNum])
    },
    changeMode (idx) {
      this.$store.commit('CHANGE_MODE', idx)
      this.showMode = false
    },
    changeVolume (e) {
      const audio = this.$refs.audio
      audio.volume = e / 100
      this.$store.commit('CHANGE_VOLUME', e)
    },
    getPlayUrl () {
      const musicUrl = `http://www.kuwo.cn/url?format=mp3&rid=${this.curSongId}&response=url&type=convert_url3&br=128kmp3&from=web&t=${new Date().getTime()}`
      // const infoUrl = `http://www.kuwo.cn/api/www/music/musicInfo?mid=${this.curSongId}`;
      const fn = (res) => {
        return res
      }
      const arr = []
      arr[0] = jsonp(musicUrl).then(fn)
      // arr[1] = jsonp(infoUrl).then(fn);
      Promise.all(arr).then(res => {
        // console.log('res: ', res);
        const playSong = Object.assign({}, this.$store.state.song.curSong)
        playSong.url = res[0].url
        console.log('playSong', playSong)
        this.$store.commit('CHANGE_NOW_SONG', playSong)
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
    // overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 60px;
    width: 0;
    .top{
      font-size: 13px;
      display: flex;
      justify-content: space-between;
      .names{
        width: 78%;
      }
      .time{
        font-size: 12px;
        width: 80px;
        text-align: right;
      }
      .song-info{
        width: 100%;
      }
      .song-info, .time{
        height: 17px;
        line-height: 17px;
        .name{
          max-width: 55%;

        }
        .ar_name{
          max-width: 40%;
        }
        span{
          display: inline-block;
          vertical-align: middle;
        }
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
    width: 385px;
    padding: 0 20px;
    display: flex;
    flex-shrink: 0;
    justify-content: space-between;
    align-items: center;
    i{
      font-size: 18px;
    }
    .speed{

    }
    a{
      font-size: 14px;
      color: rgba(255,255,255, 1);
    }
    button {
      flex: 1;
      flex-shrink: 0;
    }
  }
}
.volume{
  min-width: 40px;
  /deep/.el-slider.is-vertical .el-slider__runway{
    margin: 0px 0 0 5px;
  }
  .el-slider__bar{
    background: #FFD200;
  }
  .el-tooltip.el-slider__button{
    border-color: #FFD200;
  }
}
.icon{
  margin: 0 3px;
}
.mode-list{
  height: 20px;
  line-height: 20px;
  cursor: pointer;
  &:hover{
    background: rgba(0,0,0,0.09);
  }
}
.curMode{
  background: rgba(0,0,0,0.09);
}
</style>