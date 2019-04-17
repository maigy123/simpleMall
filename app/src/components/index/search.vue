<template lang="pug">
  .search
    Error(v-if="errText !== ''" :text="errText")
    .img
      img(src="@/assets/mall.jpg")
    .search-div
      .button(@click="toSearch")
        span 搜 索
      .search-frame
        input.input(type="text" v-model='inputText' placeholder="搜索 商品 / 卖家")
      //.tips
        li(v-for="(item, index) in tips" :key="index")
          span {{ item }}
</template>

<script>
import Error from '@/components/public/error'
export default {
  props: ['text'],
  data () {
    return{
      inputText: '',
      tips: ['饮食', '图书', '电子产品'],
      errText: ''
    }
  },
  components: {
    Error
  },

  created () {
  },

  mounted () {
  },

  methods: {
    toSearch () {
      if (this.inputText === '') {
        this.errDeal('请输入搜索内容')
      } else {
        this.$emit('search', this.inputText)
      }
    },

    errDeal (text) {
      this.errText = text
      setTimeout(() => {
        this.errText = ''
      }, 2000)
    }
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
    border: 1px #F5F5F5 solid;
    .search-frame{
      width: 100%;
      height: 40px;
      margin-top: 50px;
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
      margin-top: 50px;
      color: white;
      cursor: pointer;
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
    padding: 20px 0 0 150px;
    img{
      width: 170px;
      height: 107px;
    }
  }
}
</style>