<template>
  <div class="groupv">
    <Header></Header>
    <Menu></Menu>
    <Group></Group>
    <Footer></Footer>
  </div>
</template>
<script>
// @ is an alias to /src
import Group from 'components/Group.vue'
import Menu from 'components/Menu.vue'
import Footer from 'components/Footer.vue'
import Header from 'components/Header.vue'
export default {
  name: 'Groupv',
  components: {
    Group,
    Footer,
    Header,
    Menu
  }
}
</script>
<style lang="stylus" scoped></style>
