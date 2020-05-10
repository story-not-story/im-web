<template>
  <div class="userinfo" ref="wrapper">
    <div class="first-child">
      <div class="me">
        <img class="img" alt="玉米粥" :src="$imgurl(user.avatar)"/>
        <div class="desc border-topbottom">
          <div class="remark" v-text="user.name">胡君</div>
          <div class="userid" v-text="user.id">1209226858</div>
          <div class="word" v-text="user.cityName">温州</div>
        </div>
      </div>
<!--       <Text>
        <slot="name">个性签名</>
        <slot="value">{{user.signature}}</>
      </Text>
      <Text>
        <template v-slot:key>生日</template>
        <template v-slot:value>{{user.birthdate}}</template>
      </Text>
      <Text>
        <template v-slot:key>年龄</template>
        <template v-slot:value>{{user.birthdate}}</template>
      </Text>
      <Text>
        <template v-slot:key>性别</template>
        <template v-slot:value>{{user.sex ? 男 : 女}}</template>
      </Text>
      <Text>
        <template v-slot:key>电话</template>
        <template v-slot:value>{{user.phone}}</template>
      </Text> -->
      <div class="info border-bottom">
        <div class="label">个性签名</div>
        <div class="text" v-text="user.signature"></div>
        <!-- {{}}表达式和v-text不一样，前者可以组合别的标签成为内容，后端把内容全部替换掉，产生别的标签消失的效果 -->
      </div>
      <div class="info border-bottom">
        <div class="label">生日</div>
        <div class="text" v-text="user.birthdate"></div>
        <!-- {{}}表达式和v-text不一样，前者可以组合别的标签成为内容，后端把内容全部替换掉，产生别的标签消失的效果 -->
      </div>
      <div class="info border-bottom">
        <div class="label">年龄</div>
        <div class="text" v-text="user.birthdate"></div>
        <!-- {{}}表达式和v-text不一样，前者可以组合别的标签成为内容，后端把内容全部替换掉，产生别的标签消失的效果 -->
      </div>
      <div class="info border-bottom">
        <div class="label">性别</div>
        <div class="text" v-text="user.sex ? 男 : 女"></div>
        <!-- {{}}表达式和v-text不一样，前者可以组合别的标签成为内容，后端把内容全部替换掉，产生别的标签消失的效果 -->
      </div>
      <div class="info border-bottom">
        <div class="label">电话</div>
        <div class="text" v-text="user.phone"></div>
        <!-- {{}}表达式和v-text不一样，前者可以组合别的标签成为内容，后端把内容全部替换掉，产生别的标签消失的效果 -->
      </div>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
export default {
  name: 'UserInfo',
  props: {
    user: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  // data () {
  //   return {
  //     user: {}
  //   }
  // },
  // created () {
  //   let userId = this.$store.state.userId
  //   if (this.$route.query.userId) {
  //     userId = this.$route.query.userId
  //   }
  //   this.$axios.get('/userinfo', {
  //     params: {
  //       userId: userId
  //     }
  //   }).then((res) => {
  //     const data = res.data
  //     if (data.code === 0) {
  //       this.user = data.data
  //     }
  //   })
  // },
  mounted () {
    this.$nextTick(() => {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.wrapper, {
          click: true
        })
      } else if (this.$refs.wrapper) {
        this.scroll.refresh()
      }
    })
  }
}
</script>
<style lang="stylus" scoped>
@import '~styles/variables.styl'
  .border-topbottom
    &:before
      border-color: $grey
    &:after
      border-color: $grey
  .border-bottom
    &:before
      border-color: $grey
  .userinfo
    position: absolute
    overflow: hidden
    top: .8rem
    right: 0
    bottom: .8rem
    left: 0
    .info
      font-size: .3rem
      height: 1rem
      // line-height: 1rem// .icon继承了line-height的情况下设置宽高会导致overflow内容不显示，产生不显示效果
      margin: 0 .2rem
      display: flex
      justify-content: space-between
      align-items: center
      color: $grey
    .me
      display: flex
      width: 100%
      height: 1.6rem
      .img
        width: 1.4rem
        height: 1.4rem
        margin: .1rem
        border-radius: $circle
      .desc
        flex: 1
        padding-left: $pl
        .remark
          padding-top: .2rem
          font-size: .5rem
        .word, .userid
          font-size: .2rem
          padding-top: .1rem
          color: #20222e
</style>
