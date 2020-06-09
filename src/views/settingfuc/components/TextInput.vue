<template>
  <div class="applybody">
    <div class="info border-bottom">
      <textarea v-model.lazy="notice" class="content" :disabled="disabled"></textarea>
      <!-- {{}}表达式和v-text不一样，前者可以组合别的标签成为内容，后端把内容全部替换掉，产生别的标签消失的效果 -->
    </div>
  </div>
</template>
<script>
import Bus from '@/bus.js'
export default {
  name: 'TextInput',
  data () {
    return {
      notice: '',
      member: {},
      disabled: true
    }
  },
  created () {
    Bus.$on('submitapply', this.handleform)
    this.notice = this.$route.query.notice
    this.$axios.get('/member/one', {
      params: {
        groupId: this.$route.query.groupId,
        userId: this.$store.state.userId
      }
    }).then((res) => {
      const data = res.data
      if (data.code === 0) {
        this.member = data.data
        if (this.member.grade > 0) {
          this.disabled = false
        }
      }
    })
  },
  methods: {
    handleform () {
      this.$axios.put('/group/notice', {
        groupId: this.$route.query.groupId,
        notice: this.notice
      }).then((res) => {
        const data = res.data
        if (data.code === 0) {
          this.$router.go(-1)
        }
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~styles/variables.styl'
  .border-bottom
    &:before
      border-color: $grey
  .info
    font-size: .3rem
    height: 1rem
    // line-height: 1rem// .icon继承了line-height的情况下设置宽高会导致overflow内容不显示，产生不显示效果
    margin: 0 .2rem
    color: $grey
    .content
      width: 100%
</style>
