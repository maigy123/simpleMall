<template lang="pug">
  .goodList(@click="toDetail")
    .img
      img(:src="data.imgSrc")
    .name
      span {{data.name}}
    .price
      span ￥{{data.price}}
</template>

<script>
export default {
  props: ['data', 'index'],
  data () {
    return{
    }
  },
  components: {
  },

  created () {
  },

  mounted () {
  },

  methods: {
    toDetail () {
      this.$emit('toDetail', this.index)
    }
  }
}
</script>

<style lang="less" scoped>
.goodList{
  width: 250px;
  height: 300px;
  background: #ffffff;
  // border: 1px #e5e5e5 solid;

  .img{
    width: 180px;
    height: auto;
    margin: 0 auto;
    padding-top: 30px;
    img{
      width: 180px;
      height: auto;
    }
  }

  .name{
    width: 150px;
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
</style>