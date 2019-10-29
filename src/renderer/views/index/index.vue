<template>
    <div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="精选" name="choice"></el-tab-pane>
        <el-tab-pane label="歌手" name="singer"></el-tab-pane>
        <el-tab-pane label="歌单分类" name="playList"></el-tab-pane>
      </el-tabs>
      <div class="page-body">
        <Choice v-if="activeName === 'choice'" />
        <PlayList v-if="activeName === 'playList'" />
      </div>
    </div>
</template>
<script>
import Choice from './choice'
import PlayList from './playList'
export default {
  components: {
    Choice,
    PlayList
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


</style>
