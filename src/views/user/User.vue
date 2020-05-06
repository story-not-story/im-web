<template>
  <div class="user">
    <UserHeader>个人资料</UserHeader>
    <UserInfo></UserInfo>
    <UserFooter></UserFooter>
  </div>
</template>
<script>
import UserHeader from 'components/UserHeader.vue'
import UserInfo from './components/UserInfo.vue'
import UserFooter from './components/UserFooter.vue'
export default {
  name: 'User',
  components: {
    UserHeader,
    UserInfo,
    UserFooter
  }
}
</script>
<style lang="stylus" scoped></style>
