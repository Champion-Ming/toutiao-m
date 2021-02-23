<template>
  <div id="app">
    <h1>123</h1>
    <i class="toutiao-icon toutiao-iconpinglun"></i>
<router-view></router-view>
<van-button type="primary">主要按钮</van-button>
<van-button type="info">信息按钮</van-button>
<van-button type="default">默认按钮</van-button>
<van-button type="warning">警告按钮</van-button>
<van-button type="danger">危险按钮</van-button>
<div class="box">pink</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: 'APP'
    }
  },
  created () {

  },
  mounted () {

  },
  methods: {

  }
}
</script>

<style scoped lang="less">
.box {
  width: 375px;
  height: 88px;
  background-color: pink;
}
</style>
