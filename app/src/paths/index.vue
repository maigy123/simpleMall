<template lang="pug">
  .index
    Error(v-if="isErr" :text="errText")
    .searchDiv
      Search(v-on:search="search")
    .menuDiv
      Menu(v-on:classFind="classFind" v-on:sortFind="sortFind")
    .listsDiv
      li(v-for="(item, index) in data" :key="index")
        List(:data="item" :index="index" v-on:toDetail="toDetail")
    .selectPath
      span.lastOrNextPath(@click="toLastOrNextPath(0)") 上一页
      li(v-for="(item, index) in allPaths" :key="index")
        span(@click="toPath(item)") {{ item }}
      span.lastOrNextPath(@click="toLastOrNextPath(1)") 下一页
    Detail(v-if="openDetail !== ''" :data="data[openDetail]" v-on:outDetail="outDetail" v-on:haveErr="haveErr")
</template>

<script>
import Search from '@/components/index/search.vue'
import Menu from '@/components/index/menu.vue'
import List from '@/components/index/goodList.vue'
import Detail from '@/components/index/goodDetail.vue'
import Error from '@/components/public/error.vue'
import { getCartNumber } from '@/publicFn/tools'
export default {
  data () {
    return{
      path: 0,          // 要分页查询数
      data: [],
      isGetData: false,
      openDetail: '',
      allPaths: [],     // 所有页数
      thisPath: 1,      // 当前页数
      classed: false,
      sorted: false,
      params: {},
      isErr: false,
      errText: '',
      searchText: ''
    }
  },

  components: {
    Search,
    Menu,
    List,
    Detail,
    Error
  },

  created () {
    // this.getData()
    getCartNumber(this.$reqs, this.$store)
    this.classSortFind()
  },

  mounted () {
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
          // console.log(res.data.data)
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
    toLastOrNextPath (n) {
      if (n === 0) {
        if (this.thisPath === 1) {
          this.errText = '已经是最前页'
          this.errDeal()
        } else {
          this.path = (this.thispath - 2) * 10
          this.classSortFind()
          this.thisPath--
        }
      } else {
        if (this.thisPath === this.allPaths.length) {
          this.errText = '已经是最后页'
          this.errDeal()
        } else {
          this.path = (this.thisPath) * 10
          this.classSortFind()
          this.thisPath++
        }
      }
    },
    classFind (n) {
      this.thisPath = 1
      this.path = 0
      if (n !== 0) {
        this.params.class = n - 1
      } else {
        // this.params.class = {}
        delete this.params.class
      }
      this.searchText = ''
      this.classSortFind()
    },
    sortFind (n) {
      this.thisPath = 1
      this.path = 0
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
      this.params.searchText = this.searchText
      this.$reqs.post('goods/classSortFind', this.params).then((res) => {
        console.log(res.data)
        if (res.data.code === 0) {
          this.data = res.data.data
          this.dealPaths(res.data.count)
        }
      })
    },
    search (searchText) {
      this.searchText = searchText
      this.classSortFind()
    },
    haveErr (text) {
      this.errText = text
      this.errDeal()
    },
    errDeal () {
      this.isErr = true
      setTimeout(() => {
        this.isErr = false
      }, 2000)
    }
  }
}
</script>

<style scoped lang="less">
.index{
  color: #2c3e50;
  background: #F5F5F5;

  .searchDiv{
    width: 100%;
    height: 150px;
  }

  .menuDiv{
    width: 1200px;
    margin: 0 auto;
  }

  .listsDiv{
    width: 1370px;
    margin: 0 auto;
    overflow: hidden;
    li{
      display: block;
      float: left;
      width: 250px;
      height: 300px;
      margin: 30px 30px 0 0;
    }
    li:nth-child(5){
      margin: 30px 0;
    }
    li:nth-child(10){
      margin: 30px 0;
    }
  }

  .selectPath{
    width: 100%;
    height: 40px;
    background: #F5F5F5;
    text-align: center;
    span{
      line-height: 40px;
      font-weight: 600;
      cursor: pointer;
    }
    span:hover{
      color: red;
    }
    .lastOrNextPath{
      padding: 5px 10px;
      border: 1px #F8F8FF solid;
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