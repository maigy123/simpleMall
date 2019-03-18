<template lang="pug">
  .text2
    span 测试2页面
    button(@click="updateSession") 更新
    button(@click="getSession") 获取
    button(@click="removeSession") 清除
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
    getSession () {
      var res = sessionStorage.getItem("test1")
      alert(res)
    },
    updateSession () {
      sessionStorage.setItem("test1", 'asasas')
    },
    removeSession () {
      sessionStorage.removeItem("test1")
    }
  }
}
</script>

<style lang="less" scoped>
</style>
