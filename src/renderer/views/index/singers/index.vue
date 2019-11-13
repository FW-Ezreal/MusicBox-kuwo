<template>
  <div>
    <ul class="tabs">
      <li
        v-for="(item, index) in countryArr"
        :key="index"
        :class="{active: index === countryIndex}"
        @click="changeCountry(index)"
      >
        {{ item }}
      </li>
    </ul>
    <ul class="tabs tabs-letter">
      <li
        v-for="(item, index) in letterArr"
        :key="index"
        :class="{active: index === letterIndex}"
        @click="changeLetter(index)"
      >
        {{ item }}
      </li>
    </ul>
    <div class="artist-list">
      <ul>
        <li
          class="artist"
          v-for="(item, index) in artistList"
          :key="index"
        >
          <img v-lazy="item.pic300" @click="toArtist(item.id)"/>
          <div class="name" @click="toArtist(item.id)"><a href="javascript:;">{{ item.name }}</a></div>
          <div class="songs" @click="toArtist(item.id)"><a href="javascript:;">{{ item.musicNum }}首歌曲</a></div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      letterArr: ['热门', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'G', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '#'],
      countryArr: [
        '全部', '华语男', '华语女', '华语组合', '日韩男', '日韩女', '日韩组合', '欧美男', '欧美女', '欧美组合', '其他'
      ],
      countryIndex: 0,
      letterIndex: 0,
      artistList: []
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      const params = {
        url: 'http://wapi.kuwo.cn/api/www/artist/artistInfo',
        methods: 'get',
        params: {
          category: this.countryIndex,
          prefix: this.letterIndex === 0 ? '' : encodeURIComponent(this.letterArr[this.letterIndex]),
          pn: 1,
          rn: 100
        }
      }
      this.$http(params).then(res => {
        if (res.status === 200) {
          console.log('singer res', res)
          this.artistList = res.data.data.artistList || []
        }
      })
    },
    changeCountry (index) {
      this.countryIndex = index
      this.init()
    },
    changeLetter (index) {
      this.letterIndex = index
      this.init()
    },
    toArtist (id) {
      this.$router.push({name: 'artist', params: {id}})
    }
  }
}
</script>
<style lang="less" scope>
.tabs{
  display: flex;
  justify-content: space-between;
  height: 24px;
  line-height: 24px;
  font-size: 14px;
  &.tabs-letter{
    margin: 10px 0 15px 0;
    li{
      border-radius: 50%;
    }
  }
  .active{
    background: #FFD200;      
  }
  li{
    padding: 0 8px;
    border-radius: 16px;
    cursor: pointer;
  }
  li:hover{
    background: #FFD200;
  }
}

.artist-list{
  ul {
    display: flex;
    flex-wrap: wrap;
    margin-left: -14px;
    .artist{
      margin-bottom: 25px;
      padding-left: 14px;
      img{
        border-radius: 50%;
        width: 100%;
        margin-bottom: 6px;
        cursor: pointer;
      }
      div{
        text-align: center;
        height: 22px;
        line-height: 22px;
        text-align: center;
      }
      a:hover{
        color: #C77F0E;
      }
      .name{
        font-size: 14px;
        opacity: 0.8;
      }
      .songs{
        font-size: 12px;
        opacity: 0.6;        
      }
    }
  }
}
@media screen and (max-width: 1000px) {
  .artist{
    width: 25%;
  }
}
@media screen and (min-width: 1000px) and (max-width: 1430px){
  .artist{
    width: 20%;
  }
}

@media screen and (min-width: 1431px) {
  .artist{
    width: 14.2857%;
  }
}
</style>