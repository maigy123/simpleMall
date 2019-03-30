<template lang="pug">
  .text1
    span 测试1页面
    button(@click="setSession") 设置
    button(@click="getSession") 获取
    input(type="text" v-model="aesText")
    button(@click="getAes") 密文
</template>

<script>
import { getAES } from '@/publicFn/tools'
export default {
  data () {
    return{
      aesText: ''
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
    },
    getAes () {
      var miwen = getAES(this.aesText)
      alert(miwen)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
