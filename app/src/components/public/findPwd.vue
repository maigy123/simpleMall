<template lang="pug">
  .findPwd(@click="doBack")
    Error(v-if="errText !== ''" :text="errText")
    .frame(@click.stop="noBack")
      .tips
        span 找回密码
      form(@keyup.enter="toSure")
        .name
          img(src="@/assets/account.png")
          input(type="text" v-model="name" maxlength="6" placeholder="请输入账号（3~6位字符）")
        .pwd
          img(src="@/assets/pwd.png")
          input(type="password" v-model="newPwd" placeholder="请设置密码（6~8位字符）")
        .phone
          img(src="@/assets/phone.png")
          input(type="number" v-model="phone" placeholder="请输入手机号")
        .button(@click="toSure")
          span 确认
</template>

<script>
import Error from '@/components/public/error.vue'
export default {
  props: ['type'],
  data () {
    return{
      name: '',
      newPwd: '',
      phone: '',
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
    doBack () {
      this.$emit('doBack')
    },
    noBack () {
    },
    toSure () {
      if (this.phone.length !== 11 || !(/[0-9]{11}/g.test(this.phone))) {
        this.errDeal('请输入正确的手机号')
      } else if (this.newPwd.length < 6 || this.newPwd.length > 8) {
        this.errDeal('请正确输入6~8位密码')
      } else if (this.name.length < 3) {
        this.errDeal('用户名最少为3位，请正确输入')
      } else if (this.type !== 'user') {
        this.sellerReq()
      } else {
        this.userReq()
      }
    },
    errDeal (text) {
      this.errText = text
      setTimeout(() => {
        this.errText = ''
      }, 2000)
    },
    sellerReq () {
      var params = {name: this.name, newPwd: this.newPwd, phone: this.phone}
      this.$reqs.post("/sellers/findPwd", params).then((res) => {
        if (res.data.code === 0) {
          this.errDeal('修改成功')
          setTimeout(() => {
            this.doBack()
          }, 1500)
        } else {
          this.errDeal(res.data.error)
        }
      })
    },
    userReq () {
      var params = {name: this.name, newPwd: this.newPwd, phone: this.phone}
      this.$reqs.post("/users/findPwd", params).then((res) => {
        if (res.data.code === 0) {
          this.errDeal('修改成功')
          setTimeout(() => {
            this.doBack()
          }, 1500)
        } else {
          this.errDeal(res.data.error)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.findPwd{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 5;
  background: black;
  display: flex;
  flex-direction: column;
  opacity: 0.9;

  .frame{
    position: fixed;
    width: 400px;
    height: 400px;
    background: white;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    opacity: 1.0;
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
}
</style>