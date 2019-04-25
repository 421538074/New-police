"use strict";

var xm = new Vue({
  el: "#app",
  data: {
    isstar: false,
    list: [],
    list1: [],
    msg: '',
    show: false,
    title: ''
  },
  methods: {
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
          data: {},
          dataType: 'json',
          success: function success(res) {
            _this.list = res.data;
          }
        });
      } else {
        this.title = "我的接单";
        $.ajax({
          type: "post",
          url: "".concat(api, "/index/api/myRepairs"),
          async: true,
          data: {},
          dataType: 'json',
          success: function success(res) {
            _this.list1 = res.data;
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
            warn.alert(res.msg);
            $.ajax({
              type: "post",
              url: "".concat(api, "/index/api/repairLists"),
              async: true,
              data: {},
              dataType: 'json',
              success: function success(res) {
                _this2.list = res.data;
              }
            });
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
              data: {},
              dataType: 'json',
              success: function success(res) {
                _this3.list1 = res.data;
              }
            });
          } else {
            warn.alert(res.msg);
          }
        }
      });
    }
  },
  created: function created() {
    this.onli(0);
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