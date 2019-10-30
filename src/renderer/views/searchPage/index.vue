<template>
  <div class="">
    <List :music-list="musicList" :from="'search'"/>
  </div>
</template>
<script>
import List from '@/components/list';
export default {
  components: {
    List
  },
  data() {
    return{
      musicList: []
    }
  },
  computed: {
    key() {
      return this.$route.params.key;
    }
  },
  watch: {
    key() {
      this.init();
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      // console.log('this.$route.params.key', this.$route.params.key);
      const params = {
        url: `http://wapi.kuwo.cn/api/www/search/searchMusicBykeyWord?key=${decodeURIComponent(this.$route.params.key)}&pn=1&rn=30`,
        method: 'get'
      }
      this.$http(params).then(res => {
        // console.log('key res: ', res);
        if (res.status === 200) {
          this.musicList = res.data.data.list || [];
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
</style>
