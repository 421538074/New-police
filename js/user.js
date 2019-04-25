"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

Vue.filter('ellipsis', function (value) {
  if (!value) return '';

  if (value.length > 10) {
    return value.slice(0, 1000) + '...';
  }

  return value;
});
var xm = new Vue({
  el: "#app",
  data: {
    userName: '',
    hide: '',
    isshade: false,
    ispass: false,
    isname: true,
    isent: true,
    //查看文章
    iscomment: false,
    //评论
    isreply: false,
    //回复
    isspeak: false,
    //查看回复
    isanswer: false,
    //通知
    isUser: false,
    //个人中心
    isGood: false,
    //删除
    isone: true,
    //发布
    isbox: false,
    //回复
    isnone: false,
    //没有回复，发布
    istwo: false,
    //没有回复，发布
    ispush: false,
    //
    isthree: false,
    isWrap: false,
    //排名切换
    titleList: [],
    list: [],
    comlist: [],
    userlist: [],
    seelist: [],
    //查看回复
    replayList: [],
    //回复
    replaylist: [],
    commentList: [],
    //回复
    msg: "阅读全文",
    num: "123",
    currentActive: -1,
    intergral: '',
    //总积分
    Pcomment: '',
    //评论内容
    postIndex: -1,
    commentActive: -1,
    currentIndex: 0,
    currentPostId: '',
    currentCommentId: '',
    oneIndex: -1,
    twoIndex: -1,
    pIndex: -1,
    isdetele: -1,
    //删除切换
    replyComment: '',
    //回复评论的内容,
    currentComment: {},
    //当前查看的评论,
    Opsw: '',
    Npsw: '',
    Tpsw: '',
    login: '',
    //积分
    phraise: '',
    post: '',
    intergrals: '',
    //积分
    tgp: '按总积分排序',
    currentSort: 0,
    currentType: -1,
    baseList: [],
    isone1: false,
    isone2: false
  },
  methods: _defineProperty({
    wrapChange: function wrapChange(key) {
      //排名切换
      this.isWrap = !this.isWrap;
    },
    gouser: function gouser() {
      //跳转我的主页
      window.location.href = "user.html";
    },
    goPass: function goPass() {
      //修改密码
      this.isshade = true;
      this.ispass = true;
    },
    editChange: function editChange() {
      var _this = this;

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
            console.log(res);

            if (res.code == 1) {
              _this.isshade = false;
              _this.ispass = false;
            } else {
              warn.alert(res.msg);
            }
          }
        });
      } else {
        warn.alert("两次密码输入不一致");
      }
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
    TagDetele: function TagDetele(index) {
      //删除切换
      if (this.isdetele != index) {
        this.isdetele = index;
      } else {
        this.isdetele = -1;
      }
    },
    cancel: function cancel() {
      this.isdetele = -1;
    },
    goClose: function goClose() {
      //关闭遮罩
      this.isshade = false;
      this.ispass = false;
      this.isspeak = false;
      $("body").removeClass("bod");
    },
    readChange: function readChange(item, index, e) {
      //产看文章
      if (this.postIndex != index) {
        this.postIndex = index;
      } else {
        this.postIndex = -1;
      }

      this.pIndex = this.pIndex == index ? -1 : index;
    },
    goname: function goname() {
      //个人信息
      $(".header_two").slideToggle("400");
    },
    goAnswer: function goAnswer() {
      var _this2 = this;

      //通知
      $(".answer").slideToggle("400");
      $.ajax({
        type: "post",
        url: "".concat(api, "/index/api/allReplay"),
        async: true,
        data: {},
        dataType: 'json',
        success: function success(res) {
          console.log(res);
          _this2.list = res.data.comment;
          _this2.replaylist = res.data.replay;
        }
      });
    },
    editName: function editName() {
      this.isname = !this.isname;
    },
    comChange: function comChange(index) {
      //查看评论
      this.commentActive = this.commentActive == index ? -1 : index;
    },
    gospeak: function gospeak(index) {
      //回复
      this.currentActive = this.currentActive == index ? -1 : index;
    },
    gospeak1: function gospeak1(index) {
      //查看回复  回复
      this.oneIndex = this.oneIndex == index ? -1 : index;
    },
    gospeak2: function gospeak2(index) {
      this.twoIndex = this.twoIndex == index ? -1 : index;
    },
    lookchange: function lookchange(post_id, comment_id) {
      var _this3 = this;

      //查看回复
      this.currentPostId = post_id;
      this.currentCommentId = comment_id;
      this.currentComment = this.titleList.filter(function (posts) {
        return posts.id == post_id;
      })[0].comment_list.filter(function (comments) {
        return comments.id == comment_id;
      })[0];
      this.isshade = true;
      this.isspeak = true;
      $.ajax({
        type: "post",
        url: "".concat(api, "/index/api/comments"),
        async: true,
        data: {
          post_id: post_id,
          comment_id: comment_id
        },
        dataType: 'json',
        success: function success(res) {
          console.log(res);
          _this3.seelist = res.data;
        }
      });
    },
    deleteChange: function deleteChange() {
      //删除
      this.isGood = !this.isGood;
    },
    confire: function confire() {
      //修改昵称
      var up_text = document.getElementById("up_text");
      var editor = document.getElementById("editor");
      up_text.innerText = editor.value;
      this.isname = true;
    },
    agreeChange: function agreeChange(index, type) {
      //回复
      this.currentActive = index == this.currentActive && this.currentType == type ? -1 : index;
      this.currentType = type;
    },
    send: function send() {
      //发送
      this.currentActive = -1;
    },
    userTag: function userTag(index) {
      //切换
      if (index == 0) {
        this.isone = true;
        this.isone1 = false;
        this.isone2 = false;
      } else if (index == 1) {
        this.isone = false;
        this.isone1 = true;
        this.isone2 = false;
      } else if (index == 2) {
        this.isone = false;
        this.isone1 = false;
        this.isone2 = true;
      }
    },
    filterContent: function filterContent(content) {
      var reg = /style="[^\"]*?"/g;
      content = content == null ? '' : content;
      return content.replace(reg, '');
    },
    commentChange: function commentChange(post_id, comment_id, uid, type) {
      var _this4 = this;

      //发布评论
      if (comment_id) {
        if (this.replyComment.trim() == '') {
          warn.alert('请输入回复内容');
          return false;
        }

        $.ajax({
          url: "".concat(api, "/index/api/replayComment"),
          type: 'post',
          dataType: 'json',
          data: {
            post_id: post_id,
            comment_id: comment_id,
            comment_uid: uid,
            content: this.replyComment
          },
          success: function success(res) {
            _this4.replyComment = '';

            if (type == 1) {
              _this4.oneIndex = -1;
              _this4.twoIndex = -1;
              _this4.currentActive = -1; // this.lookchange(this.currentPostId, this.currentCommentId);

              $.ajax({
                type: "post",
                url: "".concat(api, "/index/api/myPage"),
                async: true,
                data: {},
                dataType: 'json',
                success: function success(res) {
                  _this4.commentList = res.data.comments.comment;
                  _this4.replayList = res.data.comments.replay;
                }
              });
            } else {
              _this4.currentActive = -1;
            }
          },
          error: function error(err) {}
        });
      } else {
        if (this.Pcomment !== "") {
          $.ajax({
            type: "post",
            url: "".concat(api, "/index/api/publishComment"),
            data: {
              post_id: post_id,
              content: this.Pcomment
            },
            dataType: 'json',
            success: function success(res) {
              _this4.Pcomment = "";
              $.ajax({
                type: "post",
                url: "".concat(api, "/index/api/myPage"),
                async: true,
                data: {},
                dataType: 'json',
                success: function success(res) {
                  _this4.titleList = res.data.post;
                }
              });
            }
          });
        } else {
          warn.alert("请填写内容");
        }
      }
    },
    //文章点赞
    likePostOrComment: function likePostOrComment(post_id, comment_id, type, typeId) {
      var _this5 = this;

      var data = {};
      $.ajax({
        url: "".concat(api, "/index/api/phraisePost"),
        type: 'post',
        dataType: 'json',
        data: {
          post_id: post_id,
          comment_id: comment_id,
          ip: '',
          type: typeId
        },
        success: function success(res) {
          if (type == 1) {
            //弹窗评论点赞
            _this5.lookchange(_this5.currentPostId, _this5.currentCommentId);
          } else {
            // this.bannerChange(this.currentIndex);
            $.ajax({
              type: "post",
              url: "".concat(api, "/index/api/myPage"),
              async: true,
              data: {},
              dataType: 'json',
              success: function success(res) {
                _this5.titleList = res.data.post;
              }
            });
          }
        },
        error: function error(err) {}
      });
    },
    getCharaLength: function getCharaLength(str) {
      return str.replace(/[\u0391-\uFFE5]/g, "aa").length > 239;
    },
    filterImg: function filterImg(content) {
      return content.replace('作者', '啊啊啊啊===作者');
    },
    deteleChange: function deteleChange(index) {
      var _this6 = this;

      //删除
      $.ajax({
        type: "post",
        url: "".concat(api, "/index/api/deletePost"),
        data: {
          post_id: index
        },
        dataType: 'json',
        success: function success(res) {
          _this6.isdetele = false;
          $.ajax({
            type: "post",
            url: "".concat(api, "/index/api/myPage"),
            async: true,
            data: {},
            dataType: 'json',
            success: function success(res) {
              console.log(res);
              _this6.titleList = res.data.post;
              _this6.isdetele = -1;
            }
          });
        }
      });
    },
    //重新获取页面数据
    getMypageData: function getMypageData() {
      var _this7 = this;

      $.ajax({
        type: "post",
        url: "".concat(api, "/index/api/myPage"),
        async: true,
        data: {},
        dataType: 'json',
        success: function success(res) {
          console.log(res);
          _this7.titleList = res.data.post;
          _this7.isdetele = -1;
        }
      });
    }
  }, "filterImg", function filterImg(value) {
    if (!value) return '';

    if (value.length > 300) {
      return value.slice(0, 300) + '...';
    }

    return value;
  }),
  components: {
    "cp-banner": indexBanner
  },
  created: function created() {
    var _this8 = this;

    $.ajax({
      type: "post",
      url: "".concat(api, "/index/api/myPage"),
      async: true,
      data: {},
      dataType: 'json',
      success: function success(res) {
        _this8.login = res.data.intergral.login == null ? 0 : res.data.intergral.login;
        _this8.phraise = res.data.intergral.phraise == null ? 0 : res.data.intergral.phraise;
        _this8.post = res.data.intergral.post == null ? 0 : res.data.intergral.post;
        _this8.intergrals = parseInt(_this8.login) + parseInt(_this8.phraise) + parseInt(_this8.post);
        _this8.titleList = res.data.post;
        _this8.userlist = res.data.intergrals;
        _this8.commentList = res.data.comments.comment;
        _this8.replayList = res.data.comments.replay;
        _this8.currentSort = _this8.userlist.findIndex(function (item) {
          console.log(item);
          return item.nickname == sessionStorage.getItem('username');
        }) + 1;

        if (res.data.post == 0) {
          _this8.isthree = true;
        } else {
          _this8.isthree = false;
        }

        if (res.data.comments.comment == 0 && res.data.comments.replay == 0) {
          _this8.istwo = true;
        } else {
          _this8.istwo = false;
        }
      }
    });
    this.userName = sessionStorage.getItem("username");

    if (getUrlKey("id") == 1) {
      this.isone = false;
      this.isone1 = true;
      $(".User-uu>li:eq(1)").addClass('blue').siblings('li').removeClass('blue');
    }

    $.ajax({
      type: "post",
      url: "".concat(api, "/index/api/myRepair"),
      async: true,
      data: {},
      dataType: 'json',
      success: function success(res) {
        _this8.baseList = res.data;
        console.log(res);
      }
    });
  },
  filters: {
    filterTime: function filterTime(time) {
      var date = new Date(time * 1000);
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var seconds = date.getSeconds();

      if (month < 10) {
        month = "0" + month;
      }

      if (day < 10) {
        day = "0" + day;
      }

      if (hours < 10) {
        hours = "0" + hours;
      }

      if (minutes < 10) {
        minutes = "0" + minutes;
      }

      if (seconds < 10) {
        seconds = "0" + seconds;
      }

      return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
    }
  }
});
$(".read").click(function () {
  $(".content_text").toggleClass("entable");
});
$(".wrap_ul li").each(function (index) {
  $(this).click(function () {
    $("li.Wrap_active").removeClass("Wrap_active");
    $(this).addClass("Wrap_active");
    xm.tgp = $(this).text();
    sortByCat($(this).attr('data-type'));
    xm.isWrap = false;
  });
});
$(function () {
  $(".User-uu>li").click(function () {
    $(this).addClass('blue').siblings('li').removeClass('blue');
  });
});

function sortByCat(key) {
  switch (key) {
    case '0':
      key = 'intergral';
      break;

    case '1':
      key = 'login';
      break;

    case '2':
      key = 'post';
      break;

    case '3':
      key = 'phraise';
      break;
  }

  xm.userlist.sort(function (a, b) {
    return b[key] - a[key];
  });
}