import store from './store'
import Bus from './bus.js'
const ws = {
  websocket: null,
  timeout: 10000,
  timeoutObj: null,
  serverTimeoutObj: null,
  rectimeout: null,
  lock: false,
  creatWebSocket: function () {
    if ('WebSocket' in window) {
      this.websocket = new WebSocket('ws://' + location.host + '/websocket/' + store.state.userId)
      var self = this
      this.websocket.onerror = function (e) {
        console.log(e)
        self.reconnet()
      }
      this.websocket.onopen = function (e) {
        console.log(e)
        self.start()
      }
      this.websocket.onmessage = function (e) {
        console.log(e)
        self.start()
        if (e.data !== 'ok') {
          if (e.data === 'blacklisted') {
            Bus.$emit('pushmsg', 'blacklisted')
          } else {
            const resData = JSON.parse(e.data)
            if (resData.code === 0) {
              Bus.$emit('pushmsg', resData.data)
            } else if (resData.code === 21) {
              Bus.$emit('refresh')
            }
          }
        }
      }
      this.websocket.onclose = function (e) {
        console.log(e)
        self.timeoutObj && clearTimeout(self.timeoutObj)
        self.serverTimeoutObj && clearTimeout(self.serverTimeoutObj)
        self.rectimeout && clearTimeout(self.rectimeout)
        if (document.cookie) {
          self.reconnet()
        }
      }
    } else {
      alert('Not support websocket')
    }
  },
  reconnet: function () {
    if (this.lock) return
    this.lock = true
    this.rectimeout && clearTimeout(this.rectimeout)
    var self = this
    setTimeout(function () { // 没连接上会一直重连，设置延迟避免请求过多
      if (typeof self.websocket == 'undefined' || self.websocket === null) {//eslint-disable-line
        self.creatWebSocket()
      }
      self.lock = false
    }, 2000)
  },
  start: function () { // 开启定时
    this.timeoutObj && clearTimeout(this.timeoutObj)
    this.serverTimeoutObj && clearTimeout(this.serverTimeoutObj)
    var self = this
    this.timeoutObj = setTimeout(function () {
      const data = {
        userId: store.state.userId,
        content: 'websocket_test'
      }
      self.websocket.send(JSON.stringify(data))
      self.serverTimeoutObj = setTimeout(function () {
        self.websocket.close()// 心跳时间内收不到消息，主动触发连接关闭，开始重连
        self.reconnet()
      }, self.timeout)
    }, this.timeout)
  }
}
export default ws
