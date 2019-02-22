<template lang="pug">
  .index
    .searchDiv
      Search
    .menuDiv
      .menu
        Menu(v-on:classFind="classFind" v-on:sortFind="sortFind")
      .slider(ref="slider")
        Slider(v-if="sliderW !== 0" :width="sliderW")
    .listsDiv
      li(v-for="(item, index) in data" :key="index")
        List(:data="item" :index="index" v-on:toDetail="toDetail")
    .selectPath
      span.lastOrNextPath 上一页
      li(v-for="(item, index) in allPaths" :key="index")
        span(@click="toPath(item)") {{ item }}
      span.lastOrNextPath 下一页
    Detail(v-if="openDetail !== ''" :data="data[openDetail]" v-on:outDetail="outDetail")
</template>

<script>
import Search from '@/components/index/search.vue'
import Slider from '@/components/index/slidershow.vue'
import Menu from '@/components/index/menu.vue'
import List from '@/components/index/goodList.vue'
import Detail from '@/components/index/goodDetail.vue'
export default {
  data () {
    return{
      sliderW: 0,
      path: 0,
      data: [],
      isGetData: false,
      openDetail: '',
      allPaths: [],
      thisPath: 1,
      classed: false,
      sorted: false,
      params: {}
    }
  },

  components: {
    Search,
    Slider,
    Menu,
    List,
    Detail
  },

  created () {
    this.getData()
    // this.getPaths()
    this.classSortFind()
  },

  mounted () {
    this.sliderW = this.$refs.slider.clientWidth
    this.$refs.slider.style.height = this.sliderW * 500 / 1180 + 'px'
  },

  methods: {
    getPaths () {
      this.$reqs.post('goods/getPath').then((res) => {
        if (res.data.code === 0 ) {
          this.dealPaths(res.data.data)
        }
      })
      /* var params = {class: 1}
      this.$reqs.post('goods/test', params).then((res) => {
        console.log('测试', res.data)
      }) */
    },
    dealPaths (n) {
      this.allPaths = []
      let max = 0
      if (n % 10 === 0) {
        max = n / 10
      } else {
        max = Math.floor(n / 10) + 1
      }
      for (let i = 0; i < max; i++) {
        this.allPaths[i] = i + 1
      }
    },
    getData () {
      var params = {path: this.path}
      this.$reqs.post('goods/getData', params).then((res) => {
        if (res.data.code === 0) {
          console.log(res.data.data)
          this.data = res.data.data
          this.isGetData = true
        }
      })
    },
    toDetail (n) {
      this.openDetail = n
    },
    outDetail () {
      this.openDetail = ''
    },
    toPath (n) {
      if (n !== this.thisPath) {
        this.path = (n - 1) * 10
        // this.getData()
        this.classSortFind()
        this.thisPath = n
      }
    },
    classFind (n) {
      if (n !== 0) {
        this.params.class = n - 1
      } else {
        // this.params.class = {}
        delete this.params.class
      }
      this.classSortFind()
    },
    sortFind (n) {
      if (n === 0) {
        delete this.params.sort
      } else if (n === 1) {
        this.params.sort = {'selledNum': -1}
      } else if (n === 2) {
        this.params.sort = {'selledNum': 1}
      } else if (n === 3) {
        this.params.sort = {'price': -1}
      } else {
        this.params.sort = {'price': 1}
      }
      this.classSortFind()
    },
    classSortFind () {
      this.params.path = this.path
      this.$reqs.post('goods/classSortFind', this.params).then((res) => {
        if (res.data.code === 0) {
          this.data = res.data.data
          this.dealPaths(res.data.count)
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.index{
  color: #2c3e50;

  .searchDiv{
    width: 100%;
    height: 150px;
  }

  .menuDiv{
    width: 100%;
    display: flex;
    .slider{
      flex: 1;
    }
    .menu{
      flex: 1;
      background: #F2F2F2;
      display: flex;
      align-items: center;
    }
  }

  .listsDiv{
    width: 100%;
    padding: 0 20px 30px 50px;
    overflow: hidden;
    background: #e5e5e5;
    li{
      display: block;
      float: left;
      width: 250px;
      height: 300px;
      margin: 30px 30px 0 0;
    }
  }

  .selectPath{
    width: 100%;
    height: 40px;
    background: #e5e5e5;
    text-align: center;
    span{
      line-height: 40px;
    }
    span:hover{
      color: red;
    }
    .lastOrNextPath{
      padding: 5px 10px;
      border: 1px #e5e5e5 solid;
    }
    .path{
      margin-right: 10px;
    }
    li{
      display: inline;
      span{
        margin: 0 6px;
      }
    }
  }
}
</style>