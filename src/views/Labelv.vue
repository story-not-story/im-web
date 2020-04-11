<template>
  <div class="labelv">
    <Header></Header>
    <Menu></Menu>
    <Label></Label>
    <Footer></Footer>
  </div>
</template>
<script>
// @ is an alias to /src
import Label from 'components/Label.vue'
import Menu from 'components/Menu.vue'
import Footer from 'components/Footer.vue'
import Header from 'components/Header.vue'
export default {
  name: 'Labelv',
  components: {
    Label,
    Footer,
    Header,
    Menu
  }
}
</script>
<style lang="stylus" scoped></style>
