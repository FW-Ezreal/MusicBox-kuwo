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

      </div>
    </div>
</template>
<script>
import Choice from './choice'
import PlayList from './playList'
import Singers from './singers'
import Bang from './bang'
export default {
  components: {
    Choice,
    PlayList,
    Singers,
    Bang
  },
  data () {
    return {
      activeName: 'bang'
    }
  },
  methods: {
    handleClick () {

    }
  }
}
</script>
<style lang="less" scoped>


</style>
