<template lang="pug">
  .confirm
    .confirmDiv
      .text
        span(v-if="type === 'delete'") 确认删除所选项
        span(v-else) 确认结算所选商品
      .button
        .cancel(@click="cancel")
          span 取消
        .sure(@click="sure")
          span 确认
</template>

<script>
export default {
  props: ['type'],
  data () {
    return{
    }
  },
  components: {
  },

  created () {
  },

  mounted () {
  },

  methods: {
    cancel () {
      this.$emit('res', 'cancel')
    },
    sure () {
      this.$emit('res', 'sure')
    }
  }
}
</script>

<style lang="less" scoped>
.confirm{
  position: fixed;
  left:0;
  right:0;
  top:0;
  bottom:0;
  background: #CCCCCC;
  opacity: 0.8;
  z-index: 6;
  display: flex;
  align-items: center;
  justify-content: center;

  .confirmDiv{
    width: 400px;
    height: 140px;
    background: #fff;
    text-align: center;
    border-radius: 5px;
    span{
      line-height: 70px;
    }

    .text{
      height: 50%;
      width: 100%;
      border-bottom: 1px #ADADAD solid;
    }
    .button{
      height: 50%;
      width: 100%;
      cursor: pointer;
      .cancel{
        float: left;
        width: 49%;
        border-right: 1px #ADADAD solid;
      }
      .sure{
        float: right;
        width: 49%;
      }
    }
  }
}
</style>
