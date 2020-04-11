<template>
  <div class="creategroup">
    <SearchHeader :title="title"></SearchHeader>
    <GroupContent></GroupContent>
    <Alphabet></Alphabet>
  </div>
</template>
<script>
// @ is an alias to /src
import SearchHeader from 'components/SearchHeader.vue'
import GroupContent from 'components/GroupContent.vue'
import Alphabet from 'components/Alphabet.vue'
export default {
  name: 'CreateGroup',
  data () {
    return {
      title: '发起群聊'
    }
  },
  components: {
    SearchHeader,
    GroupContent,
    Alphabet
  }
}
</script>
<style lang="stylus" scoped></style>
