<template>
  <div class="msgsearch">
    <LMHeader>查找聊天记录</LMHeader>
    <FileType></FileType>
    <router-view/>
  </div>
</template>
<script>
import LMHeader from 'components/LMHeader.vue'
import FileType from './components/FileType.vue'
export default {
  name: 'MsgSearch',
  components: {
    LMHeader,
    FileType
  }
}
</script>
<style lang="stylus" scoped></style>
