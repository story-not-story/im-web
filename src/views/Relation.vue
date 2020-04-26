<template>
  <div class="relation">
    <Header>联系人</Header>
    <Menu></Menu>
    <router-view/>
    <Footer></Footer>
  </div>
</template>
<script>
import Menu from 'components/Menu.vue'
import Footer from 'components/Footer.vue'
import Header from 'components/Header.vue'
export default {
  name: 'Relation',
  components: {
    Footer,
    Header,
    Menu
  }
}
</script>
<style lang="stylus" scoped></style>
