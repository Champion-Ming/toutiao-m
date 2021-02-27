<template>
    <van-button :icon=" value? 'star' : 'star-o' " :class="{ collected: value }" @click="userCollected" :loading ="loading"/>
</template>

<script>
import { addCollected, deleteCollected } from '@/api/article.js'
export default {
  name: 'CollectArticle',
  components: {},
  props: {
    value: {
      type: Boolean,
      required: true
    },
    UserId: {
      type: [Number, Array, Object],
      required: true
    }
  },
  data () {
    return {
      loading: false
    }
  },
  computed: {},
  watch: {},
  created () {

  },
  mounted () {

  },
  methods: {
    async userCollected () {
      this.loading = true
      try {
        if (this.value) {
        //   取消收藏
          await deleteCollected(this.UserId)
        } else {
        // 添加收藏
          await addCollected(this.UserId)
        }
        this.$emit('input', !this.value)
        this.$toast(!this.value ? '成功收藏' : '取消收藏')
      } catch (error) {
        this.$toast('操作失败，请稍后重试！')
      }
      this.loading = false
    }
  }
}
</script>

<style scoped lang="less">
.collected{
  color: tomato!important;
}

</style>
