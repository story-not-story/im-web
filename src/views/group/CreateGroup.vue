<template>
  <div class="creategroup">
    <CreateGroupHeader></CreateGroupHeader>
    <SearchInput></SearchInput>
    <GroupBtn></GroupBtn>
    <SelectFriend :letter="map"></SelectFriend>
    <Alphabet :letter="Object.keys(map)"></Alphabet>
  </div>
</template>
<script>
// @ is an alias to /src
import CreateGroupHeader from 'components/CreateGroupHeader.vue'
import SearchInput from './components/SearchInput.vue'
import GroupBtn from './components/GroupBtn.vue'
import Alphabet from 'components/Alphabet.vue'
import SelectFriend from './components/SelectFriend.vue'
import Bus from '@/bus.js'
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
        this.map = data.data
        Bus.$emit('change-map', this.map)
      }
    })
  }
}
</script>
<style lang="stylus" scoped></style>
