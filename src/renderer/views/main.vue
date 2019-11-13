<template>
    <div class="">
        <el-container class="container">
            <el-container>
                <el-aside class="aside" width="200px">
                  <Aside />
                </el-aside>
                <el-container>
                    <el-header class="head" height="58px">
                        <Header></Header>
                    </el-header>
                    <el-main class="main">
                        <router-view></router-view>
                    </el-main>
                </el-container>
            </el-container>
            <el-footer class="footer" height="60px">
              <Footer />
            </el-footer>
        </el-container>
    </div>
</template>
<script>
import Header from '@/components/header'
import Aside from '@/components/aside'
import Footer from '@/components/footer'
export default {
  components: {
    Header,
    Aside,
    Footer
  }
}
</script>
<style lang="less" scoped>
    .container{
      overflow: hidden;
      height: 100vh;
    }
    .aside{
      background: rgba(0,0,0,0.04);
      // 滚动条
      &::-webkit-scrollbar{
        width:10px;
      }
      /* 滚动条的滑轨背景颜色 */
      &::-webkit-scrollbar-track {
        background: rgba(0,0,0,0.0001);
      }
      /* 滑块颜色 */
      &::-webkit-scrollbar-thumb {
        border-radius:5px;
      }

      &::-webkit-scrollbar-thumb {
        background-color: rgba(0,0,0,0.1);
      }
      &::-webkit-scrollbar-thumb:hover {
        background-color: rgba(0,0,0,0.2);
      }
    }
    .head{
        // background: green;
    }
    .main{
      padding: 10px 20px;
      background: rgba(0,0,0,0.02);
      // 滚动条
      &::-webkit-scrollbar{
        width:10px;
      }
      /* 滚动条的滑轨背景颜色 */
      &::-webkit-scrollbar-track {
        background: rgba(0,0,0,0.0001);
      }
      /* 滑块颜色 */
      &::-webkit-scrollbar-thumb {
        border-radius:5px;
      }

      &::-webkit-scrollbar-thumb {
        background-color: rgba(0,0,0,0.1);
      }
      &::-webkit-scrollbar-thumb:hover {
        background-color: rgba(0,0,0,0.2);
      }
    }
    .footer{
      padding: 0px;
    }

</style>
