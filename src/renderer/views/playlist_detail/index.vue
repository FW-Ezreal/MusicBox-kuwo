<template>
  <div class="list">
    <HeadItem :list-info="listInfo"/>
    <ListItem :music-list="musicList"/>
  </div>
</template>
<script>
import ListItem from '@/components/list';
import HeadItem from '@/components/headItem'
import jsonp from '@/untils/jsonp'
export default {
  components: {
    ListItem,
    HeadItem
  },
  data () {
    return {
      musicList: [],
      listInfo: {}
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      const params = {
        url: `http://wapi.kuwo.cn/api/www/playlist/playListInfo?rn=30&pn=1&pid=${this.$route.params.id}`,
        method: 'get'
      }
      this.$http(params).then(res => {
        console.log('playlist', res)
        if (res.status === 200) {
          this.listInfo = res.data.data || {};
          this.musicList = res.data.data.musicList || [];
        }
      });
      // const baseDataurl = `http://mobilebasedata.kuwo.cn/basedata.s?type=get_songlist_info2&prod=MUSIC_9.0.6.0_BCS28&f=web&id=${this.$route.params.id}`;
      // jsonp(baseDataurl, {}, {data}).then(res => {
      //   let json;
      //   if (typeof (res.data) === 'string') {
      //     json = eval('(' + res.data + ')');
      //   } else {
      //     json = res.data;
      //   }
      // })
    }

  }
}
</script>
<style lang="less" scoped>

</style>
