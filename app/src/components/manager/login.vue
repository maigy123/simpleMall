<template lang="pug">
  .managerLoginCom(ref="loginDiv")
    .login
      .tips
        span 管理员登录
      from(@keyup.enter="toLogin")
        .name
          img(src="@/assets/account.png")
          input(type="text" v-model="name" placeholder="请输入账号")
        .pwd
          img(src="@/assets/pwd.png")
          input(type="password" v-model="pwd" placeholder="请输入密码")
        .button(@click="toLogin")
          span 登录
        .error(v-if="isErr")
          Error(:text="errText")
</template>

<script>
import Error from '@/components/public/error.vue'
export default {
  props: ['height'],
  data () {
    return {
      name: 'manager1',
      pwd: '12345678',
      isErr: false,
      errText: ''
    }
  },

  components: {
    Error
  },

  created () {
  },

  mounted () {
    this.$refs.loginDiv.style.height = this.height - 130 + 'px'
  },

  methods: {
    toLogin () {
      if (this.name === '' || this.pwd === '') {
        this.errText = '请输入内容'
        this.errDeal()
      } else {
        this.login()
      }
    },
    login () {
      var params = {name: this.name, pwd: this.pwd}
      this.$reqs.post("/managers/login", params).then((res) => {
        if (res.data.code === 0) {
          this.$emit('haveLogin')
        } else {
          this.errText = res.data.error
        this.errDeal()
        }
      })
    },
    errDeal () {
      this.isErr = true
      setTimeout(() => {
        this.isErr = false
      }, 2000)
    }
  }
}
</script>

<style lang="less">
.managerLoginCom{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .login{
    width: 380px;
    position: relative;
    display: flex;
    flex-direction: column;
    padding-left: 30px;
    border: 1px solid;

    .tips{
      margin-top: 30px;
      font-size: 18px;
      font-weight: 700;
      color: black;
    }

    .name, .pwd{
      margin-top: 20px;
      height: 40px;
      width: 340px;
      border: 1px solid;

      img{
        width: 40px;
        height: 40px;
        border-right: 1px solid;
      }
      input{
        display: block;
        float: right;
        height: 38px;
        width: 290px;
        border: none;
        outline: none;
      }
    }

    .button{
      margin-top: 20px;
      width: 340px;
      height: 40px;
      background: #EE0000;
      border-radius: 5px;
      margin-bottom: 40px;
      display: flex;
      align-items: center;
      justify-content: center;

      span{
        width: auto;
        color: white;
        font-weight: 500;
      }
    }
    .button:hover{
      background: gold;
    }
    .error{
      position: absolute;
      top: 150px;
      left: 100px;
      width: 200px;
      height: 50px;
    }
  }
}
</style>