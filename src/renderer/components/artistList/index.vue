<template>
  <div>
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
  props: {
    artistList: Array
  },
  created () {
  },
  methods: {
    toArtist (id) {
      this.$router.push({name: 'artist', params: {id}})
    }
  }
}
</script>
<style lang="less" scope>
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