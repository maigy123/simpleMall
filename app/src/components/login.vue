<template lang="pug">
  .login
    Error(v-if="isErr" :text="errText")
    .tips
      span 登录/注册
    .name
      img(src="@/assets/account.png")
      input(type="text" v-model="name" placeholder="请输入账号")
    .pwd
      img(src="@/assets/pwd.png")
      input(type="password" v-model="pwd" placeholder="请输入密码")
    .pwd(v-if="(type === 'user') && (goReg)")
      img(src="@/assets/pwd.png")
      input(type="password" v-model="payPwd" placeholder="请输入六位支付密码（仅限数字）")
    .phone(v-if="goReg")
      img(src="@/assets/phone.png")
      input(type="number" v-model="phone" placeholder="请输入手机号")
    .button(@click="toSure")
      span {{ btnText }}
    .select
      span 忘记密码
      span(@click="toReg") 去注册
      span(@click="toLogin") 去登录
</template>

<script>
import Error from '@/components/error.vue'
export default {
  props: ['type'],
  data () {
    return{
      name: '',
      pwd: '',
      phone: '',
      goReg: false,
      btnText: '登 录',
      isErr: false,
      errText: '',
      payPwd: ''
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
      this.goReg = true
      this.btnText = '注 册'
    },
    toLogin () {
      this.toReg = false
      this.btnText = '登 录'
    },
    toSure () {
      if (this.name === '' || this.pwd === '') {
        this.errText = '账号或密码不能为空'
        this.errDeal()
        return
      }
      if (!this.goReg) {
        if (this.type !== 'user') {
          this.sellerLogin()
        } else {
          this.userLogin()
        }
      } else if (this.phone === '' || this.phone.length !== 11) {
        this.errText = '请填写正确的手机号'
        this.errDeal()
      } else if (this.type !== 'user') {
        this.SellerRegister()
      } else {
        this.userRegister()
      }

    },
    SellerRegister () {
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
    },
    errDeal () {
      this.isErr = true
      setTimeout(() => {
        this.isErr = false
      }, 2000)
    },
    userLogin () {
      var params = {name: this.name, pwd: this.pwd}
      this.$reqs.post("/users/login", params).then((res) => {
        if (res.data.code === 0) {
          this.$cookies.set('userName', this.name)
          this.$emit('haveLogin')
        } else {
          this.errText = res.data.error
          this.errDeal()
        }
      })
    },
    sellerLogin () {
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
    },
    userRegister () {
      if (this.payPwd.length === 6) {
        var params = {name: this.name, pwd: this.pwd, phone: this.phone, paypwd: this.payPwd}
        this.$reqs.post("/users/reg", params).then((res) => {
          if (res.data.code === 0) {
            this.$cookies.set('userName', this.name)
            this.$emit('haveLogin')
          } else {
            this.errText = res.data.err
            this.errDeal()
          }
        })
      } else {
        this.errText = '请填写正确的支付密码'
        this.errDeal()
      }
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
}
</style>