<template>
        <van-button v-if="followed"
            class="follow-btn"
            round
            size="small"
            @click="followUser"
            :loading="followLoading"
          >已关注</van-button>
          <van-button v-else
            class="follow-btn"
            type="badge"
            color="#3296fa"
            round
            size="small"
            icon="plus"
            @click="followUser"
            :loading="followLoading"
        >关注</van-button>
</template>

<script>
import { addFollow, cancelFollow } from '@/api/user.js'
export default {
  name: 'FollowUser',
  components: {},
  model: {
    prop: 'followed',
    event: 'upload-follow'
  },
  props: {
    followed: {
      type: Boolean,
      required: true
    },
    autId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      followLoading: false
    }
  },
  computed: {},
  watch: {},
  created () {

  },
  mounted () {

  },
  methods: {
    async followUser () {
      console.log(this.followed)
      console.log(this.autId)
      this.followLoading = true
      try {
        // 已关注 取消关注
        if (this.followed) {
          await cancelFollow(this.autId)
        } else {
          // 未关注 关注用户
          await addFollow(this.autId)
        }
        this.$emit('upload-follow', !this.followed)
      } catch (error) {
        let message = '操作失败，请重试'
        if (error.response && error.response.status === 400) {
          message = '你不能关注自己'
        }
        this.$toast(message)
      }
      this.followLoading = false
    }
  }
}
</script>

<style scoped lang="less">

</style>
