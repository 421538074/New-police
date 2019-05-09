
var isInitPage = true;
var vm = avalon.define({
  $id: "app",
  isstar: false,
  list: [],
  list1: [],
  msg: '',
  show: false,
  title: '',
  // 记录总条数
  // display: 8, // 每页显示条数
  current: 1,
  // 当前的页数
  totalone: 8,
  // 记录总条数
  currentone: 1,
  totalNum: 0,
  // 当前的页数
  onli: function onli(type) {
    var _this = this;

    this.isstar = !this.isstar;
    this.show = !this.show;

    if (type == 0) {
      this.title = "接单";
      $.ajax({
        type: "post",
        url: "".concat(api, "/index/api/repairLists"),
        async: true,
        data: {
          page: 1
        },
        dataType: 'json',
        success: function success(res) {
          _this.list = res.data.list;
          _this.totalNum = res.data.num;
          avalon.ready(function () {
            initPagation(type);
          });
        }
      });
    } else {
      this.title = "我的接单";
      $.ajax({
        type: "post",
        url: "".concat(api, "/index/api/myRepairs"),
        async: true,
        data: {
          page: 1
        },
        dataType: 'json',
        success: function success(res) {
          _this.list1 = res.data;
          avalon.ready(function () {
            initPagation(type);
          });
        }
      });
    }
  },
  Repair: function Repair(index) {
    var _this2 = this;
    //接单
    $.ajax({
      type: "post",
      url: "".concat(api, "/index/api/receiveRepair"),
      async: true,
      data: {
        repair_id: index
      },
      dataType: 'json',
      success: function success(res) {
        console.log(res);

        if (res.code == 1) {
          $.ajax({
            type: "post",
            url: "".concat(api, "/index/api/repairLists"),
            async: true,
            data: {
              page:1
            },
            dataType: 'json',
            success: function success(res) {
              _this2.list = res.data.list;
              _this2.totalNum = res.data.num;
              initPagation(0);
            }
          });
          warn.alert(res.msg);

        } else {
          warn.alert(res.msg);
        }
      }
    });
  },
  Service: function Service(index, id) {
    var _this3 = this;

    //维修完成
    $.ajax({
      type: "post",
      url: "".concat(api, "/index/api/doneRepair"),
      async: true,
      data: {
        repair_id: index,
        one_id: id
      },
      dataType: 'json',
      success: function success(res) {
        console.log(res);

        if (res.code == 1) {
          warn.alert(res.msg);
          $.ajax({
            type: "post",
            url: "".concat(api, "/index/api/myRepairs"),
            async: true,
            data: {
              page:1
            },
            dataType: 'json',
            success: function success(res) {
              _this3.list1 = res.data;
              _this3.totalNum = res.data.num;
              initPagation(1);
            }
          });
        } else {
          warn.alert("已完成");
        }
      }
    });
  },
  created: function created() {
    this.onli(0);
  },
})

jQuery.support.cors = true
vm.created();

avalon.filters.filterTime = function (time) {
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



function initPagation(type) {
  var url = "".concat(api, "/index/api/repairLists");
  if (type != 0) {
    url = "".concat(api, "/index/api/myRepairs");
  }
  $(".zxf_pagediv").createPage({
    pageNum: Math.ceil(vm.totalNum / 8),
    current: 1,
    backfun: function backfun(e) {
      var page = e.current;
      $.ajax({
        type: "post",
        url: url,
        data: {
          page: page
        },
        dataType: 'json',
        success: function success(res) {
          vm.list = res.data.list;
        }
      });
    }
  });
  isInitPage = true;
}
