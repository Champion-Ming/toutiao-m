<template>
  <div class="profileContainer">
<van-nav-bar title="个人中心" left-arrow @click-left="$router.back()"/>
<van-cell title="头像" is-link>
  <van-image
  class="avatar"
  :src="user.photo"
  round
  fit="cover"
/>
</van-cell>
<van-cell title="昵称" :value="user.name" is-link @click="clicked"></van-cell>
<van-cell title="性别" :value="user===0? '男':'女'" is-link @click="isUpdateGendershow = true"/>
<van-cell title="生日" :value="user.birthday" is-link @click="isUpdateBirthdayshow = true"/>
<!-- 昵称修改 -->
<van-popup v-if="isUpdateNameshow" v-model="isUpdateNameshow" position="bottom" :style="{ height: '100%' }">
    <update-name v-model="user.name" @close="closed"/>
</van-popup>
<!-- 性别修改 -->
<van-popup position="bottom" v-model="isUpdateGendershow">
  <update-gender v-if="isUpdateGendershow" v-model="user.gender" @close="isUpdateGendershow = false"/>
</van-popup>
<!-- 生日修改 -->
<van-popup position="bottom" v-model="isUpdateBirthdayshow" >
  <update-birthday v-model="user.birthday" @close="isUpdateBirthdayshow=false"/>
</van-popup>
  </div>
</template>

<script>
import { getUserProfile } from '../../api/user'
import UpdateBirthday from '../userProfile/components/update-birthday.vue'
import UpdateGender from '../userProfile/components/update-gender.vue'
import UpdateName from '../userProfile/components/update-name.vue'
export default {
  name: 'userProfile',
  components: {
    UpdateName,
    UpdateGender,
    UpdateBirthday
  },
  props: {},
  data () {
    return {
      user: {},
      isUpdateNameshow: false,
      isUpdateGendershow: false,
      isUpdateBirthdayshow: false
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadUserProfile()
  },
  mounted () {

  },
  methods: {
    clicked (e) {
      this.isUpdateNameshow = true
    },
    closed () {
      this.isUpdateNameshow = false
    },
    async loadUserProfile () {
      try {
        const { data } = await getUserProfile()
        this.user = data.data
      } catch (error) {
        this.$toast('获取用户信息失败！')
      }
    }
  }
}
</script>

<style scoped lang="less">
.van-nav-bar {
  background-color: #2892ff;
}
/deep/.van-nav-bar__title {
  color: #fff;
}
/deep/.van-nav-bar .van-icon {
  color: #fff;
}
.avatar {
  width: 60px;
  height: 60px;
}
/deep/.van-popup {
    background-color: #f5f7f9 !important;
}
</style>
