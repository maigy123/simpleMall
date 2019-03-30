<template lang="pug">
  .userPath(ref="user")
    .loginDiv(ref="loginDiv")
      .loginFrame
        Login(:type="type" v-on:haveLogin="haveLogin")
</template>

<script>
import Login from '@/components/public/login.vue'
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
    this.$refs.user.style.minHeight = this.minHeight - 60 + 'px'
    this.$refs.loginDiv.style.minHeight = this.minHeight - 60 + 'px'
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
  background: url("./../assets/loginBackImg.jpg") no-repeat;
  overflow: hidden;
  background-size:cover;
  .loginDiv{
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;

    .loginFrame{
      height: 400px;
      width: 400px;
      margin-right: 200px;
      // border: 1px solid;
    }
  }
}
</style>

