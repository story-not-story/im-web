<template>
  <div class="meinfo" ref="wrapper">
    <div class="first-child">
      <div class="me">
        <img class="img" alt="玉米粥" :src="$imgurl(user.avatar)"/>
        <div class="right border-bottom">
          <div class="desc">
            <div class="remark" v-text="user.name">胡君</div>
            <div class="userid" v-text="user.id">1209226858</div>
            <div class="word" v-text="districtName">温州</div>
          </div>
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
        <div class="label signature">个性签名</div>
        <div class="content" v-text="user.signature"></div>
        <!-- {{}}表达式和v-text不一样，前者可以组合别的标签成为内容，后端把内容全部替换掉，产生别的标签消失的效果 -->
      </div>
      <div class="info border-bottom">
        <div class="label">生日</div>
        <div class="content" v-text="user.birthdate"></div>
        <!-- {{}}表达式和v-text不一样，前者可以组合别的标签成为内容，后端把内容全部替换掉，产生别的标签消失的效果 -->
      </div>
      <div class="info border-bottom">
        <div class="label">年龄</div>
        <div class="content" v-text="getAge(user.birthdate)"></div>
        <!-- {{}}表达式和v-text不一样，前者可以组合别的标签成为内容，后端把内容全部替换掉，产生别的标签消失的效果 -->
      </div>
      <div class="info border-bottom">
        <div class="label">性别</div>
        <div class="content" v-text="user.sex ? '男' : '女'"></div>
        <!-- {{}}表达式和v-text不一样，前者可以组合别的标签成为内容，后端把内容全部替换掉，产生别的标签消失的效果 -->
      </div>
      <div class="info border-bottom">
        <div class="label">电话</div>
        <div class="content" v-text="user.phone"></div>
        <!-- {{}}表达式和v-text不一样，前者可以组合别的标签成为内容，后端把内容全部替换掉，产生别的标签消失的效果 -->
      </div>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
export default {
  name: 'UserInfo',
  data () {
    return {
      user: {},
      districtName: ''
    }
  },
  methods: {
    formatDate (UTCDateString) {
      if (typeof UTCDateString != 'undefined' && UTCDateString !== '') {// eslint-disable-line
        var date = new Date(UTCDateString)
        var month = date.getMonth() + 1
        var strDate = date.getDate()
        if (month >= 1 && month <= 9) {
          month = '0' + month
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = '0' + strDate
        }
        var currentDate = date.getFullYear() + '-' + month + '-' + strDate
        return currentDate
      } else {
        return UTCDateString
      }
    },
    getAge (UTCDateString) {
      if (typeof UTCDateString != 'undefined' && UTCDateString !== '') {// eslint-disable-line
        var date = new Date(UTCDateString)
        var now = new Date()
        return now.getFullYear() - date.getFullYear()
      } else {
        return UTCDateString
      }
    }
  },
  created () {
    let userId = this.$store.state.userId
    if (this.$route.query.userId) {
      userId = this.$route.query.userId
    }
    const self = this
    var promise = new Promise((resolve, reject) => {
      self.$axios.get('/userinfo', {
        params: {
          userId: userId
        }
      }).then((res) => {
        const data = res.data
        if (data.code === 0) {
          if (typeof data.data.birthdate != 'undefined') {// eslint-disable-line
            data.data.birthdate = self.formatDate(data.data.birthdate)
          }
          self.user = data.data
          self.moduser = data.data
          resolve(self.moduser.districtId)
        }
      })
    })
    promise.then((districtId) => {
      if (typeof districtId != 'undefined') {// eslint-disable-line
        self.$axios.get('/district', {
          params: {
            districtId: districtId
          }
        }).then((res) => {
          const data = res.data
          if (data.code === 0) {
            self.districtName = data.data.provinceName + ' ' + data.data.cityName + ' ' + data.data.districtName
          }
        })
      }
    })
  },
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
@import '~styles/mixins.styl'
  .border-bottom
    &:before
      border-color: $grey
  .meinfo
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
      background-color: #fff
      .signature
        ellipsis()
      .select
        background-color: #fff
      .content
        color: #999
        // flex对于单个子标签的作用类似inline-box，此外布局
    .me
      display: flex
      width: 100%
      height: 1.6rem
      .img
        width: 1.4rem
        height: 1.4rem
        margin: .1rem
        border-radius: $circle
      .img-center
        width: 1.4rem
        height: 1.4rem
        margin: 0 auto
        border-radius: $circle
      .right
        flex: 1
        display: flex
        .desc
          flex: 1
          padding-left: $pl
          .remark
            padding-top: .2rem
            font-size: $fz
            ellipsis()
          .word, .userid
            padding-top: .1rem
            font-size: .2rem
            color: #20222e
    .btn
      height: $height
      display: flex
      justify-content: space-around
      align-items: center
      .item
        background-color: $bgcolor
        border-radius: $radius
        color: #fff
        width: 25%
        height: .4rem
        text-align: center
        line-height: .4rem
</style>
