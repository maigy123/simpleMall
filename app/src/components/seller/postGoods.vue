<template lang="pug">
  .postGoods
    Error(v-if="errText !== ''" :text="errText")
    .header
      span 上线商品
    .body
      .bodyMenu
        .left
          span 商品名称：
          span 商品价格：
          span 商品品类：
          span 商品图片：
          span 商品描述：
        .right
          input(type="text" v-model="goodName" placeholder="请输入商品名称")
          input(type="number" v-model="price" placeholder="请输入商品价格")
          .class
            li(v-for="(item, index) in classes" :key="index" @click="chooseCalss(index)")
              .classTip(:class="{active: classSelected === index}")
              .text
                span {{ item }}
          .postImg
            span （请上传 1024*640 规格的图片，其余规格图片显示将会出现异常）
            .getImg
              span(@click="getImg") 点击上传
              input.input(type="file" ref="getImg" @change="processFile")
          .desc
             textarea(v-model="desc" ref="textarea")
          .postGood
            span(@click="postGood") 上线商品
      .imgShow
        img(v-if="imgSrc !== ''" :src="imgSrc")
</template>

<script>
import Error from '@/components/error.vue'
export default {
  data () {
    return{
      goodName: '',
      price: '',
      imgSrc: '',
      classes: ['衣物', '家具', '饮食', '图书', '化妆品', '电子产品'],
      sellerId: '',
      classSelected: '',
      imgNum: 2,
      text: '选择上传',
      errText: '',
      desc: ''
    }
  },

  components: {
    Error
  },

  created () {
    this.sellerId = sessionStorage.getItem('sellerId')
  },

  mounted () {
  },

  methods: {
    chooseCalss (n) {
      this.classSelected = n
    },
    getImg () {
      this.$refs.getImg.click()
    },
    processFile () {
      var file = this.$refs.getImg.files[0]
      if (/image/.test(file.type)) {
        var reader = new FileReader()
        reader.onload = (event) => {
          this.imgSrc = event.target.result
        }
        reader.readAsDataURL(file)
      }
    },
    postGood () {
      if (this.goodName === '' || this.price === '' || this.imgSrc === '' || this.classSelected === '') {
        this.errText = '信息不能为空'
        this.exitErr()
      } else {
        var params = {name: this.goodName, price: this.price, sellerId: this.sellerId, class: this.classSelected, desc: this.desc, imgSrc: this.imgSrc}
        this.$reqs.post("/goods/postGoods", params).then((res) => {
          if (res.data.code === 0) {
            this.errText = '上线商品成功'
            this.goodName = ''
            this.price = ''
            this.imgSrc = ''
            this.classSelected = ''
            this.desc = ''
          } else {
            this.errText = '上线商品失败'
          }
          this.exitErr()
        })
      }
    },
    exitErr () {
      setTimeout(() => {
        this.errText = ''
      }, 1500)
    }
  }
}
</script>

<style scoped lang="less">
.postGoods{
  width: 100%;

  .header{
    height: 50px;
    width: 100%;
    background: #FF6347;

    span{
      padding-left: 100px;
      color: white;
      font-size: 20px;
      line-height: 50px;
    }
  }

  .body{
    width: 100%;
    display: flex;
    padding-top: 60px;
    background: white;
    .bodyMenu, .imgShow{
      flex: 1;
    }
    .bodyMenu{
      display: flex;
      border-right: 1px solid;
      .left{
        width: 300px;
        span{
          display: block;
          margin: 5px 0 0 100px;
          line-height: 40px;
          font-size: 16px;
        }
        span:nth-child(4){
         margin: 45px 0 0 100px;
        }
        span:nth-child(5){
         margin: 55px 0 0 100px;
        }
      }
      .right{
        flex: 1;
        input{
          display: block;
          width: 200px;
          height: 40px;
          border: none;
          outline: none;
          border-bottom: 1px solid;
        }
        .class{
          padding-top: 10px;
          li{
            display: inline-block;
            margin-right: 20px;
            .classTip{
              float: left;
              width: 16px;
              height: 16px;
              margin-top: 10px;
              border-radius: 50%;
              background: white;
              border: 1px solid;

              &.active{
                background: #76EE00;
              }
            }
            .text{
              float: right;
              margin-left: 10px;
              span{
                line-height: 40px;
                font-size: 16px;
              }
            }
          }
        }
        .postImg{
          margin-top: 10px;
          .getImg{
            .input{
              display: none;
            }
            span{
              text-decoration: underline;
              color: red;
            }
            span:hover{
              color: #EEEE00;
            }
          }
        }
        .desc{
          margin-top: 20px;
          width: 100%;
          textarea{
            width: 80%;
            min-height: 50px;
          }
        }
        .postGood{
          height: 50px;
          margin: 50px 0 0 50px;

          span{
            padding: 10px 20px;
            background: #EEB422;
            border-radius: 10px;
            color: white;
          }
          span:hover{
            background: #EE4000;
          }
        }
      }
    }
  }

  .imgShow{
    img{
      width: 48%;
      height: auto;
    }
  }
}
</style>