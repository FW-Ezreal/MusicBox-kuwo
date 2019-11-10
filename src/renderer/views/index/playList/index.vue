<template>
  <div>
    <div class="classify-top">
      <div class="classify">
        <span>{{ nowTitle }}</span>
        <i class="vertical-arrow"></i>
      </div>
      <div class="hot-new">
        <span class="active">最热</span>
        <span>最新</span>
      </div>
    </div>
    <!-- <ul>
      <li v-for=""></li>
    </ul> -->
    <SongList :list-data="playListData" :from="'playList'"/>
  </div>
</template>
<script>
import SongList from '@/components/songList'
export default {
  components: {
    SongList
  },
  data () {
    return {
      playListData: [],
      nowTitle: '选择分类'
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      const param = {
        url: 'http://wapi.kuwo.cn/api/pc/classify/playlist/getRcmPlayList?pn=1&rn=100&order=new',
        method: 'get'
      }
      this.$http(param).then(res => {
        if (res.status === 200) {
          this.playListData = res.data.data.data || [];
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
  .classify-top{
    display: flex;
    justify-content: space-between;
    margin-bottom: 28px;
    .classify{
      font-weight: 600;
      height: 22px;
      font-size: 15px;
      line-height: 22px;
      padding-right: 14px;
      cursor: pointer;
        i{
          position: relative;
          display: inline-block;
          top: -3px;
          left: 8px;
          width: 8px;
          height: 8px;
          border: 1px solid;
          border-top-width: 0;
          border-left-width: 0;
          transform: rotate(45deg);
        }
    }
    .hot-new{
      font-size: 12px;
      width: 88px;
      height: 22px;
      font-size: 12px;
      line-height: 22px;
      border-radius: 11px;
      background: rgba(0, 0, 0, 0.06);
      span{
        display: inline-block;
        width: 42px;
        text-align: center;
        border-radius: 11px;
        cursor: pointer;
        &.active{
          background: #fff;
        }
      }
    }
  }
</style>
