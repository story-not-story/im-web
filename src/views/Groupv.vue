<template>
  <div class="user">
    <UserHeader>群聊资料</UserHeader>
    <GroupInfo></GroupInfo>
    <GroupFooter></GroupFooter>
  </div>
</template>
<script>
import UserHeader from 'components/UserHeader.vue'
import GroupInfo from 'components/GroupInfo.vue'
import GroupFooter from 'components/GroupFooter.vue'
export default {
  name: 'Groupv',
  components: {
    UserHeader,
    GroupInfo,
    GroupFooter
  }
}
</script>
<style lang="stylus" scoped></style>
