<template>
  <div class="layout-container">
<router-view/>
<van-tabbar class="layout-tabbar" route>
  <van-tabbar-item to="/">
      <i slot="icon" class="toutiao-icon toutiao-iconshouye"></i>
      <span class="text">首页</span>
  </van-tabbar-item>
  <van-tabbar-item to="/question">
      <i slot="icon" class="toutiao-icon toutiao-iconwenda"></i>
      <span class="text">问答</span>
  </van-tabbar-item>
  <van-tabbar-item to="/video">
      <i slot="icon" class="toutiao-icon toutiao-iconshipin"></i>
      <span class="text">视频</span>
  </van-tabbar-item>
  <van-tabbar-item to="/my">
      <i slot="icon" class="toutiao-icon toutiao-iconwode"></i>
      <span class="text">{{$store.state.user? '我的':'未登录'}}</span>
  </van-tabbar-item>
</van-tabbar>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {},
  data () {
    return {
      name: 'layout'
    }
  },
  computed: {},
  watch: {},
  created () {

  },
  mounted () {

  },
  methods: {

  }
}
</script>

<style scoped lang="less">
.layout-container {
    .layout-tabbar {
        .toutiao-icon{
            font-size: 40px;
        }
        .text {
            font-size: 20px;
        }
    }
}
</style>
