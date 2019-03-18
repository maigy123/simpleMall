<template lang="pug">
  .text1
    span 测试1页面
    button(@click="setSession") 设置
    button(@click="getSession") 获取
</template>

<script>
export default {
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
    setSession () {
      sessionStorage.setItem("test1", 'adada')
    },
    getSession () {
      var res = sessionStorage.getItem("test1")
      alert(res)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
