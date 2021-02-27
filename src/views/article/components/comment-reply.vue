<template>
  <div class="reply-containner">
      <van-nav-bar
      class="replyText"
      >
      <span slot="title" >{{ReplyList.reply_count ? ReplyList.reply_count +'条评论' : '评论'}}</span>
      <van-icon slot="left" name="cross"  @click="$emit('close')"/>
      </van-nav-bar>
      <div class="scroll-wrap">
      <comment-item :comment="ReplyList" />
      <van-cell title="全部回复" />
      <comment-list :source = "ReplyList.com_id" type="c" :commentContent="commentList"/>
      </div>
      <div class="post-wrap">
          <van-button class="post-btn" round @click="isPostShow = true">发布评论</van-button>
      </div>
      <van-popup v-model="isPostShow" position="bottom">
      <comment-post :target="ReplyList.com_id" @success="onPostSuccess"/>
      </van-popup>
  </div>
</template>

<script>
import CommentItem from './comment-item.vue'
import CommentList from './comment-list.vue'
import CommentPost from './comment-post.vue'
export default {
  name: 'CommentReply',
  components: {
    CommentItem,
    CommentList,
    CommentPost
  },
  props: {
    ReplyList: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      isPostShow: false,
      commentList: []
    }
  },
  computed: {},
  watch: {},
  created () {

  },
  mounted () {

  },
  methods: {
    onPostSuccess (data) {
      console.log(data)
      this.ReplyList.reply_count++
      this.isPostShow = false
      this.commentList.unshift(data.new_obj)
    }
  }
}
</script>

<style scoped lang="less">
[data-v-6bda6362] .van-nav-bar .van-icon {
  color: #2892ff;
}
.van-nav-bar {
    background-color: black;
}
.post-wrap {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1px solid #ccc;
    color: #fff;
    .post-btn {
        width: 60%;
        border: 1px solid black;
        margin: 5px;
    }
}
.scroll-wrap {
  position: fixed;
  top: 92px;
  bottom: 88px;
  left: 0;
  right: 0;
  overflow-y: auto;
}
</style>
