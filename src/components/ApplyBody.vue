<template>
  <div class="applybody">
    <form>
      <div class="info border-bottom">
        <label class="label">验证信息</label>
        <input v-model.lazy="message" class="content" type="text" value="我是胡君">
        <!-- {{}}表达式和v-text不一样，前者可以组合别的标签成为内容，后端把内容全部替换掉，产生别的标签消失的效果 -->
      </div>
      <div class="info border-bottom" v-if="!this.$route.query.isGroup">
        <label class="label">备注</label>
        <input v-model.lazy="remark" class="content" type="text">
        <!-- {{}}表达式和v-text不一样，前者可以组合别的标签成为内容，后端把内容全部替换掉，产生别的标签消失的效果 -->
      </div>
<!--       <div class="info border-bottom">// 给meinfo用
        <label class="label">备注</label>
        <div class="content">
          <input ref="message" v-model.lazy="info" class="input" type="text" name="message" @focus="handleInput" @blur="handleInput" @keyup.enter="handleEnter"/>
          <span class="iconfont icon" v-if="show" @click="handleClick1">&#xe637;</span>
          <span class="iconfont icon" v-else @click="handleClick2">&#xe635;</span>
        </div>
      </div> -->
      <div class="info border-bottom" v-if="!this.$route.query.isGroup">
        <label class="label">分组</label>
        <div class="content">
          <select class="list" name="labellist" v-model="selected">
            <option class="item" value="">默认分组</option>
            <option class="item" value="">1</option>
            <option class="item" v-for="item in labellsit"  :value="item.id" v-text="item.name" :key="item.id"></option>
          </select>
        </div>
        <!-- {{}}表达式和v-text不一样，前者可以组合别的标签成为内容，后端把内容全部替换掉，产生别的标签消失的效果 -->
      </div>
    </form>
  </div>
</template>
<script>
import Bus from '@/bus.js'
export default {
  name: 'ApplyBody',
  data () {
    return {
      remark: '',
      message: '',
      labellsit: [],
      selected: ''
    }
  },
  created () {
    Bus.$on('submitapply', this.handleSend)
    this.$axios.get('/label', {
      params: {
        userId: this.$store.state.userId
      }
    }).then((res) => {
      const data = res.data
      if (data.code === 0) {
        this.labellsit = data.data
      }
    })
  },
  methods: {
    handleSend () {
      this.$axios.post('/invite/friend', {
        senderId: this.$store.state.userId,
        receiverId: this.$route.query.receiverId,
        labelId: this.selected,
        message: this.message,
        remark: this.remark
      }).then((res) => {
        const data = res.data
        if (data.code === 0) {
          this.$router.go(-1)
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
    // .content
    //   display: flex
      // flex对于单个子标签的作用类似inline-box，此外还有布局效果
</style>
