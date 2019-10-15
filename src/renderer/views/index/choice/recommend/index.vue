<template>
    <div class="playList">
      <SongList class="wrap" v-for="(item, index) in playList" :key="index" :list-data="item"/>
    </div>
</template>
<script>
import { gxh } from '@/api';
import SongList from '@/components/songList';
export default {
  components: {
    SongList
  },
  data() {
    return {
      activeName: 'choice',
      playList: []
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      const param = {
        url: 'http://mgxhtj.kuwo.cn/mgxh.s?type=rcm_keyword_playlist&apiv=1',
        method: 'get',
        // data: {
        //   type: 'rcm_keyword_playlist',
        //   apiv: 1
        // }
      }
      this.$http(param).then(res => {
        console.log('res1', res)
        if (res.status === 200) {
          this.playList = res.data.playlist || [];
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
  .playList {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -8px;
  }
  @media screen and (max-width: 1000px) {
    .wrap{
      width: 25%;
    }
  }
  @media screen and (min-width: 1000px) {
    .wrap{
      width: 20%;
    }
  }
</style>
