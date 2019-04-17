<template lang="pug">
  .err
    span {{ text }}
</template>

<script>
export default {
  props: ['text'],
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
  }
}
</script>

<style lang="less" scoped>
.err{
  position: fixed;
  width: 300px;
  height: 50px;
  margin:auto;
  left:0;
  right:0;
  top:0;
  bottom:0;
  background: #EAEAEA;
  opacity: 0.9;
  z-index: 8;
  display: flex;
  justify-content: center;
  align-items: center;
  color: red;
}
</style>
