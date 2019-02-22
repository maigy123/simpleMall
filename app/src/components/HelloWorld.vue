<template>
  <div class="hello">
    <input type="text" v-model="username" placeholder="请输入用户名">
    <input type="text" v-model="pwd" placeholder="请输入密码">
    <button @click="getData">获取数据</button>
    <button @click="addData">插入数据</button>
    <button @click="delData">删除数据</button>
    <button @click="updateData">更新密码</button>
    <br>
    <input type="number" v-model="path" placeholder="页数">
    <input type="number" v-model="num" placeholder="限制条数据">
    <button @click="getMoreData">获取分页限制条数据</button>
    <br>
    <input type="text" v-model="imgName" placeholder="请输入图片名">
    请选取一个图像文件: <input type="file" id="file" name="file" ref="img" @change="ProcessFile"/>
    <button @click="getImg">获取图片</button>
    <div class="img" v-if="showImg">
      <img :src='showImgSrc'>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return{
      username: '',
      pwd: '',
      imgSrc: '',
      imgName: '',
      showImg: false,
      showImgSrc: '',
      path: '',
      num: ''
    }
  },

  methods: {
    getData () {
      var params = {username: this.username}
      this.$reqs.post("/users/find", params).then((res) => {
        console.log(res)
      })
    },

    addData () {
      var params = {username: this.username, pwd: this.pwd}
      this.$reqs.post("/users/add", params).then((res) => {
        console.log(res)
      })
    },

    delData () {
      var params = {username: this.username}
      this.$reqs.post("/users/delete", params).then((res) => {
        console.log(res)
      })
    },

    updateData () {
      var params = {username: this.username, pwd: this.pwd}
      this.$reqs.post("/users/update", params).then((res) => {
        console.log(res)
        if (res.data.n === 1) {
          console.log('更新成功')
        } else {
          console.log('没有该用户')
        }
      })
    },

    ProcessFile(e) {
      var that = this
      var file = this.$refs.img.files[0]
      if (file) {
        var reader = new FileReader();
        reader.onload = function (event) {
          var txt = event.target.result
          that.imgSrc = txt
        }
      }
      reader.readAsDataURL(file)
      setTimeout(() => {
        that.postImg()
      }, 2000)
    },

    postImg () {
      var that = this
      this.$reqs.post("/users/imgtest",{
        name: that.imgName,
        src: that.imgSrc
      }).then((res) => {
        console.log(res)
      })
    },

    getImg () {
      var that = this
      this.$reqs.post("/users/getImgtest",{
        name: that.imgName,
      }).then((res) => {
        console.log(res.data)
        that.showImgSrc = res.data[0].src
        that.showImg = true
      })
    },

    getMoreData () {
      var that = this
      this.$reqs.post("/users/conditionFindtest", {
        name: that.username,
        path: parseInt(that.path),
        limit: parseInt(that.num)
      }).then((res) => {
        console.log(res.data)
      })
    }

    /* addAfterFind () {
      var that = this
      this.$reqs.post("/users/addAfterFindtest", {
        name: that.name,
        pwd: that.pwd
      }).then((res) => {
        console.log(res)
      })
    } */
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
