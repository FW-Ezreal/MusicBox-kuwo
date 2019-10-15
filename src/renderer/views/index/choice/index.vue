<template>
    <div>
      <Banner/>
      <Recommend/>
    </div>
</template>
<script>
import Banner from './banner';
import Recommend from './recommend';
export default {
  components: {
    Banner,
    Recommend
  },
  data() {
    return {
      activeName: 'choice',
      focusMap: []
    }
  },
  created() {
  },
  methods: {
    
  }
}
</script>
<style lang="less" scoped>

</style>
