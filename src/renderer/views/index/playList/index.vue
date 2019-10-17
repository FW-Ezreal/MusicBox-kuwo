<template>
  <div>
    <SongList :list-data="playListData"/>
  </div>
</template>
<script>
import SongList from '@/components/songList';
export default {
  components: {
    SongList
  },
  data() {
    return {
      playListData: []
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      const param = {
        url: 'http://wapi.kuwo.cn/api/pc/classify/playlist/getRcmPlayList?pn=1&rn=100&order=new',
        method: 'get',
      };
      // this.$http(param).then(res => {
      //   console.log(res);
      //   if (res.status === 200) {
      //     this.playListData = res.data.data.data || [];
      //     console.log('this.playListData: ', this.playListData);
      //   }
      // })
    }
  }
}
</script>
<style lang="less" scoped>

</style>
