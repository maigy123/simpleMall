<template lang="pug">
  .putOff
    Error(v-if="errText !== ''" :text="errText")
    .searchDiv
      span 输入商品名字搜索
      input(type="text" v-model="keyName" placeholder="请输入卖方名称")
      button(@click="searchGoods") 确定
    .listAndDetail
      ListAndDetail(v-if="data !== ''" :data="data")
</template>

<script>
import Error from '@/components/public/error.vue'
import ListAndDetail from '@/components/manager/listDetail.vue'
export default {
  props: ['height'],
  data () {
    return {
      sellerName: '',
      keyName:'',
      errText: '',
      data: []
    }
  },

  components: {
    Error,
    ListAndDetail
  },

  created () {
  },

  mounted () {
  },

  methods: {
    searchGoods () {
      if (this.keyName.length === 0) {
        this.errDeal('请输入商品关键字')
      } else {
        var params = {searchText: this.keyName}
        this.$reqs.post("/managers/search", params).then((res) => {
          console.log(res.data)
          if (res.data.code === 0) {
            this.data = res.data.data
          } else {
            this.errDeal(res.data.error)
          }
        })
      }
    },

    errDeal (text) {
      this.errText = text
      setTimeout(() => {
        this.errText = ''
      }, 1500)
    }
  }
}
</script>

<style lang="less">
.putOff{

  .searchDiv{
    width: 100%;
    height: 80px;
    border-bottom: 1px solid;
    display: flex;
    align-items: center;
    justify-content: center
  }
}
</style>