<template>
  <div class="me">
    <MeHeader></MeHeader>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>
<script>
import MeHeader from './components/MeHeader.vue'
import Footer from 'components/Footer.vue'
export default {
  name: 'Me',
  components: {
    MeHeader,
    Footer
  }
}
</script>
<style lang="stylus" scoped></style>
