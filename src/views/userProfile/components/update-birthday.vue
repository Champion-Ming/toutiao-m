<template>
  <div>
<van-datetime-picker
v-model="currentDate"
type="date"
:min-date="minDate"
:max-date="maxDate"
@cancel="$emit('close')"
@confirm = "onConfirm"
/>
  </div>
</template>

<script>
import { updateUserFile } from '@/api/user.js'
import dayjs from 'dayjs'
export default {
  name: 'updateBirthday',
  components: {},
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value)
    }
  },
  computed: {},
  watch: {},
  created () {

  },
  mounted () {

  },
  methods: {
    async onConfirm () {
      try {
        const timer = dayjs(this.currentDate).format('YYYY-MM-DD')
        const data = await updateUserFile({
          birthday: timer
        })
        console.log(data)
        this.$emit('close')
        this.$emit('input', timer)
        this.$toast.success('保存成功')
      } catch (error) {
        this.$toast.fail('保存失败，请稍后重试')
      }
    }
  }
}
</script>

<style scoped lang="less">

</style>
