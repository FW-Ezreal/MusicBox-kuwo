<template>
  <div class="songList">
    <ul>
      <li v-for="(item, index) in listData" :key="index">

      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    listData: Array,
  },
  mounted () {
  },
  components: {
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
