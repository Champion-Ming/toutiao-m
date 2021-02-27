<template>
  <div>
      <van-nav-bar
        title="评论"
      >
      <van-icon slot="left" name="cross" />
      </van-nav-bar>
  </div>
</template>

<script>
export default {
  name: 'CommentReply',
  components: {},
  props: {
    ReplyList: {
      type: Object,
      required: true
    }
  },
  data () {
    return {

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
[data-v-6bda6362] .van-nav-bar .van-icon {
  color: #2892ff;
}
/deep/[data-v-6bda6362] .van-nav-bar__title {
    color: black !important;
}
</style>
