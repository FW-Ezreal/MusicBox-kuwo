<template>
  <div>
    <div class="classify-top">
      <el-popover
        popper-class="menu-mode"
        v-model="showMenu"
        width="736"
        placement="bottom-start">
        <el-scrollbar class="scrollbar">
          <div class="menu-item">
            <div class="menu-title"><img v-lazy=""></div>
            <ul>
              <li @click="toggle('hot')">精选歌单</li>
            </ul>    
          </div>
          <div class="menu-item" v-for="(item, index) in menuList" :key="index" v-show="item['data'].length">
            <div class="menu-title"><img v-lazy="item.img1" :title="item.name"></div>
            <ul>
              <li v-for="(ele, idx) in item['data']" :key="idx" @click="toggleTag(ele)">{{ ele.name }}</li>
            </ul>
          </div>
        </el-scrollbar>
        <div class="classify" slot="reference">
          <span >{{ nowTitle }}</span>
          <i class="vertical-arrow" :class="{open: showMenu}"></i>
        </div>
      </el-popover>
      <div class="hot-new" v-if="active">
        <span :class="{ active: active === 'hot' }" @click="toggle('hot')">最热</span>
        <span :class="{ active: active === 'new' }" @click="toggle('new')">最新</span>
      </div>
    </div>
    <SongList :list-data="playListData" :from="'playList'"/>
  </div>
</template>
<script>
import SongList from '@/components/songList'
export default {
  components: {
    SongList
  },
  data () {
    return {
      playListData: [],
      nowTitle: '选择分类',
      menuList: [],
      active: 'new',
      showMenu: false
    }
  },
  created () {
    this.toggle('hot')
    this.init()
  },
  methods: {
    init () {
      const param = {
        url: 'http://wapi.kuwo.cn/api/www/playlist/getTagList',
        method: 'get'
      }
      this.$http(param).then(res => {
        if (res.status === 200) {
          this.menuList = res.data.data
          console.log('TCL: init -> this.menu', this.menuList)
        }
      })
    },
    toggle (type) {
      if (type === this.active) return
      this.active = type
      this.nowTitle = '精选歌单'
      const param = {
        url: `http://wapi.kuwo.cn/api/pc/classify/playlist/getRcmPlayList?pn=1&rn=30&order=${type}`,
        method: 'get'
      }
      this.$http(param).then(res => {
        if (res.status === 200) {
          this.playListData = res.data.data.data || []
        }
      })
    },
    toggleMenu () {
      this.showMenu = !this.showMenu
    },
    toggleTag (ele) {
      const param = {
        url: `http://wapi.kuwo.cn/api/pc/classify/playlist/getTagPlayList?pn=1&rn=30&id=${ele.id}`,
        method: 'get'
      }
      this.$http(param).then(res => {
        if (res.status === 200) {
          this.playListData = res.data.data.data || []
          this.nowTitle = ele.name
          this.showMenu = false
          this.active = ''
        }
        // console.log('toggle', res)
      })
    }
  }
}
</script>
<style lang="less" scoped>
  .classify-top{
    display: flex;
    justify-content: space-between;
    margin-bottom: 28px;
    .classify{
      font-weight: 600;
      height: 22px;
      font-size: 15px;
      line-height: 22px;
      padding-right: 14px;
      cursor: pointer;
      i{
        position: relative;
        display: inline-block;
        top: -3px;
        left: 8px;
        width: 8px;
        height: 8px;
        border: 1px solid;
        border-top-width: 0;
        border-left-width: 0;
        transform: rotate(45deg);
        &.open{
          top: 2px;
          transform: rotate(-135deg);
        }
      }
      &:hover{
        color: #C77F0E;
      }
    }
    .hot-new{
      font-size: 12px;
      width: 88px;
      height: 24px;
      font-size: 12px;
      line-height: 24px;
      border-radius: 11px;
      padding: 1px;
      background: rgba(0, 0, 0, 0.06);
      span{
        display: inline-block;
        width: 41px;
        height: 22px;
        text-align: center;
        border-radius: 11px;
        cursor: pointer;
        &.active{
          background: #fff;
        }
      }
    }
  }
  .menu-mode{
    .menu-item{
      display: flex;
    }
    .menu-title{
      height: 24px;
      line-height: 24px;
      img{
        margin: 3px 10px 0 0;
        height: 20px;
      }
    }
    ul{
      display: flex;
      flex-wrap: wrap;
      li{
        height: 24px;
        line-height: 24px;
        padding: 0px 12px;
        margin: 0 6px 12px 0;
        border-radius: 24px;
        cursor: pointer;
        &:hover{
          background: #FFD200;
        }
      }
    }
  }
</style>
