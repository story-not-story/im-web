<template>
  <div class="user">
    <UserHeader :isFriend="isFriend">个人资料</UserHeader>
    <UserInfo :user="user"></UserInfo>
    <UserFooter :isFriend="isFriend"></UserFooter>
  </div>
</template>
<script>
import UserHeader from './components/UserHeader.vue'
import UserInfo from './components/UserInfo.vue'
import UserFooter from './components/UserFooter.vue'
export default {
  name: 'User',
  components: {
    UserHeader,
    UserInfo,
    UserFooter
  },
  data () {
    return {
      user: {},
      isFriend: false
    }
  },
  created () {
    let userId = this.$store.state.userId
    if (this.$route.query.userId) {
      userId = this.$route.query.userId
    }
    this.$axios.get('/userinfo', {
      params: {
        userId: userId
      }
    }).then((res) => {
      const data = res.data
      if (data.code === 0) {
        this.user = data.data
      }
    })
    this.$axios.get('/friend/isFriend', {
      params: {
        userId: this.$store.state.userId,
        friendId: this.$route.query.userId
      }
    }).then((res) => {
      const data = res.data
      if (data.code === 0) {
        this.isFriend = data.data.isFriend
      }
    })
  }
}
</script>
<style lang="stylus" scoped></style>
