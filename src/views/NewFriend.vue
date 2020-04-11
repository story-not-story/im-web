<template>
  <div class="newfriend">
    <Header></Header>
    <Menu></Menu>
    <Invitation></Invitation>
    <Footer></Footer>
  </div>
</template>
<script>
// @ is an alias to /src
import Invitation from 'components/Invitation.vue'
import Menu from 'components/Menu.vue'
import Footer from 'components/Footer.vue'
import Header from 'components/Header.vue'
export default {
  name: 'NewFriend',
  components: {
    Invitation,
    Footer,
    Header,
    Menu
  }
}
</script>
<style lang="stylus" scoped></style>
