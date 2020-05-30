<template>
  <div class="header">
    <div class="iconfont left" @click="handleBack">&#xe622;</div>
    <div class="mid" v-text="name ? name :'未命名群聊'">玲珑</div>
    <div class="iconfont right" @click="toSetting">&#xe643;</div>
  </div>
</template>
<script>
export default {
  name: 'MsgHeader',
  data () {
    return {
      name: ''
    }
  },
  methods: {
    handleBack () {
      this.$router.go(-1)
    },
    toSetting () {
      if (this.$route.query.isGroup === true || this.$route.query.isGroup === 'true') {
        this.$router.push({ path: '/setting/group', query: { otherId: this.$route.query.otherId } })
      } else {
        this.$router.push({ path: '/setting', query: { otherId: this.$route.query.otherId } })
      }
    }
  },
  created () {
    console.log(this.$route.query.isGroup)
    if (this.$route.query.isGroup === true || this.$route.query.isGroup === 'true') {
      console.log('group')
      console.log(this.$route.query.isGroup)
      this.$axios.get('/group/info', {
        params: {
          groupId: this.$route.query.otherId
        }
      }).then((res) => {
        const data = res.data
        if (data.code === 0) {
          this.name = data.data.name
        }
      })
    } else {
      console.log('friend')
      console.log(this.$route.query.isGroup)
      this.$axios.get('/friend', {
        params: {
          userId: this.$store.state.userId,
          friendId: this.$route.query.otherId
        }
      }).then((res) => {
        const data = res.data
        if (data.code === 0) {
          this.name = data.data.remark
        }
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~styles/variables.styl'
@import '~styles/mixins.styl'
  .header
    height: $height
    align-items: center
    background-color: $bgcolor
    background-image: linear-gradient(to right, rgba(93, 211, 250, 1), rgba(69, 168, 248, 1))
    color: #fff
    text-align: center
    display: flex
    font-size: $fz
    .mid
      flex: 1
      ellipsis()
    .left
      padding-left: $pl
      width: .7rem
    .right
      width: .7rem
      padding-right: $pl
</style>
