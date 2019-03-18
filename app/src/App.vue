<template lang="pug">
  #app(ref="app")
    .head
      Header
    .body
      router-view
    .foot
</template>

<script>
import Header from '@/components/public/header'
export default {
  name: 'app',
  data () {
    return{
      minHeight: 0
    }
  },
  components: {
    Header
  },

  created () {
    this.minHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  },

  mounted () {
    this.$refs.app.style.minHeight = this.minHeight + 'px'
  }
}
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background: white;
  padding: 0;
  margin: 0;
  width: 100%;
  display: flex;
  flex-direction: column;

  .head{
    width: 100%;
    height: 30px;
    background: #EDEDED;
  }

  .body{
    width: 100%;
    flex: 1;
  }

  .foot{
    width: 100%;
    height: 100px;
    background: #C9C9C9;
  }
}
</style>
