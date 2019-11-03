<template>
  <div class="">
    <HeadItem :list-info="singerInfo" :from="'artist'" />
    <List :music-list='musicList' :from="'artist'" />
  </div>
</template>
<script>
import HeadItem from '@/components/headItem';
import List from '@/components/list';
export default {
  components: {
    HeadItem,
    List
  },
  data() {
    return{
      musicList: [],
      singerInfo: {}
    }
  },
  created() {
    this.init();
    this.getArtistInfo();
  },
  methods: {
    init() {
      const params = {
        url: `http://wapi.kuwo.cn/api/www/artist/artistMusic?artistid=${this.$route.params.id}&pn=1&rn=30`,
        method: 'get'
      }
      this.$http(params).then((res) => {
        console.log('artistMusic', res);
        if (res.status === 200) {
          // this.ablumInfo = res.data.data;
          this.musicList = res.data.data.list || [];
          console.log("TCL: init -> this.musicList", this.musicList)
        }
      })
    },
    getArtistInfo() {
      const params = {
        url: `http://wapi.kuwo.cn/api/www/artist/artist?artistid=${this.$route.params.id}`,
        method: 'get'
      }
      this.$http(params).then((res) => {
        console.log('getArtistInfo', res);
        if (res.status === 200) {
          // this.ablumInfo = res.data.data;
          this.singerInfo = res.data.data || [];
          console.log("TCL: getArtistInfo -> this.singerInfo", this.singerInfo)
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
</style>
