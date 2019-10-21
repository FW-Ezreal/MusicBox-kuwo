<template>
    <div>
      <el-carousel :interval="5000" :autoplay="false" arrow="hover" type="card" height="176px">
        <el-carousel-item v-for="(item, index) in focusMap" :key="index">
          <img :src="item.pic">
        </el-carousel-item>
      </el-carousel>
    </div>
</template>
<script>
import { banner } from '@/api'
export default {
  data () {
    return {
      activeName: 'choice',
      focusMap: []
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      console.log('bannerUrl: ', banner)
      const param = {
        url: banner,
        method: 'get'
      }
      this.$http(param).then(res => {
        console.log('res', res)
        if (res.status === 200) {
          this.focusMap = res.data.data.focusPicture.list || []
          console.log('this.focusMap: ', this.focusMap)
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
  .el-carousel__item{
  }
  img{
    width: 100%;
    height: 100%;
  }
</style>
