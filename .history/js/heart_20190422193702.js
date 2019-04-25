"use strict";

var interval = '';
var xm = new Vue({
  el: "#app",
  data: {
    userName: '',
    isbook: false,
    isplug: false,
    isshade: false,
    isanswer: false,
    isUser: false,
    isPage: true,
    istotur: false,
    ispass: false,
    plugList: [],
    bookList: [],
    tutorialList: [],
    musicList: [],
    musicList1: [],
    musicList2: [],
    list: [],
    musicSort: [],
    //音乐分类
    bookSort: [],
    //书籍分类
    tutorialSort: [],
    //教程分类
    tutorialList1: [],
    //研判工具
    current1: 0,
    number: 0,
    description: '',
    create_at: '',
    name: '',
    data_url: '',
    picture: '',
    download_status: '',
    Tdescription: '',
    Tname: '',
    Tpicture: '',
    Tdata_url: '',
    message: 1,
    Color: -1,
    total: 8,
    // 记录总条数
    // display: 8, // 每页显示条数
    current: 1,
    // 当前的页数
    totalone: 8,
    // 记录总条数
    currentone: 1,
    // 当前的页数
    Opsw: '',
    Npsw: '',
    Tpsw: '',
    hide: false,
    text: '',
    text1: '',
    //播放列表
    musicListSelf: [],
    currentMusicIndex: 0,
    //已播放时间
    playedTime: 0,
    //音频总时长
    totalTime: 0,
    //当前播放列表分类
    currentCateId: -1,
    //暂停的歌曲id
    pausedId: -1
  },
  methods: {
    playMusic: function playMusic(catId, musicId, url) {
      var _this = this;

      this.currentCateId = catId;
      this.Color = musicId;
      this.musicListSelf = [];

      if (this.$refs.myPlayer.src == '' || this.$refs.myPlayer.src != "".concat(api, "/").concat(url)) {
        this.$refs.myPlayer.src = "".concat(api, "/").concat(url);

        this.$refs.myPlayer.oncanplay = function () {
          _this.totalTime = _this.$refs.myPlayer.duration;
        };

        clearInterval(interval);
        this.playedTime = 0;
      }

      this.countInterval(false);
    },
    pauseMusic: function pauseMusic(catId, musicId, url) {
      this.$refs.myPlayer.pause();
      this.pausedId = musicId;
      this.currentCateId = -1;
      this.Color = -1;
    },
    allPlay: function allPlay(key, flag) {
      if (flag) {
        this.currentCateId = key; //全部播放

        this.musicListSelf = this.musicList[key];
        this.currentMusicIndex = -1;
        this.nextMusic();
      } else {
        // 暂停
        this.currentCateId = -1;
        this.$refs.myPlayer.pause();
      }
    },
    nextMusic: function nextMusic() {
      if (this.currentMusicIndex == this.musicListSelf.length - 1) {
        this.currentMusicIndex = 0;
      } else {
        this.currentMusicIndex += 1;
      }

      this.Color = this.musicListSelf[this.currentMusicIndex].id;
      this.$refs.myPlayer.src = "".concat(api, "/").concat(this.musicListSelf[this.currentMusicIndex].data_url);
      this.countInterval(true);
    },
    countInterval: function countInterval(flag) {
      var _this2 = this;

      if (flag) {
        this.$refs.myPlayer.load();

        this.$refs.myPlayer.oncanplay = function () {
          _this2.totalTime = _this2.$refs.myPlayer.duration;

          _this2.$refs.myPlayer.play();

          _this2.playedTime = 0;
          clearInterval(interval);
          interval = setInterval(function () {
            _this2.playedTime += 1;

            if (_this2.playedTime >= _this2.totalTime) {
              _this2.nextMusic();
            }
          }, 1000);
        };
      } else {
        this.totalTime = this.$refs.myPlayer.duration;
        this.$refs.myPlayer.play();

        if (!interval) {
          interval = setInterval(function () {
            _this2.playedTime += 1;

            if (_this2.playedTime >= _this2.totalTime) {
              clearInterval(interval);
              interval = '';
              _this2.currentMusicIndex = -1;
              _this2.currentCateId = -1;
            }
          }, 1000);
        }
      }
    },
    goClose: function goClose() {
      //关闭遮罩
      this.isshade = false;
      this.ispass = false;
      this.istotur = false;
      this.isplug = false;
      this.isbook = false;
      $("body").removeClass("bod");
    },
    editChange: function editChange() {
      var _this3 = this;

      //修改密码
      if (this.Npsw == this.Tpsw) {
        $.ajax({
          type: "post",
          url: "".concat(api, "/index/api/changePwd"),
          async: true,
          data: {
            oldpassword: this.Opsw,
            newPassword: this.Npsw
          },
          dataType: 'json',
          success: function success(res) {
            if (res.code == 1) {
              _this3.isshade = false;
              _this3.ispass = false;
            } else {
              warn.alert(res.msg);
            }
          }
        });
      } else {
        warn.alert("两次密码输入不一致");
      }
    },
    goPass: function goPass() {
      //修改密码
      this.isshade = true;
      this.ispass = true;
    },
    gouser: function gouser() {
      //跳转我的主页
      window.location.href = "user.html";
    },
    quitChange: function quitChange() {
      //退出登录
      $.ajax({
        type: "post",
        url: "".concat(api, "/index/api/logout"),
        async: true,
        data: {},
        dataType: 'json',
        success: function success(res) {
          sessionStorage.clear();

          if (res.code == 1) {
            window.location.href = 'login.html';
          } else {
            warn.alert(res.msg);
          }
        }
      });
    },
    bookChange: function bookChange(book_id, index) {
      var _this4 = this;

      //书籍分类
      this.current1 = index;
      $.ajax({
        type: "post",
        url: "".concat(api, "/index/api/bookList"),
        async: true,
        data: {
          page: 1,
          book_id: book_id
        },
        dataType: 'json',
        success: function success(res) {
          if (res.code == 1) {
            _this4.bookList = res.data;
            _this4.total = res.data.length;
            sessionStorage.setItem('book_id', book_id);
          }
        }
      });
    },
    turtorChange: function turtorChange(index, tutorial_id) {
      var _this5 = this;

      //教程分类
      this.number = index;

      if (tutorial_id) {
        $.ajax({
          type: "post",
          url: "".concat(api, "/index/api/tutorialList"),
          async: true,
          data: {
            page: 1,
            tutorial_id: tutorial_id
          },
          dataType: 'json',
          success: function success(res) {
            if (res.code == 0) {
              warn.alert(res.msg);
              return;
            }

            _this5.hide = true;
            _this5.tutorialList = res.data;
            _this5.totalone = res.data.length;
            sessionStorage.setItem('tutorial_id', tutorial_id);
          }
        });
      } else {
        $.ajax({
          type: "post",
          url: "".concat(api, "/index/api/pluginList"),
          async: true,
          data: {
            page: 1,
            tool_id: index + 4
          },
          dataType: 'json',
          success: function success(res) {
            _this5.hide = false;
            _this5.tutorialList1 = res.data;
          }
        });
      }
    },
    openChange: function openChange(index) {
      var _this6 = this;

      //插件详情页
      $.ajax({
        type: "post",
        url: "".concat(api, "/index/api/toolDetail"),
        async: true,
        data: {
          tool_id: index
        },
        dataType: 'json',
        success: function success(res) {
          _this6.isshade = true;
          _this6.isplug = true;
          _this6.create_at = res.data.create_at;
          _this6.description = res.data.description;
          _this6.name = res.data.name;
          _this6.picture = res.data.picture;
          _this6.data_url = res.data.data_url;
          _this6.download_status = res.data.download_status;
          sessionStorage.setItem('url', JSON.stringify(res.data.data_url));
        }
      });
    },
    bookDown: function bookDown(index) {
      var _this7 = this;

      //书记闲情
      $.ajax({
        type: "post",
        url: "".concat(api, "/index/api/toolDetail"),
        async: true,
        data: {
          tool_id: index
        },
        dataType: 'json',
        success: function success(res) {
          _this7.isshade = true;
          _this7.isbook = true;
          _this7.create_at = res.data.create_at;
          _this7.description = res.data.description;
          _this7.name = res.data.name;
          _this7.picture = res.data.picture;
          _this7.data_url = res.data.data_url;
          _this7.download_status = res.data.download_status;
          sessionStorage.setItem('url', JSON.stringify(res.data.data_url));
        }
      });
    },
    Tdown: function Tdown(index) {
      var _this8 = this;

      //教程详情页 
      $.ajax({
        type: "post",
        url: "".concat(api, "/index/api/tutorialDetail"),
        async: true,
        data: {
          tutorial_id: index
        },
        dataType: 'json',
        success: function success(res) {
          _this8.isshade = true;
          _this8.istotur = true;
          _this8.Tdescription = res.data.description;
          _this8.Tname = res.data.tutorial_name;
          _this8.Tpicture = res.data.picture;
          _this8.Tdata_url = res.data.tutorial_url;
          _this8.Tdownload_status = res.data.download_status;
          sessionStorage.setItem('url', JSON.stringify(res.data.data_url));
        }
      });
    },
    upDown: function upDown() {
      var url = sessionStorage.getItem('url');
      url = url.replace("\"", "").replace("\"", "");
      ;
      var down = api + "/" + url; // console.log(down)
      // var $form = $('<form></form>');
      // $form.attr('action', down);
      // $form.appendTo($('body'));
      // $form.submit();

      var downloadLink = document.createElement('a');
      downloadLink.href = down;
      downloadLink.download = this.name;
      downloadLink.click();
    },
    pagechange: function pagechange(currentPage) {
      var _this9 = this;

      //书籍分页
      var book_id = sessionStorage.getItem('book_id');
      console.log(book_id);
      $.ajax({
        type: "post",
        url: "".concat(api, "/index/api/bookList"),
        async: true,
        data: {
          page: currentPage,
          book_id: book_id
        },
        dataType: 'json',
        success: function success(res) {
          console.log(res);
          _this9.bookList = res.data;
          _this9.total = res.data.length;
        }
      });
    },
    pagechangeOne: function pagechangeOne(currentPage) {
      var _this10 = this;

      //教程
      var tutorial_id = sessionStorage.getItem('tutorial_id');
      $.ajax({
        type: "post",
        url: "".concat(api, "/index/api/tutorialList"),
        async: true,
        data: {
          page: 1,
          tutorial_id: tutorial_id
        },
        dataType: 'json',
        success: function success(res) {
          console.log(res);
          _this10.tutorialList = res.data;
          _this10.totalone = res.data.length;
        }
      });
    },
    add: function add(id) {
      var _this11 = this;

      //音乐下一页
      this.musicList;
      var num = Math.ceil(this.musicList[1].length / 7);
      this.message++;

      if (this.message > num) {
        this.message = num;
        return;
      }

      $.ajax({
        type: "post",
        url: "".concat(api, "/index/api/muisicList"),
        async: true,
        data: {
          page: this.message,
          music_id: id
        },
        dataType: 'json',
        success: function success(res) {
          _this11.musicList[id] = res.data;
        }
      });
    },
    reduce: function reduce(id) {
      var _this12 = this;

      //音乐上一页
      this.message--;

      if (this.message < 1) {
        this.message = 1;
        return;
      }

      console.log(this.message);
      $.ajax({
        type: "post",
        url: "".concat(api, "/index/api/muisicList"),
        async: true,
        data: {
          page: this.message,
          music_id: id
        },
        dataType: 'json',
        success: function success(res) {
          console.log(res);
          _this12.musicList[id] = res.data;
        }
      });
    },
    musicDown: function musicDown(data_url) {
      //音乐下载
      //必须同源才能下载
      var alink = document.createElement("a");
      alink.href = "".concat(api, "/").concat(data_url);
      alink.download = this.imgs;
      console.log(alink.download);
      alink.click();
    },
    Osearch: function Osearch() {
      var _this13 = this;

      $.ajax({
        type: "post",
        url: "".concat(api, "/index/api/toolSearch"),
        async: true,
        data: {
          type: 1,
          keyWords: this.text
        },
        dataType: 'json',
        success: function success(res) {
          console.log(res);
          _this13.bookList = res.data;
        }
      });
    },
    Tsearch: function Tsearch() {
      var _this14 = this;

      $.ajax({
        type: "post",
        url: "".concat(api, "/index/api/toolSearch"),
        async: true,
        data: {
          type: 2,
          keyWords: this.text1
        },
        dataType: 'json',
        success: function success(res) {
          console.log(res);
          _this14.tutorialList1 = res.data;
        }
      });
    }
  },
  mounted: function mounted() {// this.$refs.myPlayer.src = `${api}/${this.musicList[this.currentMusicIndex].data_url}`;
  },
  components: {
    "cp-page": indexPage,
    "cp-banner": indexBanner
  },
  created: function created() {
    var _this15 = this;

    $.ajax({
      type: "post",
      url: "".concat(api, "/index/api/toolCenter"),
      async: true,
      data: {},
      dataType: 'json',
      success: function success(res) {
        _this15.plugList = res.data.plugin;
        _this15.musicList = res.data.music.list;
        _this15.musicSort = res.data.music.sort;

        _this15.bookChange(res.data.book.sort[0].id, 0);

        _this15.bookSort = res.data.book.sort; // this.tutorialList = res.data.tutorial.list

        var temp = res.data.tutorial.sort;

        _this15.turtorChange(0, res.data.tutorial.sort[0].id);

        _this15.tutorialSort = temp;
        _this15.total = res.data.book.list.length;

        if (_this15.total < 8) {
          _this15.total = 8;
        }

        _this15.totalone = res.data.tutorial.list.length;

        if (_this15.totalone < 8) {
          _this15.totalone = 8;
        }

        sessionStorage.setItem('length', JSON.stringify(res.data.plugin.length));
      }
    });
    $.ajax({
      type: "post",
      url: "".concat(api, "/index/api/pluginList"),
      async: true,
      data: {
        page: 1,
        tool_id: 4
      },
      dataType: 'json',
      success: function success(res) {
        _this15.hide = false;
        _this15.tutorialList1 = res.data;
      }
    });
  },
  filters: {
    filterTime: function filterTime(time) {
      var date = new Date(time * 1000);
      return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    },
    filterImg: function filterImg(img) {
      if (img == null) {
        return 'img/logo.png';
      }

      return "".concat(api).concat(img);
    }
  }
});
$(function () {
  $(".nav_uu li").each(function (index) {
    $(this).click(function () {
      $("li.blue").removeClass("blue");
      $(this).addClass("blue");
    });
  });
});
$(".index_right span").each(function (index) {
  $(this).click(function () {
    $("span.BannerImg").removeClass("BannerImg");
    $(this).addClass("BannerImg");
  });
});
$('.nav_uu').on('click', 'li', function (e) {
  var target = e.target;
  var id = $(target).data("to");
  $('html,body').animate({
    scrollTop: $('#' + id).offset().top
  }, 800);
}); // 插件

var length = sessionStorage.getItem("length");
$(".zxf").createPage({
  pageNum: Math.ceil(length / 8),
  current: 1,
  backfun: function backfun(e) {
    var page = e.current;
    console.log(page);
    $.ajax({
      type: "post",
      url: "".concat(api, "/index/api/pluginList"),
      async: true,
      data: {
        page: page,
        tool_id: 1
      },
      dataType: 'json',
      success: function success(res) {
        xm.plugList = res.data;
      }
    });
  }
});