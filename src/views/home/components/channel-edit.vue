<template>
  <div class="channel-edit">
  <!-- 我的频道 -->
  <van-cell :border="false">
  <div slot="title" class="title-text">我的频道</div>
  <van-button round type="danger" plain size="small" class="edit-btn" @click="isEdit = !isEdit">{{isEdit? '完成': '编辑'}}</van-button>
  </van-cell>
  <van-grid :gutter="10" class="my-grid">
  <van-grid-item v-for="(item, index) in myChannels" :key="index" class="grid-item" @click="omMyChannelClick(item,index)">
    <van-icon v-show="isEdit && !fiexdChannels.includes(item.id)" slot="icon" name="clear"></van-icon>
      <span class="text" :class="{ active: index === activeIndex}" slot="text">{{item.name}}</span>
  </van-grid-item>
  </van-grid>
  <!-- 频道推荐 -->
<van-cell :border="false">
  <div slot="title" class="title-text">频道推荐</div>
  </van-cell>
  <van-grid :gutter="10" class="recomment-grid">
  <van-grid-item v-for="(item, index) in recommendChannele" class="grid-item" :key="index" icon="plus" :text="item.name" @click="clickChannels(item)"/>
</van-grid>
</div>
</template>

<script>
import { getAllChannels, addUserChannels, deleteUserChannels } from '@/api/channel.js'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage.js'
export default {
  name: 'ChannelEdit',
  components: {},
  props: {
    // 我的频道列表
    myChannels: {
      type: Array,
      required: true
    },
    activeIndex: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      // 所有频道列表
      Allchannels: [],
      isEdit: false,
      fiexdChannels: [0]
    }
  },
  watch: {},
  created () {
    this.loadAllChannels()
  },
  mounted () {

  },
  methods: {
    // 获取所有频道列表
    async loadAllChannels () {
      try {
        const { data } = await getAllChannels()
        this.Allchannels = data.data.channels
      } catch (error) {
        this.$toast('获取频道列表失败！')
      }
    },
    // 添加频道  持久化/本地存储
    async clickChannels (channel) {
      this.myChannels.push(channel)
      if (this.user) {
        try {
          // 已登录状态下
          const { data: res } = await addUserChannels({
            id: channel.id,
            seq: this.myChannels.length
          })
          console.log(res)
        } catch (error) {
          this.$toast('添加频道列表失败，请稍后重试！')
          console.log(error)
        }
      } else {
        // 未登录状态下
        setItem('TOUTIAO_CHANNELS', this.myChannels)
      }
    },
    // 删除频道  持久化/本地存储
    omMyChannelClick (item, index) {
      // 当处于编辑状态时
      if (this.isEdit) {
        if (this.fiexdChannels.includes(item.id)) {
          return false
        }
        this.myChannels.splice(index, 1)
        if (index <= this.activeIndex) {
          this.$emit('update-active', this.activeIndex - 1, true)
        }
      // 当处于完成状态时
      } else {
        this.$emit('update-active', index, false)
      }
      this.deleteChannels(item)
    },
    async deleteChannels (channel) {
      if (this.user) {
        const res = await deleteUserChannels(channel.id)
        console.log(res)
      } else {
        setItem('TOUTIAO_CHANNELS', this.myChannels)
      }
    }
  },
  computed: {
    ...mapState(['user']),
    recommendChannele () {
      return this.Allchannels.filter(channel => {
        return !this.myChannels.find(item => {
          return item.id === channel.id
        })
      })
      // const myChannels = []
      // this.Allchannels.forEach(item => {
      //   const rst = this.myChannels.find(item2 => {
      //     return item2.id === item.id
      //   })
      //   if (!rst) {
      //     myChannels.push(item)
      //   }
      // })
      // return myChannels
    }
  }
}
</script>

<style scoped lang="less">
.home-container {
  padding-top: 87px;
  padding-bottom: 100px;
    .channel-edit {
    margin: 80px 0;
      .title-text {
        font-size: 32px;
        color: #333;
      }
      .edit-btn {
        width: 104px;
        height: 48px;
        font-size: 26px;
        color: #f85959;
        border: 1px solid #f85959;
      }
      /deep/ .grid-item {
        width: 160px;
        height: 86px;
        .van-grid-item__content {
          white-space: nowrap;
          background-color: #f4f5f6;
          .van-grid-item__text, .text{
            font-size: 22px;
            color: #222;
            margin-top: 0px !important;
          }
        }
      }
      /deep/ .van-icon-clear {
        position: absolute;
        top: -10px;
        right: -10px;
        font-size: 30px;
        color: #cacaca;
        z-index: 2;
      }
      /deep/ .recomment-grid {
        .grid-item {
          width: 160px;
          height: 86px;
          .van-grid-item__content {
            flex-direction: row;
            .van-icon-plus {
              font-size: 22px;
              line-height: 22px;
              margin-right: 6px;
            }
            }
        }
      }
  }
}
/deep/ .active {
         color: red!important;;
       }
/deep/ .van-grid-item__icon-wrapper {
      position: unset;
}
</style>
