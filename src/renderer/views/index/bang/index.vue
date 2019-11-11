<template>
  <div>
    <div class="rankTabGroup">
      <a v-for="(tab ,index) in tabs" :key="index" class="rank-tab" :class="{cur:iscur === index}" @click="tabChange(index, tab.id)">
        <img :src="tab.img" class="tagLogo">
        <div class="tri-down"></div>
      </a>
    </div>
    <div class="musicList">
      <ul>
        <li v-for="(item, index) in bangMusicList" :key="index" v-show="index < 10">
          <span class="num">{{ sort(index) }}</span>
          <div class="rank-stauts">
            <i class="iconfont" :class="item.hasLossless ? 'icon-upward' : 'icon-downwards'"></i>
            <span>{{ item.rank_change }}</span>
          </div>
          <span class="songName line1" @click="playSong(index)">{{ item.name }}</span>
        </li>
      </ul>
      <ul>
        <li v-for="(item, index) in bangMusicList" :key="index" v-show="index > 9">
          <span class="num">{{ sort(index) }}</span>
          <div class="rank-stauts">
            <template v-if="item.rank_change != '0'">
              <i class="iconfont" :class="[item.hasLossless ? 'icon-upward' : 'icon-downwards', ]"></i>
              <span>{{ item.rank_change }}</span>
            </template>
            <template v-else>
              <i class="iconfont icon-unchanged"></i>
            </template>
          </div>
          <span class="songName line1" @click="playSong(index)">{{ item.name }}</span>
        </li>
      </ul>
    </div>
    <ul class="bangsList">
      <li v-for="(item, index) in allBang" :key="index">
        <p>{{ item.disname }}</p>
        <SongList :list-data="item.child" :from="'bang'" />
      </li>
    </ul>
  </div>
</template>
<script>
import SongList from '@/components/songList';
export default {
  components: {
    SongList
  },
  data() {
    return {
      iscur: 0,
      tabs: [
        {
          img: require('../../../assets/bang/upsong_pic.png'),
          id: 93
        },
        {
          img: require('../../../assets/bang/newsong.png'),
          id: 17
        },
        {
          img: require('../../../assets/bang/hotsong_pic.png'),
          id: 16
        }
      ],
      bangMusicList: [],
      allBang: []
    }
  },
  created() {
    this.getBangList(93);
    this.getAllBang();
  },
  methods: {
    tabChange(index, id) {
      if (index === this.iscur) return;
      this.iscur = index;
      this.getBangList(id);
    },
    getBangList(id) {
      const param = {
        url: ` http://wapi.kuwo.cn/api/www/bang/bang/musicList?bangId=${id}&pn=1&rn=20`,
        method: 'get'
      };
      this.$http(param).then(res => {
        if (res.status === 200) {
          this.bangMusicList = res.data.data.musicList || [];
          console.log('this.bangMusicList: ', this.bangMusicList);
        }
      })
    },
    getAllBang() {
      const param = {
        url: `http://wapi.kuwo.cn/api/pc/bang/list`,
        method: 'get'
      };
      this.$http(param).then(res => {
        if (res.status === 200) {
          this.allBang = res.data.child || [];
          console.log('this.allBang: ', this.allBang);
        }
      })
    },
    sort (index) {
      let idx = parseInt(index) + 1
      idx = idx < 10 ? `0${idx}` : idx
      return idx
    },
    playSong(index) {
      const item = this.bangMusicList[index];
      this.$store.commit('CHANGE_NOW_SONG', item);
      this.$store.commit('ADD', item);
    }
  }

}
</script>
<style lang="less" scope>
.rankTabGroup{
  display:flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  .rank-tab {
     display:block;
     width:33.3%;
     height:56px;
     position:relative;
     cursor: pointer;
    .tagLogo{
      position:absolute;
      top:50%;
      left:50%;
      border: none;
      -webkit-transform:translate(-50%,-50%);
      transform:translate(-50%,-50%);
    }
    .tri-down{
      display:none;
      width:0;
      height:0;
      border-width:10px 10px 0 10px;
      border-style:solid;
      position:absolute;
      left:50%;
      bottom:-8px;
      -webkit-transform:translateX(-50%);
      transform:translateX(-50%);
    }
    &:first-child{
      border-radius:8px 0 0 8px;
      background:url('../../../assets/bang/newestTab.png') no-repeat;
      background-size:100% 100%;
      .tri-down{
        border-color:#5E85D8 transparent transparent transparent;
      }
    }
    &:nth-child(2){
      background:url('../../../assets/bang/hotestTab.png') no-repeat;
      background-size:100% 100%;
        .tri-down{
        border-color:#E65C44 transparent transparent transparent;
      }
    }
    &:last-child{
      border-radius:0px 8px 8px 0;
      background:url('../../../assets/bang/fastestTab.png') no-repeat;
      background-size:100% 100%;
        .tri-down{
        border-color:#F27F47 transparent transparent transparent;
      }
    }
    &.cur{
      .tri-down{
        display:block;
      }
    }
   }
  .rank-tab:hover{
    opacity: 0.9;
  }
  .cur:hover{
    opacity: 1;
  }
}
.musicList{
  display: flex;
  ul{
    width: 50%;
    font-size: 14px;
    li{
      display: flex;
      height: 20px;
      line-height: 20px;
      margin-bottom: 20px;
    }
    .num{
      margin-right: 10px;
    }
    .rank-stauts{
      width: 40px;
      margin-right: 10px;
      i{
        font-size: 13px;
        &.icon-upward{
          color: #C77F0E;
        }
        &.icon-downwards{
          color: rgba(0,0,0,0.7);
        }
        &.icon-unchanged{
          color: rgba(0,0,0,0.7);
        }
      }
      span{
        font-size: 12px;
        opacity: 0.6;
      }
    }
    .songName{
      opacity: 0.8;
      &:hover{
        color: #C77F0E;
        cursor: pointer;
      }
    }
  }
}
.bangsList{
  p{
    height: 20px;
    line-height: 20px;
    font-weight: 600;
    margin: 20px 0;
    font-size: 18px;
  }
}
</style>