<template>
  <div>
    <div class="rankTabGroup">
      <a v-for="(tab ,index) in tabs" :key="index" class="rank-tab" :class="{cur:iscur === index}" @click="tabChange(index, tab.id)">
        <img :src="tab.img" class="tagLogo">
        <div class="tri-down"></div>
      </a>
    </div>
    <ul>
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
        url: ` http://wapi.kuwo.cn/api/www/bang/bang/musicList?bangId=${id}&pn=1&rn=30`,
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
    }
  }

}
</script>
<style lang="less" scope>
.rankTabGroup{
  display:flex;
  justify-content: space-between;
  align-items: center;
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
</style>