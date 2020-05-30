<template>
  <div class="password">
    <div class="info border-bottom">
      <div class="label">旧密码</div>
      <input type="password" v-model.lazy="oldps"/>
      <!-- {{}}表达式和v-text不一样，前者可以组合别的标签成为内容，后端把内容全部替换掉，产生别的标签消失的效果 -->
    </div>
    <div class="info border-bottom">
      <div class="label">新密码</div>
      <input type="password" v-model.lazy="newps"/>
      <!-- {{}}表达式和v-text不一样，前者可以组合别的标签成为内容，后端把内容全部替换掉，产生别的标签消失的效果 -->
    </div>
    <div class="info border-bottom">
      <div class="label">再次输入新密码</div>
      <input type="password" v-model.lazy="newps1"/>
      <!-- {{}}表达式和v-text不一样，前者可以组合别的标签成为内容，后端把内容全部替换掉，产生别的标签消失的效果 -->
    </div>
    <div class="center  border-bottom" v-show="errormsg !== ''" v-text="errormsg"></div>
  </div>
</template>
<script>
import Bus from '@/bus.js'
export default {
  name: 'PasswordBody',
  data () {
    return {
      oldps: '',
      newps: '',
      newps1: '',
      errormsg: ''
    }
  },
  created () {
    const self = this
    Bus.$on('submitpassword', () => {
      if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/.test(self.oldps)) {
        self.errormsg = '旧密码不符合规则'
      } else if (self.newps !== self.newps1) {
        self.errormsg = '两次新密码不一致'
      } else if (self.oldps === self.newps) {
        self.errormsg = '新密码和旧密码不能相同'
      } else if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/.test(self.newps)) {
        self.errormsg = '新密码不符合规则'
      } else {
        self.errormsg = ''
        self.$axios.put('/password', {
          id: self.$store.state.userId,
          oldPassword: self.oldps,
          newPassword: self.newps
        }).then((res) => {
          const data = res.data
          if (data.code === 0) {
            self.$router.go(-1)
          } else {
            self.errormsg = '旧密码错误'
          }
        })
      }
    })
  }
}
</script>
<style lang="stylus" scoped>
@import '~styles/variables.styl'
@import '~styles/mixins.styl'
  .border-bottom
    &:before
      border-color: $grey
  .info
    font-size: .3rem
    height: 1rem
    // line-height: 1rem// .icon继承了line-height的情况下设置宽高会导致overflow内容不显示，产生不显示效果
    margin: 0 .2rem
    display: flex
    justify-content: space-between
    align-items: center
    color: $grey
    background-color: #fff
    .signature
      ellipsis()
    .select
      background-color: #fff
      text-align: center
    .content
      color: #999
      // flex对于单个子标签的作用类似inline-box，此外布局
  .center
    font-size: .3rem
    height: 1rem
    // line-height: 1rem// .icon继承了line-height的情况下设置宽高会导致overflow内容不显示，产生不显示效果
    margin: 0 .2rem
    text-align: center
    color: $grey
    background-color: #fff
    line-height: 1rem
</style>
