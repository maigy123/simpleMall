<template lang="pug">
  .personalPath(ref="personal")
    .menu
      li(v-for="(item, index) in menus" :key="index" @click="toShowMenu(index)") {{ item }}
    .detail
      PeronalInfo(v-if="menuSelectded === 1")
</template>

<script>
import PeronalInfo from '@/components/personal/personalInfo.vue'
export default {
  data () {
    return {
      menus: ['购买记录', '个人信息', '我的收藏', '充值中心'],
      menuSelectded: ''
    }
  },
  components: {
    PeronalInfo
  },

  created () {
  },

  mounted () {
    let minHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    this.$refs.personal.style.minHeight = minHeight - 130 + 'px'
  },

  methods: {
    toShowMenu (n) {
      this.menuSelectded = n
    } 
  }
}
</script>

<style lang="less">
.personalPath{
  width: 100%;
  display: flex;
  .menu{
    width: 300px;
    text-align: center;
    padding-top: 50px;

    li{
      list-style: none;
      margin-top: 20px;
      cursor: pointer;
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
</style>