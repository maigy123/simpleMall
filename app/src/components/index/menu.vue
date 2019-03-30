<template lang="pug">
  .myMune
    //.contence
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
    .contence
      .menu
        li(v-for="(select, index) in lists" :key="index" @mouseover="hoverEvent(index)" @mouseout="leaveEvent" @click="sortFind(index)")
          span {{ select }}
      .slider
        Slider(:width="999")
      .classDiv(v-show="showClasses" @mouseover="hoverEvent(0)" @mouseout="leaveEvent")
        li(v-for="(item, index) in classes" :key="'class'+index")
          span(:class="{ active: classed == index }" @click="classFind(index)") {{ item }}
</template>

<script>
import Slider from '@/components/index/slidershow.vue'
export default {
  data () {
    return{
      classes: ['全部', '衣物', '家具', '饮食', '图书', '化妆品', '电子产品'],
      /* selects: ['品类', '排序', '价格'],
      sorts: ['默认', '销量高->低', '销量低->高', '价格高->低', '价格低->高'], */
      lists: ['品类', '默认排序', '销量高至低', '销量低至高', '价格高至低', '价格低至高'],
      minPrice: '',
      maxPrice: '',
      classed: 0,
      sorted: 0,
      showClasses: false
    }
  },
  components: {
    Slider
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
      if (n !== 0) {
        //this.sorted = n
        this.$emit('sortFind', n-1)
      }
    },
    hoverEvent (n) {
      if (n === 0) {
        this.showClasses = true
      }
    },
    leaveEvent () {
      if (this.showClasses) {
        this.showClasses = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.myMune{
  width: 1199px;

  /* .contence{
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
          cursor: pointer;
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
  } */
  
  .contence{
    height: 423px;
    width: 100%;
    position: relative;
    display: flex;
    .menu{
      box-sizing: border-box;
      width: 200px;
      height: 100%;
      padding: 20px 0;
      background: #7A7A7A;
      display: flex;
      flex-direction: column;
      li{
        list-style: none;
        color: #fff;
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      li:hover{
        background: #EE7600;
      }
    }
    .slider{
      flex: 1;
      height: 100%;
    }
    .classDiv{
      position: absolute;
      box-sizing: border-box;
      padding: 40px 60px;
      right: 0;
      top: 0;
      width: 1000px;
      height: 100%;
      z-index: 4;
      background: #7A7A7A;
      opacity: 0.9;
      color: #fff;
      box-shadow: 5px 5px 5px #888888;
      display: flex;
      li{
        display: inline-block;
        width: 100px;
        height: 30px;
        font-size: 18px;
        line-height: 30px;
        span:hover{
          color: #EE7600;
        }
      }
    }

    li{
      span{
        cursor: pointer;
      }
    }
  }
}
</style>