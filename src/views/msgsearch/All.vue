<template>
  <div class="all">
    <SearchInput></SearchInput>
    <MsgContent></MsgContent>
  </div>
</template>
<script>
import SearchInput from './components/SearchInput.vue'
import MsgContent from './components/MsgContent.vue'
export default {
  name: 'All',
  components: {
    SearchInput,
    MsgContent
  }
}
</script>
<style lang="stylus" scoped></style>
