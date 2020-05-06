<template>
  <div class="search">
    <SearchHeader :title="title"></SearchHeader>
    <SearchContent></SearchContent>
  </div>
</template>
<script>
// @ is an alias to /src
import SearchHeader from './components/SearchHeader.vue'
import SearchContent from './components/SearchContent.vue'
export default {
  name: 'Search',
  data () {
    return {
      title: '加好友/群'
    }
  },
  components: {
    SearchHeader,
    SearchContent
  }
}
</script>
<style lang="stylus" scoped></style>
