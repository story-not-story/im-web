<template>
  <div class="home">
    <Header>消息</Header>
    <Msg></Msg>
    <Footer></Footer>
  </div>
</template>
<script>
// @ is an alias to /src
import Footer from 'components/Footer.vue'
import Msg from './components/Msg.vue'
import Header from 'components/Header.vue'
export default {
  name: 'MsgList',
  components: {
    Footer,
    Msg,
    Header
  }
}
</script>
<style lang="stylus" scoped>
@import '~styles/variables.styl'
  .home
    background: $bgcolor
</style>
