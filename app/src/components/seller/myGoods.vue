<template lang="pug">
  .myGoods
    .lists(ref="lists")
      .list-item(v-for="(item, index) in data" :key="index")
        List(:data="item" :index="index" v-on:toDetail="detailIndex")
    .details
      Detail(v-if="goodSelected !== ''" :data="data[goodSelected]" v-on:updateData="updateData")
</template>

<script>
import List from '@/components/seller/myGoods/list.vue'
import Detail from '@/components/seller/myGoods/detail.vue'
export default {
  data () {
    return{
      data: [],
      minHeight: 0,
      goodSelected: ''
    }
  },

  components: {
    List,
    Detail
  },

  created () {
    this.getData()
    this.minHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  },

  mounted () {
    this.$refs.lists.style.minHeight = this.minHeight - 160 + 'px'
  },

  methods: {
    detailIndex (n) {
      this.goodSelected = n
    },
    updateData () {
      this.data = []
      this.getData(1)
    },
    getData (x) {
      var name = this.$cookies.get('sellerName')
      var params = {sellerName: name}
      this.$reqs.post("/goods/myGoods", params).then((res) => {
        if (res.data.code === 0) {
          this.data = res.data.data
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.myGoods{
  width: 100%;
  display: flex;
  .lists{
    width: 500px;
    border-right: 1px #A8A8A8 solid;

    .list-item{
      width: 100%;
      height: 100px;
      border-bottom: 1px #D9D9D9 solid;
    }
  }
  .details{
    flex: 1;
    background: white;
  }
}
</style>