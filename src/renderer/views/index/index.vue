<template>
    <div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="精选" name="choice"></el-tab-pane>
        <el-tab-pane label="歌手" name="singers"></el-tab-pane>
        <el-tab-pane label="排行榜" name="bang"></el-tab-pane>
        <el-tab-pane label="歌单分类" name="playList"></el-tab-pane>
        <el-tab-pane label="音乐现场" name="musicSite"></el-tab-pane>
        <el-tab-pane label="会员专区" name="vip"></el-tab-pane>
      </el-tabs>
      <div class="page-body">
        <Choice v-if="activeName === 'choice'"/>
        <Singers v-if="activeName === 'singers'"/>
        <PlayList v-if="activeName === 'playList'"/>
        <Bang v-if="activeName === 'bang'"/>
        <Xc v-if="activeName === 'xc'"/>
      </div>
    </div>
</template>
<script>
import Choice from './choice'
import PlayList from './playList'
import Singers from './singers'
import Bang from './bang'
import Xc from './xc'
export default {
  components: {
    Choice,
    PlayList,
    Singers,
    Bang,
    Xc
  },
  data () {
    return {
      activeName: 'choice'
    }
  },
  methods: {
    handleClick () {

    }
  }
}
</script>
<style lang="less" scoped>
  /deep/.el-tabs__nav.is-top{
    width: 43%;
    margin: 0 auto;
    float: none;
  }
  /deep/.el-tabs__nav-wrap::after{
    display: none;
  }
  /deep/.el-tabs__item.is-active{
    color: black;
  }
  /deep/.el-tabs__active-bar{
    background-color: #FFD200;
  }
  /deep/.el-tabs__item:hover{
    color: #C77F0E;
  }
</style>
