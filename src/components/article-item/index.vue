<template>
  <div class="article">
<van-cell-group>
  <van-cell class="article-item" :to="{ name:'article', params: { articleId: article.art_id} }">
      <div class="title van-multi-ellipsis--l2" slot="title">{{article.title}}</div>
    <div slot="label">
    <div class="cover-wrap" v-if="article.cover.type === 3">
      <div class="cover-item" v-for="(img, index) in article.cover.images" :key="index">
      <van-image
      class="cover-item-img"
      fit="cover"
      :src="img"
      />
      </div>
      </div>
      </div>
      <div class="label-info-wrap" slot="label">
         <span>{{article.aut_name}}</span>
         <span>{{article.comm_count}}评论</span>
         <span>{{article.pubdate | relativeTime}}</span>
      </div>
          <van-image
          slot="default"
          v-if="article.cover.type === 1"
            :src="article.cover.images[0]"
            fit="cover"
             class="right-cover"
        />
  </van-cell>
</van-cell-group>
  </div>
</template>

<script>
export default {
  name: 'ArticleItem',
  components: {},
  props: {
    article: {
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
.article-item {
  .title {
    font-size: 32px;
    color: #3a3a3a;
  }
  .van-cell__value {
    flex: unset;
    width: 232px;
    height: 146px;
    padding-left: 25px;
  }
  .right-cover {
    width: 232px;
    height: 146px;
  }
  .label-info-wrap span {
    font-size: 22px;
    color: #b4b4b4;
    margin-right: 5px;
  }
  .cover-wrap {
      padding: 30px 0;
      display: flex
  }
  .cover-item {
      flex: 1;
      height: 146px;
      &:not(:last-child) {
          padding-right: 4px;
      }
      .cover-item-img {
          width: 100%;
          height: 146px;
      }
  }
  .label-info-wrap[data-v-b4f1c0c6] {
    margin-right: 0px;
  }
}
</style>
