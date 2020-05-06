<template>
  <div class="me">
    <MR></MR>
    <MeInfo></MeInfo>
    <Footer></Footer>
  </div>
</template>
<script>
import MR from './components/MR.vue'
import MeInfo from './components/MeInfo.vue'
import Footer from 'components/Footer.vue'
export default {
  name: 'Me',
  components: {
    MR,
    MeInfo,
    Footer
  }
}
</script>
<style lang="stylus" scoped></style>
