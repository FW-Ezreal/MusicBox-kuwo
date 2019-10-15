<template>
  <div class="header-wrapper">
    <div class="left-btn">
        <el-button size="mini">
          <i class="el-icon-arrow-left"></i>
        </el-button>
        <!-- <el-input size="mini" v-model="input" placeholder="请输入内容" prefix-icon="el-icon-search"> -->
        </el-input>
    </div>
    <div class="right-btn">
        <el-button size="mini">
          <i class="el-icon-minus"></i>
        </el-button>
        <el-button size="mini">
          <i class="el-icon-close"></i>
        </el-button>
    </div>
  </div>
</template>
<script>
export default {
  
}
</script>
<style lang="less" scoped>
  .header-wrapper{
    height: 100%;
    display: flex;
    justify-content: space-between;
    .left-btn, .right-btn{
      display: flex;
      align-items: center;
    }
  }
</style>