<template lang="pug">
  .manager
    .loginDiv(v-if="!isLogin")
      Login(:height="screenHeight" v-on:haveLogin="haveLogin")
    .index(v-show="isLogin" ref="index")
      .menu
        li(v-for="(item, index) in menus" :key="index")
          span(@click="clickMenu(index)") {{ item }}
      .detail
        WaitManager(v-if="menuSelected === 0" :type="type")
</template>

<script>
import Login from '@/components/manager/login'
import WaitManager from '@/components/public/listAndDetail'
export default {
  data () {
    return {
      isLogin: false,
      screenHeight: 0,
      menus: ['待审核商品', '已审核管理'],
      menuSelected: '',
      type: 'manager'
    }
  },

  components: {
    Login,
    WaitManager
  },

  created () {
    this.screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  },

  mounted () {
    this.$refs.index.style.minHeight = this.screenHeight - 130 + 'px'
  },

  methods: {
    haveLogin () {
      this.isLogin = true
    },
    clickMenu (n) {
      this.menuSelected = n
    }
  }
}
</script>

<style lang="less">
.manager{
  .index{
    width: 100%;
    display: flex;
    .menu{
      width: 300px;
      text-align: center;
      padding-top: 50px;

      li{
        list-style: none;
        margin-top: 20px;
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
</style>