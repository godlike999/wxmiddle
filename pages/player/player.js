// pages/player/player.js
function getRandomColor () {
  let rgb = []
  for (let i = 0 ; i < 3; ++i){
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length == 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
};
Page({
  data:{
    src:'',
    col:'',
    commentList:[
      "为什么这么好看",
      "怎么能这么好看",
      "好看的不得了",
      "超级好看",
      "真的好看",
      "好漂亮啊"
    ],
    danmuList: [
      {
        text: '怎么能这么好看',
        color: '#ff0000',
        time: 1
      },
      {
        text: '好看的不得了',
        color: '#ff00ff',
        time: 3
    }]
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      src:options.src
    })
  },
  canvasIdErrorCallback: function (e) {
    console.error(e.detail.errMsg)
  },
  onReady: function (res) {
    this.videoContext = wx.createVideoContext('myVideo');
    var me = this;
    for(var i=0;i<4;i++){
        me.setData({
          col:getRandomColor()
        })
    }
  },
  bindInputBlur: function(e) {
    this.inputValue = e.detail.value
  },
  bindButtonTap: function() {
    var that = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: ['front','back'],
      success: function(res) {
        that.setData({
          src: res.tempFilePath
        })
      }
    })
  },
  bindSendDanmu: function () {
    this.videoContext.sendDanmu({
      text: this.inputValue,
      color: getRandomColor()
    })
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})