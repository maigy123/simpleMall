<template lang="pug">
  .myGoods
    .lists(ref="lists")
      .list-item(v-for="(item, index) in data" :key="index")
        List(:data="item" :index="index" :type="type" v-on:toDetail="detailIndex")
    .details(v-if="type === 'seller'")
      Detail(v-if="goodSelected !== ''" :data="data[goodSelected]" v-on:updateData="updateData")
    .details(v-if="type === 'manager'")
      Examine(v-if="goodSelected !== ''" :data="data[goodSelected]" v-on:updateData="updateData")
</template>

<script>
import List from '@/components/list.vue'
import Detail from '@/components/seller/myGoods/detail.vue'
import Examine from '@/components/manager/examine.vue'
export default {
  props: ['type'],
  data () {
    return{
      data: [],
      minHeight: 0,
      goodSelected: '',
    }
  },

  components: {
    List,
    Detail,
    Examine
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
      this.getData()
    },
    getData () {
      if (this.type === 'manager') {
        this.getWaitManagerData()
      } else {
        this.getMyGoods()
      }
    },
    getMyGoods () {
      var sellerId = sessionStorage.getItem('sellerId')
      var params = {sellerId: sellerId}
      this.$reqs.post("/goods/myGoods", params).then((res) => {
        if (res.data.code === 0) {
          this.data = res.data.data
        }
      })
    },
    getWaitManagerData () {
      this.$reqs.post("/goods/managerGoods").then((res) => {
        console.log(res.data)
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