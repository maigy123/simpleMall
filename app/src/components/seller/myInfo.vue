<template lang="pug">
  .myInfo
    Error(v-if="errText !== ''" :text="errText")
    .contence
      table
        tr
          th 昵称
          th {{ name }}
        tr
          td 手机号
          td {{ phone }}
    .btn
      .pwdBtn(@click="toAlterPwd")
        span 修改密码
      .nameBtn(@click="toAlterName")
        span 修改昵称
      .phoneBtn(@click="toAlterPhone")
        span 修改手机
    .alter(v-if="todo !== 'none'")
      .alterPwd(v-if="todo === 0")
        table
          tr
            td 旧密码:
            td
              input.input(type="password" v-model="pwd" placeholder="请输入旧密码")
          tr
            td 新密码:
            td
              input.input(type="password" maxlength="8" v-model="newPwd" placeholder="新密码（6~8位字符，仅限中文、字母、数字）")
        .sureBtn(@click="alterPwd")
          span 确认修改
      .alterName(v-else-if="todo === 1")
        table
          tr
            td 密码：
            td
              input.input(type="password" v-model="pwd" placeholder="请输入密码")
          tr
            td 新昵称：
            td
              input.input(type="text" maxlength="6" v-model="newName" placeholder="新昵称（3~6位字符,仅限中文、字母、数字）")
        .sureBtn(@click="alterName")
          span 确认修改
      .alterPhone(v-else-if="todo === 2")
        table
          tr
            td 密码：
            td
              input.input(type="password" v-model="pwd" placeholder="请输入密码")
          tr
            td 新手机：
            td
              input.input(type="number" v-model="newPhone" placeholder="请输入新手机")
        .sureBtn(@click="alterPhone")
          span 确认修改
</template>



<script>
import Error from '@/components/public/error'
import { getDAes, getAES } from '@/publicFn/tools'
export default {
  components: {
    Error
  },
  data () {
    return{
      name: '',
      phone: '',
      oriPwd: '',
      newPwd: '',
      newName: '',
      newPhone: '',
      pwd: '',
      todo: 'none',
      errText: '',
    }
  },

  created () {
    this.getMyInfo()
  },

  mounted () {
  },

  methods: {
    getMyInfo () {
      if (JSON.stringify(this.$store.state.sellerInfo) === '{}') {
        var sellerId = sessionStorage.getItem('sellerId')
        var params = {sellerId: sellerId}
        this.$reqs.post('/sellers/myInfo', params).then((res) => {
          if (res.data.code === 0) {
            var info = JSON.parse(getDAes(res.data.data))
            this.name = info.name
            var phone = info.phone
            this.phone = phone.substring(0, 3) + '****' + phone.substring(7)
            info.pwd = getDAes(info.pwd)
            this.$store.commit('setSellerInfo', info)
          }
        })
      } else {
        var info = this.$store.state.sellerInfo
        this.name = info.name
        var phone = info.phone
        this.phone = phone.substring(0, 3) + '****' + phone.substring(7)
      }
    },
    toAlterPwd () {
      if (this.todo === 0) {
        this.todo = 'none'
      } else {
        this.todo = 0
        this.newPwd = ''
      }
    },
    toAlterName () {
      if (this.todo === 1) {
        this.todo = 'none'
      } else {
        this.todo = 1
        this.newPwd = ''
      }
    },
    toAlterPhone () {
      if (this.todo === 2) {
        this.todo = 'none'
      } else {
        this.todo = 2
        this.newPwd = ''
      }
    },
    alterPwd () {
      if (this.newPwd.length < 6 || this.pwd === '') {
        this.errDeal('请正确输入新登录密码和原密码')
      } else if (/[^\u4e00-\u9fa5a-z0-9]/gi.test(this.newPwd)) {
        this.errDeal('请正确输新密码')
      } else {
        let pwd = this.$store.state.sellerInfo.pwd
        if (this.pwd !== pwd) {
          this.errDeal('密码不正确')
        } else {
          var params = {type: 'pwd', sellerId: this.$store.state.sellerInfo._id, newPwd: getAES(this.newPwd)}
          this.postReq(params)
        }
      }
    },
    alterName () {
      if (this.newName.length < 3 || this.pwd === '' || /[^\u4e00-\u9fa5a-z0-9]/gi.test(this.newName)) {
        this.errDeal('请正确输入新用户名')
      } else {
        let pwd = this.$store.state.sellerInfo.pwd
        if (this.pwd !== pwd) {
          this.errDeal('密码不正确')
        } else {
          var params = {type: 'name', sellerId: this.$store.state.sellerInfo._id, newName: this.newName}
          this.postReq(params)
        }
      }
    },
    alterPhone () {
      if (this.newPhone.length !== 11 || !(/[0-9]{11}/g.test(this.newPhone))) {
        this.errDeal('请输入正确的手机号')
      } else if (this.pwd === '') {
        this.errDeal('请输入密码')
      } else {
        let pwd = this.$store.state.sellerInfo.pwd
        console.log(pwd)
        if (this.pwd !== pwd) {
          this.errDeal('密码不正确')
        } else {
          var params = {type: 'phone', sellerId: this.$store.state.sellerInfo._id, newPhone: this.newPhone}
          this.postReq(params)
        }
      }
    },
    postReq (params) {
      this.$reqs.post('/sellers/alterInfo', params).then((res) => {
        if (res.data.code === 0) {
          this.errDeal('修改成功')
          this.$store.commit('setSellerInfo', {})
          this.getMyInfo()
          this.newPwd = ''
          this.newName = ''
          this.newPhone = ''
          this.pwd = ''
        } else {
          this.errDeal(rea.data.error)
        }
      })
    },
    errDeal (text) {
      this.errText = text
      setTimeout(() => {
        this.errText = ''
      }, 2000)
    }
  }
}
</script>

<style scoped lang="less">
.myInfo{
  width: 100%;
  text-align: center;
  .contence{
    font-size: 18px;
    font-weight: 600;
    table{
      width: 100%;
      height: 150px;
      background: #F5F5F5;
      border-collapse:collapse;

      tr { 
        border-bottom: 1px solid;
      }
    }
  }


  .btn{
    margin-top: 100px;
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: space-between;

    .pwdBtn, .nameBtn, .phoneBtn{
      width: 140px;
      height: 30px;
      color: #fff;
      border-radius: 10%;
      background: orange;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .pwdBtn{
      margin-left: 150px;
    }
    .phoneBtn{
      margin-right: 150px;
    }
  }


  .alter{
    width: 100%;
    padding-top: 30px;
    font-size: 16px;
    display: flex;
    justify-content: center;

    .alterPwd, .alterName, .alterPhone{
      table{
        width: 400px;
        height: 80px;
        background: #F0F0F0;
        margin: 0 auto;
        border-collapse:collapse;

        tr td{ 
          border-bottom: 1px solid;
        }

        .input{
          box-sizing: border-box;
          width: 100%;
          height: 100%;
          padding-left: 20px;
          border: none;
        }
      }
      .sureBtn{
        margin-top: 30px;
        span{
          color: white;
          padding: 6px 20px 6px 20px;
          border-radius: 40px;
          background: orange;
        }
      }
    }
  }
}
</style>