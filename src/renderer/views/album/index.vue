<template>
  <div class="">
    <HeadItem :list-info="albumInfo" :from="'album'"/>
    <List :music-list='musicList' :from="'album'" />
  </div>
</template>
<script>
import HeadItem from '@/components/headItem'
import List from '@/components/list'
export default {
  components: {
    HeadItem,
    List
  },
  data () {
    return {
      musicList: [],
      albumInfo: {}
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      const params = {
        url: `http://wapi.kuwo.cn/api/www/album/albumInfo?pn=1&rn=30&albumId=${this.$route.params.id}`,
        method: 'get'
      }
      this.$http(params).then((res) => {
        console.log('res', res)
        if (res.status === 200) {
          this.albumInfo = res.data.data
          this.musicList = res.data.data.musicList || []
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
</style>
