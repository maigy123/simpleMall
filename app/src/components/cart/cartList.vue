<template lang="pug">
  .cartList
    Confirm(v-if="openDeleteConfirm" :type="confrimType" v-on:res="getConfirmRes")
    .selectDiv(:class="{active: selected}" @click="alterSelect")
    .imgDiv
      img(:src="data.imgSrc")
    .nameDiv
      span {{data.name}}
    .deleteDiv
      img(src="@/assets/delete.png" @click="toDelete")
    .sumDiv
      span {{ sum }}
    .number
      span(@click="alterNum('reduce')") -
      span {{data.number}}
      span(@click="alterNum('add')") +
    .price
      span ￥{{data.price}}
</template>

<script>
import Confirm from '@/components/cart/confirm'
export default {
  props: ['data', 'index', 'selectAll'],
  data () {
    return {
      sum: 0,
      newData: {},
      selected: true,
      openDeleteConfirm: false,
      confrimType: 'delete'
    }
  },

  watch: {
    getSelected (newValue) {
      if (newValue === 1) {
        this.selected = true
      } else if (newValue === 2) {
        this.selected = false
      }
    }
  },

  computed: {
    getSelected () {
      return this.selectAll
    }
  },

  components: {
    Confirm
  },

  created () {
    this.sum = '￥' + this.data.price * this.data.number
    this.newData = this.data
  },

  mounted () {
  },

  methods: {
    alterSelect () {
      this.selected = !this.selected
      this.$emit('alterSelect', this.index)
    },

    alterNum (type) {
      if (type === 'add') {
        this.addNum()
      } else {
        this.reduceNum()
      }
    },

    reduceNum () {
      if (this.data.number !== 1) {
        this.data.number--
        this.postAlterNum()
      }
    },

    addNum () {
      this.data.number++
      this.postAlterNum()
    },

    postAlterNum () {
      var params = {type: 1, goodsId: this.data.id, userId: sessionStorage.getItem('userId'), number: this.data.number}
      this.$reqs.post('/carts/alterCart', params).then((res) => {
        if (res.data.code === 0) {
          this.sum = '￥' + this.data.price * this.data.number
          this.$emit('alterNum', this.index, this.data.number)
        }
      })
    },

    toDelete () {
      this.openDeleteConfirm = true
    },

    getConfirmRes (res) {
      if (res === 'sure') {
        var params = {type: 0, userId: sessionStorage.getItem('userId'), goodsId: [this.data.id]}
        this.$reqs.post('/carts/alterCart', params).then((res) => {
          if (res.data.code === 0) {
            this.$emit('deleteOne', this.index)
          }
        })
      }
      this.openDeleteConfirm = false
    }
  }
}
</script>

<style lang="less" scoped>
.cartList{
  width: 100%;
  height: 80px;
  border-bottom: 1px #e5e5e5 solid;

  .selectDiv{
    float: left;
    width: 16px;
    height: 16px;
    margin: 30px 20px;
    border-radius: 50%;
    cursor: pointer;
    border: 1px #e5e5e5 solid;

    &.active{
      background: #FF4500;
    }
  }

  .imgDiv{
    float: left;
    margin: 15px 20px 0 20px;
    width: 90px;
    img{
      width: 80px;
      height: 50px;
    }
  }

  .nameDiv{
    float: left;
    width: 300px;
    padding-top: 15px;
    font-size: 14px;
  }

  .deleteDiv{
    float: right;
    width: 90px;
    height: 100%;
    text-align: center;
    cursor: pointer;
    img{
      margin-top: 25px;
      width: 30px;
      height: 30xpx;
    }
  }

  .sumDiv, .number, .price{
    float: right;
    width: 150px;
    height: 100%;
    text-align: center;
    line-height: 80px;
  }

  .number{
    span:nth-child(1) {
      color: red;
      margin-right: 10px;
      cursor: pointer;
    }
    span:nth-child(3) {
      color: red;
      margin-left: 10px;
      cursor: pointer;
    }
  }
}
</style>
