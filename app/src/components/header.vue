<template lang="pug">
  .header
    Error(v-if="isErr" :text="errText")
    .left
      span 嗨，欢迎来到xxx
      // span 请登录
      router-link(tag="span" to="./manager")
        span 后台管理
      router-link(tag="span" to="./userLogin")
        span 登录/注册
      router-link(tag="span" to="./")
        span 首页
      router-link(tag="span" to="./test1")
        span 测试页1
      router-link(tag="span" to="./test2")
        span 测试页2
    .right
      .cars
        span 购物车
        span {{ carsNum }}
        span 件
      .seller
        router-link(tag="span" to="./seller")
          span 当卖家
      .personal(@click="toPersonal")
        span 个人中心
</template>

<script>
import Error from '@/components/error.vue'
export default {
  data () {
    return{
      carsNum: 0,
      type: 'user',
      isErr: false,
      errText: ''
    }
  },

  components: {
    Error
  },

  created () {
    this.carsNum = ' ' + this.$store.state.carsNum + ' '
  },

  mounted () {
  },

  methods: {
    toPersonal () {
      if (sessionStorage.getItem("userId") === null) {
        this.errText = '请登录后再进入个人中心'
        this.errDeal()
      } else {
        this.$router.push({name: 'personal'})
      }
    },
    errDeal () {
      this.isErr = true
      setTimeout(() => {
        this.isErr = false
      }, 2000)
    }
  }
}
</script>

<style scoped lang="less">
.header{
  width: 100%;
  height: 30px;
  font-size: 12px;
  color: #969696;

  span{
    cursor: pointer;
  }
}

.left{
  float: left;
  height: 100%;
  padding-left: 100px;
  span{
    margin-right: 20px;
    line-height: 30px;
  }
  span:hover{
    color: red;
  }
}

.right{
  float: right;
  padding-right: 100px;
  height: 100%;
  .cars{
    float: right;
    height: 100%;
    span{
      line-height: 30px;
    }
    span:nth-child(2){
      color: #000000;
    }
  }
  .cars:hover{
    color: red;
    span:nth-child(2){
      color: red;
    }
  }

  .seller, .personal{
    float: right;
    height: 100%;
    margin-right: 20px;
    span{
      line-height: 30px;
    }
  }
  .seller:hover, .personal:hover{
    color: red;
  }
}
</style>