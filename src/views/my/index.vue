<template>
  <div class="my-container">
<div class="header user-info" v-if="user">
    <div class="base-info">
      <div class="left">
        <van-image
        :src=userInfo.photo
        class="avatar"
        round
        fit="cover"
        />
        <span class="name">{{userInfo.name}}</span>
    </div>
      <div class="right">
        <van-button size="mini" round to="/user/profile">编辑资料</van-button>
        </div>
      </div>
    <div class="data-stats">
      <div class="data-item">
        <span class="count">{{userInfo.art_count}}</span>
        <span class="text">头条</span>
      </div>
      <div class="data-item">
        <span class="count">{{userInfo.follow_count}}</span>
        <span class="text">关注</span>
      </div>
      <div class="data-item">
        <span class="count">{{userInfo.fans_count}}</span>
        <span class="text">粉丝</span>
      </div>
      <div class="data-item">
        <span class="count">{{userInfo.like_count}}</span>
        <span class="text">获赞</span>
      </div>
    </div>
  </div>
<div class="header not-login" v-else>
  <div class="login-btn" @click="$router.push('/login')">
    <img class="mobile-img" src="~@/assets/mobile.png">
    <span class="text">登录 / 注册</span>
  </div>
</div>
  <van-grid class="grid-nav" :column-num="2" clickable>
  <van-grid-item class="grid-item">
    <i slot="icon" class="toutiao-icon toutiao-iconshoucang"></i>
    <span slot="text" class="text">收藏</span>
  </van-grid-item>
  <van-grid-item class="grid-item">
    <i slot="icon" class="toutiao-icon toutiao-iconlishi"></i>
    <span slot="text" class="text">历史</span>
  </van-grid-item>
</van-grid>
<van-cell title="消息通知" is-link />
<van-cell class="mb-9" title="小智同学" is-link />
<van-cell title="退出登录" class="logout-cell" v-if="user" clickable @click="exitLogin"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user.js'
export default {
  name: '',
  components: {},
  props: {},
  data () {
    return {
      name: 'myPage',
      userInfo: {}
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  created () {
    if (this.user) {
      this.getUserInfomation()
    }
  },
  mounted () {

  },
  methods: {
    exitLogin () {
      this.$dialog.confirm({
        title: '确认要退出登录吗？'
      })
        .then(() => {
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          // on cancel
        })
    },
    async getUserInfomation () {
      try {
        const { data } = await getUserInfo()
        this.userInfo = data.data
        console.log(data)
      } catch {
        this.$toast('获取数据失败，请稍后重试')
      }
    }
  }
}
</script>

<style scoped lang="less">
.my-container {
  .header {
    height: 361px;
    background: url('~@/assets/banner.png');
    background-size: cover;
  }
  .not-login {
      display: flex;
      justify-content: center;
      align-items: center;
    .login-btn {
      display: flex ;
      justify-content: center;
      align-items: center;
      flex-direction: column;
        .mobile-img {
          width: 132px;
          height: 132px;
          margin-bottom: 15px;
        }
        .text {
          font-size: 28px;
          color: #fff;
        }
    }
  }
  .user-info {
    .base-info {
      height: 231px;
      padding: 76px 32px 23px ;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        align-items: center;
        .avatar {
          width: 132px;
          height: 132px;
          border: 4px solid #fff;
          margin-right: 23px;
        }
        .name {
          font-size: 30px;
          color: #fff;
        }
      }
    }
    .data-stats {
      display: flex;
        .data-item {
          height: 130px;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: #fff;
          .count {
            font-size: 36px;
          }
          .text {
            font-size: 23px;
          }
        }
    }
  }
  .grid-nav {
    margin-bottom: 9px;
    .grid-item {
      height: 141px;
      i.toutiao-icon{
        font-size: 45px;
      }
      .toutiao-iconshoucang {
        color: #eb5253;
      }
      .toutiao-iconlishi {
        color: #ff9d1d;
      }
      span.text {
        font-size: 28px;
      }
    }
  }
  .logout-cell {
    text-align: center;
    color: #d86262;
  }
}
</style>
