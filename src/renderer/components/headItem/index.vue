<template>
  <div class="header-wrap">
    <div class="img">
      <img v-lazy="listInfo.pic">
    </div>
    <div class="right">
      <h1 class="title line1">{{ listInfo.title}}</h1>
      <div class="info">
        <img src="">
        <span class="user-name"></span>
      </div>
      <div>
        <PlayAll/>
      </div>
      <!-- <div class="subtitle">{{ listInfo.info }}</div> -->
    </div>
  </div>
</template>
<script>
import PlayAll from '@/components/buttons/playAll.vue';
export default {
  props: {
    listInfo: Object,
  },
  components: {
    PlayAll
  },
  watch: {
    listInfo(curdata) {
      console.log('curdata: ', curdata);
    }
  },
  created() {
    console.log('listInfo: ', this.listInfo);
  },
  methods: {

  }
}
</script>
<style lang="less" scoped>
.header-wrap{
  display: flex;
  .img{
    width: 180px;
    height: 180px;
    margin-right: 20px;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .right{
    flex: 1;
    overflow: hidden;
    h1{
      height: 38px;
      line-height: 38px;
      font-size: 26px;
    }
    .title{
      height: 37px;
      line-height: 37px;
    }
  }

}
</style>
