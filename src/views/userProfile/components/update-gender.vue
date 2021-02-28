<template>
  <div gender-containner>
    <van-picker
    title="性别"
    show-toolbar
    :columns="columns"
    @confirm="onConfirm"
    @cancel="$emit('close')"
    @change="genderIndexChange"
    :default-index="value"
    />
  </div>
</template>

<script>
import { updateUserFile } from '@/api/user.js'
export default {
  name: 'updateGender',
  components: {},
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      columns: ['男', '女'],
      localgender: this.value
    }
  },
  computed: {},
  watch: {},
  created () {

  },
  mounted () {

  },
  methods: {
    async onConfirm (value, index) {
      this.$toast.loading({
        message: '保存中...',
        forbidclick: true,
        duration: 0
      })
      try {
        await updateUserFile({
          gender: this.localgender
        })
        this.$emit('close')
        this.$emit('input', this.localgender)
        this.$toast.success('保存成功')
      } catch (error) {
        this.$toast.fail('保存失败，请稍后重试！')
      }
    },
    genderIndexChange (picker, value, index) {
      this.localgender = index
    }
  }
}
</script>

<style scoped lang="less">

</style>
