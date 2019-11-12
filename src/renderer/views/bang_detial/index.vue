<template>
  <div class="">
    <HeadItem :list-info="listInfo" :from="'bang'"/>
    <List :music-list="musicList" :from="'bang'"/>
  </div>
</template>
<script>
import HeadItem from '@/components/headItem';
import List from '@/components/list';
import { getValue } from '@/common/tools';
import { get } from 'https';
export default {
  components: {
    List,
    HeadItem
  },
  data() {
    return{
      musicList: [],
      listInfo: {}
    }
  },
  computed: {
    
  },
  watch: {
    
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      const url = decodeURIComponent(window.location.href);
      const id = getValue(url, '&', 'id');
      const name = getValue(url, '&', 'name');
      const img = getValue(url, '&', 'img');
      console.log('img: ', img);
      const params = {
        url: `http://wapi.kuwo.cn/api/www/bang/bang/musicList?bangId=${id}&pn=1&rn=30`,
        method: 'get'
      }
      this.$http(params).then(res => {
        console.log('bang res: ', res.data.data);
        if (res.status === 200) {
          this.listInfo = {
            name,
            pic:img,
            pub: res.data.data.pub,
            musicList: res.data.data.musicList || []
          }
          this.musicList = res.data.data.musicList || [];
        }
      });
    },

  }
}
</script>
<style lang="less" scoped>
</style>
