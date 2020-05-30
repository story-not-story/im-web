<template>
  <div class="footer" v-if="isMember" @click="msg">发消息</div>
  <div class="footer" v-else @click="add">加群</div>
</template>
<script>
export default {
  name: 'GroupFooter',
  data () {
    return {
      isMember: false
    }
  },
  created () {
    this.$axios.get('/member/isMember', {
      params: {
        userId: this.$store.state.userId,
        groupId: this.$route.query.groupId
      }
    }).then((res) => {
      const data = res.data
      if (data.code === 0) {
        this.isMember = data.data.isMember
      }
    })
  },
  methods: {
    add () {
      this.$router.push({ path: '/apply', query: { isGroup: true, receiverId: this.$route.query.groupId } })
    },
    msg () {
      this.$router.push({ path: '/message', query: { isGroup: true, otherId: this.$route.query.groupId } })
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~styles/variables.styl'
  .footer
    position: absolute
    bottom: 0
    width: 100%
    height: $height
    background: $bgcolor
    color: #fff
    text-align: center
    font-size: .6rem
    line-height: $height
</style>
