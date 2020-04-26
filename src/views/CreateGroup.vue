<template>
  <div class="creategroup">
    <CreateGroupHeader></CreateGroupHeader>
    <SearchInput></SearchInput>
    <GroupBtn></GroupBtn>
    <SelectFriend :letter="map"></SelectFriend>
    <Alphabet :letter="map"></Alphabet>
  </div>
</template>
<script>
// @ is an alias to /src
import CreateGroupHeader from 'components/CreateGroupHeader.vue'
import SearchInput from 'components/SearchInput.vue'
import GroupBtn from 'components/GroupBtn.vue'
import Alphabet from 'components/Alphabet.vue'
import SelectFriend from 'components/SelectFriend.vue'
export default {
  name: 'CreateGroup',
  data () {
    return {
      title: '发起群聊',
      map: {}
    }
  },
  components: {
    CreateGroupHeader,
    SearchInput,
    GroupBtn,
    Alphabet,
    SelectFriend
  },
  created () {
    this.$axios.get('/friend/list', {
      params: {
        userId: this.$store.state.userId
      }
    }).then((res) => {
      const data = res.data
      if (data.code === 0) {
        this.map = data.data.letterMap
      }
    })
  }
}
</script>
<style lang="stylus" scoped></style>
