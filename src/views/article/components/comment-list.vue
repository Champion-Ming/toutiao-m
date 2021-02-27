<template>
  <div>
<van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
  :error.sync = "error"
  error-text="加载失败，请稍后重试！"
>
  <comment-item v-for="(item, index) in commentContent" :key="index" :comment = "item" @reply-click="$emit('reply-click', $event)"/>
</van-list>
  </div>
</template>

<script>
import { getComment } from '@/api/comment'
import CommentItem from './comment-item'
export default {
  name: 'commentList',
  components: {
    CommentItem
  },
  props: {
    source: {
      type: [Number, Array, Object],
      required: true
    },
    commentContent: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      // commentContent: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 20,
      error: false
    }
  },
  computed: {},
  watch: {},
  created () {
    this.onLoad()
  },
  mounted () {

  },
  methods: {
    async onLoad () {
      try {
      // 1. 请求获取数据
        const { data } = await getComment({
          type: 'a',
          source: this.source.toString(),
          offset: this.offset,
          limit: this.limit
        })
        // 2. 将数据添加到列表中
        this.$emit('commnetTotal', data.data)
        const { results } = data.data
        this.commentContent.push(...results)
        // 3. 将 loading 设置为 false
        if (results.length) {
          this.offset = data.data.last_id
        } else {
          this.finished = true
        }
        // 4. 判断是否还有数据
      } catch (err) {
        this.loading = false
        this.error = true
      }
    }
  }
}
</script>

<style scoped lang="less">

</style>
