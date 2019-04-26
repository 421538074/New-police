var vm = avalon.define({
    $id: "app",
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
    ForumCate: [
        {title:"社会知识"},
        {title:"服务"},
        {title:"思维"},
        {title:"更多"},
    ],
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
    // showDate: getNowDate(),
    ip: '',
    //报备信息
    repairInfo: {
        today: 0,
        week: 0,
        month: 0,
        total: 0
    },
    arr: [{ a: 1 }, { a: 2 }, { a: 3 }],

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
                console.log(res)
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

});

// var _this15 = this;
// getStart();
// function getStart() {
//     $.ajax({
//         type: "post",
//         url: "".concat(api, "/index/api/getForumCate"),
//         // async: true,
//         data: {},
//         cache:false,
//         dataType: "json",
//         success: function (res) {
//             console.log(res)
//             var temp = res.result;
//             temp.splice(3, 0, {
//                 title: "更多"
//             });
//             vm.ForumCate = temp;
//             // vm.bannerChange(0);
//         }
//     });
// }

console.log(11111)

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
          fontSize:'0.2rem'
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
