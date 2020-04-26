<template>
  <div class="applydetail">
    <CreateGroupHeader>好友申请</CreateGroupHeader>
    <ApplyDetail></ApplyDetail>
  </div>
</template>
<script>
import CreateGroupHeader from 'components/CreateGroupHeader.vue'
import ApplyDetail from 'components/ApplyDetail.vue'
export default {
  name: 'ApplyDetailv',
  data () {
    return {
      item: {},
      img: require('img/yumizhou.jpeg')
    }
  },
  components: {
    CreateGroupHeader,
    ApplyDetail
  }
}
</script>
<style lang="stylus" scoped></style>
