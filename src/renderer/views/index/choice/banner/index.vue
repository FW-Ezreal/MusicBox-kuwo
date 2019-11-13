<template>
    <div>
      <el-carousel :interval="5000" :autoplay="false" arrow="hover" type="card" :height="height">
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
      focusMap: [],
      height: '176px'
    }
  },
  created () {
    this.init()
    const that = this;
    window.onresize = () => {
      const width = document.getElementsByClassName('page-body')[0].offsetWidth;
      that.height = 176 + (width - 784) * 0.09 + 'px';
      console.log('that.height: ', that.height);
    }
  },
  mounted() {
    const that = this;

    const width = document.getElementsByClassName('page-body')[0].offsetWidth;
    that.height = 176 + (width - 784) * 0.09 + 'px';
  },
  methods: {
    init () {
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
