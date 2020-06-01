<template>
  <div class="user">
    <LMHeader>群聊资料</LMHeader>
    <GroupBody></GroupBody>
    <GroupFooter></GroupFooter>
  </div>
</template>
<script>
import LMHeader from 'components/LMHeader.vue'
import GroupBody from './components/GroupBody.vue'
import GroupFooter from './components/GroupFooter.vue'
export default {
  name: 'GroupInfo',
  components: {
    LMHeader,
    GroupBody,
    GroupFooter
  }
}
</script>
<style lang="stylus" scoped></style>
