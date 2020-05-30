<template>
  <div class="friendv">
<!--     <Header></Header>
    <Menu></Menu> -->
    <Friend :letter="map"></Friend>
    <Alphabet :letter="Object.keys(map)"></Alphabet>
<!--     <Footer></Footer> -->
  </div>
</template>
<script>
import Bus from '@/bus.js'
import Friend from './components/Friend.vue'
// import Menu from 'components/Menu.vue'
// import Footer from 'components/Footer.vue'
// import Header from 'components/Header.vue'
import Alphabet from 'components/Alphabet.vue'
export default {
  name: 'FriendList',
  data () {
    return {
      map: {}
    }
  },
  components: {
    Friend,
    Alphabet
    // Footer,
    // Header,
    // Menu
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
