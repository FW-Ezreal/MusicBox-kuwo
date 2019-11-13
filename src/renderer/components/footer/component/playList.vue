<template>
  <div class="playlist">
    <div class="listTop">
      <div class="top">
        <div class="title">播放队列</div>
        <div class="act-grid">
            <div class="act-item">30首歌曲</div>
            <div class="act-item"><i class="iconfont icon-piliangchuli"></i>批量操作</div>
            <div class="act-item"><i class="iconfont icon-qingkong"></i>清空</div>
        </div>
      </div>
      <el-scrollbar class="scrollbar">
        <div class="song-item" v-for="i in 20" :key="i">
          <div class="name">天涯过客</div>
          <div class="info">
            <span class="singler">周杰伦</span>
            <span class="time">04:13</span>
          </div>
          <div class="icon">
            <!-- :class="{'icon-zanting1':item.id===song.id}" -->
            <i class="iconfont icon-bofangsanjiaoxing" @click="play()"></i>
            <i class="iconfont icon-shoucang"></i>
          </div>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    play () {

    }
  }
}
</script>
<style lang="less" scoped>
.playlist{
    display: flex;
    justify-content: flex-end;
    height: 650px;
    width: 300px;
    background-color: transparent;
    z-index: 10;
    .listTop{
      background-color: #fff;
      width: 300px;
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
        padding: 10px 20px;
        border-bottom: 1px #f4f4f4 solid;
        position: relative;
        background: #fff;
        .name{
          width: 220px;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
        .info{
          display: flex;
          margin-top: 5px;
          font-size: 13px;
          justify-content: space-between;
          z-index: 1;
          .singer{
            color: #666;
          }
          .time{
            color: #aaa;
          }
        }
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