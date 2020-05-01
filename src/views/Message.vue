<template>
  <div class="message">
    <MsgHeader></MsgHeader>
    <MsgContent></MsgContent>
    <MsgFooter></MsgFooter>
  </div>
</template>
<script>
import MsgHeader from 'components/MsgHeader'
import MsgContent from 'components/MsgContent'
import MsgFooter from 'components/MsgFooter'
export default {
  name: 'Message',
  components: {
    MsgHeader,
    MsgFooter,
    MsgContent
  },
  methods: {
    async beforeunloadFn () {
      await this.$ws.reconnet()
    }
  },
  mounted () {
    this.beforeunloadFn()
  }
}
</script>
<style lang="stylus" scoped></style>
