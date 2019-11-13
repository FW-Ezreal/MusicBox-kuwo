<template>
  <div class="">
    <AlbumList :list-data="albumList" :from="'album'"></AlbumList>
  </div>
</template>
<script>
import AlbumList from '@/components/songList'
export default {
  components: {
    AlbumList
  },
  data () {
    return {
      albumList: []
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      const params = {
        url: `http://wapi.kuwo.cn/api/www/artist/artistAlbum?artistid=${this.$route.params.id}&pn=1&rn=28`,
        method: 'get'
      }
      this.$http(params).then((res) => {
        console.log('artistAlbum', res)
        if (res.status === 200) {
          this.albumList = res.data.data.albumList || []
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
</style>
