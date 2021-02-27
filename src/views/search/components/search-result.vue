<template>
  <div class="result-containner">
<van-pull-refresh v-model="refreshing" @refresh="onRefresh">
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
    :error.sync="error"
    error-text="加载失败，请稍后重试"
  >
    <van-cell v-for="(item, index) in searchResults" :key="index" :title="item.title" />
  </van-list>
</van-pull-refresh>
  </div>
</template>

<script>
import { getResults } from '@/api/search.js'
export default {
  name: 'resultIndex',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      searchResults: [],
      loading: false,
      finished: false,
      refreshing: false,
      error: false,
      page: 1,
      per_page: 20
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
      try {
      // 1. 请求获取数据
        const { data } = await getResults({
          page: this.page,
          per_page: this.per_page,
          q: this.searchText
        })
        // 人为制造错误
        // if (Math.random() > 0.1) {
        //   JSON.parse('adadadqwqdqdq')
        // }
        // 2. 将数据添加到列表中
        const { results } = data.data
        this.searchResults.push(...results)
        // 3. 设置加载状态结束
        this.loading = false
        // 重新加载数据
        if (results.length) {
          this.page++
        } else {
          this.finished = false
        }
      // 4. 判断数据是否加载完毕
      } catch (error) {
        this.error = true
        this.loading = false
      }
      // 将 loading 设置为 true，表示处于加载状态
    },
    onRefresh () {
      // 清空列表数据
      this.finished = false
      this.loading = true
      this.onLoad()
    }
  }
}
</script>

<style scoped lang="less">

</style>
