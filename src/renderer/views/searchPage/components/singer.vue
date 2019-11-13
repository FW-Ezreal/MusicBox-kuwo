<template>
  <div class="search-page">
    <ArtistList :artist-list="artistList" :from="'artist'"/>
  </div>
</template>
<script>
// import List from '@/components/list';
import ArtistList from '@/components/artistList'

export default {
  components: {
    ArtistList
  },
  data () {
    return {
      artistList: []
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
        url: `http://wapi.kuwo.cn/api/www/search/searchArtistBykeyWord?key=${decodeURIComponent(this.$route.params.key)}&pn=1&rn=100`,
        method: 'get'
      }
      this.$http(params).then(res => {
        // console.log('key res: ', res);
        if (res.status === 200) {
          this.artistList = res.data.data.artistList || []
          console.log('TCL: init -> this.artistList', this.artistList)
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>

</style>
