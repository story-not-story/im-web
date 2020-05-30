<template>
  <div class="user">
    <LMHeader>群聊资料</LMHeader>
    <GroupInfo></GroupInfo>
    <GroupFooter></GroupFooter>
  </div>
</template>
<script>
import LMHeader from 'components/LMHeader.vue'
import GroupInfo from './components/GroupInfo.vue'
import GroupFooter from './components/GroupFooter.vue'
export default {
  name: 'GroupInfo',
  components: {
    LMHeader,
    GroupInfo,
    GroupFooter
  }
}
</script>
<style lang="stylus" scoped></style>
