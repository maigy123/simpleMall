<template lang="pug">
  .myGoods
    .lists
      .hideScolly(ref="lists")
        .listMinHeight(:style="{minHeight: height + 'px'}")
          .list-item(v-for="(item, index) in data" :key="index")
            List(:data="item" :index="index" :type="type" v-on:toDetail="detailIndex")
    .details(v-if="type === 'myGoods'")
      Detail(:data="data[goodSelected]" :height="height" v-on:updateData="updateData")
    .details(v-else-if="type === 'manager'")
      Examine(:data="data[goodSelected]" v-on:updateData="updateData")
    .details(v-else)
      PersonlGoodsDetail(:data="data[goodSelected]" :height="height" :type="type" v-on:updateData="updateData")
</template>

<script>
import List from '@/components/public/list.vue'
import Detail from '@/components/seller/myGoods/detail.vue'
import Examine from '@/components/manager/examine.vue'
import PersonlGoodsDetail from '@/components/personal/goodsDetail.vue'
export default {
  props: ['type'],
  data () {
    return{
      data: [],
      height: 0,
      goodSelected: 0,
    }
  },

  watch: {
    getType (newValue) {
      if (newValue === 'myCollect') {
        this.getMyCollect()
      } else if (newValue === 'payRecord') {
        this.getPayRecord()
      }
    }
  },

  computed: {
    getType () {
      return this.type
    }
  },

  components: {
    List,
    Detail,
    Examine,
    PersonlGoodsDetail
  },

  created () {
    this.getData()
    this.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  },

  mounted () {
    this.$refs.lists.style.height = this.height - 50 + 'px'
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
      } else if (this.type === 'myGoods') {
        this.getMyGoods()
      } else if (this.type === 'myCollect') {
        this.getMyCollect()
      } else if (this.type === 'payRecord') {
        this.getPayRecord()
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
    },
    getMyCollect () {
      var params = {userId: sessionStorage.getItem('userId')}
      this.$reqs.post('mix/myCollect', params).then((res) => {
        console.log('cart:', res.data)
        if (res.data.code === 0) {
          this.data = res.data.data
        }
      })
    },
    getPayRecord () {
      var params = {userId: sessionStorage.getItem('userId')}
      this.$reqs.post('/carts/payRecord', params).then((res) => {
        console.log('adadadada', res.data.data)
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
    overflow: hidden;
    // border-right: 1px #A8A8A8 solid;

    .hideScolly{
      width: 517px;
      background: #fff;
      overflow-y: auto;
      .listMinHeight{
        .list-item{
          width: 100%;
          height: 100px;
          border-bottom: 1px #D9D9D9 solid;
        }
      }
    }
  }

  .details{
    flex: 1;
    background: white;
  }
}
</style>