<template lang="pug">
  .personalPath(ref="personal")
    .menu
      li(v-for="(item, index) in menus" :key="index" @click="toShowMenu(index)") {{ item }}
    .detail
      PeronalInfo(v-if="menuSelectded === 1")
      Recharge(v-else-if="menuSelectded === 3")
      myCollect(v-else :type="type")
</template>

<script>
import PeronalInfo from '@/components/personal/personalInfo.vue'
import Recharge from '@/components/personal/recharge.vue'
import myCollect from '@/components/public/listAndDetail.vue'
export default {
  data () {
    return {
      menus: ['购买记录', '个人信息', '我的收藏', '充值中心'],
      menuSelectded: 1,
      type: 'myCollect'
    }
  },
  components: {
    PeronalInfo,
    Recharge,
    myCollect
  },

  created () {
  },

  mounted () {
    let minHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    this.$refs.personal.style.minHeight = minHeight - 130 + 'px'
  },

  methods: {
    toShowMenu (n) {
      if (n === 0) {
        this.type = 'payRecord'
      } else if (n === 2) {
        this.type = 'myCollect'
      }
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
    border-right: 1px #e5e5e5 solid;

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