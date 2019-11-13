<template>
  <div class="search-page">
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
        url: `http://wapi.kuwo.cn/api/www/search/searchAlbumBykeyWord?key=${decodeURIComponent(this.$route.params.key)}&pn=1&rn=100`,
        method: 'get'
      }
      this.$http(params).then(res => {
        // console.log('key res: ', res);
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
