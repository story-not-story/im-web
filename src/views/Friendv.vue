<template>
  <div class="friendv">
    <Header></Header>
    <Menu></Menu>
    <Friend></Friend>
    <Alphabet></Alphabet>
    <Footer></Footer>
  </div>
</template>
<script>
// @ is an alias to /src
import Friend from 'components/Friend.vue'
import Menu from 'components/Menu.vue'
import Footer from 'components/Footer.vue'
import Header from 'components/Header.vue'
import Alphabet from 'components/Alphabet.vue'
export default {
  name: 'Friendv',
  components: {
    Friend,
    Footer,
    Header,
    Alphabet,
    Menu
  }
}
</script>
<style lang="stylus" scoped></style>
