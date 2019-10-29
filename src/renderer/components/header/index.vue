<template>
  <div class="header-wrapper drag">
    <div class="left-btn">
        <el-button size="mini" class="no-drag" @click="back">
          <i class="el-icon-arrow-left"></i>
        </el-button>
        <el-popover
          placement="bottom"
        >
          <el-input slot="reference" size="mini" class="no-drag" v-model="inputValue" placeholder="请输入内容" prefix-icon="el-icon-search"></el-input>
          <ul>
            <!-- <li v></li> -->
          </ul>
        </el-popover>
    </div>
    <div class="right-btn">
        <el-button size="mini" class="no-drag" @click="minimize">
          <i class="el-icon-minus"></i>
        </el-button>
        <el-button size="mini" class="no-drag" @click="close">
          <i class="el-icon-close"></i>
        </el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return{
      inputValue: ''
    }
  },
  watch: {
    inputValue(curData) {
      if (curData) {
        this.search(curData);
      }
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    minimize () {
      this.$electron.ipcRenderer.send('mini')
    },
    close () {
      this.$confirm('此操作将退出音乐盒~, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        this.$electron.ipcRenderer.send('close')
      }).catch(() => {

      })
    },
    search(key) {
      this.$http({
        url: `http://wapi.kuwo.cn/api/www/search/searchKey?key=${key}`,
        method: 'get'
      }).then(res => {
        if (res.status === 200) {
          const keyArr = res.data.data || [];
          keyArr.map(ele => {
            const keyVal = ele.split('\n');
            // keyVal.map
          })
        }
        console.log('res: ', res.data.data);
      })
    }
  }
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