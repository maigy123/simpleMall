<template lang="pug">
  .slidershow
    .showFrame(:style="{height: height + 'px'}")
      .wrap(:style="{width: width * 4 + 'px', height: height + 'px'}" ref="wrap")
        li(v-for="(item, index) in imgSrc" :index='index')
          img(:src='item' :style="{height: height + 'px', width: width + 'px'}")
      .tips
        li(v-for="(item, index) in tipsArr" :index='index' :class="{active: item == nowPic}" @click="toJumpPic(index)")
</template>

<script>

export default {
  props: ['width'],
  data () {
    return {
      screenWidth: 0,
      height: 0,
      nowPic: 1,
      loop: '',
      tipsArr: [],
      picNumber: 0,
      imgSrc: [require('@/assets/slider/sliderPic.jpg'), require('@/assets/slider/sliderPic1.jpg'), require('@/assets/slider/sliderPic2.jpg'), require('@/assets/slider/sliderPic3.jpg')]
    }
  },

  computed : {
  },
  
  created () {
    for (let i in this.imgSrc) {
      this.tipsArr[i] = parseInt(i) + 1
      this.picNumber++
    }
  },

  mounted () {
    this.$refs.wrap.style.left = this.width * -(this.picNumber - 1) + 'px'
    this.$refs.wrap.style.paddingLeft = this.width * (this.picNumber - 1) + 'px'
    this.height = 500 * this.width / 1180
    this.loop = this.showPicLoop()
  },

  beforeDestroy () {                     // 跳转其它页面前清除循环
    clearInterval(this.loop)
  },

  methods: {
    toNext () {
      if (this.nowPic !== this.picNumber) {
        let distance = 'translateX(' + (-this.width * this.nowPic) + 'px)'
        this.$refs.wrap.style.transform = distance
        this.nowPic++
      } else {
        this.$refs.wrap.style.transform = 'translateX(0px)'
        this.nowPic = 1
      }
    },

    toJumpPic (index) {
      if (index !== this.nowPic) {
        this.stopLoop()
        let distance = 'translateX(' + (-this.width * index) + 'px)'
        this.$refs.wrap.style.transform = distance
        this.nowPic = index + 1
      }
    },

    showPicLoop () {
      return setInterval(() => {
        this.toNext()
      }, 3500)
    },

    stopLoop () {
      clearInterval(this.loop)
      setTimeout(() => {
        this.resetLoop()
      }, 3000)
    },

    resetLoop () {
      clearInterval(this.loop)        // 连续点击后需要这步清楚所有loop循环
      this.loop = this.showPicLoop()
    }
  }
}
</script>

<style lang="less">
.slidershow{
  width: 100%;

  .showFrame{
    width: 100%;
    margin: 0 auto;
    overflow: hidden;
    font-size: 0;
    position: relative;

    .wrap{
      position: absolute;
      z-index: 1;
      -moz-transition:ease-out 1.5s;
      -o-transition:ease-out 1.5s;
      -webkit-transition:ease-out 1.5s;
      transition:ease-out 1.5s;

      li{
        display: inline;
      }
    }

    .tips{
      position: absolute;
      z-index: 2;
      bottom: 0;
      height: 30px;
      width: 100%;
      margin: auto;
      display: flex;
      justify-content: center;

      li{
        height: 20px;
        width: 20px;
        border-radius: 50%;
        border: 1px white solid;
        margin-left: 20px;

        &.active{
          box-shadow: 0 0 20px greenyellow;
          border: 1px greenyellow solid;
        }
      }

      li:first-child{
        margin-left: 0;
      }
    }
  }
}
</style>