<template>
  <div class="home-container">
<van-nav-bar class="login-nav-bar">
  <van-button slot="title" round class="search-btn" size="small" icon="search">
    <span class="search-text">搜索</span>
    </van-button>
  </van-nav-bar>
  <van-tabs v-model="active" swipeable animated class="channel-tabs" >
  <van-tab v-for="item in channels" :key="item.id" :title="item.name">{{item.name}}的内容</van-tab>
  <div class="placeholder" slot="nav-right"></div>
  <div slot="nav-right" class="hamburger-btn">
    <i class="toutiao-icon toutiao-icongengduo"></i>
  </div>
</van-tabs>
  </div>
</template>

<script>
import { UserPDInfo } from '@/api/user.js'
export default {
  name: 'homePage',
  components: {},
  props: {},
  data () {
    return {
      active: 0,
      channels: []
    }
  },
  computed: {},
  watch: {},
  created () {
    // 获取频道信息
    this.getUserChannels()
  },
  mounted () {

  },
  methods: {
    async getUserChannels () {
      try {
        const { data } = await UserPDInfo()
        this.channels = data.data.channels
      } catch (err) {
        this.$toast('获取频道列表失败！')
      }
    }
  }
}
</script>

<style scoped lang="less">
.home-container {
  .search-btn {
  width: 555px;
  height: 66px;
  background-color: #5babfb;
  border: none;
  .search-text {
    color: #fff;
    font-size: 28px;
  }
  .van-icon {
    color: #fff;
    font-size: 32px;
  }
  }
  /deep/ .van-nav-bar__title {
  max-width: unset
  }
  /deep/ .channel-tabs {
    .van-tab_wrap {
       height: 82px;
    }
    .van-tab {
    min-width: 200px;
    border-right: 1px solid #edeff3;
    font-size: 30px;
    color: #777777;
    }
    .van-tab--active {
    color: #333333
    }
    .van-tabs__nav {
      padding-bottom: 0;
      .van-tabs__line {
      bottom: 8px;
      width: 31px !important;
      background-color: #3296fa;
      height: 6px;
      }
    }
  }
  .placeholder {
    flex-shrink: 0;
    width: 66px;
    height: 82px;
  }
  .hamburger-btn {
    position: fixed;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 66px;
    height: 82px;
    background-color: #fff;
    opacity: 0.902;
    i-toutiao-icon {
      font-size: 33px;
    }
    &:before {
      content: '';
      position: absolute;
      left: 0;
      width: 2px;
      height: 100%;
      background-image: url(~@/assets/gradient-gray-line.png);
      background-size: contain;
    }
  }
}

</style>
