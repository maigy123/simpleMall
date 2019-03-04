<template lang="pug">
  .myInfo
    .contence
      span 昵称：{{ name }}
      br
      span 手机号：{{ phone }}
    .btn
      .pwdBtn(@click="toAlterPwd")
        span 修改密码
      .nameBtn(@click="toAlterName")
        span 修改昵称
      .phoneBtn(@click="toAlterPhone")
        span 修改手机
    .alter(v-if="todo !== 'none'")
      .alterPwd(v-if="todo === 0")
        span 旧密码：
        input(type="password" v-model="oriPwd" placeholder="请输入旧密码")
        br
        span 新密码：
        input(type="password" v-model="newPwd" placeholder="请输入新密码")
        br
        span 确认修改
      .alterName(v-if="todo === 1")
        span 密码：
        input(type="password" v-model="pwd" placeholder="请输入密码")
        br
        span 新昵称：
        input(type="text" v-model="newName" placeholder="请输入新昵称")
        br
        span 确认修改
      .alterPhone(v-if="todo === 2")
        span 密码：
        input(type="password" v-model="pwd" placeholder="请输入密码")
        br
        span 旧手机：
        input(type="number" v-model="oriPhone" placeholder="请输入旧手机")
        br
        span 新手机：
        input(type="number" v-model="newPhone" placeholder="请输入新手机")
        br
        span 确认修改
</template>

<script>
export default {
  data () {
    return{
      name: '',
      phone: '',
      oriPwd: '',
      newPwd: '',
      newName: '',
      oriPhone: '',
      newPhone: '',
      pwd: '',
      todo: 'none',
      income: ''
    }
  },

  created () {
    this.getMyInfo()
  },

  mounted () {
  },

  methods: {
    getMyInfo () {
      var sellerId = sessionStorage.getItem('sellerId')
      var params = {sellerId: sellerId}
      this.$reqs.post('/sellers/myInfo', params).then((res) => {
        if (res.data.code === 0) {
          this.name = res.data.data.name
          var phone = res.data.data.phone
          this.phone = phone.substring(0, 3) + '****' + phone.substring(7)
          this.income = res.data.data.income
        }
      })
    },
    toAlterPwd () {
      if (this.todo === 0) {
        this.todo = 'none'
      } else {
        this.todo = 0
      }
    },
    toAlterName () {
      if (this.todo === 1) {
        this.todo = 'none'
      } else {
        this.todo = 1
      }
    },
    toAlterPhone () {
      if (this.todo === 2) {
        this.todo = 'none'
      } else {
        this.todo = 2
      }
    }
  }
}
</script>

<style scoped lang="less">
.myInfo{
  width: 100%;
  text-align: center;
  .contence{
    padding-top: 80px;
    font-size: 18px;
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
      border-radius: 50%;
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

    .alterPwd, .alterName, .alterPhone{
      flex: 1;
      
      span{
        line-height: 40px;
        font-size: 16px;
      }
      input{
        width: 200px;
        height: 20px;
        border: none;
        outline: none;
      }
    }
    .alterPwd, .alterName{
      span:nth-child(7){
        color: white;
        padding: 6px 20px 6px 20px;
        border-radius: 40px;
        background: #EEC900;
      }
    }
    .alterPhone{
      span:nth-child(10){
        color: white;
        padding: 6px 20px 6px 20px;
        border-radius: 40px;
        background: #EEC900;
      }
    }
  }
}
</style>