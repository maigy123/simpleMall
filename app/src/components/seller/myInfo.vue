<template lang="pug">
  .myInfo
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
              input.input(type="password" v-model="oriPwd" placeholder="请输入旧密码")
          tr
            td 新密码:
            td
              input.input(type="password" v-model="newPwd" placeholder="请输入新密码")
        .sureBtn 
          span 确认修改
      .alterName(v-if="todo === 1")
        table
          tr
            td 密码：
            td
              input.input(type="password" v-model="pwd" placeholder="请输入密码")
          tr
            td 新昵称：
            td
              input.input(type="text" v-model="newName" placeholder="请输入新昵称")
        .sureBtn 
          span 确认修改
      .alterPhone(v-if="todo === 2")
        table
          tr
            td 密码：
            td
              input.input(type="password" v-model="pwd" placeholder="请输入密码")
          tr
            td 新手机：
            td
              input.input(type="number" v-model="newPhone" placeholder="请输入新手机")
        .sureBtn 
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
      //oriPhone: '',
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