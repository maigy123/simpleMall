<template lang="pug">
  .detail
    Error(v-if="isErr" :text="errText")
    .name
      span {{ data.name }}
    .img
      img(:src="data.imgSrc")
    .attrs
      .lists
        span 价格： {{ data.price }}
        span 品类： {{ this.class }}
        br
        span 商品描述：{{ data.desc}}
    .operation
      h3 审核:
      span 审核结果：
      span.res(:class="{success: result === 1}" @click="toSuccess") 通过
      span.res(:class="{fail: result === 2}" @click="toFail") 拒绝
      span.postRes(v-show="result !== ''" @click="toPostRes") 提交
    .failReason(v-show="result === 2") 
      span 拒绝原因：
      textarea(v-model="failReason" placeholder="请输入拒绝原因")
</template>

<script>
import Error from '@/components/public/error.vue'
export default {
  props: ['data'],
  data () {
    return{
      classes: ['衣物', '家具', '饮食', '图书', '化妆品', '电子产品'],
      class: '',
      result: '',
      failReason: '',
      isErr: false,
      errText: ''
    }
  },

  watch: {
    'data.name' () {
      this.result = ''
    }
  },

  components: {
    Error
  },

  created () {
    this.doFirst()
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
      if (this.data.status === 0) {
        this.status = '售卖中'
      } else {
        this.status = '已下架'
      }
    },

    toSuccess () {
      this.result = 1
    },

    toFail () {
      this.result = 2
    },

    toPostRes () {
      var params = {id: this.data._id, examine: this.result, reason: ''}
      if (this.result === 2) {
        if (this.failReason === '') {
          this.errText = '拒绝必须填写拒绝原因'
          this.errDeal()
          return
        } else {
          params.reason = this.failReason
        }
      }
      this.postRes(params)
    },

    postRes (params) {
      this.$reqs.post("/goods/examineGoods", params).then((res) => {
        if (res.data.code === 0) {
          this.$emit('updateData')
        }
      })
    },
    
    errDeal () {
      this.isErr = true
      setTimeout(() => {
        this.isErr = false
      }, 2000)
    },
  }
}
</script>

<style lang="less" scoped>
.detail{
  width: 100%;

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

  .attrs{
    margin-top: 30px;
    padding: 0 0 0 50px;
    // display: flex;

    .lists{
      // flex: 1;
      padding-right: 10px;

      span:nth-child(1){
        margin-right: 100px;
      }
    }
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

  /* .error{
    position: fixed;
    top: 300px;
    right: 100px;
    width: 300px;
    height: 100px;
  } */
}
</style>

