<template>
  <div class="playlist">
    <div class="listTop">
      <div class="top">
        <div class="title">播放队列</div>
        <div class="act-grid">
            <div class="act-item">{{ `${songList.length}首歌曲` }}</div>
            <div class="act-item"><i class="iconfont icon-piliangchuli"></i>批量操作</div>
            <div class="act-item" @click="clearSongList"><i class="iconfont icon-qingkong"></i>清空</div>
        </div>
      </div>
      <el-scrollbar class="scrollbar">
        <div class="song-item" v-for="(item, index) in songList" :key="index" @dblclick="play(item)">
          <div class="num">{{ index + 1 }}</div>
          <div class="name line1" :style="{color: item.rid == curSongId ? '#C77F0E' : ''}" @click="play(item)">{{ item.name }}</div>
          <!-- <div class="info"> -->
          <span class="singer line1" :title="item.artist" @click="toArtist(item.artistid)">{{ item.artist }}</span>
            <!-- <span class="time">{{ time(item.duration) }}</span> -->
          <!-- </div> -->
          <!-- <div class="icon">
            <i class="iconfont icon-bofangsanjiaoxing" @click="play(item)"></i>
            <i class="iconfont icon-shoucang"></i>
          </div> -->
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { mFormat } from '@/common/tools.js'
export default {
  data () {
    return {

    }
  },
  computed: {
    ...mapState({
      songList (state) {
        return state.songList.list
      },
      curSongId (state) {
        return state.song.curSong.rid
      }
    })
  },
  methods: {
    play (item) {
      const nowRid = item.rid
      const index = this.songList.findIndex((ele) => {
        return ele.rid === nowRid
      })
      this.$store.commit('CHANGE_NOW_SONG', this.songList[index])
    },
    time (duration) {
      return mFormat(duration)
    },
    clearSongList () {
      this.$store.commit('CLEAR')
      this.$store.commit('CHANGE_NOW_SONG', {})
    },
    toArtist (id) {
      this.$router.push({name: 'artist', params: {id}})
    }
  }
}
</script>
<style lang="less" scoped>
.playlist{
    display: flex;
    justify-content: flex-end;
    height: 550px;
    width: 400px;
    background-color: transparent;
    z-index: 10;
    .listTop{
      background-color: #fff;
      width: 400px;
      display: flex;
      flex-direction: column;
      //box-shadow: -5px -5px 15px rgba(0,0,0,0.2);
      .top{
        height: 80px;
        background: #f8f8f8;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding:0 20px;
        .act-grid{
          display: flex;
          font-size:12px;
          justify-content: space-between;
          color:#666;
          margin-top: 5px;
          .act-item{
            cursor: pointer;
            display: flex;
            align-items: center;
          }
        }
      }
    }
    .scrollbar{
      flex: 1;
      /deep/.el-scrollbar__wrap{
        overflow-x: hidden;
      }
      .song-item{
        font-size: 14px;
        height: 44px;
        // padding: 10px 20px;
        line-height: 44px;
        border-bottom: 1px #f4f4f4 solid;
        position: relative;
        background: #fff;
        display: flex;
        cursor: pointer;
        .num{
          width: 50px;
          text-align: center;
        }
        .name{
          width: 250px;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
        .singer{
          width: 100px;
          color: #666;
        }
        // .time{
        //   color: #aaa;
        // }
        .icon{
          position: absolute;
          width: 80px;
          background: #fafafa;
          height: 63px;
          display: flex;
          justify-content: flex-end;
          right: 0;
          top:0;
          bottom: 0;
          border-bottom: 1px solid #f4f4f4;
          align-items: center;
          /*display: none;*/
          z-index: -1;
          padding-right: 20px;
          box-sizing: border-box;
          .iconfont{
              margin-left:5px;
              font-size: 17px;
          }
          .iconfont:hover{
              cursor: pointer;
              color: #31C27C;
          }
        }
      }
      .song-item:hover{
        .icon {
          z-index: 1;
        }
      }
    }
}
</style>