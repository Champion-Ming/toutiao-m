<template>
  <div class="history-container">
     <van-cell title="搜索历史">
       <div v-if="isShowDelete">
          <span @click="$emit('deleteAll')">全部删除 </span>
          &nbsp;
          <span @click="isShowDelete = false"> 完成</span>
       </div>
  <!-- 使用 right-icon 插槽来自定义右侧图标 -->
    <van-icon name="delete" v-else @click="isShowDelete = true"/>
</van-cell>
<van-cell v-for="(item, index) in searchHistoryList" :key="index" :title="item" @click="deleteSingeHistory(item, index)">
    <van-icon name="close" v-show="isShowDelete" />
</van-cell>
  </div>
</template>

<script>
export default {
  name: 'historyIndex',
  components: {},
  props: {
    searchHistoryList: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isShowDelete: false
    }
  },
  computed: {},
  watch: {},
  created () {

  },
  mounted () {

  },
  methods: {
    deleteSingeHistory (item, index) {
      if (this.isShowDelete) {
        this.searchHistoryList.splice(index, 1)
      } else {
        this.$emit('search', item)
      }
    }
  }
}
</script>

<style scoped lang="less">

</style>
