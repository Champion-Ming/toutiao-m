<template>
  <div class="avatar-container">
    <img :src="img"  class="img" ref="img"/>
<div class="text-btn">
    <span class="cancel" @click="$emit('close')">取消</span>
    <span class="confirm" @click="confirmPhoto">确认</span>
</div>
  </div>
</template>

<script>
import { getAvatarPhoto } from '@/api/user.js'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
export default {
  name: 'updateAvatar',
  components: {},
  props: {
    img: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      cropper: null
    }
  },
  computed: {},
  watch: {},
  created () {

  },
  mounted () {
    const image = this.$refs.img
    this.cropper = new Cropper(image, {
      // 选中框是否可以超出图片范围  0可以  1不可以
      viewMode: 1,
      //   是否可以自己新建一个不规则选定框 crop可以  move只允许移动画框
      dragMode: 'move',
      //   定义裁剪框的初始宽高比。默认情况下，它与画布（图像包装器）的纵横比相同。缩放比例 0为16/9  1为1/1 正方形
      aspectRatio: 1,
      //   0到1之间的数字。定义自动裁剪区域的大小（百分比
      autoCropArea: 1,
      //   启用通过拖动来移动裁剪框的功能
      cropBoxMovable: false,
      //   启用以通过拖动来调整裁剪框的大小
      cropBoxResizable: false,
      //   定义是否显示背景
      background: false,
      //   画布是否可以移动
      movable: true
    })
  },
  methods: {
    confirmPhoto () {
    //   基于客户端的裁切使用getData方法获取裁切参数
    //   console.log(this.cropper.getData())
    // 纯客户端的裁切使用getCroppedCanvas 获取裁切的文件对象
      this.cropper.getCroppedCanvas().toBlob((blob) => {
        this.loadingAvatar(blob)
      })
    },
    async loadingAvatar (blob) {
      this.$toast.loading({
        message: '上传中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const formData = new FormData()
        formData.append('photo', blob)
        const { data } = await getAvatarPhoto(formData)
        console.log(data)
        this.$toast.success('上传成功')
        this.$emit('close')
        this.$emit('update-avatar', data.data.photo)
      } catch (error) {
        this.$toast.fail('上传失败，请稍后重试！')
      }
    }
  }
}
</script>

<style scoped lang="less">
.avatar-container {
 background-color: #000;
 height: 100%;
 .text-btn {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    color: #fff;
    font-size: 35px;
    .cancel, .confirm {
        width: 90px;
        height: 90px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
img {
  display: block;
  max-width: 100%;
}
}

</style>
