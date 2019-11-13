<template>
  <div class="">
    <HeadItem :list-info="singerInfo" :from="'artist'" />
    <ul>
      <li
        v-for="(item, index) in tabs"
        :key="index"
        @click="changeIndex(index)">
        <a :class="{ act: index === tabIndex }" href="javascript:;">
          {{ item }}
        </a>
        <i :class="['tab', index === tabIndex ? 'active' : '']" />
      </li>
    </ul>
    <Btns class="buttons" @playAll="playAll" v-if="tabIndex === 0"/>
    <component :is="nowComponent" :music-list='musicList' :from="'artist'"/>
  </div>
</template>
<script>
import HeadItem from '@/components/headItem'
import List from '@/components/list'
import Btns from '@/components/buttons/playAll'
import AlbumList from './components/albums'
import Mv from './components/mv'
import Info from './components/introduction'
export default {
  components: {
    HeadItem,
    List,
    Btns,
    AlbumList,
    Mv,
    Info
  },
  data () {
    return {
      musicList: [],
      singerInfo: {},
      tabs: ['单曲', '专辑', 'MV', '简介', '评论', '相似歌手'],
      tabIndex: 0,
      from: 'artist'
    }
  },
  computed: {
    nowComponent () {
      switch (this.tabIndex) {
        case 0:
          return 'List'
        case 1:
          return 'AlbumList'
        case 2:
          return 'Mv'
        case 3:
          return 'Info'
        case 4:
      }
    },
    id () {
      return this.$route.params.id
    }
  },
  watch: {
    id () {
      console.log('aa');
      this.init();
      this.getArtistInfo()
      this.tabIndex = 0,
      this.from = 'artist'
    }
  },
  created () {
    this.init()
    this.getArtistInfo()
  },
  methods: {
    init () {
      const params = {
        url: `http://wapi.kuwo.cn/api/www/artist/artistMusic?artistid=${this.$route.params.id}&pn=1&rn=30`,
        method: 'get'
      }
      this.$http(params).then((res) => {
        console.log('artistMusic', res)
        if (res.status === 200) {
          // this.ablumInfo = res.data.data;
          this.musicList = res.data.data.list || []
          // console.log("TCL: init -> this.musicList", this.musicList)
        }
      })
    },
    getArtistInfo () {
      const params = {
        url: `http://wapi.kuwo.cn/api/www/artist/artist?artistid=${this.$route.params.id}`,
        method: 'get'
      }
      this.$http(params).then((res) => {
        // console.log('getArtistInfo', res);
        if (res.status === 200) {
          // this.ablumInfo = res.data.data;
          this.singerInfo = res.data.data || []
          // console.log("TCL: getArtistInfo -> this.singerInfo", this.singerInfo)
        }
      })
    },
    changeIndex (index) {
      this.tabIndex = index
    },
    playAll () {
      this.$store.commit('PLAY_ALL', this.musicList)
      this.$store.commit('CHANGE_NOW_SONG', this.musicList[0])
    }
  }
}
</script>
<style lang="less" scoped>
  ul{
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgba(0,0,0, 0.04);
    margin-bottom: 16px;
    li{
      height: 30px;
      font-size: 16px;
      margin-right: 50px;
      text-align: center;
      a{
        opacity: 0.7;
        &.act{
          font-weight: 600;
          opacity: 0.95;
        }
      }

      .active{
        display: block;
        margin: 6px auto 0;
        width: 20px;
        height: 3px;
        background: #FFD200;
        border-radius: 6px;
      }
    }
    li:nth-of-type(3) {
      padding-top: 3px;
    }
  }
  .buttons{
    margin-bottom: 14px;
  }

</style>
