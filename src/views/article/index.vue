<template>
<!-- 110509 -->
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" left-arrow title="黑马头条"></van-nav-bar>

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="loading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="articleList.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{articleList.title}}</h1>

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="articleList.aut_photo"
          />
          <div slot="title" class="user-name">{{articleList.aut_name}}</div>
          <div slot="label" class="publish-date">{{articleList.pubdate | relativeTime }}</div>
          <!-- 关注组件 -->
          <!-- @upload-follow = "articleList.is_followed = $event" -->
          <!-- :followed = "articleList.is_followed" -->
          <follow-user
          :autId = "articleList.aut_id"
          class="follow-btn"
          v-model="articleList.is_followed"
          />
        </van-cell>

        <!-- 文章内容 -->
        <div class="article-content markdown-body" v-html="articleList.content" ref="article-content"></div>
        <van-divider>正文结束</van-divider>
        <!-- 评论区域 -->
        <comment-list :source = "articleList.art_id"
         @commnetTotal = "totalCommentCount = $event.total_count"
          :commentContent="successCommentList"
          @reply-click="onReplyClick"
          />
        <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button class="comment-btn" type="default" round size="small" @click="isPostShow = true">写评论</van-button>
      <van-icon name="comment-o" :badge="totalCommentCount" color="#777" />
      <!-- <van-icon color="#777" name="star-o" /> -->
      <collect-article class="btn-item" v-model="articleList.is_collected" :UserId = "articleList.art_id"/>
      <!-- <van-icon color="#777" name="good-job-o" /> -->
      <like-article v-model="articleList.attitude" :userId = "articleList.art_id"/>
      <van-icon name="share" color="#777777"></van-icon>
    </div>
    <!-- 评论区域 -->
    <van-popup
    v-model="isPostShow"
    position="bottom"
    >
    <comment-post :target= 'articleList.art_id' @success = "onPostSuccess"/>
    </van-popup>
    <van-popup v-model="isCommentShow" position="bottom"  :style="{ height: '80%' }" >
      <comment-reply :ReplyList = "commentReplyList"/>
    </van-popup>
      </div>

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="errStatus === 404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="getArticle">点击重试</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticleById } from '@/api/article.js'
import { ImagePreview } from 'vant'
import FollowUser from '@/components/follow-user'
import CollectArticle from '@/components/collect-article'
import likeArticle from '@/components/like-item'
import commentList from '@/views/article/components/comment-list'
import CommentPost from './components/comment-post'
import CommentReply from './components/comment-reply'
// ImagePreview({
//   images: [
//     'https://img01.yzcdn.cn/vant/apple-1.jpg',
//     'https://img01.yzcdn.cn/vant/apple-2.jpg'
//   ],
//   startPosition: 1
// })
export default {
  name: 'ArticleIndex',
  components: {
    FollowUser,
    CollectArticle,
    likeArticle,
    commentList,
    CommentPost,
    CommentReply
  },
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      articleList: {},
      loading: true,
      errStatus: 0,
      totalCommentCount: 0,
      isPostShow: false,
      successCommentList: [],
      isCommentShow: false,
      commentReplyList: {}
    }
  },
  created () {
    this.getArticle()
  },
  mounted () {},
  methods: {
    async getArticle () {
      this.loading = true
      try {
        const { data } = await getArticleById(this.articleId)
        this.articleList = data.data
        setTimeout(() => {
          this.getImageUrl()
        })
      } catch (error) {
        if (error.response && error.response.status === '404') {
          this.errStatus = 404
        }
      }
      this.loading = false
    },
    getImageUrl () {
      const articleContent = this.$refs['article-content']
      const Imgs = articleContent.querySelectorAll('img')
      const images = []
      Imgs.forEach((item, index) => {
        images.push(item.src)
        item.onclick = () => {
          ImagePreview({
            images,
            startPosition: index
          })
        }
      })
    },
    onPostSuccess (data) {
      this.isPostShow = false
      this.totalCommentCount++
      this.successCommentList.unshift(data.new_obj)
    },
    onReplyClick (data) {
      this.isCommentShow = true
      this.commentReplyList = data
    }
  }
}
</script>

<style scoped lang="less">
@import './github-markdown.css';
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    /deep/.van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
.page-nav-bar {
  background-color: #2892ff;
}
/deep/.van-nav-bar__title {
  color: #fff !important;
}
/deep/.van-nav-bar .van-icon {
  color: #fff;
}
/deep/.van-button--normal {
  padding: 0 !important;
}
/deep/ .van-button--default {
  border: #fff;
}
</style>
