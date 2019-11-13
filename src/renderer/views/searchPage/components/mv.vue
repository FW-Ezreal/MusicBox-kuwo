<template>
  <div class="search-page">
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
        url: `http://wapi.kuwo.cn/api/www/search/searchMvBykeyWord?key=${decodeURIComponent(this.$route.params.key)}&pn=1&rn=100`,
        method: 'get'
      }
      this.$http(params).then(res => {
        if (res.status === 200) {
          this.mvList = res.data.data.mvlist || []
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>

</style>
