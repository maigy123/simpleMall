<template lang="pug">
  .recharge
    Error(v-if="isErr" :text="errText")
    .tip
      span 充值金额:
    .sumList
      li(v-for="(item, index) in sumArr" :key="index" @click="chooseSum(item)" :class="{active: item === sumSelected}")
        span {{item}}元
    .tip
      span 充值方式:
    .typeList
      li(v-for="(item, index) in typeArr" :key="'type'+index" @click="chooseType(index)" :class="{active: index === typeSelected}")
        img(:src="imgArr[index]")
    .toPhone(@click="toRecharge")
      span 确定充值
</template>

<script>
import Error from '@/components/public/error.vue'
export default {
  data () {
    return{
      sumArr: [20, 50, 100, 200, 500, 1000, 3000, 5000],
      typeArr: [0, 1, 2],
      imgArr: [require('@/assets/weixin.png'), require('@/assets/alipay.png'), require('@/assets/qq.png')],
      sumSelected: '',
      typeSelected: '',
      isErr: false,
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
    chooseSum (n) {
      this.sumSelected = n
    },

    chooseType (n) {
      this.typeSelected = n
    },

    toRecharge () {
      if (this.sumSelected === '' || this.typeSelected === '') {
        this.errDeal('请选择充值金额和充值方式')
      } else {
        var params = {userId: sessionStorage.getItem('userId'), sum: this.sumSelected}
        this.$reqs.post('/users/recharge', params).then((res) => {
          if (res.data.code === 0) {
            this.errDeal('充值成功')
            this.sumSelected = ''
            this.typeSelected = ''
          } else {
            this.errDeal(res.data.error)
          }
        })
      }
    },

    errDeal (text) {
      this.errText = text
      this.isErr = true
      setTimeout(() => {
        this.isErr = false
      }, 2000)
    }
  }
}
</script>

<style lang="less" scoped>
.recharge{
  padding-left: 100px;
  height: 100%;

  .tip{
    margin: 50px 0 0 0;
    height: 30px;
  }

  .sumList{
    padding: 10px 0 0 0;
    li{
      display: inline-block;
      width: 80px;
      height: 50px;
      background: #fff;
      border-radius: 8px;
      border: 1px #e5e5e5 solid;
      margin-right: 30px;
      list-style: none;
      text-align: center;
      span{
        line-height: 50px;
      }
    }
  }

  .typeList{
    padding: 10px 0 0 0;
    li{
      float: left;
      width: 80px;
      height: 50px;
      background: #fff;
      border-radius: 8px;
      border: 1px #e5e5e5 solid;
      margin-right: 30px;
      list-style: none;
      display: flex;
      align-items: center;
      justify-content: center;
      img{
        width: 30px;
        height: 30px;
      }
    }
  }

  .sumList, .typeList{
    li{
      cursor: pointer;
      &.active{
        color: #FF7F00;
        border-color: #FF7F00;
      }
    }
  }

  .toPhone{
    margin: 150px 0 0 0;
    width: 120px;
    height: 50px;
    border-radius: 8px;
    border: 1px #FF7F00 solid;
    color: #FF7F00;
    background: #fff;
    text-align: center;
    line-height: 50px;
    cursor: pointer;
  }
}
</style>