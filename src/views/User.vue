<template>
  <div class="user">
    <UserHeader>个人资料</UserHeader>
    <MeInfo></MeInfo>
    <UserFooter></UserFooter>
  </div>
</template>
<script>
import UserHeader from 'components/UserHeader.vue'
import MeInfo from 'components/MeInfo.vue'
import UserFooter from 'components/UserFooter.vue'
export default {
  name: 'User',
  components: {
    UserHeader,
    MeInfo,
    UserFooter
  }
}
</script>
<style lang="stylus" scoped></style>
