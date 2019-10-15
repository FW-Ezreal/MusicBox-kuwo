<template>
    <div class="wwrap">
      <div class="playListWrap">
        <div class="cover">
          <img :src="listData.pic" />
            <!-- <div class="play-count">
              <i class="el-icon-service"></i>
              <span>{{item.playCount|changeCount}}</span>
            </div> -->
            <div class="bg"></div>
            <span class="listenNum">{{ disposeCnt(listData.playcnt) }}</span>
        </div>
      </div>
      <div class="title line2">{{ listData.name }}</div>
    </div>
</template>
<script>
import { banner } from '@/api';
import { formatListenNum } from '@/comment/tools'
export default {
  props: {
    listData: Object
  },
  data() {
    return {
    }
  },
  created() {
  },
  methods: {
    disposeCnt(cnt) {
      return formatListenNum(cnt);
    }
  }
}
</script>
<style lang="less" scoped>
  .wwrap{
    padding: 0 8px
  }
  .playListWrap{
    width: 100%;
    padding-top: 100%;
    position: relative;
  }
  .cover{
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    img{
      width: 100%;
      height: 100%;
    }
    .listenNum{
      position: absolute;
      bottom: 2px;
      left: 2px;
      height: 18px;
      line-height: 18px;
      font-size: 12px;
      color: white;
      padding-left: 20px;
      background: url('../../assets/search_play_w.png') 1px -2px no-repeat;
      background-size: 20px;
      z-index: 10;
    }
    .bg{
      position: absolute;
      bottom: 0px;
      left: 0px;
      width: 100%;
      height: 70px;
      background: url('../../assets/splice.png') no-repeat;
      background-size: cover;
    }
  }
  .title{
    padding: 4px 0 16px 0;
    font-size: 12px;
  }
</style>
