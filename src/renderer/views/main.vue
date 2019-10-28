<template>
    <div class="">
        <el-container class="container">
            <el-container>
                <el-aside class="aside" width="200px">
                  <Aside />
                </el-aside>
                <el-container>
                    <el-header class="head" height="50px">
                        <Header></Header>
                    </el-header>
                    <el-main class="main">
                        <router-view></router-view>
                    </el-main>
                </el-container>
            </el-container>
            <el-footer class="footer" height="70px">
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
        height: 100vh;
    }
    .aside{
        background: rgba(0,0,0,0.04);
    }
    .head{
        // background: green;
    }
    .main{
        background: rgba(0,0,0,0.02);
    }
    .footer{
      padding: 0px;
    }

</style>
