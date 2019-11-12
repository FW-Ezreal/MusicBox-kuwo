<template>
    <div>
      <Banner/>
      <div class="title">个性化推荐</div>
      <Recommend/>
    </div>
</template>
<script>
import Banner from './banner'
import Recommend from './recommend'
export default {
  components: {
    Banner,
    Recommend
  },
  data () {
    return {
      activeName: 'choice',
      focusMap: []
    }
  },
  created () {
  },
  methods: {

  }
}
</script>
<style lang="less" scoped>
  .title{
    margin: 10px 0;
  }
</style>
