<template lang="pug">
  .list(@click="showDetail")
    .img
      img(:src="data.imgSrc")
    .contence
      span {{ data.name }}
      span 已购买：{{ data.selledNum }}
      span ￥{{ data.price }}
  </template>

<script>
export default {
  props: ['data', 'index'],
  data () {
    return{
    }
  },

  created () {
  },

  mounted () {
  },

  methods: {
    showDetail () {
      this.$emit('toDetail', this.index)
    }
  }
}
</script>

<style scoped lang="less">
.list{
  width: 100%;
  height: 100px;
  background: white;
  display: flex;

  .img{
    width: 148px;
    height: 100px;
    padding: 10px;
    img{
      width: 128px;
      height: 80px;
    }
  }
  .contence{
    flex: 1;
    padding: 10px 0 0 10px;
    position: relative;

    span{
      display: block;
    }
    span:nth-child(2){
      margin-top: 10px;
      font-size: 14px;
    }
    span:nth-child(3){
      position: absolute;
      right: 10px;
      bottom: 10px;
      color: red;
    }
  }
}
</style>