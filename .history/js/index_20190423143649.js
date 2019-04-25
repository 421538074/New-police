"use strict";

var xm = new Vue({
  el: "#app",
  data: {
    pIndex: -1,
    show: false,
    isshow1: true,
    hide: false,
    isshade: false,
    isent: -1,
    //查看文章
    isnum: true,
    //通知显示数字
    ismore: false,
    //更多
    isforum: false,
    //论坛
    isCase: false,
    //报备
    isauditing: false,
    //审核中
    isall: false,
    //全部报备
    iscomment: false,
    //评论
    isreply: false,
    //回复
    isspeak: false,
    //查看回复
    ispass: false,
    //修改密码
    isshow: false,
    //报备TAG
    isNone: false,
    //未搜索到
    isstar: false,
    //所有报备
    ForumCate: [],
    //论坛分类
    titleList: [],
    //论坛列表
    allList: [],
    //报备列表
    list: [],
    //报备列表
    seelist: [],
    //查看回复
    repairSorts: [],
    //保修类型
    repairList: [],
    //所有报备
    replaylist: [],
    current: 0,
    changeRed: -1,
    currentActive: -1,
    oneIndex: -1,
    twoIndex: -1,
    currentIndex: 0,
    numIndex: -1,
    commentActive: -1,
    Ptitle: '',
    //论坛标题
    Pcontent: '',
    //论坛内容
    Pcomment: '',
    //评论内容
    keyWords: '',
    //搜索关键词
    replyComment: '',
    //回复评论的内容,
    currentComment: {},
    //当前查看的评论,
    currentPostId: '',
    currentCommentId: '',
    selectedCatId: '',
    postIndex: -1,
    isCreated: false,
    //是否创建了富文本
    KindEditor: '',
    userName: '',
    Opsw: '',
    Npsw: '',
    Tpsw: '',
    length: '',
    // 回复评论条数
    //子级id
    subId: '',
    showDate: getNowDate(),
    ip: '',
    //报备信息
    repairInfo: {
      today: 0,
      week: 0,
      month: 0,
      total: 0
    }
  },
  methods: {
    Resgiter: function Resgiter() {
      window.location.href = "login.html";
    },
    Enter: function Enter() {
      window.location.href = "login.html";
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
    goClose: function goClose() {
      //关闭遮罩
      this.isshade = false;
      this.ispass = false;
      this.isforum = false;
      this.isCase = false;
      this.isCreat = false;
      this.isCroom = false;
      this.iscommonly = false;
      this.isall = false;
      this.isshade = false;
      this.isChatting = false;
      this.isspeak = false;
      $("body").removeClass("bod");
    },
    appChange: function appChange() {
      sessionStorage.setItem('id', 1);
    },
    gouser: function gouser(id) {
      //跳转我的主页
      sessionStorage.setItem('id', 2);
      window.location.href = "user.html";
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
    comChange: function comChange(postId, index) {
      //查看评论
      this.currentPostId = postId;
      this.commentActive = this.commentActive == index ? -1 : index;
    },
    goname: function goname() {
      //个人信息
      $(".header_two").slideToggle(200);
      $(".answer").slideUp(200);
      this.ismore = false;
    },
    goAnswer: function goAnswer() {
      //通知
      $(".answer").slideToggle(200);
      $(".header_two").slideUp(200);
      this.ismore = false;
    },
    gospeak: function gospeak(index) {
      //回复
      if (this.userName == null) {
        warn.alert("请先登录");
        return;
      }

      console;
      this.currentActive = this.currentActive == index ? -1 : index;
    },
    gospeak1: function gospeak1(index) {
      //查看回复  回复
      this.oneIndex = this.oneIndex == index ? -1 : index;
    },
    gospeak2: function gospeak2(index) {
      this.twoIndex = this.twoIndex == index ? -1 : index;
    },
    goPass: function goPass() {
      //修改密码
      this.isshade = true;
      this.ispass = true;
    },
    writeReply: function writeReply() {
      //写论坛
      window.open("write.html");
    },
    reportChange: function reportChange() {
      var _this2 = this;

      //打开报备
      this.userName = sessionStorage.getItem("username");

      if (this.userName) {
        this.isshade = true;
        this.isCase = true;
        $.ajax({
          type: "post",
          url: "".concat(api, "/index/api/repairSorts"),
          async: true,
          data: {},
          dataType: 'json',
          success: function success(res) {
            _this2.repairSorts = res.data;
          }
        });
      } else {
        warn.alert("请先登录");
      }
    },
    reChange: function reChange() {
      var _this3 = this;

      //报备
      var userContent = $(".wishContent").val();
      $.ajax({
        type: "post",
        url: "".concat(api, "/index/api/publishRepair"),
        async: true,
        data: {
          repair_sort: 1,
          content: userContent
        },
        dataType: 'json',
        success: function success(res) {
          warn.alert(res.msg);
          _this3.isshade = false;
          _this3.isCase = false;
          _this3.roomList = res.data;
        }
      });
    },
    allChange: function allChange() {
      var _this4 = this;

      //所有报备
      this.isshade = true;
      this.isall = true;
      $.ajax({
        type: "post",
        url: "".concat(api, "/index/api/repairLists"),
        async: true,
        data: {},
        dataType: 'json',
        success: function success(res) {
          _this4.repairList = res.data;
        }
      });
    },
    toggleCalendar: function toggleCalendar() {
      $('#schedule-box').slideToggle(200);
    },
    lookchange: function lookchange(post_id, comment_id) {
      var _this5 = this;

      //查看回复
      if (this.userName) {
        this.ip = "";
      }

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
          comment_id: comment_id,
          ip: this.ip
        },
        dataType: 'json',
        success: function success(res) {
          _this5.seelist = res.data;
        }
      });
    },
    btnChange: function btnChange(selectedCatId, index) {
      //写论坛 点击添加颜色
      this.changeRed = index;
      this.selectedCatId = selectedCatId;
    },
    tagChange: function tagChange() {
      var _this6 = this;

      //我的报备
      this.isshow = !this.isshow;

      if (this.isshow) {
        $.ajax({
          type: "post",
          url: "".concat(api, "/index/api/myRepair"),
          data: {},
          dataType: 'json',
          success: function success(res) {
            console.log(res);
            _this6.allList = res.data;
          }
        });
      } else {
        $.ajax({
          type: "post",
          url: "".concat(api, "/index/api/repairList"),
          data: {},
          dataType: 'json',
          success: function success(res) {
            console.log(res);
            _this6.allList = res.data;
          }
        });
      }
    },
    banner: function banner(index, id) {
      var _this7 = this;

      this.currentIndex = 3;
      this.ismore = false;

      if (this.userName) {
        this.ip = "";
      }

      if (index != this.numIndex) {
        this.numIndex = index;
        console.log('numindex=' + this.numIndex);
      }

      this.subId = id;
      console.log(id);
      console.log(index);
      $.ajax({
        type: "post",
        url: "".concat(api, "/index/api/getForumList"),
        data: {
          cate_id: id,
          ip: this.ip
        },
        dataType: 'json',
        success: function success(res) {
          _this7.titleList = res.result;
          _this7.ForumCate[3].title = _this7.ForumCate[index + 4].title; // this.postIndex = -1
          // this.commentActive = -1
          // this.numIndex = -1

          if (_this7.titleList.length == 0) {
            _this7.isNone = true;
          } else {
            _this7.isNone = false;
          }
        }
      });
    },
    bannerChange: function bannerChange(index) {
      var _this8 = this;

      // 获取论坛分类
      if (index != this.currentIndex && index != 3) {
        this.currentIndex = index;
        this.currentActive = -1;
      }

      if (index == 3) {
        this.ismore == true ? this.ismore = false : this.ismore = true;

        if (this.ismore) {
          $(".answer").slideUp(200);
          $(".header_two").slideUp(200);
        }

        return;
      } else {
        this.ismore = false;
      }

      if (this.userName) {
        this.ip = "";
      }

      var list = this.ForumCate;
      var id = list[index].id;
      $.ajax({
        type: "post",
        url: "".concat(api, "/index/api/getForumList"),
        data: {
          cate_id: id,
          ip: this.ip
        },
        dataType: 'json',
        success: function success(res) {
          _this8.postIndex = -1; // this.commentActive = -1

          _this8.numIndex = -1;
          _this8.ForumCate[3].title = "更多";
          _this8.titleList = res.result;

          if (_this8.titleList.length == 0) {
            _this8.isNone = true;
          } else {
            _this8.isNone = false;
          }
        }
      });
    },
    pulishChange: function pulishChange() {
      var _this9 = this;

      //发布论坛
      if (this.Ptitle.trim() == '') {
        warn.alert('请输入标题!');
        return false;
      } else if (editor.html().trim() == '') {
        warn.alert('请输入内容!');
        return false;
      } else if (this.selectedCatId == '') {
        warn.alert('请选择分类标签');
        return false;
      }

      $.ajax({
        type: "post",
        url: "".concat(api, "/index/api/publishPost"),
        data: {
          info_id: this.selectedCatId,
          title: this.Ptitle,
          content: editor.html()
        },
        dataType: 'json',
        success: function success(res) {
          _this9.allList = res.data;

          _this9.bannerChange(_this9.currentIndex);

          _this9.selectedCatId = '';
          _this9.Ptitle = '';
          _this9.Pcontent = '';

          _this9.goClose();
        }
      });
    },
    commentChange: function commentChange(post_id, comment_id, uid, type) {
      var _this10 = this;

      //发布评论
      if (this.userName) {
        this.ip = "";
      } else {
        warn.alert("请先登录");
      }

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
            _this10.replyComment = '';

            if (type == 1) {
              _this10.oneIndex = -1;
              _this10.twoIndex = -1;

              _this10.lookchange(_this10.currentPostId, _this10.currentCommentId);
            } else {
              _this10.currentActive = -1;
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
              content: this.Pcomment,
              ip: this.ip
            },
            dataType: 'json',
            success: function success(res) {
              _this10.Pcomment = "";

              _this10.bannerChange(_this10.currentIndex);
            }
          });
        } else {
          warn.alert("请填写内容");
        }
      }
    },
    goHome: function goHome() {
      window.location.href = "index.html";
    },
    searchChange: function searchChange() {
      var _this11 = this;

      //搜素
      if (this.userName) {
        this.ip = "";
      } else {
        this.ip;
      }

      $.ajax({
        type: "post",
        url: "".concat(api, "/index/api/postSearch"),
        data: {
          keyWords: this.keyWords,
          ip: this.ip
        },
        dataType: 'json',
        success: function success(res) {
          _this11.titleList = res.data;

          if (res.msg == "暂无数据！") {
            _this11.isNone = true;
          } else {
            _this11.isNone = false;
          }
        }
      });
    },
    //文章点赞
    likePostOrComment: function likePostOrComment(post_id, comment_id, type, typeId) {
      var _this12 = this;

      if (this.userName) {
        this.ip = "";
      } else {
        this.ip;
      }

      console.log(this.ip);
      console.log(typeId);
      var data = {};
      $.ajax({
        url: "".concat(api, "/index/api/phraisePost"),
        type: 'post',
        dataType: 'json',
        data: {
          post_id: post_id,
          comment_id: comment_id,
          ip: this.ip,
          type: typeId
        },
        success: function success(res) {
          if (type == 1) {
            //弹窗评论点赞
            _this12.lookchange(_this12.currentPostId, _this12.currentCommentId);
          } else {
            if (_this12.currentIndex == 3) {
              _this12.banner(_this12.numIndex, _this12.ForumCate.slice(4)[_this12.numIndex].id);

              return;
            }

            _this12.bannerChange(_this12.currentIndex);
          }
        },
        error: function error(err) {}
      });
    },
    onli: function onli() {
      var _this13 = this;

      this.isstar = !this.isstar;
      this.show = !this.show;
      $.ajax({
        type: "post",
        url: "".concat(api, "/index/api/repairLists"),
        async: true,
        data: {},
        dataType: 'json',
        success: function success(res) {
          console.log(res);
          _this13.list = res.data;
        }
      });
    },
    on: function on() {
      var _this14 = this;

      this.isstar = !this.isstar;
      this.show = !this.show;
      $.ajax({
        type: "post",
        url: "".concat(api, "/index/api/myRepairs"),
        async: true,
        data: {},
        dataType: 'json',
        success: function success(res) {
          console.log(res);
          _this14.list = res.data;
        }
      });
    },
    getCharaLength: function getCharaLength(str) {
      return str.replace(/[\u0391-\uFFE5]/g, "aa").length > 239;
    },
    filterImg: function filterImg(content) {
      var reg = /style="[^\"]*?"/g;
      return content.replace(reg, '');
    },
    goUser1: function goUser1(id) {
      //通知跳转
      console.log(id);
      $.ajax({
        type: "post",
        url: "".concat(api, "/index/api/clickRead"),
        async: true,
        data: {
          id: id
        },
        dataType: 'json',
        success: function success(res) {
          window.location.href = "user.html?id=1";
        }
      });
    }
  },
  created: function created() {
    var _this15 = this;

    getNotice();
    KindEditor.ready(function (K) {
      _this15.KindEditor = K;
    }); // 获取论坛分类

    $.ajax({
      type: "post",
      url: "".concat(api, "/index/api/getForumCate"),
      async: true,
      data: {},
      dataType: 'json',
      success: function success(res) {
        var temp = res.result;
        temp.splice(3, 0, {
          title: "更多"
        });
        _this15.ForumCate = temp;

        _this15.bannerChange(0);
      }
    }); // 所有报备

    $.ajax({
      type: "post",
      url: "".concat(api, "/index/api/repairList"),
      async: true,
      data: {},
      dataType: 'json',
      success: function success(res) {
        _this15.allList = res.data;
      }
    }); // 聊天

    $.ajax({
      type: "post",
      url: "".concat(api, "/index/api/chatroomList"),
      async: true,
      data: {},
      dataType: 'json',
      success: function success(res) {
        _this15.chatList = res.data;
      }
    }); // 通知

    $.ajax({
      type: "post",
      url: "".concat(api, "/index/api/allReplay"),
      async: true,
      data: {},
      dataType: 'json',
      success: function success(res) {
        console.log(res.data.replay.length);
        _this15.length = res.data.replay.length;
      }
    });
    this.userName = sessionStorage.getItem("username");
    getIpAdd(function (ip) {
      _this15.ip = ip;
    });
    console.log(this.ip);
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
}); //封装一个限制字数方法

var checkStrLengths = function checkStrLengths(str, maxLength) {
  var maxLength = maxLength;
  var result = 0;

  if (str && str.length > maxLength) {
    result = maxLength;
  } else {
    result = str.length;
  }

  return result;
}; //监听输入


$(".wishContent").on('input propertychange', function () {
  var userDesc = $(this).val();
  var len;

  if (userDesc) {
    len = checkStrLengths(userDesc, 60);
  } else {
    len = 0;
  }

  $(".wordsNum").html('60字以内' + len + '/60');
});

function getNotice() {
  $.ajax({
    type: "post",
    url: "".concat(api, "/index/api/allReplay"),
    async: true,
    dataType: 'json',
    success: function success(res) {
      xm.list = res.data.comment;
      xm.replaylist = res.data.replay;
    }
  });
}
/**
 * 初始化echarts图表
 * @param {array} data 
 */


function initRepairChart(data) {
  var repairChart = echarts.init(document.getElementById('repair-chart'));
  var option = {
    // color: ['linear-gradient(#71baf0,#2b85e9)'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'

      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [{
      type: 'category',
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      axisTick: {
        alignWithLabel: true,
        show: false
      },
      axisLabel:{
        fontSize:10
      }
    }],
    yAxis: [{
      type: 'value'
    }],
    series: [{
      name: '报备数量',
      type: 'bar',
      barWidth: '60%',
      data: data,
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: '#71baf0'
          }, {
            offset: 1,
            color: '#2b85e9'
          }])
        }
      }
    }]
  };
  repairChart.setOption(option);
}
/**
 * 初始化日历组件
 */


function initCalendar() {
  var mySchedule = new Schedule({
    el: '#schedule-box',
    clickCb: function clickCb(y, m, d) {
      //点击日期
      xm.toggleCalendar();
      getRepairList(y + '/' + m + '/' + d);
      xm.showDate = y + '/' + m + '/' + d;
    },
    nextMonthCb: function nextMonthCb(y, m, d) {
      //下个月
      console.log(y, m, d);
    },
    nextYeayCb: function nextYeayCb(y, m, d) {
      //下年
      console.log(y, m, d);
    },
    prevMonthCb: function prevMonthCb(y, m, d) {
      //上一年
      console.log(y, m, d);
    },
    prevYearCb: function prevYearCb(y, m, d) {
      //上一年
      console.log(y, m, d);
    }
  });
}
/**
 * 根据日期字符串获得该周的日期范围
 * @param {string} str 
 */


function getWeekByDay(str) {
  var date = new Date(str);
  var times = date.getTime();
  var day = date.getDay(); // 0 - 6

  var start = '';
  var end = '';

  if (day == 0) {
    //周日
    start = times - 6 * 24 * 60 * 60 * 1000;
    end = times;
  } else {
    //非周日
    start = times - (day - 1) * 24 * 60 * 60 * 1000;
    end = times - (day - 7) * 24 * 60 * 60 * 1000;
  }

  return {
    start: start / 1000,
    end: end / 1000
  };
}
/**
 * 根据时间戳返回日期字符串
 * @param {number} timeStaps
 */


function timeToDateStr(timeStaps) {
  var newDate = new Date(timeStaps);
  return newDate.getFullYear() + '/' + (newDate.getMonth() + 1) + '/' + newDate.getDate();
}

function getNowDate() {
  var date = new Date();
  return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
}
/**
 * 获得报备列表
 * @param {string} strDate 
 */


function getRepairList(strDate) {
  var dateRange = getWeekByDay(strDate);
  var nowDate = new Date(strDate).getTime() / 1000;
  $.ajax({
    url: "".concat(api, "/index/api/repairCentre"),
    data: {
      today: nowDate,
      begin: dateRange.start,
      end: dateRange.end
    },
    type: 'post',
    dataType: 'json',
    success: function success(data) {
      initRepairChart([data.data.Monday, data.data.Tuesday, data.data.Wednesday, data.data.Thursday, data.data.Friday, data.data.Saturday, data.data.Sunday]);
      xm.repairInfo.today = data.data.today;
      xm.repairInfo.week = data.data.week;
      xm.repairInfo.month = data.data.month;
      xm.repairInfo.total = data.data.tool;
    },
    error: function error() {
      alert('服务器异常');
    }
  });
}

getRepairList(getNowDate());
initCalendar();