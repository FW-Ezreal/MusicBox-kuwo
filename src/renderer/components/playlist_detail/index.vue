<template>
  <div class="list">
    <ListHead :list-info="listInfo"/>
    <ListItem :music-list="musicList"/>
  </div>
</template>
<script>
import ListItem from '@/components/list';
import ListHead from './components/listHead';
export default {
  components: {
    ListItem,
    ListHead
  },
  data() {
    return {
      musicList: [],
      listInfo: {}
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      const params = {
        url: `http://nplserver.kuwo.cn/pl.svc?op=getlistinfo&pid=${this.$route.params.id}&pn=0&rn=100&encode=utf8&keyset=pl2012&identity=kuwo&pcmp4=1&vipver=MUSIC_9.0.6.0_BCS27&newver=1`,
        method: 'get'
      }
      this.$http(params).then(res => {
        console.log('playlist', res)
        if (res.status === 200) {
          this.listInfo = res.data || {};
          this.musicList = res.data.musiclist || [];
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>

</style>
