<template lang="pug">
  .personalInfoPath
    Error(v-if="errText !== ''" :text="errText")
    .myInfo
      li(v-for="(item, index) in myData" :key="index" :class="keyArr.includes(index)? {key: 1}: {value: 1}") {{item}}
      .toAlter
        span(@click="toShowAlter") 修改个人信息
    .alterInfo(v-show="showAlter")
      .tip 修改用户名/支付密码/手机号(不需要改的不用填，登录密码必须填):
      .newValueLabel
        span 新用户名:
        input(type="text" maxlength="6" v-model="newUserName" placeholder="请输入新用户名(4~6位字符,仅限中文、字母、数字)")
      .newValueLabel
        span 新支付密码:
        input(type="password" maxlength="6" v-model="newPayPwd" placeholder="请输入新支付密码(六位数字)")
      .newValueLabel
        span 新手机号:
        input(type="text" v-model="newPhone" placeholder="请输入新手机号")
      .newValueLabel
        span 登录密码:
        input(type="password" v-model="pwd" placeholder="请输入登录密码")
      .button(@click="toPost(0)")
        span 确认修改
      .tip 修改登录密码:
      .newValueLabel
        span 新登录密码:
        input(type="password" maxlength="8" v-model="newPwd" placeholder="请输入新登录密码(6~8位字符)")
      .newValueLabel
        span 手机号:
        input(type="text" v-model="phone" placeholder="请输入手机号")
      .button(@click="toPost(1)")
        span 确认修改
</template>

<script>
import Error from '@/components/public/error.vue'
import { getAES } from '@/publicFn/tools'
export default {
  data () {
    return{
      myOrinData: {},
      myData: [],
      keyArr: [0, 2, 4],
      showAlter: false,
      newUserName: '',
      newPwd: '',
      newPayPwd: '',
      newPhone: '',
      pwd: '',
      phone: '',
      errText: '',
      userId: ''
    }
  },
  components: {
    Error
  },

  created () {
    this.userId = sessionStorage.getItem('userId')
    this.getMyInfo()
  },

  mounted () {
  },

  methods: {
    getMyInfo () {
      var params = {userId: this.userId}
      this.$reqs.post('/users/myInfo', params).then((res) => {
        if (res.data.code === 0) {
          this.setMyInfo(res.data.data[0])
        }
      })
    },

    setMyInfo (data) {
      var phone = data.phone.substring(0, 3) + '****' + data.phone.substring(7)
      this.myData = ['用户名', data.name, '余额', '￥ ' + data.balance, '手机号', phone]
      this.myOrinData = {userName: data.name, payPwd: data.paypwd, phone: data.phone}
    },

    toShowAlter () {
      this.showAlter = !this.showAlter
    },

    toPost (n) {
      this.checkValue(n)
    },

    checkValue (n) {
      if (n === 0) {
        if (this.newPayPwd !== '' && !(/^[0-9]{6}/g.test(this.newPayPwd))) {
          this.errDeal('支付密码必须是六位数字')
        } else if (this.newPhone !== '' && !(/^[0-9]{11}/g.test(this.newPhone))) {
          this.errDeal('请输入正确的手机号')
        } else if (this.newUserName !== '' && this.newUserName.length < 4) {
          this.errDeal('请输入正确的用户名')
        } else if ((this.newUserName === '' && (this.newPayPwd === '' && this.newPhone === '')) || this.pwd === '') {
          this.errDeal('请按照说明输入正确数据')
        } else {
          this.alterOthers()
        }
      } else {
        if (this.newPwd.length < 6 || this.phone === '') {
          this.errDeal('请正确输入新登录密码和手机号')
        } else if (this.phone !== '' && !(/^[0-9]{11}/g.test(this.phone))) {
          this.errDeal('请正确输入手机号')
        } else {
          this.alterPwd()
        }
      }
    },

    alterPwd () {
      var params = {userId: this.userId, pwd: getAES(this.newPwd), phone: this.phone}
      this.$reqs.post('users/alterPwd', params).then((res) => {
        if (res.data.code === 0) {
          this.errDeal(修改成功)
          this.getMyInfo()
        } else {
          this.errDeal(res.data.error)
        }
      })
    },

    alterOthers () {
      var params = {userId: this.userId, pwd: getAES(this.pwd)}
      params.newUserName = this.newUserName? this.newUserName: this.myOrinData.userName
      params.newPayPwd = this.newPayPwd? this.newPayPwd: this.myOrinData.payPwd
      params.newPhone = this.newPhone? this.newPhone: this.myOrinData.phone
      this.$reqs.post('users/alterOthers', params).then((res) => {
        if (res.data.code === 0) {
          this.errDeal(修改成功)
          this.getMyInfo()
        } else {
          this.errDeal(res.data.error)
        }
      })
    },
    errDeal (errText) {
      this.errText = errText
      setTimeout(() => {
        this.errText = ''
      }, 2000)
    }
  }
}
</script>

<style lang="less" scoped>
.personalInfoPath{
  height: 100%;
  display: flex;

  .myInfo{
    width: 350px;
    background: #FFD39B;
    li{
      height: 60px;
      text-align: center;
      line-height: 60px;
      list-style: none;
      color: #fff;
      &.key{
        background: #FFA54F;
      }
      &.value{
        background: #FFD39B;
      }
    }

    .toAlter{
      margin-top: 80px;
      text-align: center;
      color: #fff;
      span{
        padding: 15px 25px;
        background: #FF8C00;
        border-radius: 30%;
        cursor: pointer;
      }
    }
  }

  .alterInfo{
    flex: 1;
    .tip{
      height: 30px;
      line-height: 30px;
      background: #CFCFCF;
      padding-left: 30px;
    }
    .newValueLabel{
      height: 40px;
      line-height: 40px;
      padding-left: 30px;
      background: #fff;
      border-bottom: 1px #CFCFCF solid;
      display: flex;

      span{
        width: 100px;
      }

      input{
        flex: 1;
        margin-left: 30px;
        padding-left: 20px;
        border: none;
        outline: none;
        border-left: 1px #CFCFCF solid;
        border-right: 1px #CFCFCF solid;
      }
    }
    .button{
      height: 30px;
      color: #fff;
      text-align: center;
      line-height: 30px;
      background: #FF8C00;
      cursor: pointer;
    }
  }
}
</style>
