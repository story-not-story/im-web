<template>
  <div class="namedgroup">
    <CreateGroupHeader></CreateGroupHeader>
    <div class="info border-bottom">
      <label class="label">名称</label>
      <input v-model.lazy="name" class="content" type="text" value="我是胡君">
      <!-- {{}}表达式和v-text不一样，前者可以组合别的标签成为内容，后端把内容全部替换掉，产生别的标签消失的效果 -->
    </div>
    <div class="info border-bottom">
      <label class="label">签名</label>
      <input v-model.lazy="signature" class="content" type="text" value="我是胡君">
      <!-- {{}}表达式和v-text不一样，前者可以组合别的标签成为内容，后端把内容全部替换掉，产生别的标签消失的效果 -->
    </div>
  </div>
</template>
<script>
import Bus from '@/bus.js'
import CreateGroupHeader from 'components/CreateGroupHeader'
export default {
  name: 'NamedGroup',
  components: {
    CreateGroupHeader
  },
  data () {
    return {
      signature: '',
      name: ''
    }
  },
  created () {
    Bus.$on('create-group', this.createGroup)
  },
  methods: {
    createGroup () {
      if (this.name.trim() === '' || this.signature.trim() === '') {
        return
      }
      this.$axios.post('/group', {
        userId: this.$store.state.userId,
        name: this.name.trim(),
        signature: this.signature.trim()
      }).then((res) => {
        const data = res.data
        if (data.code === 0) {
          this.$router.push({
            path: '/message',
            query: {
              isGroup: true,
              otherId: data.data.groupId
            }
          })
        }
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~styles/variables.styl'
  .border-bottom
    &:before
      border-color: $grey
  .info
    font-size: .3rem
    height: 1rem
    // line-height: 1rem// .icon继承了line-height的情况下设置宽高会导致overflow内容不显示，产生不显示效果
    margin: 0 .2rem
    display: flex
    align-items: center
    color: $grey
    .label
      flex: 1
    .content
      flex: 4
      display: flex
      justify-content: center
      .list
        text-align: center
        width: auto
        padding: 0 1%
        margin: 0
        background-color: #FFF
        .item
          text-align: center
          background-color: #FFF
</style>
