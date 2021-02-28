<template>
  <div class="updateName-container">
  <van-nav-bar
  title="设置昵称"
  left-text="取消"
  right-text="完成"
  @click-left="closed"
  @click-right="onConfirm"
/>
<div class="field-wrap">
    <van-field
  v-model.trim="localName"
  rows="2"
  autosize
  type="textarea"
  maxlength="7"
  placeholder="请输入昵称"
  show-word-limit
/>
</div>
  </div>
</template>

<script>
import { updateUserFile } from '@/api/user.js'
export default {
  name: 'updateName',
  components: {},
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      localName: this.value
    }
  },
  computed: {},
  watch: {},
  created () {

  },
  mounted () {

  },
  methods: {
    closed () {
      // console.log(123)
      this.$emit('close')
    },
    // 改变用户昵称
    async onConfirm () {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const UserName = this.localName
        if (!UserName.length) {
          this.$toast('请填写昵称后再确认')
          return false
        } else {
          const data = await updateUserFile({
            name: UserName
          })
          console.log(data)
        }
        this.$toast.success('更新成功')
        this.$emit('input', this.localName)
        this.$emit('close')
      } catch (error) {
        this.$toast.fail('更新失败，请稍后重试')
      }
    }
  }
}
</script>

<style scoped lang="less">
/deep/.van-nav-bar__title {
    color:black !important
}
.field-wrap {
    margin-top: 20px;
}

</style>
