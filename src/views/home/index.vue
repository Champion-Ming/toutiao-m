<template>
  <div class="home-container">
<van-nav-bar class="login-nav-bar" fixed>
  <van-button slot="title" round class="search-btn" size="small" icon="search" to="/search">
    <span class="search-text">搜索</span>
    </van-button>
  </van-nav-bar>
  <van-tabs v-model="active" swipeable animated class="channel-tabs" >
  <van-tab v-for="item in channels" :key="item.id" :title="item.name">
    <article-list :channel="item"/>
  </van-tab>
  <div class="placeholder" slot="nav-right"></div>
  <div slot="nav-right" class="hamburger-btn" @click="isChennelEditShow = true">
    <i class="toutiao-icon toutiao-icongengduo"></i>
  </div>
</van-tabs>
<!-- 弹出层 -->
<van-popup
  v-model="isChennelEditShow"
  closeable
  position="bottom"
  close-icon-position="top-left"
  :style="{ height: '100%' }"
>
<channel-edit :my-channels="channels" :active-index = "active" @update-active="UpdateActive"/>
</van-popup>
  </div>
</template>

<script>
import { UserPDInfo } from '@/api/user.js'
import ArticleList from './components/article-list.vue'
import ChannelEdit from './components/channel-edit.vue'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage.js'
export default {
  name: 'homePage',
  components: { ArticleList, ChannelEdit },
  props: {},
  data () {
    return {
      active: 0,
      channels: [],
      isChennelEditShow: false
    }
  },
  watch: {},
  created () {
    // 获取频道信息
    this.getUserChannels()
  },
  mounted () {

  },
  methods: {
    async getUserChannels () {
      let channels = []
      if (this.user) {
        try {
          const { data } = await UserPDInfo()
          channels = data.data.channels
        } catch (err) {
          this.$toast('获取频道列表失败！')
        }
      } else {
        channels = getItem('TOUTIAO_CHANNELS')
        if (channels.length < 2) {
          const { data } = await UserPDInfo()
          channels = data.data.channels
        }
      }
      this.channels = channels
    },
    UpdateActive (id, isChennelEditShow = true) {
      this.active = id
      this.isChennelEditShow = isChennelEditShow
    }
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style scoped lang="less">
.home-container {
  padding-top: 87px;
  padding-bottom: 100px;
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
    .van-tabs__nav {
      height: 82px;
      position: fixed;
      left: 0;
      right: 0;
      z-index: 99;
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
