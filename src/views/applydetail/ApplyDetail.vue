<template>
  <div class="applydetail">
    <Header>{{this.$route.query.isGroup ? '群申请' : '好友申请'}}</Header>
    <Detail></Detail>
  </div>
</template>
<script>
import Header from './components/Header.vue'
import Detail from './components/Detail.vue'
export default {
  name: 'ApplyDetail',
  components: {
    Header,
    Detail
  }
}
</script>
<style lang="stylus" scoped></style>
