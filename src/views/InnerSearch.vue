<template>
  <div class="search">
    <InnerSearchHeader></InnerSearchHeader>
    <SearchSum></SearchSum>
  </div>
</template>
<script>
// @ is an alias to /src
import InnerSearchHeader from 'components/InnerSearchHeader.vue'
import SearchSum from 'components/SearchSum.vue'
export default {
  name: 'InnerSearch',
  components: {
    InnerSearchHeader,
    SearchSum
  }
}
</script>
<style lang="stylus" scoped></style>
