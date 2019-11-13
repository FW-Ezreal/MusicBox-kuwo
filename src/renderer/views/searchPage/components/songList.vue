<template>
  <div class="search-page">
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
      playListData: []
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
      const params = {
        url: `http://wapi.kuwo.cn/api/www/search/searchPlayListBykeyWord?key=${decodeURIComponent(this.$route.params.key)}&pn=1&rn=100`,
        method: 'get'
      }
      this.$http(params).then(res => {
        if (res.status === 200) {
          this.playListData = res.data.data.list || []
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>

</style>
