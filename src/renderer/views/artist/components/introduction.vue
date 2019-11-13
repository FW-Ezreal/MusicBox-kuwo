<template>
  <div class="info-wrap">
    <ul>
      <li v-for="(value, key, index) in infoObj" :key="index" :class="{even: [0,1,4,5,8,9].indexOf(index) > -1}">
        <span class="key">{{ value }}</span> :
        <span class="value" v-html="aritstInfo[key] ? aritstInfo[key] : '-'"></span>
      </li>
    </ul>
    <div class="bottom-info" v-if="aritstInfo.info">
      <h3>详细资料</h3>
      <p v-html="replaceBr(aritstInfo.info)"></p>
    </div>
  </div>
</template>
<script>

import jsonp from '@/untils/jsonp.js'
export default {
  data () {
    return {
      infoObj: {
        name: '姓名',
        gender: '性别',
        aartist: '别名',
        country: '国籍',
        language: '国语',
        birthplace: '出生地',
        birthday: '生日',
        constellation: '星座',
        tall: '身高',
        weight: '体重'
      },
      aritstInfo: {}
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      const url = `https://search.kuwo.cn/r.s?stype=artistinfo&encoding=utf8&thost=search.kuwo.cn&artistid=${this.$route.params.id}`
      jsonp(url).then((res) => {
        this.aritstInfo = res || {}
      })
    },
    replaceBr (info) {
      return info
        .replace(/&lt;/g, '<')
        .replace(/br/g, 'br/')
        .replace(/&gt;/g, '>')
    }
  }
}
</script>
<style lang="less" scoped>
  .info-wrap{
    font-size: 14px;
    ul{
      display: flex;
      flex-wrap: wrap;
      opacity: 0.8;
      li{
        width: 50%;
        height: 40px;
        line-height: 40px;
        &.even{
          background-color: rgba(0,0,0,0.03);
        }
        .key{
          display: inline-block;
          width: 50px;
          text-align: justify;
          text-align-last: justify;
        }
        .value{
          margin-left: 14px;
        }
      }
    }
    .bottom-info{
      opacity: 0.8;
      margin-top: 30px;
      h3{
        font-size: 18px;
        height: 20px;
        line-height: 20px;
        margin-bottom: 14px;
      }
      p{
        line-height: 28px;
        word-wrap: break-word;
      }
    }
  }
</style>
