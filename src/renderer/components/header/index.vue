<template>
  <div class="header-wrapper drag">
    <div class="left-btn">
        <el-button size="mini" class="no-drag back" type="text" @click="back">
          <i class="el-icon-arrow-left"></i>
        </el-button>
        <el-button size="mini" class="no-drag refresh" type="text" @click="refresh">
          <i class="el-icon-refresh-right"></i>
        </el-button>
        <el-popover
          placement="bottom"
          width="250"
        >
          <el-input
            slot="reference"
            size="mini"
            class="no-drag search-input"
            v-model="inputValue"
            placeholder="请输入内容"
            @keydown.enter.native="goSearchPage(inputValue)"
            suffix-icon="el-icon-search">
          </el-input>
          <ul class="search-keys" v-if="newKeyArr.length > 0">
            <li v-for="(item, index) in newKeyArr" :key="index" @click="goSearchPage(item.RELWORD)">
              {{item.RELWORD}}
            </li>
          </ul>
        </el-popover>
    </div>
    <div class="right-btn">
        <el-button size="mini" class="no-drag" @click="minimize">
          <i class="el-icon-minus"></i>
        </el-button>
        <el-button size="mini" class="no-drag" @click="enlarge">
          <i class="el-icon-copy-document"></i>
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
      inputValue: '',
      newKeyArr: [],
      isLarge: false 
    }
  },
  watch: {
    inputValue(curData) {
      if (curData) {
        this.search(curData);
      }
    }
  },
  computed: {

  },
  methods: {
    enlarge() {
      this.isLarge = !this.isLarge;
      this.$electron.ipcRenderer.send('enlarge',  this.isLarge);
    },
    refresh() {
      console.log('refresh');
    },
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
          this.newKeyArr = keyArr.map(ele => {
            const keyVal = ele.split('\n');
            const obj = {};
            keyVal.forEach(item => {
              const arr = item.split('=');
              obj[arr[0]] = arr[1];
            });
            return obj
          });
          // console.log('this.newKeyArr: ', this.newKeyArr);
        }
      })
    },
    goSearchPage(key) {
      console.log('key: ', key);
      this.inputValue = key;
      this.$router.push({name: 'searchPage', params: {key}});
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
    .back i{
      font-size: 19px;
      color: rgba(0,0,0,0.6);
    }
    .refresh i{
      font-size: 19px;
      color: rgba(0,0,0,0.6);
    }
    .search-input{
      margin-left: 6px;
    }
  }
  .search-keys{
    li{
      height: 34px;
      line-height: 34px;
      margin: 0 3px;
      &:hover{
        background: rgba(0,0,0,0.08);
      }
    }
  }
  /deep/.el-input--mini .el-input__inner{
    border-radius: 35px;
    width: 240px;
    background: rgba(0,0,0,0.08);
  }
  /deep/.el-button+.el-button {
    margin-left: 6px;
  }
</style>