<template>
  <div class="">
    <MvList :list-data="mvList" :from="'album'"></MvList>
  </div>
</template>
<script>
import MvList from '@/components/mv'
export default {
  components: {
    MvList
  },
  data () {
    return {
      mvList: []
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      const params = {
        url: `http://wapi.kuwo.cn/api/www/artist/artistMv?artistid=${this.$route.params.id}&pn=1&rn=28`,
        method: 'get'
      }
      this.$http(params).then((res) => {
        console.log('artistAlbum', res)
        if (res.status === 200) {
          this.mvList = res.data.data.mvlist || []
          console.log('res.data: ', res.data)
          console.log('mvList: ', this.mvList)
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
</style>
