<template>
  <div>
<div class="login-container">
    <van-nav-bar class="login-nav-bar" title="登录">
      <van-icon slot="left" name="cross" class="icon-on" @click="$router.back()"/>
    </van-nav-bar>
    <van-form @submit="onSubmit" ref="loginform">
  <van-field
   name="mobile"
    placeholder="请输入手机号"
  v-model="user.mobile"
  maxlength="11"
  type="number"
  :rules="formdataRules.mobile">
  <i slot="left-icon" class="toutiao-icon toutiao-iconshouji"></i>
  </van-field>
  <van-field
    name="code"
    placeholder="请输入验证码"
  v-model="user.code"
  type="number"
  maxlength="6"
  :rules="formdataRules.code">
  <i slot="left-icon" class="toutiao-icon toutiao-iconyanzhengma"></i>
  <template #button>
      <van-count-down v-if="showTimeDown" :time="60 *1000" format="ss s" @finish="showTimeDown = false"/>
      <van-button v-else round size="small" native-type="button" class="getyanzheng" @click="getyanzhengma">获取验证码</van-button>
  </template>
  </van-field>
  <div class="login">
    <van-button block class="login-btn" native-type="submit">登录</van-button>
  </div>
</van-form>
</div>
  </div>
</template>

<script>
import { login, sendyzm } from '@/api/user.js'
export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      },
      formdataRules: {
        mobile: [
          {
            required: true,
            message: '手机号不能为空'
          }, {
            pattern: /^1[3|5|7|8]\d{9}$/,
            message: '手机号格式错误'
          }
        ],
        code: [
          {
            required: true,
            message: '验证码不能为空'
          }, {
            pattern: /^\d{6}$/,
            message: '验证码格式错误'
          }
        ]
      },
      showTimeDown: false
    }
  },
  computed: {},
  watch: {},
  created () {

  },
  mounted () {

  },
  methods: {
    async onSubmit () {
      const user = this.user
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const { data } = await login(user)
        console.log(data)
        this.$store.commit('setUser', data.data)
        this.$toast.success('登录成功')
        this.$router.back()
      } catch (err) {
        console.log(err)
        if (err.status === 400) {
          this.$toast.fail('手机号或验证码错误')
        } else {
          this.$toast.fail('登录失败，请稍后重试')
        }
      }
    },
    async getyanzhengma () {
      try {
        await this.$refs.loginform.validate('mobile')
      } catch (err) {
        console.log('error')
      }
      this.showTimeDown = true
      try {
        await sendyzm(this.user.mobile)
        this.$toast('已向您的手机发送验证码')
      } catch (err) {
        this.showTimeDown = false
        if (err.status === '429') {
          this.$toast('请不要频繁发送')
        }
        this.$toast('发送验证码失败')
        console.log(err)
      }
    }
  }
}
</script>

<style scoped lang="less">
.login-container {
    .toutiao-icon {
        font-size: 37px;
        margin-right: 20px;
    }
    .login-btn {
    background-color: #6db4fb;
    color: #fff;
}
    .getyanzheng {
    width: 157px;
    height: 46px;
    line-height: 46px;
    font-size: 22px;
    background-color: #ededed;
    color: #666 !important;
}
.login {
    margin: 53px 33px;
}
}
.icon-on {
  color: #fff;
}
</style>
