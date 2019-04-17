<template lang="pug">
  .cart-path
    Error(v-if="errText !== ''" :text="errText")
    Confirm(v-if="openDeleteConfirm" :type="confirmType" v-on:res="getConfirmRes")
    .header
      .left
        span 商品信息
      .right
        .delete
          span 删除
        .other
          li(v-for="(item, index) in menus" :key="'menu'+index")
            .right-item
              span {{item}}
    .cartLists
      li(v-for="(item, index) in data" :key="index")
        CartList(:data="item" :index="index" :selectAll="selectAll" v-on:alterSelect="alterSelect" v-on:alterNum="alterNum" v-on:deleteOne="deleteOne")
    .payment
      .selectAllDiv(:class="{active: selectAll === 1}")
      .selectDiv
        span(@click="chooseOrNo(1)") 全选
        span(@click="chooseOrNo(0)") 取消全选
        span(@click="openconfirm('delete')") 批量删除
      .payButton
        span(@click="openconfirm('pay')") 结算
      .altogether
        span 总价：￥{{sum}}
</template>

<script>
import CartList from '@/components/cart/cartList'
import Confirm from '@/components/cart/confirm'
import Error from '@/components/public/error.vue'
export default {
  data () {
    return {
      data: [],
      stockData: [],
      dataSelected: [],
      menus: ['库存', '金额（元）', '数量', '单价（元）'],
      balance: 0,
      sum: 0,
      selectAll: false,
      openDeleteConfirm: false,
      errText: '',
      confirmType: ''
    }
  },
  components: {
    CartList,
    Confirm,
    Error
  },

  computed: {
  },

  created () {
    this.getData()
  },

  mounted () {
  },

  methods: {
    getData () {
      var params = {userId: sessionStorage.getItem('userId')}
      this.$reqs.post('/carts/cart', params).then((res) => {
        console.log(res.data.data)
        if (res.data.code === 0) {
          this.data = res.data.data
          this.balance = res.data.balance
          this.setSelectedArr()
          this.getSum()
          // this.getStock()
        }
      })
    },

    getStock () {
      var params = {goodsId: []}
      for(var item of this.data) {
        params.goodsId.push(item.id)
      }
      this.$reqs.post('/carts/getStock', params).then((res) => {
        if (res.data.code === 0) {
          this.stockData = res.data.data
        }
      })
    },

    setSelectedArr () {
      for (var i = 0; i < this.data.length; i++) {
        this.dataSelected.push({selected: true})
      }
    },

    alterSelect (n) {
      this.dataSelected[n].selected = !this.dataSelected[n].selected
      this.getSum()
      this.selectAll = 0
    },

    getSum () {
      var sum = 0
      for (var i in this.dataSelected) {
        if (this.dataSelected[i].selected) {
          sum += this.data[i].number * this.data[i].price
        }
      }
      this.sum = sum
    },

    alterNum (index, n) {
      this.data[index].number = n
      this.getSum()
    },

    chooseOrNo (n) {
      if (n === 1) {
        this.selectAll = 1
        for (var item of this.dataSelected) {
          item.selected = true
        }
      } else {
        this.selectAll = 2
        for (var item of this.dataSelected) {
          item.selected = false
        }
      }
      this.getSum()
    },

    openconfirm (type) {
      this.confirmType = type
      this.openDeleteConfirm = true
    },

    deleteOne (index) {
      this.data.splice(index, 1)
    },

    getConfirmRes (responce) {
      if (responce === 'sure') {
        if (this.confirmType === 'delete') {
          this.postDelete()
        } else {
          this.pay()
        }
      }
      this.openDeleteConfirm = false
    },

    postDelete () {
      var params = {type: 0, userId: sessionStorage.getItem('userId'), goodsId: []}
      for (var i in this.dataSelected) {
        if (this.dataSelected[i].selected) {
          params.goodsId.push(this.data[i].id)
        }
      }
      this.$reqs.post('/carts/alterCart', params).then((res) => {
        if (res.data.code === 0) {
          this.deleteSome(params.goodsId)
        }
      })
    },

    deleteSome (arr) {
      for (var i in arr) {
        for (var y in this.data) {
          if (arr[i] === this.data[y].id) {
            this.data.splice(y, 1)
          }
        }
      }
      this.dataSelected = []
      for (var i = 0; i < this.data.length; i++) {
        this.dataSelected.push({selected: true})
      }
      this.selectAll = 1
      this.getSum()
    },

    pay () {
      if (this.sum === 0) {
        this.errDeal('请选择要结算的商品')
      } else if (this.sum > this.balance) {
        this.errDeal('余额不足，请前去个人中心-充值页面充值')
      } else {
        var params = {userId: sessionStorage.getItem('userId'), goodsId: [], number: [], balance: this.balance - this.sum}
        for (var i in this.dataSelected) {
          if (this.dataSelected[i].selected) {
            params.goodsId.push(this.data[i].id)
            params.number.push(this.data[i].number)
          }
        }
        this.$reqs.post('/carts/pay', params).then((res) => {
          if (res.data.code === 0) {
            this.deleteSome(params.goodsId)
            this.balance = this.balance - this.sum
          }
        })
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
.cart-path{
  margin: 50px 100px;
  border: 1px solid;

  .header{
    height: 40px;
    width: 100%;
    background:	#FE5160;
    color: #fff;
    line-height: 40px;
    .left{
      float: left;
      width: 500px;
      text-align: center;
    }
    .right{
      float: right;
      .delete{
        float: right;
        width: 90px;
        text-align: center;
      }
      .other{
        float: right;
        li{
          list-style: none;
          float: right;
          .right-item{
            width: 150px;
            text-align: center;
          }
        }
      }
    }
  }

  .cartLists{
    li{
      list-style: none;
    }
  }

  .payment{
    width: 100%;
    height: 80px;
    border: 1px #e5e5e5 solid;

    .selectAllDiv{
      float: left;
      width: 16px;
      height: 16px;
      margin: 30px 20px;
      border-radius: 50%;
      border: 1px #e5e5e5 solid;

      &.active{
        background: #FF4500;
      }
    }

    .selectDiv{
      float: left;
      span{
        margin-right: 20px;
        line-height: 80px;
        font-size: 14px;
        color: #ccc;
        cursor: pointer;
      }
      span:nth-child(1){
        color: #FF4500;
      }
    }

    .payButton{
      float: right;
      width: 150px;
      height: 100%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      span{
        color: #fff;
        padding: 10px 50px;
        background: #FF4500;
      }
    }

    .altogether{
      float: right;
      margin-right: 50px;
      height: 100%;
      line-height: 80px;
    }
  }
}
</style>