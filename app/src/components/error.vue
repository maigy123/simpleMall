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
  width: 100%;
  height: 100%;
  background: white;
  opacity: 0.9;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  color: red;
}
</style>