<template lang="pug">
  .search
    .img
      img(src="@/assets/mall.jpg")
    .search-div
      .button
        span 搜 索
      .search-frame
        input.input(type="text" v-model='inputText' placeholder="搜索 商品 / 卖家")
      .tips
        li(v-for="(item, index) in tips" :key="index")
          span {{ item }}
</template>

<script>
export default {
  props: ['text'],
  data () {
    return{
      inputText: '',
      tips: ['饮食', '图书', '电子产品']
    }
  },
  components: {
  },

  created () {
  },

  mounted () {
  },

  methods: {
  }
}
</script>

<style lang="less" scoped>
.search{
  width: 100%;

  .search-div{
    width: 650px;
    // height: 100px;
    margin: 0 auto;
    border: 1px white solid;
    .search-frame{
      width: 100%;
      height: 40px;
      margin-top: 40px;
      background: red;
      .input{
        width: 500px;
        height: 32px;
        margin: 2px 0 0 2px;
        border: none;
        padding-left: 20px;
      }
    }
    .button{
      float: right;
      width: 120px;
      height: 40px;
      margin-top: 40px;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      span{
        font-size: 18px;
      }
    }
    .tips{
      padding-top: 5px;
      font-size: 14px;
      color: #969696;
      li{
        display: inline;
        margin-right: 10px;
        border-right: 1px solid;
        padding-right: 10px;
      }
      li:nth-child(3){
        border: none;
      }
    }
  }

  .img{
    float: left;
    width: 170px;
    height: 107px;
    padding: 20px 0 0 100px;
    img{
      width: 170px;
      height: 107px;
    }
  }
}
</style>