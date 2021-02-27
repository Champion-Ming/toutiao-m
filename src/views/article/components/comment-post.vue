<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button class="post-btn" @click="PostCommnet"
    :disabled="!message.length"
    >发布</van-button>
  </div>
</template>

<script>
import { addComments } from '@/api/comment.js'
export default {
  name: 'CommentPost',
  props: {
    target: {
      type: [Number, Array, Object],
      required: true
    }
  },
  inject: {
    articleId: {
      type: [Number, Array, Object],
      default: null
    }
  },
  data () {
    return {
      message: ''
    }
  },
  methods: {
    async PostCommnet () {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '发布中...',
        forbidClick: true // 是否禁止背景点击
      })
      try {
        const { data } = await addComments({
          target: this.target.toString(), //  评论的目标id
          content: this.message, //  评论内容
          art_id: this.articleId ? this.articleId.toString() : this.articleId //  文章id
        })
        this.$toast.success('发布评论成功！')
        this.message = ''
        this.$emit('success', data.data)
      } catch (error) {
        this.$toast.fail('发布评论失败，请稍后重试！')
      }
    }
  }
}
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
        color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
