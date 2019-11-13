<template>
  <SongList :list-data="playList" :from="'index'"/>
</template>
<script>
import SongList from '@/components/songList'
export default {
  components: {
    SongList
  },
  data () {
    return {
      activeName: 'choice',
      playList: [],
      rcmList: {
        pic: 'http://kwimg3.kuwo.cn/star/upload/42/4/1551686998992_.png',
        name: '每日单曲推荐',
        rcm: 1
      }
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      const param = {
        url: 'http://mgxhtj.kuwo.cn/mgxh.s',
        method: 'get',
        params: {
          type: 'rcm_keyword_playlist',
          apiv: 1
        }
      }
      this.$http(param).then(res => {
        console.log('res1', res)
        if (res.status === 200) {
          const playList = res.data.playlist || []
          playList.unshift(this.rcmList)
          this.playList = playList
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>

</style>
