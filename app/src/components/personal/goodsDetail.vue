<template lang="pug">
  .goodsDetail
    Error(v-if="errText !== ''" :text="errText")
    .goodsDetailDiv(:style="{height: height - 50 + 'px'}")
      .name
        span {{ data.name }}
      .img
        img(:src="data.imgSrc")
      .lists
        span 销量： {{ data.selledNum }}
        br
        span 价格： ￥{{ data.price }}
        br
        span 品类： {{ this.class }}
        br
        span 商品库存： {{ data.stock }}
        br
        span 商品描述：{{ data.desc}}
      .toCartDiv
      .cartImg(@click="addCart")
        img(:src="cartImg")
      .cancelCollectDiv(v-if="type === 'myCollect'")
      .cancelCollectImg(@click="cancelCollect")
        img(:src="deleteImg")
</template>

<script>
import Error from '@/components/public/error.vue'
export default {
  props: ['data', 'height', 'type'],
  data () {
    return{
      classes: ['衣物', '家具', '饮食', '图书', '化妆品', '电子产品'],
      class: '',
      status: '',
      errText: '',
      cartImg: require('@/assets/cart.png'),
      deleteImg: require('@/assets/cancelCollect.png'),
    }
  },
  components: {
    Error
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

    addCart () {
      var params = {userId: sessionStorage.getItem("userId"), goodsId: this.data._id, number: 1}
      this.$reqs.post('/carts/addCart', params).then((res) => {
        if (res.data.code === 0) {
          this.errDeal('加入购物车成功')
        } else {
          this.errDeal(res.data.error)
        }
      })
    },

    cancelCollect () {
      var params = {type: 'cancel', userId: sessionStorage.getItem("userId"), goodsId: this.data._id}
      this.$reqs.post('/users/collect', params).then((res) => {
        if (res.data.code === 0) {
          this.errDeal('移除收藏商品成功')
          this.$emit('updateData')
        } else {
          this.errDeal(res.data.error)
        }
      })
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
.goodsDetail{
  width: 100%;
  

  .goodsDetailDiv{
    width: 100%;
    position: relative;
    z-index: 2;
    width: 100%;
    border-left: 1px #A8A8A8 solid;

    .name{
      padding-top: 30px;
      width: 100%;
      text-align: center;
      font-size: 20px;
      font-weight: 600;
    }

    .img{
      width: 100%;
      margin-top: 30px;
      text-align: center;
      img{
        width: 80%;
        height: auto;
      }
    }

    .lists{
      margin: 30px 0 0 80px;
    }

    .toCartDiv{
      position: absolute;
      right: 0;
      bottom: 0;
      width: 0;
      height: 0;
      z-index: 1;
      border: 90px solid red;
      border-top-color: transparent;
      border-bottom: none;
      border-left-color: transparent;
      border-right-color: #FFB90F;
    }

    .cartImg{
      position: absolute;
      right: 5px;
      bottom: 0;
      z-index: 1;
      cursor: pointer;
      img{
        width: 40px;
        height: 40px;
      }
    }

    .cancelCollectDiv{
      position: absolute;
      left: 0;
      bottom: 0;
      width: 0;
      height: 0;
      z-index: 1;
      border: 90px solid red;
      border-top-color: transparent;
      border-bottom: none;
      border-left-color: #CDC5BF;
      border-right-color: transparent;
    }
    .cancelCollectImg{
      position: absolute;
      left: 5px;
      bottom: 0;
      z-index: 1;
      cursor: pointer;
      img{
        width: 37px;
        height: 37px;
      }
    }
  }
}
</style>