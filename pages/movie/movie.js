function getRandomColor () {
  let rgb = []
  for (let i = 0 ; i < 3; ++i){
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length == 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}

Page({
  onReady: function (res) {
    this.videoContext = wx.createVideoContext('myVideo')
  },
  onLoad:function(){
    var me = this;
    wx.getSystemInfo({
      success: function(res) {
        me.setData({
          scrollHeight:res.windowHeight-165,
          src:me.data.movieList[0].playsrc
        })
      }
    })
  },
  inputValue: '',
    data: {
        src: '',
        scrollHeight:0,
        ind:0,
        imgUrls: [
      'http://baofeizz.online/weixin/video/2.jpg',
      'http://baofeizz.online/weixin/video/6.jpg',
      'http://baofeizz.online/weixin/video/11.jpg'
    ],
        movieList:[
          {
            id:0,
            title:"lol精彩短视频发条精彩五杀",
            picsrc:"http://baofeizz.online/weixin/video/1.jpg",
            playsrc:"http://baofeizz.online/weixin/video/1.mp4"
          },
          {
            id:1,
            title:"《爆笑短视频》-失误恶搞集锦合集",
            picsrc:"http://baofeizz.online/weixin/video/3.jpg",
            playsrc:"http://baofeizz.online/weixin/video/2.mp4"
          },
           {
            id:2,
            title:"原创短视频：第一集《公园的早晨》",
            picsrc:"http://baofeizz.online/weixin/video/4.jpg",
            playsrc:"http://baofeizz.online/weixin/video/3.mp4"
          },
          {
            id:3,
            title:"守望先锋短视频：《双龙》",
            picsrc:"http://baofeizz.online/weixin/video/5.jpg",
            playsrc:"http://baofeizz.online/weixin/video/4.mp4"
          },
          {
            id:4,
            title:"lol精彩短视频发条精彩五杀",
            picsrc:"http://baofeizz.online/weixin/video/7.jpg",
            playsrc:"http://baofeizz.online/weixin/video/1.mp4"
          },
          {
            id:5,
            title:"原创短视频：第一集《公园的早晨》",
            picsrc:"http://baofeizz.online/weixin/video/8.jpg",
            playsrc:"http://baofeizz.online/weixin/video/2.mp4"
          },
          {
            id:6,
            title:"（短视频·重大新闻）天舟一号与天宫二号顺利完...",
            picsrc:"http://baofeizz.online/weixin/video/9.jpg",
            playsrc:"http://baofeizz.online/weixin/video/3.mp4"
          },
          {
            id:7,
            title:"守望先锋短视频：《双龙》",
            picsrc:"http://baofeizz.online/weixin/video/10.jpg",
            playsrc:"http://baofeizz.online/weixin/video/4.mp4"
          }
        ],
    danmuList: [
      {
        text: '第 1s 出现的弹幕',
        color: '#ff0000',
        time: 1
      },
      {
        text: '第 3s 出现的弹幕',
        color: '#ff00ff',
        time: 3
    }]
    },
  bindInputBlur: function(e) {
    this.inputValue = e.detail.value
  },
  playmovie:function(event){
    var me= this;
    var i = parseInt(event.currentTarget.dataset.idx)
    wx.navigateTo({
      url: '../player/player?src='+me.data.movieList[i].playsrc
    })
    me.setData({
      ind:event.currentTarget.dataset.idx,
      src:me.data.movieList[me.data.ind].playsrc
    })
    
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
  }
})