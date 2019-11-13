<template>
  <div class="wwrap">
    <div class="playListWrap" :class="from">
      <div class="cover">
        <template v-if="from === 'playList' || from === 'index'">
          <img v-lazy="pic" />
          <div class="bg" v-if="!listData.rcm"></div>
          <span class="listenNum" v-if="!listData.rcm">{{ disposeCnt }}</span>
          <div class="date" v-if="listData.rcm" @click="toRcm">
            <div class="day">{{ day }}</div>
            <div class="month">{{ month }}</div>
            <div class="disc">每日推荐</div>
          </div>
        </template>
        <template v-if="from === 'album'">
          <img class="album-img" v-lazy="pic" />
        </template>
        <template v-if="from === 'bang'">
          <img class="album-img" v-lazy="listData.pic5" />
        </template>
      </div>
      <div class="cap" @click="toSongListDetails(listData)" v-if="!listData.rcm">
        <a href="javascript:;"></a>
      </div>
      <i v-if="from === 'album'" class="cd"/>
    </div>
    <div class="title line2 hover" v-if="from === 'playList' || from === 'index'" @click="toSongListDetails(listData)"> {{ listData.name }}</div>
    <div class="" v-if="from === 'album'">
      <div class="main-text line1" v-html="listData.album" @click="toAlbum(listData.albumid)"></div>
      <div class="sub-title">{{ listData.releaseDate }}</div>
    </div>
    <div class="" v-if="from === 'bang'">
      <div class="main-text line1" v-html="listData.disname" @click="toBangDetial(listData)"></div>
      <div class="sub-title">{{ listData.pubTime }}</div>
    </div>
  </div>
</template>
<script>
import { formatListenNum } from '@/common/tools'
export default {
  props: {
    listData: Object,
    from: String
  },
  data () {
    return {
      day: '',
      month: ''
    }
  },
  computed: {
    disposeCnt () {
      const cnt = this.listData.playcnt || this.listData.listencnt || 0
      return formatListenNum(cnt)
    },
    name () {
      return this.listData.name || ''
    },
    pic () {
      return this.listData.pic || this.listData.img
    }
  },
  created () {
    this.getCurDate()
  },
  methods: {
    toSongListDetails (listData) {
      if (this.from === 'playList' || this.from === 'index') {
        const id = this.listData.id || listData.playlist_id || 0
        console.log('this.listData: ', this.listData)
        if (listData.rcm) {
          this.$router.push({name: 'rcm'})
          return
        }
        if (!id) {
          this.$message({
            message: '歌单id错误',
            type: 'error',
            center: true
          })
        } else {
          this.$router.push({name: 'playlist_detail', params: {id}})
        }
      } else if (this.from === 'album') {
        this.$router.push({name: 'album', params: { id: listData.albumid }})
      }
    },
    toAlbum (id) {
      this.$router.push({ name: 'album', params: { id } })
    },
    toBangDetial (data) {
      const { sourceid, disname, pic5 } = data
      this.$router.push({name: 'bangDetial', query: { id: sourceid, name: disname, img: pic5 }})
    },
    toRcm () {
      this.$router.push({name: 'rcm'})
    },
    getCurDate () {
      const date = new Date()
      let day = date.getDate()
      day = day < 10 ? `0${day}` : day
      this.day = day
      const month = date.getMonth()
      const monthArr = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.']
      this.month = monthArr[month]
      // // 908新增刷新时间
      // setTimeout(() => {
      //   if (this.firstCome < 30) {
      //     this.getCurDate();
      //     this.firstCome++;
      //   } else {
      //     const nowDate = new Date();
      //     const hour = nowDate.getHours();
      //     const minutes = nowDate.getMinutes();
      //     const second = nowDate.getSeconds() + 1;
      //     const time = hour*3600 + minutes*60 + second - 1;
      //     const diff = this.dayTime - time;
      //     setTimeout(() => {
      //       this.getCurDate();
      //     }, diff*1000)
      //   }
      // }, 5000);
    }
  }
}
</script>
<style lang="less" scoped>
  .wwrap{
    cursor: default;
    padding: 0 8px
  }
  .playListWrap{
    width: 100%;
    padding-top: 100%;
    position: relative;
    &.album{
      width: 90%;
      padding-top: 90%;
    }
  }
  .cover{
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    
    img{
      width: 100%;
      height: 100%;
    }
    .listenNum{
      position: absolute;
      bottom: 2px;
      left: 2px;
      height: 18px;
      line-height: 18px;
      font-size: 12px;
      color: white;
      padding-left: 20px;
      background: url('../../assets/search_play_w.png') 1px -2px no-repeat;
      background-size: 20px;
      z-index: 10;
    }
    .bg{
      position: absolute;
      bottom: 0px;
      left: 0px;
      width: 100%;
      height: 70px;
      background: url('../../assets/splice.png') no-repeat;
      background-size: cover;
    }
    .date{
      position: absolute;
      top: 0;
      color: rgba(255,255,255,0.9);
      background: rgba(0,0,0,0.12);
      width: 100%;
      height: 100%;
      cursor: pointer;
      .day{
        height: 42px;
        font-size: 36px;
        line-height: 42px;
        margin-top: 24%;
        padding: 0 7%;
      }
      .month{
        padding: 0 8%;
        margin-top: 10px;
        font-size: 17px;
      }
      .disc{
        padding: 0 8%;
        position: absolute;
        bottom: 10%;
      }
    }
  }
  .cap{
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    cursor: pointer;
    opacity: 0;
    z-index: 10;
    background: rgba(0, 0, 0, 0.5);
    transition: opacity 0.5s;
    &:hover{
      opacity: 1;
    }
    a{
      width: 34px;
      height: 34px;
      position: absolute;
      right: 13px;
      bottom: 13px;
      background: url('../../assets/i_play_big.png') no-repeat;
      background-size: cover;
    }
  }
  .cd{
    position: absolute;
    top: 8%;
    left: 88%;
    width: 100%;
    height: 100%;
    z-index: -1;
    background: url('../../assets/cd.png') no-repeat;
  }
  .title{
    padding: 4px 0 16px 0;
    font-size: 14px;
  }
  .main-text{
    margin-top: 8px;
    opacity: 0.8;
    height: 22px;
    line-height: 22px;
    font-size: 14px;
    cursor: pointer;
    &:hover{
      color: #C77F0E;
    }
  }
  .sub-title{
    margin: 4px 0 16px;
    font-size: 12px;
    opacity: 0.6;
    height: 22px;
    line-height: 22px;
  }
</style>
