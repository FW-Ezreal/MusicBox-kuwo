<template>
    <div class="">
        <el-container class="container">
            <el-container>
                <el-aside class="aside" width="230px"></el-aside>
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
            </el-footer>
        </el-container>
    </div>
</template>
<script>
import Header from '../components/header'
export default {
    components: {
        Header
    }
}
</script>
<style lang="less" scoped>
    .container{
        height: 100vh;
    }
    .aside{
        background: red;
    }
    .head{
        background: green;
    }
    .main{
        background: rgba(0,0,0,0.1);
    }
    .footer{
        background: pink;
    }

</style>
