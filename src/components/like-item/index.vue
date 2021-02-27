<template>
  <van-button :icon=" value === 1? 'good-job' : 'good-job-o' " :class="{ like: value ===1 }" @click="userLike" :loading ="loading"/>
</template>

<script>
import { addLike, deleteLike } from '@/api/article.js'
export default {
  name: 'likeArticle',
  components: {},
  props: {
    value: {
      type: Number,
      required: true
    },
    userId: {
      type: [Number, Array, Object],
      required: true
    }
  },
  data () {
    return {
      loading: false
    }
  },
  computed: {},
  watch: {},
  created () {

  },
  mounted () {

  },
  methods: {
    async userLike () {
      this.loading = true
      let status = -1
      try {
        if (this.value === 1) {
        //   已点赞，取消点赞
          await deleteLike(this.userId)
        } else {
        // 未点赞，添加点赞
          await addLike(this.userId)
          status = 1
        }
        this.$emit('input', status)
        this.$toast(status === 1 ? '点赞成功' : '取消点赞')
      } catch (error) {
        this.$toast('操作失败，请稍后重试！')
      }
      this.loading = false
    }
  }
}
</script>

<style scoped lang="less">
.like{
  color: red!important;
}
</style>
