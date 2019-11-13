<template>
  <div class="search-page">
    <div class="desc">搜索到 " <span>{{key}}</span> " 的相关结果</div>
    <ul class="search-tabs">
      <li v-for="(item, index) in tabs" :key="index" @click="changTabs(index)">
        <a :class="{ act: index === tabIndex }" href="javascript:;">
          {{ item }}
        </a>
        <i :class="['tab', index === tabIndex ? 'active' : '']" />
      </li>
    </ul>
    <component :is="tabType"></component>
  </div>
</template>
<script>
import Single from '@/views/searchPage/components/single'
import MV from '@/views/searchPage/components/mv'
import Singer from '@/views/searchPage/components/singer'
import SongList from '@/views/searchPage/components/songList'
import Album from '@/views/searchPage/components/album'

export default {
  components: {
    Single,
    MV,
    Singer,
    SongList,
    Album
  },
  data () {
    return {
      musicList: [],
      tabs: ['单曲', 'MV', '歌单', '歌手', '专辑'],
      tabIndex: 0,
      tabType: 'Single'
    }
  },
  computed: {
    key () {
      return this.$route.params.key
    }
  },
  watch: {
    key () {
      this.init()
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      // console.log('this.$route.params.key', this.$route.params.key);
      const params = {
        url: `http://wapi.kuwo.cn/api/www/search/searchMusicBykeyWord?key=${decodeURIComponent(this.$route.params.key)}&pn=1&rn=100`,
        method: 'get'
      }
      this.$http(params).then(res => {
        // console.log('key res: ', res);
        if (res.status === 200) {
          this.musicList = res.data.data.list || []
        }
      })
    },
    changTabs (index) {
      if (index === this.tabIndex) return
      const tabArr = ['Single', 'MV', 'SongList', 'Singer', 'Album']
      this.tabIndex = index
      this.tabType = tabArr[index]
    }
  }
}
</script>
<style lang="less" scoped>
.search-page{
  .desc{
    height: 30px;
    font-size: 14px;
    line-height: 30px;
    margin-bottom: 20px;
    opacity: 0.9;
    span{
      color: #C77F0E;
    }
  }
  .search-tabs{
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgba(0,0,0, 0.04);
    margin-bottom: 16px;
    li{
      height: 30px;
      font-size: 16px;
      margin-right: 80px;
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
    li:nth-of-type(2) {
      padding-top: 3px;
    }
  }
}
</style>
