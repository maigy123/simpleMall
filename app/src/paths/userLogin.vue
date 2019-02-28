<template lang="pug">
  .userPath(ref="user")
    .loginDiv(ref="loginDiv")
      .loginFrame
        Login(:type="type" v-on:haveLogin="haveLogin")
</template>

<script>
import Login from '@/components/login.vue'
export default {
  data () {
    return {
      minHeight: 0,
      userName: '',
      type: 'user'
    }
  },
  components: {
    Login
  },
  created () {
    this.minHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  },
  mounted () {
    this.$refs.user.style.minHeight = this.minHeight - 130 + 'px'
    this.$refs.loginDiv.style.minHeight = this.minHeight - 130 + 'px'
  },

  methods: {
    haveLogin () {
      this.$router.push('index')
    }
  }
}
</script>

<style lang="less">
.userPath{
  width: 100%;
  .loginDiv{
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;

    .loginFrame{
      height: 400px;
      width: 400px;
      margin-right: 200px;
      border: 1px solid;
    }
  }
}
</style>

