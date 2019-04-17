<template lang="pug">
  .detail
    Error(v-if="errText !== ''" :text="errText")
    .detailDiv(:style="{height: height - 130 + 'px'}")
      .name
        span {{ data.name }}
      .img
        img(:src="data.imgSrc")
      .lists
        span 销量： {{ data.selledNum }}
        br
        span 价格： ￥{{ data.price }}
        br
        span 品类： {{ this.class }}
        br
        span 商品库存： {{ data.stock }}
        br
        span 商品描述：{{ data.desc}}
        br
        span 审核状态： {{ examine }}
        br
        span(v-if="examine === '审核不通过'") {{ data.reason }}
      .operation
        h3 审核:
        span 审核结果：
        span.res(:class="{success: result === 1}" @click="doSuccess") 通过
        span.res(:class="{fail: result === 2}" @click="doFail") 拒绝
        span.postRes(v-show="result !== ''" @click="postRes") 提交
      .failReason(v-show="result === 2") 
        span 拒绝原因：
        textarea(v-model="failReason" placeholder="请输入拒绝原因")
</template>

<script>
import Error from '@/components/public/error.vue'
export default {
  props: ['data', 'height'],
  data () {
    return{
      classes: ['衣物', '家具', '饮食', '图书', '化妆品', '电子产品'],
      class: '',
      examine: '',
      errText: '',
      result: '',
      failReason: ''
    }
  },
  components: {
    Error
  },

  watch: {
    'data.name' () {
      this.result = ''
    }
  },

  created () {
    this.doFirst()
  },

  mounted () {
  },

  beforeUpdate () {
    this.doFirst()
  },

  methods: {
    doFirst () {
      for (let i in this.classes) {
        if (this.data.class === parseInt(i)) {
          this.class = this.classes[i]
        }
      }
      if (this.data.examine === 0) {
        this.examine = '待审核'
      } else if (this.data.examine === 1) {
        this.examine = '审核通过'
      } else {
        this.examine = '审核不通过'
      }
    },

    doSuccess () {
      if (this.data.examine === 1) { 
        this.errDeal('商品已是审核通过')
      } else {
        this.result = 1
      }
    },

    doFail () {
      if (this.data.examine === 2) {
        this.errDeal('商品已是审核不通过')
      } else {
        this.result = 2
      }
    },

    postRes () {
      console.log('aa')
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

<style lang="less" scoped>
.detail{
  width: 100%;
  

  .detailDiv{
    width: 100%;
    position: relative;
    z-index: 2;
    width: 100%;
    border-left: 1px #A8A8A8 solid;
    overflow-y: scroll;

    .name{
      padding-top: 30px;
      width: 100%;
      text-align: center;
      font-size: 20px;
      font-weight: 600;
    }

    .img{
      width: 100%;
      margin-top: 30px;
      text-align: center;
      img{
        width: 80%;
        height: auto;
      }
    }

    .lists{
      margin: 30px 0 0 80px;
    }

    .operation{
      padding-left: 50px;
      // border: 1px solid;

      .res ,.postRes{
        line-height: 50px;
        padding: 6px 20px;
        border-radius: 30px;
        margin-left: 30px;
        color: white;
        background: #969696;
        border: 1px solid;

        &.success{
          background: #32CD32;
        }
        &.fail{
          background: #CD2626;
        }
      }
      .postRes{
        background: #32CD32;
      }
      .postRes:hover{
        background: #EEB422;
      }
    }

    .failReason{
      height: 100px;
      padding: 20px 50px;
      display: flex;
      span{
        display: block;
        width: 100px;
      }
      textarea{
        width: 300px;
      }
    }
  }
}
</style>