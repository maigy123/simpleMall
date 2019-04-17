<template lang="pug">
  .myGoods
    .lists
      .hideScolly(ref="lists")
        .listMinHeight(:style="{minHeight: height + 'px'}")
          .list-item(v-for="(item, index) in data" :key="index")
            List(:data="item" :index="index" v-on:toDetail="detailIndex")
    .details
      Detail(:data="data[goodSelected]" :height="height")
</template>

<script>
import List from '@/components/manager/list.vue'
import Detail from '@/components/manager/detail.vue'
export default {
  props: ['data'],
  data () {
    return{
      height: 0,
      goodSelected: 0,
    }
  },

  watch: {
  },

  computed: {
  },

  components: {
    List,
    Detail
  },

  created () {
    this.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  },

  mounted () {
    this.$refs.lists.style.height = this.height - 130 + 'px'
  },

  methods: {
    detailIndex (n) {
      this.goodSelected = n
      alert(this.data[this.goodSelected].name)
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