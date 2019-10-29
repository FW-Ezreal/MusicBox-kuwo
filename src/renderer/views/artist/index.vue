<template>
  <div class="">
    <!-- <HeadItem /> -->
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
      ablumInfo: {}
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      const params = {
        url: `http://wapi.kuwo.cn/api/www/artist/artistMusic?artistid=${this.$route.params.id}&pn=1&rn=30`,
        method: 'get'
      }
      this.$http(params).then((res) => {
        console.log('res', res);
        if (res.status === 200) {
          // this.ablumInfo = res.data.data;
          this.musicList = res.data.data.list || [];
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
</style>
