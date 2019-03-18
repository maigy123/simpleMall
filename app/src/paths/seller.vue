<template lang="pug">
  .sellerPath(ref="seller")
    .loginDiv(v-if="!isLogin" ref="loginDiv")
      .loginFrame
        Login(v-on:haveLogin="haveLogin")
    .contentce(v-if="isLogin" ref="sellerDiv")
      .sellerHeader
        span 当卖家，去赚钱
        span(@click="logout") 退出登录
        // span 用户：{{ sellerName }}
      .sellerBody
        .menu
          li(v-for="(item, index) in menu" :key="index" @click="showDetail(index)") {{ item }}
        .detail
          MyGoods(v-if="detailX === 0" :type="type")
          PostGoods(v-else-if="detailX === 1")
          MyInfo(v-else="detailX ==== 2")
</template>

<script>
import Login from '@/components/public/login.vue'
import MyGoods from '@/components/public/listAndDetail.vue'
import PostGoods from '@/components/seller/postGoods.vue'
import MyInfo from '@/components/seller/myInfo.vue'
export default {
  data () {
    return{
      minHeight: 0,
      isLogin: false,
      sellerName: '',
      menu:  ['我的商品', '上线商品', '个人信息'],
      detailX: 'none',
      type: "myGoods"
    }
  },
  components: {
    Login,
    MyGoods,
    PostGoods,
    MyInfo
  },

  created () {
    this.minHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    let sellerId = sessionStorage.getItem('sellerId')
    if (sellerId !== null) {
      this.isLogin = !this.isLogin
    }
  },

  mounted () {
    this.$refs.seller.style.minHeight = this.minHeight - 130 + 'px'
    if (!this.isLogin) {
      this.$refs.loginDiv.style.minHeight = this.minHeight - 130 + 'px'
    } else {
      this.$refs.sellerDiv.style.minHeight = this.minHeight - 130 + 'px'
    }
  },

  methods: {
    haveLogin () {
      this.isLogin = !this.isLogin
      this.$refs.sellerDiv.style.minHeight = this.minHeight - 130 + 'px'
    },
    logout () {
      sessionStorage.removeItem('sellerName')
      this.isLogin = !this.isLogin
      this.$refs.loginDiv.style.minHeight = this.minHeight - 130 + 'px'
    },
    showDetail (x) {
      this.detailX = x
    }
  }
}
</script>

<style lang="less" scoped>
.sellerPath{
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

  .contentce{
    width: 100%;
    display: flex;
    flex-direction: column;
    .sellerHeader{
      width: 100%;
      height: 60px;
      background: #FF3030;
      color: white;

      span:nth-child(1){
        padding-left: 100px;
        font-size: 22px;
        line-height: 60px;
      }
      span:nth-child(2){
        float: right;
        padding-right: 100px;
        font-size: 14px;
        line-height: 60px;
        color: #2E2E2E;
      }
      span:nth-child(3){
        float: right;
        padding-right: 30px;
        font-size: 18px;
        line-height: 60px;
      }
    }
    .sellerBody{
      width: 100%;
      flex: 1;
      display: flex;
      .menu{
        width: 300px;
        // background: greenyellow;
        text-align: center;
        padding-top: 50px;

        li{
          list-style: none;
          margin-top: 10px;
        }
        li:hover{
          color: red;
        }
      }
      .detail{
        flex: 1;
        background: #E5E5E5;
      }
    }
  }
}
</style>