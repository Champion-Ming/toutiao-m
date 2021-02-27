<template>
  <div class="article-list">
      <van-pull-refresh
      v-model="RefreshIsLoading"
      :success-text="RefreshText"
      @refresh="onRefresh"
      success-duration="1500">
<van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  :error.sync="error"
  error-text="请求失败，点击重新加载"
  @load="onLoad"
>
  <article-item v-for="(article, index) in list" :key="index" :article="article"></article-item>
</van-list>
</van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article.js'
import ArticleItem from '@/components/article-item/index.vue'
export default {
  name: '',
  components: {
    ArticleItem
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null,
      error: false,
      RefreshText: '刷新成功',
      RefreshIsLoading: false
    }
  },
  computed: {},
  watch: {},
  created () {

  },
  mounted () {

  },
  methods: {
    async onLoad () {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now(),
          with_top: 1
        })
        const { results } = data.data
        this.list.push(...results)
        this.loading = false
        if (results.length) {
          this.timestamp = data.data.pre_timestamp
        } else {
          this.finished = true
        }
      } catch (err) {
        this.loading = false
        this.error = true
      }

      // 加载状态结束
      // 数据全部加载完成
      //   if (this.list.length >= 40) {
    //   }
    },
    async onRefresh () {
      try {
        // if (Math.random() < 0.5) {
        //   JSON.parse('eqasdqweeq')
        // }
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: Date.now(),
          with_top: 1
        })
        console.log(data)
        const { results } = data.data
        this.list.unshift(...results)
        this.RefreshText = `刷新成功,更新了${results.length}条数据`
        this.RefreshIsLoading = false
      } catch (err) {
        this.RefreshIsLoading = false
        this.RefreshText = '刷新失败'
      }
    }
  }
}
</script>

<style scoped lang="less">
.article-list {
  height: 79vh;
  overflow: auto;
}
</style>
