<template lang="pug">
  .login
    .tips
      span 登录/注册
    .name
      img(src="@/assets/account.png")
      input(type="text" v-model="name" placeholder="请输入账号")
    .pwd
      img(src="@/assets/pwd.png")
      input(type="password" v-model="pwd" placeholder="请输入密码")
    .phone(v-if="!isReg")
      img(src="@/assets/phone.png")
      input(type="number" v-model="phone" placeholder="请输入手机号")
    .button(@click="toSure")
      span {{ btnText }}
    .select
      span 忘记密码
      span(@click="toReg") 去注册
      span(@click="toLogin") 去登录
    .error(v-if="isErr")
      Error(:text="errText")
</template>

<script>
import Error from '@/components/error.vue'
export default {
  data () {
    return{
      name: '',
      pwd: '',
      phone: '',
      isReg: true,
      btnText: '登 录',
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
  },

  methods: {
    toReg () {
      this.isReg = false
      this.btnText = '注 册'
    },
    toLogin () {
      this.isReg = true
      this.btnText = '登 录'
    },
    toSure () {
      if (this.name === '' || this.pwd === '') {
        this.errText = '账号或密码不能为空'
        this.errDeal()
        return
      }
      if (this.isReg) {
        var params = {name: this.name, pwd: this.pwd}
        this.$reqs.post("/sellers/login", params).then((res) => {
          if (res.data.code === 0) {
            this.$cookies.set('sellerName', this.name)
            this.$emit('haveLogin', 1)
            this.$cookies.set('sellerPhone', res.data.phone)
            this.$cookies.set('income', res.data.income)
          } else {
            this.errText = res.data.err
            this.errDeal()
          }
        })
      } else {
        this.register()
      }
    },
    register () {
      if (this.phone === '' || this.phone.length !== 11) {
        this.errText = '请填写正确的手机号'
        this.errDeal()
        return
      } else{
        var params = {name: this.name, pwd: this.pwd, phone: this.phone}
        this.$reqs.post("/sellers/reg", params).then((res) => {
          if (res.data.code === 0) {
            this.$cookies.set('sellerName', this.name)
            this.$emit('haveLogin', 1)
            this.$cookies.set('sellerPhone', this.phone)
            this.$cookies.set('income', 0)
          } else {
            this.errText = res.data.err
            this.errDeal()
          }
        })
      }
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

<style lang="less" scoped>
.login{
  width: 400px;
  height: 400px;
  position: relative;
  display: flex;
  flex-direction: column;
  padding-left: 30px;

  .tips{
    margin-top: 30px;
    font-size: 18px;
    font-weight: 700;
    color: black;
  }

  .name, .pwd, .phone{
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

  .select{
    width: 340px;
    height: 15px;

    span{
      float: right;
      margin-left: 10px;
      width: auto;
      line-height: 30px;
      font-size: 12px;
      color: #969696;
    }
  }

  .button{
    margin-top: 20px;
    width: 340px;
    height: 40px;
    background: #EE0000;
    border-radius: 5px;
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
</style>