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
        span 品类：{{ this.class }}
        span 销售量：{{data.selledNum }}
        span 商品库存： {{ data.stock }}
        span 详情：{{ data.desc }}
        span(@click.stop="check(0)") 收藏商品
        span(@click.stop="check(1)") 加入购物车
</template>

<script>
import { getCartNumber } from '@/publicFn/tools'
export default {
  props: ['data'],
  data () {
    return{
      classes: ['衣物', '家具', '饮食', '图书', '化妆品', '电子产品'],
      class: '',
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
    },
    outDetail () {
      this.$emit('outDetail')
    },
    check (n) {
      var userId = sessionStorage.getItem("userId")
      if (userId !== null) {
        var params = {userId: userId, goodsId: this.data._id}
        if (n === 0) {
          this.addCollect(params)
        } else {
          this.addCart(params)
        }
      } else {
        this.$emit('haveErr', '请先登录')
      }
    },
    addCollect (params) {
      params.type = 'add'
      this.$reqs.post('/users/collect', params).then((res) => {
        if (res.data.code === 0) {
          this.$emit('haveErr', '收藏成功')
        } else {
          this.$emit('haveErr', res.data.error)
        }
      })
    },
    addCart (params) {
      params.number = 1
      this.$reqs.post('/carts/addCart', params).then((res) => {
        if (res.data.code === 0) {
          this.$emit('haveErr', '加入购物车成功')
          getCartNumber(this.$reqs, this.$store)
        } else {
          this.$emit('haveErr', res.data.error)
        }
      })
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
        margin-top: 20px;
        width: 70px;
        color: white;
        padding: 5px 20px;
        border-radius: 10px;
        background: #EEB422;
        cursor: pointer;
      }
      span:nth-child(6){
        margin-top: 20px;
        width: 80px;
        color: white;
        padding: 5px 20px;
        border-radius: 10px;
        background: #EEB422;
        cursor: pointer;
      }
    }
  }
}
</style>