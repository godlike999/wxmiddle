// pages/audio/audio.js

function parseLyric(lrc) {
    var lyrics = lrc.split("\n");
    var lrcObj = {};
    for(var i=0;i<lyrics.length;i++){
        var lyric = decodeURIComponent(lyrics[i]);
        var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
        var timeRegExpArr = lyric.match(timeReg);
        if(!timeRegExpArr)continue;
        var clause = lyric.replace(timeReg,'');
        for(var k = 0,h = timeRegExpArr.length;k < h;k++) {
            var t = timeRegExpArr[k];
            var min = Number(String(t.match(/\[\d*/i)).slice(1)),
                sec = Number(String(t.match(/\:\d*/i)).slice(1));
            var time = min * 60 + sec;
            lrcObj[time] = clause;
        }
    }
    return lrcObj;
}
Page({
  onReady: function (e) {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.audioCtx = wx.createAudioContext('myAudio')
  },
  onLoad:function(){
    var me = this;
    wx.getSystemInfo({
      success: function(res) {
        me.setData({
          scrollHeight:res.windowHeight-210,
          music:me.data.musicList[me.data.ind]
        })
      }
    })
  },
  data: {
    scrollHeight:0,
    ind:0,
    p:0,
    nowtime:0,
    ly:'',
    musicList:[
      {
        poster:"http://baofeizz.online/weixin/music/2.jpg",
        id:0,
        name:"黄昏",
        author:"周传雄",
        src:"http://baofeizz.online/weixin/music/2.mp3",
        lrc:`[00:00.83]黄昏 - 周传雄
[04:46.36][00:13.72]黄玉强音乐工作室
[00:15.44]作词:陈信荣 作曲:周传雄
[03:32.43][02:06.99][00:17.35]
[02:10.14][00:19.24]黄玉强音乐工作室 QQ1186782559
[02:16.47][00:25.50]
[00:29.33]过完整个夏天
[00:35.15]忧伤并没有好一些
[00:41.31]开车行驶在公路无际无边
[00:47.74]有离开自己的感觉
[02:19.97][00:53.79]唱不完一首歌
[02:25.56][00:59.89]疲倦还剩下黑眼圈
[02:32.16][01:06.07]感情的世界伤害在所难免
[02:38.31][01:12.28]黄昏再美终要黑夜
[03:59.04][02:45.08][01:18.82]依然记得从你口中说出再现坚决如铁
[04:05.12][02:51.51][01:25.20]昏暗中有种烈日灼身的错觉
[04:10.55][02:56.84][01:30.58]黄昏的地平线
[04:13.30][02:59.76][01:33.67]划出一句离别
[04:16.60][03:02.89][01:36.80]爱情进入永夜
[04:23.80][03:09.66][01:43.46]依然记得从你眼中滑落的泪伤心欲绝
[04:29.80][03:15.82][01:49.67]混乱中有种热泪烧伤的错觉
[04:35.24][03:21.48][01:55.17]黄昏的地平线
[04:38.16][03:24.35][01:58.19]割断幸福喜悦
[04:41.24][03:27.42][02:01.34]相爱已经幻灭 `
      },
      {
        poster:"http://baofeizz.online/weixin/music/4.jpg",
        id:1,
        name:"好听的哥",
        author:"女的",
        src:"http://baofeizz.online/weixin/music/4.mp3",
        lrc:`[00:-0.50]信乐团 - 离歌
[00:20.94]作词：姚若龙
[00:22.94]词-Yoon Il Sang.Kim Gun Mo.Lee Seung
[00:24.94]作曲：Yoon Il Sang
[00:26.94]
[00:28.94]一开始我只相信　伟大的是感情
[00:42.14]最后我无力的看清　强悍的是命运
[00:54.25]黄玉强音乐工作室
[00:55.66]你还是选择回去
[01:01.69]他刺痛你的心　但你不肯觉醒
[01:08.96]你说爱本就是梦境
[01:14.84]跟你借的幸福　我只能还你
[01:21.32]想留不能留　才最寂寞
[01:28.09]没说完温柔　只剩离歌
[01:34.67]心碎前一秒　用力的相拥着沉默
[01:41.68]用心跳送你　辛酸离歌
[01:49.46]
[02:18.87]原来爱是种任性　不该太多考虑
[02:32.19]爱没有聪不聪明　只有愿不愿意
[02:44.13]
[02:45.52]你还是选择回去
[02:51.65]他刺痛你的心　但你不肯觉醒
[02:58.82]你说爱本就是梦境
[03:05.01]跟你借的幸福　我只能还你
[03:11.32]想留不能留　才最寂寞
[03:18.03]没说完温柔　只剩离歌
[03:24.62]心碎前一秒　用力的相拥着沉默
[03:31.63]用心跳送你　辛酸离歌
[03:37.95]想留不能留　才最寂寞
[03:44.68]没说完温柔　只剩离歌
[03:51.21]心碎前一秒　用力的相拥着沉默
[03:58.03]用心跳送你　辛酸离歌
[04:04.88]看不见永久　听见离歌
[04:23.40]
[04:24.58]QQ：1186782559
[04:25.73]黄玉强音乐工作室`
      },
      {
        poster:"http://baofeizz.online/weixin/music/2.jpg",
        id:2,
        name:"黄昏",
        author:"周传雄",
        src:"http://baofeizz.online/weixin/music/2.mp3",
        lrc:`[00:00.83]黄昏 - 周传雄
[04:46.36][00:13.72]黄玉强音乐工作室
[00:15.44]作词:陈信荣 作曲:周传雄
[03:32.43][02:06.99][00:17.35]
[02:10.14][00:19.24]黄玉强音乐工作室 QQ1186782559
[02:16.47][00:25.50]
[00:29.33]过完整个夏天
[00:35.15]忧伤并没有好一些
[00:41.31]开车行驶在公路无际无边
[00:47.74]有离开自己的感觉
[02:19.97][00:53.79]唱不完一首歌
[02:25.56][00:59.89]疲倦还剩下黑眼圈
[02:32.16][01:06.07]感情的世界伤害在所难免
[02:38.31][01:12.28]黄昏再美终要黑夜
[03:59.04][02:45.08][01:18.82]依然记得从你口中说出再现坚决如铁
[04:05.12][02:51.51][01:25.20]昏暗中有种烈日灼身的错觉
[04:10.55][02:56.84][01:30.58]黄昏的地平线
[04:13.30][02:59.76][01:33.67]划出一句离别
[04:16.60][03:02.89][01:36.80]爱情进入永夜
[04:23.80][03:09.66][01:43.46]依然记得从你眼中滑落的泪伤心欲绝
[04:29.80][03:15.82][01:49.67]混乱中有种热泪烧伤的错觉
[04:35.24][03:21.48][01:55.17]黄昏的地平线
[04:38.16][03:24.35][01:58.19]割断幸福喜悦
[04:41.24][03:27.42][02:01.34]相爱已经幻灭 `
      },
      {
        poster:"http://baofeizz.online/weixin/music/4.jpg",
        id:3,
        name:"好听的哥",
        author:"女的",
        src:"http://baofeizz.online/weixin/music/4.mp3",
        lrc:`[00:-0.50]信乐团 - 离歌
[00:20.94]作词：姚若龙
[00:22.94]词-Yoon Il Sang.Kim Gun Mo.Lee Seung
[00:24.94]作曲：Yoon Il Sang
[00:26.94]
[00:28.94]一开始我只相信　伟大的是感情
[00:42.14]最后我无力的看清　强悍的是命运
[00:54.25]黄玉强音乐工作室
[00:55.66]你还是选择回去
[01:01.69]他刺痛你的心　但你不肯觉醒
[01:08.96]你说爱本就是梦境
[01:14.84]跟你借的幸福　我只能还你
[01:21.32]想留不能留　才最寂寞
[01:28.09]没说完温柔　只剩离歌
[01:34.67]心碎前一秒　用力的相拥着沉默
[01:41.68]用心跳送你　辛酸离歌
[01:49.46]
[02:18.87]原来爱是种任性　不该太多考虑
[02:32.19]爱没有聪不聪明　只有愿不愿意
[02:44.13]
[02:45.52]你还是选择回去
[02:51.65]他刺痛你的心　但你不肯觉醒
[02:58.82]你说爱本就是梦境
[03:05.01]跟你借的幸福　我只能还你
[03:11.32]想留不能留　才最寂寞
[03:18.03]没说完温柔　只剩离歌
[03:24.62]心碎前一秒　用力的相拥着沉默
[03:31.63]用心跳送你　辛酸离歌
[03:37.95]想留不能留　才最寂寞
[03:44.68]没说完温柔　只剩离歌
[03:51.21]心碎前一秒　用力的相拥着沉默
[03:58.03]用心跳送你　辛酸离歌
[04:04.88]看不见永久　听见离歌
[04:23.40]
[04:24.58]QQ：1186782559
[04:25.73]黄玉强音乐工作室`
      },
      {
        poster:"http://baofeizz.online/weixin/music/3.jpg",
        id:4,
        name:"离歌",
        author:"信",
        src:"http://baofeizz.online/weixin/music/3.mp3",
        lrc:`[00:-0.50]信乐团 - 离歌
[00:20.94]作词：姚若龙
[00:22.94]词-Yoon Il Sang.Kim Gun Mo.Lee Seung
[00:24.94]作曲：Yoon Il Sang
[00:26.94]
[00:28.94]一开始我只相信　伟大的是感情
[00:42.14]最后我无力的看清　强悍的是命运
[00:54.25]黄玉强音乐工作室
[00:55.66]你还是选择回去
[01:01.69]他刺痛你的心　但你不肯觉醒
[01:08.96]你说爱本就是梦境
[01:14.84]跟你借的幸福　我只能还你
[01:21.32]想留不能留　才最寂寞
[01:28.09]没说完温柔　只剩离歌
[01:34.67]心碎前一秒　用力的相拥着沉默
[01:41.68]用心跳送你　辛酸离歌
[01:49.46]
[02:18.87]原来爱是种任性　不该太多考虑
[02:32.19]爱没有聪不聪明　只有愿不愿意
[02:44.13]
[02:45.52]你还是选择回去
[02:51.65]他刺痛你的心　但你不肯觉醒
[02:58.82]你说爱本就是梦境
[03:05.01]跟你借的幸福　我只能还你
[03:11.32]想留不能留　才最寂寞
[03:18.03]没说完温柔　只剩离歌
[03:24.62]心碎前一秒　用力的相拥着沉默
[03:31.63]用心跳送你　辛酸离歌
[03:37.95]想留不能留　才最寂寞
[03:44.68]没说完温柔　只剩离歌
[03:51.21]心碎前一秒　用力的相拥着沉默
[03:58.03]用心跳送你　辛酸离歌
[04:04.88]看不见永久　听见离歌
[04:23.40]
[04:24.58]QQ：1186782559
[04:25.73]黄玉强音乐工作室`
      },
      {
        poster:"http://baofeizz.online/weixin/music/4.jpg",
        id:5,
        name:"好听的哥",
        author:"女的",
        src:"http://baofeizz.online/weixin/music/4.mp3",
        lrc:`[00:-0.50]信乐团 - 离歌
[00:20.94]作词：姚若龙
[00:22.94]词-Yoon Il Sang.Kim Gun Mo.Lee Seung
[00:24.94]作曲：Yoon Il Sang
[00:26.94]
[00:28.94]一开始我只相信　伟大的是感情
[00:42.14]最后我无力的看清　强悍的是命运
[00:54.25]黄玉强音乐工作室
[00:55.66]你还是选择回去
[01:01.69]他刺痛你的心　但你不肯觉醒
[01:08.96]你说爱本就是梦境
[01:14.84]跟你借的幸福　我只能还你
[01:21.32]想留不能留　才最寂寞
[01:28.09]没说完温柔　只剩离歌
[01:34.67]心碎前一秒　用力的相拥着沉默
[01:41.68]用心跳送你　辛酸离歌
[01:49.46]
[02:18.87]原来爱是种任性　不该太多考虑
[02:32.19]爱没有聪不聪明　只有愿不愿意
[02:44.13]
[02:45.52]你还是选择回去
[02:51.65]他刺痛你的心　但你不肯觉醒
[02:58.82]你说爱本就是梦境
[03:05.01]跟你借的幸福　我只能还你
[03:11.32]想留不能留　才最寂寞
[03:18.03]没说完温柔　只剩离歌
[03:24.62]心碎前一秒　用力的相拥着沉默
[03:31.63]用心跳送你　辛酸离歌
[03:37.95]想留不能留　才最寂寞
[03:44.68]没说完温柔　只剩离歌
[03:51.21]心碎前一秒　用力的相拥着沉默
[03:58.03]用心跳送你　辛酸离歌
[04:04.88]看不见永久　听见离歌
[04:23.40]
[04:24.58]QQ：1186782559
[04:25.73]黄玉强音乐工作室`
      },
      {
        poster:"http://baofeizz.online/weixin/music/5.jpg",
        id:6,
        name:"English",
        author:"外国的",
        src:"http://baofeizz.online/weixin/music/5.mp3",
        lrc:`[00:00.73]Something Just Like This
[00:02.13]
[00:03.13]词曲：Andrew Taggart,Christopher Martin,Guy Berryman,Jonny Buckland,Will Champion
[00:05.78]演唱：The Chainsmokers,Coldplay
[00:07.13]
[00:08.16]I've been reading books of old
[00:10.44]The legends and the myths
[00:12.79]Achilles and his gold
[00:15.10]Hercules and his gifts
[00:17.60]Spider Man's control
[00:19.88]And Batman with his fists
[00:22.20]
[00:22.82]And clearly I don't see myself upon that list
[00:26.46]She said where'd you wanna go
[00:28.98]How much you wanna risk
[00:31.25]I'm not looking for somebody
[00:33.41]With some Superhuman gifts
[00:36.08]Some Superhero
[00:37.78]
[00:38.39]Some fairytale bliss
[00:40.83]Just something I can turn to
[00:43.05]Somebody I can kiss
[00:45.12]I want something just like this
[00:47.68]
[00:47.69]Doo doo doo doo doo doo
[00:50.00]Doo doo doo doo doo
[00:52.40]Doo doo doo doo doo doo
[00:54.25]Oh I want something just like this
[00:56.99]Doo doo doo doo doo doo
[00:59.49]Doo doo doo doo doo
[01:01.69]Doo doo doo doo doo doo
[01:03.60]Oh I want something just like this
[01:06.31]
[01:13.20]I want something just like this
[01:22.85]I've been reading books of old
[01:25.03]The legends and the myths
[01:27.34]The testaments they told
[01:29.69]The moon and it's eclipse
[01:32.04]And Superman unrolls
[01:34.38]A suit before he lifts
[01:36.64]
[01:37.69]But I'm not the kind of person that it fits
[01:40.92]She said where'd you wanna go
[01:43.75]How much you wanna risk
[01:45.79]I'm not looking for somebody
[01:48.04]With some Superhuman gifts
[01:50.57]Some Superhero
[01:52.28]
[01:52.93]Some fairytale bliss
[01:55.29]Just something I can turn to
[01:57.61]Somebody I can miss
[01:59.70]I want something just like this
[02:09.11]I want something just like this
[02:11.58]
[02:18.16]Oh I want something just like this
[02:21.18]Doo doo doo doo doo doo
[02:23.28]Doo doo doo doo doo
[02:25.53]Doo doo doo doo doo doo
[02:27.63]Oh I want something just like this
[02:30.23]Doo doo doo doo doo doo
[02:32.70]Doo doo doo doo doo
[02:34.87]Doo doo doo doo doo doo
[02:36.71]
[02:37.69]Where'd you wanna go
[02:39.62]How much you wanna risk
[02:41.59]I'm not looking for somebody
[02:44.00]With some Superhuman gifts
[02:46.59]Some Superhero
[02:48.68]Some fairytale bliss
[02:51.24]Just something I can turn to
[02:53.51]Somebody I can kiss
[02:55.59]I want something just like this
[02:58.18]
[03:14.04]Oh I want something just like this
[03:32.78]Oh I want something just like this
[03:51.44]Oh I want something just like this`
      },
      {
        poster:"http://baofeizz.online/weixin/music/3.jpg",
        id:7,
        name:"离歌",
        author:"信",
        src:"http://baofeizz.online/weixin/music/3.mp3",
        lrc:`[00:00.73]Something Just Like This
[00:02.13]
[00:03.13]词曲：Andrew Taggart,Christopher Martin,Guy Berryman,Jonny Buckland,Will Champion
[00:05.78]演唱：The Chainsmokers,Coldplay
[00:07.13]
[00:08.16]I've been reading books of old
[00:10.44]The legends and the myths
[00:12.79]Achilles and his gold
[00:15.10]Hercules and his gifts
[00:17.60]Spider Man's control
[00:19.88]And Batman with his fists
[00:22.20]
[00:22.82]And clearly I don't see myself upon that list
[00:26.46]She said where'd you wanna go
[00:28.98]How much you wanna risk
[00:31.25]I'm not looking for somebody
[00:33.41]With some Superhuman gifts
[00:36.08]Some Superhero
[00:37.78]
[00:38.39]Some fairytale bliss
[00:40.83]Just something I can turn to
[00:43.05]Somebody I can kiss
[00:45.12]I want something just like this
[00:47.68]
[00:47.69]Doo doo doo doo doo doo
[00:50.00]Doo doo doo doo doo
[00:52.40]Doo doo doo doo doo doo
[00:54.25]Oh I want something just like this
[00:56.99]Doo doo doo doo doo doo
[00:59.49]Doo doo doo doo doo
[01:01.69]Doo doo doo doo doo doo
[01:03.60]Oh I want something just like this
[01:06.31]
[01:13.20]I want something just like this
[01:22.85]I've been reading books of old
[01:25.03]The legends and the myths
[01:27.34]The testaments they told
[01:29.69]The moon and it's eclipse
[01:32.04]And Superman unrolls
[01:34.38]A suit before he lifts
[01:36.64]
[01:37.69]But I'm not the kind of person that it fits
[01:40.92]She said where'd you wanna go
[01:43.75]How much you wanna risk
[01:45.79]I'm not looking for somebody
[01:48.04]With some Superhuman gifts
[01:50.57]Some Superhero
[01:52.28]
[01:52.93]Some fairytale bliss
[01:55.29]Just something I can turn to
[01:57.61]Somebody I can miss
[01:59.70]I want something just like this
[02:09.11]I want something just like this
[02:11.58]
[02:18.16]Oh I want something just like this
[02:21.18]Doo doo doo doo doo doo
[02:23.28]Doo doo doo doo doo
[02:25.53]Doo doo doo doo doo doo
[02:27.63]Oh I want something just like this
[02:30.23]Doo doo doo doo doo doo
[02:32.70]Doo doo doo doo doo
[02:34.87]Doo doo doo doo doo doo
[02:36.71]
[02:37.69]Where'd you wanna go
[02:39.62]How much you wanna risk
[02:41.59]I'm not looking for somebody
[02:44.00]With some Superhuman gifts
[02:46.59]Some Superhero
[02:48.68]Some fairytale bliss
[02:51.24]Just something I can turn to
[02:53.51]Somebody I can kiss
[02:55.59]I want something just like this
[02:58.18]
[03:14.04]Oh I want something just like this
[03:32.78]Oh I want something just like this
[03:51.44]Oh I want something just like this`
      },
      {
        poster:"http://baofeizz.online/weixin/music/5.jpg",
        id:8,
        name:"English",
        author:"外国的",
        src:"http://baofeizz.online/weixin/music/5.mp3",
        lrc:`[00:00.73]Something Just Like This
[00:02.13]
[00:03.13]词曲：Andrew Taggart,Christopher Martin,Guy Berryman,Jonny Buckland,Will Champion
[00:05.78]演唱：The Chainsmokers,Coldplay
[00:07.13]
[00:08.16]I've been reading books of old
[00:10.44]The legends and the myths
[00:12.79]Achilles and his gold
[00:15.10]Hercules and his gifts
[00:17.60]Spider Man's control
[00:19.88]And Batman with his fists
[00:22.20]
[00:22.82]And clearly I don't see myself upon that list
[00:26.46]She said where'd you wanna go
[00:28.98]How much you wanna risk
[00:31.25]I'm not looking for somebody
[00:33.41]With some Superhuman gifts
[00:36.08]Some Superhero
[00:37.78]
[00:38.39]Some fairytale bliss
[00:40.83]Just something I can turn to
[00:43.05]Somebody I can kiss
[00:45.12]I want something just like this
[00:47.68]
[00:47.69]Doo doo doo doo doo doo
[00:50.00]Doo doo doo doo doo
[00:52.40]Doo doo doo doo doo doo
[00:54.25]Oh I want something just like this
[00:56.99]Doo doo doo doo doo doo
[00:59.49]Doo doo doo doo doo
[01:01.69]Doo doo doo doo doo doo
[01:03.60]Oh I want something just like this
[01:06.31]
[01:13.20]I want something just like this
[01:22.85]I've been reading books of old
[01:25.03]The legends and the myths
[01:27.34]The testaments they told
[01:29.69]The moon and it's eclipse
[01:32.04]And Superman unrolls
[01:34.38]A suit before he lifts
[01:36.64]
[01:37.69]But I'm not the kind of person that it fits
[01:40.92]She said where'd you wanna go
[01:43.75]How much you wanna risk
[01:45.79]I'm not looking for somebody
[01:48.04]With some Superhuman gifts
[01:50.57]Some Superhero
[01:52.28]
[01:52.93]Some fairytale bliss
[01:55.29]Just something I can turn to
[01:57.61]Somebody I can miss
[01:59.70]I want something just like this
[02:09.11]I want something just like this
[02:11.58]
[02:18.16]Oh I want something just like this
[02:21.18]Doo doo doo doo doo doo
[02:23.28]Doo doo doo doo doo
[02:25.53]Doo doo doo doo doo doo
[02:27.63]Oh I want something just like this
[02:30.23]Doo doo doo doo doo doo
[02:32.70]Doo doo doo doo doo
[02:34.87]Doo doo doo doo doo doo
[02:36.71]
[02:37.69]Where'd you wanna go
[02:39.62]How much you wanna risk
[02:41.59]I'm not looking for somebody
[02:44.00]With some Superhuman gifts
[02:46.59]Some Superhero
[02:48.68]Some fairytale bliss
[02:51.24]Just something I can turn to
[02:53.51]Somebody I can kiss
[02:55.59]I want something just like this
[02:58.18]
[03:14.04]Oh I want something just like this
[03:32.78]Oh I want something just like this
[03:51.44]Oh I want something just like this`
      }
    ],
    music:0
  },
  handleTap:function(event){
    console.log(event.target.dataset.idx);
    var me = this;
    me.setData({
        ind:event.target.dataset.idx,
        music:me.data.musicList[me.data.ind]
      }) 
    setTimeout(function(){
      me.audioCtx.play()
    },500)
    
  },
  nextplay:function(){
    var me = this;
    if(me.data.ind>=me.data.musicList.length-1){
      console.log("最后一首了");
      me.setData({
        ind:0,
        music:me.data.musicList[me.data.ind]
      })
      setTimeout(function(){
        me.audioCtx.play()
      },500)
    }else{
        console.log("还有");
        me.setData({
          ind:me.data.ind++,
          music:me.data.musicList[me.data.ind]
        }) 
      setTimeout(function(){
        me.audioCtx.play()
      },500)
    }
    
  },
  chage:function(event){
      var ev = event.detail;
      var second = parseInt(ev.currentTime);
      var s = second.toString();
      var lyric = parseLyric(this.data.musicList[this.data.ind].lrc);
      console.log(lyric[s]);
      var p = parseInt((parseInt(ev.currentTime))/(parseInt(ev.duration))*100);
      this.setData({
        p:p,
        nowtime:ev.currentTime,
        ly:lyric[s]
      })
  },
  audioPlay: function () {
    this.audioCtx.play()
  },
  audioPause: function () {
    this.audioCtx.pause()
  },
  audio14: function () {
     var now = this.data.nowtime
     this.audioCtx.seek(now+50)
  },
  audioStart: function () {
    this.audioCtx.seek(0)
  }
})