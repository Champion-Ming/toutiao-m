<template>
  <div class="search-container">
<form action="/" class="search-btn">
  <van-search
  show-action
    v-model="SearchText"
    placeholder="请输入搜索关键词"
    @search="onSearch"
    @cancel="onCancel"
    background="#3296fa"
    @focus="isShowResult = false"
  >
  <van-button slot="action" class="searchCancelBtn" type="default" to="/">取消</van-button>
  </van-search>
</form>
<!-- 搜索结果 -->
<search-result v-if="isShowResult" :searchText="SearchText"/>
<!-- 搜索联想 -->
<search-suggestion :search-text="SearchText" v-else-if="SearchText" @search="onSearch"/>
<!-- 搜索历史 -->
<search-history v-else :searchHistoryList="searchHistory" @search="onSearch" @deleteAll="searchHistory = []"/>
  </div>
</template>

<script>
import SearchHistory from './components/search-history.vue'
import SearchResult from './components/search-result.vue'
import SearchSuggestion from './components/search-suggestion.vue'
import { setItem, getItem } from '@/utils/storage.js'
export default {
  name: 'SearchPage',
  components: {
    SearchHistory,
    SearchResult,
    SearchSuggestion
  },
  props: {},
  data () {
    return {
    // 搜索文本
      SearchText: '',
      // 搜索结果是否展示
      isShowResult: false,
      searchHistory: getItem('Search-History-List') || []
    }
  },
  computed: {},
  watch: {
    searchHistory (value) {
      setItem('Search-History-List', value)
    }
  },
  created () {

  },
  mounted () {

  },
  methods: {
    onSearch (text) {
      this.SearchText = text
      const index = this.searchHistory.indexOf(text)
      if (index !== -1) {
        this.searchHistory.splice(index, 1)
      }
      this.searchHistory.unshift(text)
      this.isShowResult = true
    },
    onCancel () {
      console.log('取消了删除')
    }
  }
}
</script>

<style scoped lang="less">
.search-container{
    // .van-search__action {
    //     color: #fff;
    // }
    padding-top: 128px;
    .search-btn {
      position: fixed;
      top: 0;
      right: 0;
      left: 0;
      z-index: 1;
    }
}
.searchCancelBtn {
    background-color: #3296fa;
    color: #fff;
    border: unset;
}
</style>
