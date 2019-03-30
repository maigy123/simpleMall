<template lang="pug">
  .detail
    .goodsDetailDiv(:style="{height: height - 50 + 'px'}")
      .name
        span {{ data.name }}
      .img
        img(:src="data.imgSrc")
      .alterImg
        span(@click="getImg") 点击更换照片
        input.input(type="file" ref="getImg" @change="processFile")
        span(@click="alterImg") 确认更换照片
      .attrs
        .lists
          span 购买次数： {{ data.selledNum }}
          br
          span 价格： {{ data.price }}
          br
          span 品类： {{ this.class }}
          br
          span 是否下架： {{ this.status }}
          br
          span 商品描述：{{ data.desc}}
        .operations
          li(v-for="(item, index) in operations" :key="index")
            span(@click="alter(index)") {{item}}
      .alter-area(v-if="toAlter")
        .left
          span 商品新名称：
          span 商品新价格：
          span 商品新品类：
          span 商品新描述：
        .right
          input(type="text" v-model="newName" placeholder="请输入商品名称")
          input(type="number" v-model="newPrice" placeholder="请输入商品价格")
          .class
            li(v-for="(item, index) in classes" :key="index" @click="chooseCalss(index)")
              .classTip(:class="{active: newClass === index}")
              .text
                span {{ item }}
          .desc
            textarea(v-model="newDesc")
          .alterGood
            span(@click="alterGood") 修改商品
      .putOff(v-if="toPutOff")
        span(@click="puton") 上架商品
        span(@click="putoff") 下架商品
</template>

<script>
export default {
  props: ['data', 'height'],
  data () {
    return{
      classes: ['衣物', '家具', '饮食', '图书', '化妆品', '电子产品'],
      class: '',
      status: '',
      operations: ['改商品名', '修改价格', '修改品类' , '商品状态', '商品描述'],
      newName: '',
      newPrice: '',
      newClass: '',
      toAlter: false,
      toPutOff: false,
      haveAlterImg: false,
      newStatus: '',
      newDesc: ''
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
      if (this.data.status === 0) {
        this.status = '售卖中'
      } else {
        this.status = '已下架'
      }
    },
    getImg () {
      this.$refs.getImg.click()
    },
    processFile () {
      var file = this.$refs.getImg.files[0]
      if (/image/.test(file.type)) {
        var reader = new FileReader()
        reader.onload = (event) => {
          this.data.imgSrc = event.target.result
          this.haveAlterImg = true
        }
        reader.readAsDataURL(file)
      }
    },
    chooseCalss (n) {
      this.newClass = n
    },
    alter (n) {
      if (n !== 3) {
        this.toAlter = true
        this.toPutOff = false
      } else {
        this.toAlter = false
        this.toPutOff = true
      }
    },
    puton () {
      if (this.data.status === 1) {
        this.newStatus = 0
        this.alterStatus()
      }
    },
    putoff () {
      if (this.data.status === 0) {
        this.newStatus = 1
        this.alterStatus()
      }
    },
    alterGood () {
      if (this.newName === '' && this.newPrice === '' && this.newClass === 0 ) {
        return
      }
      var params = {
        _id: this.data._id,
        name: this.newName || this.data.name,
        price: this.newPrice || this.data.price,
        class: this.newClass || this.data.class,
        desc: this.newDesc || this.data.desc
      }
      this.$reqs.post("goods/updateGood", params).then((res) => {
        if (res.data.code === 0) {
          this.$emit('updateData')
          this.updatePath()
        }
      })
    },
    updatePath () {
      if (this.newClass !== ''){
        for (let i in this.classes) {
          if (this.newClass === parseInt(i)) {
            this.class = this.classes[i]
          }
        }
      }
      this.newName = ''
      this.newClass = ''
      this.newPrice = ''
    },
    alterImg () {
      if (this.haveAlterImg) {
        var params = {_id: this.data._id, imgSrc: this.data.imgSrc}
        this.$reqs.post('./goods/updateImg', params).then((res) => {
          console.log(res.data)
          if (res.data.code === 0) {
            this.$emit('updateData')
          }
        })
      }
    },
    alterStatus () {
      var params = {_id: this.data._id, status: this.newStatus}
      this.$reqs.post('goods/alterStatus', params).then((res) => {
        if (res.data.code === 0) {
          this.$emit('updateData')
          if (this.newStatus === 0) {
            this.status = '售卖中'
          } else {
            this.status = '已下架'
          }
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.detail{
  width: 100%;

  .goodsDetailDiv{
    overflow-y: auto;
    border-left: 1px #e5e5e5 solid;
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

    .alterImg{
      margin: 10px 0 0 50px;
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
      span:nth-child(3){
        margin-left: 50px;
      }
    }

    .attrs{
      margin-top: 30px;
      padding: 0 0 20px 50px;
      display: flex;

      .lists{
        flex: 1;
        padding-right: 10px;
      }
      .operations{
        flex: 1;
        li{
          span{
            margin-right: 20px;
            text-decoration: underline;
            color: red;
          }
        }
      }
    }

    .alter-area{
      margin: 30px 0 0 50px;
      padding-top: 20px;
      display: flex;
      border-top: 1px #e5e5e5 solid;
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
        .desc{
          width: 100%;
          textarea{
            width: 80%;
          }
        }
        .alterGood{
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

    .putOff{
      margin: 30px 0 0 50px;
      padding-top: 30px;
      height: 70px;
      position: relative;
      border-top: 1px #e5e5e5 solid;

      span{
        padding: 10px 20px;
        background: #EEB422;
        border-radius: 10px;
        color: white;
      }
      span:nth-child(2){
        position: absolute;
        right: 50px;
      }
    }
  }
}
</style>