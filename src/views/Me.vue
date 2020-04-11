<template>
  <div class="me">
    <MeHeader></MeHeader>
    <MeInfo></MeInfo>
    <Footer></Footer>
  </div>
</template>
<script>
import MeHeader from 'components/MeHeader.vue'
import MeInfo from 'components/MeInfo.vue'
import Footer from 'components/Footer.vue'
export default {
  name: 'Me',
  components: {
    MeHeader,
    MeInfo,
    Footer
  }
}
</script>
<style lang="stylus" scoped></style>
