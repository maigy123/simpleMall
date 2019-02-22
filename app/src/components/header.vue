<template lang="pug">
  .header
    .left
      span 嗨，欢迎来到xxx
      span 请登录
      router-link(tag="span" to="./userLogin")
        span 免费注册
      router-link(tag="span" to="./")
        span 首页
    .right
      .cars
        span 购物车
        span {{ carsNum }}
        span 件
      .seller
        router-link(tag="span" to="./seller")
          span 当卖家
</template>

<script>
export default {
  data () {
    return{
      carsNum: 0
    }
  },

  created () {
    this.carsNum = ' ' + this.$store.state.carsNum + ' '
  },

  mounted () {
  },

  methods: {
  }
}
</script>

<style scoped lang="less">
.header{
  width: 100%;
  height: 30px;
  font-size: 12px;
  color: #969696;
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

  .seller{
    float: right;
    height: 100%;
    margin-right: 20px;
    span{
      line-height: 30px;
    }
  }
  .seller:hover{
    color: red;
  }
}
</style>