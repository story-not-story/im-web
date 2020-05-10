<template>
  <div class="footer" v-if="isFriend" @click="msg">发消息</div>
  <div class="footer" v-else @click="add">加好友</div>
</template>
<script>
export default {
  name: 'UserFooter',
  props: {
    isFriend: {
      type: Boolean,
      default () {
        return false
      }
    },
    name: {
      type: String,
      default () {
        return ''
      }
    }
  },
  // data () {
  //   return {
  //     isFriend: false
  //   }
  // },
  // created () {
  //   this.$axios.get('/friend/isFriend', {
  //     params: {
  //       userId: this.$store.state.userId,
  //       friendId: this.$route.query.userId
  //     }
  //   }).then((res) => {
  //     const data = res.data
  //     if (data.code === 0) {
  //       this.isFriend = data.data.isFriend
  //     }
  //   })
  // },
  methods: {
    add () {
      this.$router.push({ path: '/apply', query: { isGroup: false, receiverId: this.$route.query.userId } })
    },
    msg () {
      this.$router.push({ path: '/message', query: { isGroup: false, otherId: this.$route.query.userId, name: this.name } })
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
    height: .8rem
    background: $bgcolor
    color: #fff
    text-align: center
    font-size: .6rem
    line-height: .8rem
</style>
