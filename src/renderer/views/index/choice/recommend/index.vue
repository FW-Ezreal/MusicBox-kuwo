<template>
  <SongList :list-data="playList"/>
</template>
<script>
// import { gxh } from '@/api'
import SongList from '@/components/songList'
export default {
  components: {
    SongList
  },
  data () {
    return {
      activeName: 'choice',
      playList: []
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      const param = {
        url: 'http://mgxhtj.kuwo.cn/mgxh.s?type=rcm_keyword_playlist&apiv=1',
        method: 'get'
        // data: {
        //   type: 'rcm_keyword_playlist',
        //   apiv: 1
        // }
      }
      this.$http(param).then(res => {
        console.log('res1', res)
        if (res.status === 200) {
          this.playList = res.data.playlist || []
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>

</style>
