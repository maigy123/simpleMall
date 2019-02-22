<template lang="pug">
  .myMune
    .contence
      .selectText
        li(v-for="(select, index) in selects" :key="index")
          span {{ select }}:
      .detail
        li(v-for="(item, index) in classes" :key="'class'+index")
          span(:class="{ active: classed == index }" @click="classFind(index)") {{ item }}
        br
        li(v-for="(item, index) in sorts" :key="'sort'+index")
          span(:class="{ active: sorted == index }" @click="sortFind(index)") {{ item }}
        br
        input(type="number" v-model="minPrice")
        span -
        input.input(type="number" v-model="maxPrice")
        span.sure 确定
</template>

<script>
export default {
  data () {
    return{
      selects: ['品类', '排序', '价格'],
      classes: ['全部', '衣物', '家具', '饮食', '图书', '化妆品', '电子产品'],
      sorts: ['默认', '销量高->低', '销量低->高', '价格高->低', '价格低->高'],
      minPrice: '',
      maxPrice: '',
      classed: 0,
      sorted: 0
    }
  },
  components: {
  },

  created () {
  },

  mounted () {
  },

  methods: {
    classFind (n) {
      this.classed = n
      this.$emit('classFind', n)
    },
    sortFind (n) {
      this.sorted = n
      this.$emit('sortFind', n)
    }
  }
}
</script>

<style lang="less" scoped>
.myMune{
  //height: 250px;
  width: 100%;

  .contence{
    padding-left: 30px;
    height: 100%;
    display: flex;
    .selectText{
      width: 60px;
      li{
        list-style-type :none;
        span{
          font-size: 16px;
          line-height: 40px;
        }
      }
    }

    .detail{
      flex: 1;
      li{
        display: inline;
        margin-right: 20px;
        span{
          font-size: 16px;
          line-height: 40px;
          &.active{
            color: #EE3B3B;
          }
        }
        span:hover{
          color: #EE3B3B;
        }
      }
      input{
        margin-top: 12px;
        width: 70px;
        height: 15px;
        border: none;
        outline: none;
        border-bottom: 1px black solid;
        background: #F2F2F2;
        margin-right: 10px;
        color: #FF6347;
      }
      .input{
        margin-left: 10px;
      }
      .sure{
        font-size: 12px;
        line-height: 40px;
        padding: 3px 8px;
        border: 1px #e5e5e5 solid;
      }
      .sure:hover{
        background: #FF6347;
        color: #fff;
      }
    }
  }
}
</style>