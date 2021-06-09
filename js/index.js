/*
  1:歌曲搜索接口
    请求地址:https://autumnfish.cn/search
    请求方法:get
    请求参数:keywords(查询关键字)
    响应内容:歌曲搜索结果

  2:歌曲url获取接口
    请求地址:https://autumnfish.cn/song/url
    请求方法:get
    请求参数:id(歌曲id)
    响应内容:歌曲url地址
  3.歌曲详情获取
    请求地址:https://autumnfish.cn/song/detail
    请求方法:get
    请求参数:ids(歌曲id)
    响应内容:歌曲详情(包括封面信息)
  4.热门评论获取
    请求地址:https://autumnfish.cn/comment/hot?type=0
    请求方法:get
    请求参数:id(歌曲id,地址中的type固定为0)
    响应内容:歌曲的热门评论
  5.mv地址获取
    请求地址:https://autumnfish.cn/mv/url
    请求方法:get
    请求参数:id(mvid,为0表示没有mv)
    响应内容:mv的地址
*/
let that = null;
var player = new Vue({
    el: '#player',
    data: {
        song:'恋爱ing',
        selectedSongId: '',
        songUrl: '',
        songCover: '',
        songList: [],
        hotComments: [],
        isPlaying: false,
        mvUrl: '',
        mvDisplay: false
    },
    methods: {
        searchSong: function() {
            that = this;
            console.log(this.song)
            axios.get('https://autumnfish.cn/search?keywords='+this.song)
            .then(function(response){
                console.log(response.data.result.songs)
                that.songList = response.data.result.songs;
            })
            .catch(function(error){
                console.log(error)
            })
        },
        playSong: function(id) {
          console.log(id)
          that = this
          this.selectedSongId = id;
          axios.get('https://autumnfish.cn/song/url?id='+this.selectedSongId)
          .then(function(response){  
            that.songUrl = response.data.data[0].url
            //获取封面
            axios.get('https://autumnfish.cn/song/detail?ids='+that.selectedSongId)
            .then(function(response) {
              that.songCover = response.data.songs[0].al.picUrl
            })
          })
          .catch(function(error){
            console.log(error);
          })
          //获取评论
          axios.get('https://autumnfish.cn/comment/hot?type=0&id='+this.selectedSongId)
          .then(function(response){
            console.log(response)
            that.hotComments = response.data.hotComments;
          })
          .catch(function(error){
            console.log(error)
          })

        },
        playAudio: function() {
          this.isPlaying = true;
        },
        pauseAudio: function() {
          this.isPlaying = false;
        },
        playMv: function(mvid) {
          axios.get('https://autumnfish.cn/mv/url?id='+mvid)
          .then(function(response) {
            // console.log(response)
            that.mvUrl = response.data.data.url;
            that.mvDisplay = true;
          })
          .catch(function(error) {
            console.log(error)
          })
        },
        hideVedio: function() {
          this.mvDisplay = false;
        }


        
    }
})