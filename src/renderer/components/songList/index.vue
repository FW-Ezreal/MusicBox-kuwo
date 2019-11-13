<template>
  <div class="songList">
    <SongListItem class="wrap" v-for="(item, index) in listData" :key="index" :list-data="item" :from="from"/>
  </div>
</template>
<script>
import SongListItem from './songListItem'
export default {
  props: {
    listData: Array,
    from: String
  },
  mounted () {
    console.log('listData11: ', this.listData)
  },
  components: {
    SongListItem
  }
}
</script>
<style lang="less" scoped>
.songList {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -8px;
}
@media screen and (max-width: 1000px) {
  .wrap{
    width: 25%;
  }
}
@media screen and (min-width: 1000px) and (max-width: 1430px){
  .wrap{
    width: 20%;
  }
}

@media screen and (min-width: 1431px) {
  .wrap{
    width: 14.2857%;
  }
}
</style>
