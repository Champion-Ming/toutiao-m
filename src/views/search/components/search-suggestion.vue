<template>
  <div class="suggestion-containner">
<van-cell-group>
  <van-cell
  icon="search"
  v-for="(item, index) in suggestionList"
  :key="index"
  @click="$emit('search', item)"
  >
  <span slot="title" v-html="hightLight(item)"></span>
  </van-cell>
</van-cell-group>
  </div>
</template>

<script>
import { getSuggestion } from '@/api/search.js'
import { debounce } from 'lodash'
export default {
  name: 'suggestionIndex',
  components: {},
  props: {
    searchText: {
      type: String,
      require: true
    }
  },
  data () {
    return {
      suggestionList: []
    }
  },
  computed: {},
  watch: {
    searchText: {
    //   handler (value) {
    //     this.loadSuggestion(value)
    //   },
      handler: debounce(function (value) {
        this.loadSuggestion(value)
      }, 200),
      //   当输入框输入第一个参数就开始计算
      immediate: true
    }
  },
  created () {

  },
  mounted () {

  },
  methods: {
    async loadSuggestion (q) {
      try {
        const { data } = await getSuggestion(q)
        this.suggestionList = data.data.options
      } catch (error) {
        this.$toast('服务器出了一丁点小问题！')
      }
    },
    hightLight (text) {
      const hight = `<span class = 'active'>${this.searchText}</span>`
      const reg = new RegExp(this.searchText, 'gi')
      return text.replace(reg, hight)
    }
  }
}
</script>

<style scoped lang="less">
/deep/ .active {
    color: tomato
}
</style>
