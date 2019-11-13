<template>
  <div class="songList">
    <MvItem class="wrap" v-for="(item, index) in listData" :key="index" :list-data="item"/>
  </div>
</template>
<script>
import MvItem from './components/mvItem'
export default {
  components: {
    MvItem
  },
  props: {
    listData: Array
  },
  mounted () {
  }
}
</script>
<style lang="less" scoped>
.songList {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -8px;
}
@media screen and (max-width: 1430px) {
  .wrap{
    width: 25%;
  }
}
@media screen and (min-width: 1431px){
  .wrap{
    width: 20%;
  }
}

// @media screen and (min-width: 1431px) {
//   .wrap{
//     width: 14.2857%;
//   }
// }
</style>
