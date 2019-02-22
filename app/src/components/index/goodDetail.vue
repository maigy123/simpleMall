<template lang="pug">
  .allPath(@click="outDetail")
    .goodDetail
      .left
        .img
          img(:src="data.imgSrc")
        .name
          span {{data.name}}
        .price
          span ￥{{data.price}}
      .right
        span 详情：{{ data.desc }}
        span 品类：{{ this.class }}
        span 销售量：{{data.selledNum }}
        span 售卖状态： {{ this.status }}
        span 加入购物车
</template>

<script>
export default {
  props: ['data'],
  data () {
    return{
      classes: ['衣物', '家具', '饮食', '图书', '化妆品', '电子产品'],
      class: '',
      status: ''
    }
  },
  components: {
  },

  created () {
    this.doFirst()
  },

  mounted () {
  },

  beforeUpdate () {
    this.doFirst()
  },

  methods: {
    doFirst () {
      for (let i in this.classes) {
        if (this.data.class === parseInt(i)) {
          this.class = this.classes[i]
        }
      }
      if (this.data.status === 0) {
        this.status = '售卖中'
      } else {
        this.status = '已下架'
      }
    },
    outDetail () {
      this.$emit('outDetail')
    }
  }
}
</script>

<style lang="less" scoped>
.allPath{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(105, 105, 105, 0.7);
  z-index: 5;

  .goodDetail{
    position: fixed;
    width: 900px;
    height: 500px;
    top: 50%;
    left: 50%;
    margin: -250px 0 0 -450px;
    background: white;

    .left{
      float: left;
      width: 500px;
      height: auto;
      margin: 50px 0 0 30px;
      .img{
        width: 100%;
        height: auto;
        img{
          width: 500px;
          height: auto;
        }
      }
      .name{
        width: 200px;
        margin: 0 auto;
        margin-top: 30px;
        text-align: center;
        font-size: 16px;
      }
      .price{
        padding-top: 30px;
        text-align: center;
        font-size: 18px;
        color: #EE4000;
      }
    }

    .right{
      float: right;
      width: 300px;
      margin: 50px 30px 0 0;
      display: flex;
      flex-direction: column;
      justify-content: center;

      span{
        display: block;
        line-height: 30px;
      }
      span:nth-child(5){
        width: 80px;
        color: white;
        padding: 5px 20px;
        border-radius: 10px;
        background: #EEB422;
      }
    }
  }
}
</style>